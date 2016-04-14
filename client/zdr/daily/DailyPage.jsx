import "./res/DailyPage.less";

import $               from "jquery";
import React           from "react";
import Mousetrap       from "mousetrap";
import isFunction      from "lodash/lang/isFunction";
import ReactUpdate     from "react-addons-update";
import PureRenderMixin from "react-addons-pure-render-mixin";

import Utils           from "./controllers/Utils";
import DailyManager    from "./controllers/DailyManager";

//import Carousel        from "./components/Carousel";
import FlexView        from "./components/FlexView";
import ArticleView     from "./components/ArticleView";
import ShortcutsView   from "./components/ShortcutsView";

/**
 * 知乎日报页面。
 */
export default class DailyPage extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    _currentLoadedDate = null;
    _currentIndex = -1;
    _isLoading = false;
    _isArticleViewVisible = false;
    _openShortcutsViewFlag = false;

    _$ArticleView = null;
    _$ArticleViewContent = null;
    _$ShortcutsView = null;

    state = {
        topStoryIDs: [],
        storyIDs: [],
        currentStory: null,
        loading: false
    };

    componentDidMount()
    {
        // 1、初始化。
        this._$ArticleView = $("#ArticleView");
        this._$ArticleViewContent = $("#ArticleView .modal-content");
        this._$ShortcutsView = $("#ShortcutsView");

        // 2、加载热门日报（不好看。。。匿了吧-_-）。
        //this._loadTopStories();

        // 3、加载最新日报。
        this._loadOtherStories();

        // 4、事件处理。
        this._addEventHandler();
    }

    componentWillUnmount()
    {
        // 1、事件处理。
        this._removeEventHandler();
    }

    /**
    * 加载热门日报（Carousel）。
    */
    _loadTopStories()
    {
        DailyManager.getTopStoryIDs((err, res) =>
        {
            if (!err && res)
            {
                this.setState({
                    topStoryIDs: res.ids
                });
            }
        });
    }

    /**
    * 加载最新日报（默认仅加载今日、昨日的日报）（FlexView）。
    */
    _loadOtherStories()
    {
        this.setState({
            loading: true
        }, () =>
        {
            DailyManager.getStoryIDs((err, res) =>
            {
                if (!err && res)
                {
                    this._currentLoadedDate = res.date;
                    this._addStoryIDs(res.ids);
                    this._loadPrevStories();
                }

                this.setState({
                    loading: false
                });
            });
        });
    }

    /**
    * 加载前一天的日报（相对当前已加载日报的日期）。
    */
    _loadPrevStories(p_callback)
    {
        this.setState({
            loading: true
        }, () =>
        {
            DailyManager.getStoryIDs(
                Utils.prevZhihuDay(this._currentLoadedDate),
                (err, res) =>
                {
                    if (!err && res)
                    {
                        this._currentLoadedDate = res.date;
                        this._addStoryIDs(res.ids);
                    }

                    this.setState({
                        loading: false
                    });

                    if (isFunction(p_callback))
                    {
                        p_callback();
                    }
                }
            );
        });
    }

    /**
    * 订购事件。
    */
    _addEventHandler()
    {
        this._$ArticleView.on("hide.bs.modal", (e) =>
        {
            this._resetArticleViewScroll();
        });

        this._$ArticleView.on("hidden.bs.modal", (e) =>
        {
            this._isArticleViewVisible = false;

            // hack。不等上一个 modal dialog 关闭就打开新的 modal dialog 时会出现 padding-right bug 和抖动。
            if (this._openShortcutsViewFlag)
            {
                this._openShortcutsViewFlag = false;
                this._openShortcutsView();
            }
        });

        this._$ArticleView.on("shown.bs.modal", (e) =>
        {
            this._isArticleViewVisible = true;
            this._$ArticleViewContent.focus();
        });

        this._addKeyboardShortcuts();
        $(document).on("scroll", this._scrollHandler.bind(this));
    }

    /**
    * 退购事件。
    */
    _removeEventHandler()
    {
        this._$ArticleView.off("hide.bs.modal");
        this._removeKeyboardShortcuts();
        $(document).off("scroll");
    }

    /**
    * 添加键盘快捷键。
    */
    _addKeyboardShortcuts()
    {
        Mousetrap.bind(["esc", "escape"], () =>
        {
            this._closeArticleView();
            this._closeShortcutsView();
        });

        Mousetrap.bind("j", this._keydownShowNextStory.bind(this));
        Mousetrap.bind("k", this._keydownShowPrevStory.bind(this));

        Mousetrap.bind(["o", "enter"], () =>
        {
            if (!this._isArticleViewVisible && this._currentIndex >= 0)
            {
                this._showArticle(DailyManager.getFetchedStories()[this.state.storyIDs[this._currentIndex]], false);
            }
        });

        Mousetrap.bind("left", () =>
        {
            this._isArticleViewVisible
                ? this._keydownShowPrevStory()
                : this._decreaseCurrentIndex();
        });
        Mousetrap.bind("right", () =>
        {
            this._isArticleViewVisible
                ? this._keydownShowNextStory()
                : this._increaseCurrentIndex();
        });

        Mousetrap.bind("v", () =>
        {
            if (this._isArticleViewVisible)
            {
                $(".view-more a").map((index, value) =>
                {
                    value.click();
                });
            }
        });

        // 显示键盘快捷键帮助。
        Mousetrap.bind(["h", "?"], () =>
        {
            if (this._isArticleViewVisible)
            {
                // hack。
                this._openShortcutsViewFlag = true;
                this._closeArticleView();
            }
            else
            {
                this._openShortcutsView();
            }
        });
    }

    /**
    * 移除键盘快捷键。
    */
    _removeKeyboardShortcuts()
    {
        Mousetrap.reset();
    }

    /**
    * ArticleView 显示下一个日报（如果当前未显示 ArticleView 则自动显示）。
    */
    _keydownShowNextStory()
    {
        const index = this._currentIndex + 1;
        if (index < this.state.storyIDs.length)
        {
            if (!this._isLoading)
            {
                const story = DailyManager.getFetchedStories()[this.state.storyIDs[index]];
                if (this._isArticleViewVisible)
                {
                    this._updateArticle(story, () =>
                    {
                        this._increaseCurrentIndex();
                        this._resetArticleViewScroll();
                    });
                }
                else
                {
                    this._showArticle(story);
                }
            }
        }
        else
        {
            // 自动加载前一天日报。
            if (!this._isLoading)
            {
                this._isLoading = true;
                this._loadPrevStories(() =>
                {
                    this._isLoading = false;
                });
            }
        }
    }

    /**
    * ArticleView 显示上一个日报（如果当前未显示 ArticleView 则自动显示）。
    */
    _keydownShowPrevStory()
    {
        const index = this._currentIndex - 1;
        if (index >= 0)
        {
            const story = DailyManager.getFetchedStories()[this.state.storyIDs[index]];
            if(this._isArticleViewVisible)
            {
                this._updateArticle(story, () =>
                {
                    this._decreaseCurrentIndex();
                    this._resetArticleViewScroll();
                });
            }
            else
            {
                this._showArticle(story);
            }
        }
    }

    /**
    * 监控垂直滚动条位置，动态加载内容。
    */
    _scrollHandler(e)
    {
        // 185 是 FlexTile 的一半高度。
        if (!this._isLoading && ($(document).scrollTop() >= $(document).height()-$(window).height() - 185))
        {
            this._isLoading = true;
            this._loadPrevStories(() =>
            {
                this._isLoading = false;
            });
        }
    }

    /**
     * 重设 ArticleView 的垂直滚动条位置。
     */
    _resetArticleViewScroll()
    {
        this._$ArticleViewContent.scrollTop(0);
    }

    /**
     * 向 FlexView 中添加日报。
     */
    _addStoryIDs(p_storyIDs)
    {
        this.setState(
        {
            storyIDs: ReactUpdate(this.state.storyIDs,
            {
                $push: p_storyIDs
            })
        });
    }

    _carouselClickHandler(e)
    {
        this._showArticle(DailyManager.getFetchedStories()[e.id], false);
    }

    _tileClickHandler(e)
    {
        this._showArticle(e.story, false);
    }

    /**
     * 显示 ArticleView 并加载指定的日报（可指定是否自动调整 Tile 位置使其可见）。
     * @param {Object} p_story
     * @param {Boolean} [p_ensureTileVisible]
     */
    _showArticle(p_story, p_ensureTileVisible)
    {
        this._updateArticle(p_story, () =>
        {
            this._setCurrentIndex(this.state.storyIDs.indexOf(p_story.id), p_ensureTileVisible);
            this._openArticleView();
        });
    }

    /**
    * 更新 ArticleView 中的日报内容（不改变“显示/隐藏”状态）。
    */
    _updateArticle(p_story, p_callback)
    {
        if (p_story)
        {
            this.setState({
                currentStory: p_story
            }, p_callback);
        }
    }

    /**
    * 显示 ArticleView。
    */
    _openArticleView()
    {
        if (!this._isArticleViewVisible)
        {
            this._$ArticleView.modal();
        }
    }

    /**
    * 隐藏 ArticleView。
    */
    _closeArticleView()
    {
        if (this._isArticleViewVisible)
        {
            this._$ArticleView.modal("hide");
        }
    }

    /**
     * 显示 ShortcutsView。
     */
    _openShortcutsView()
    {
        this._$ShortcutsView.modal();
    }

    /**
     * 隐藏 ShortcutsView。
     */
    _closeShortcutsView()
    {
        this._$ShortcutsView.modal("hide");
    }

    /**
    * 当前日报索引增加1。
    */
    _increaseCurrentIndex()
    {
        const nextIndex = this._currentIndex + 1;
        if (nextIndex < this.state.storyIDs.length)
        {
            this._setCurrentIndex(nextIndex);
        }
    }

    /**
    * 当前日报索引减少1。
    */
    _decreaseCurrentIndex()
    {
        const nextIndex = this._currentIndex - 1;
        if (nextIndex >= 0)
        {
            this._setCurrentIndex(nextIndex);
        }
    }

    /**
     * 设置日报索引（可指定是否自动调整 Tile 位置使其可见）。
     * @param {Number} p_index
     * @param {Boolean} [p_ensureTileVisible]
     */
    _setCurrentIndex(p_nextIndex, p_ensureTileVisible)
    {
        const prevIndex = this._currentIndex;
        if (p_nextIndex != prevIndex)
        {
            this._currentIndex = p_nextIndex;
            this._updateTileStyle(prevIndex, p_nextIndex, p_ensureTileVisible);
        }
    }

    /**
     * 更新当前选中的 Story Tile 的样式。
     * @param {Boolean} [p_ensureTileVisible]
     */
    _updateTileStyle(p_prevIndex, p_nextIndex, p_ensureTileVisible)
    {
        if (p_prevIndex >= 0)
        {
            $("#story" + this.state.storyIDs[p_prevIndex]).removeClass("current");
        }

        const $newTile = $("#story" + this.state.storyIDs[p_nextIndex]);
        $newTile.addClass("current");

        // 仅当明确指定不自动调整时，才不执行。未指定，或指定为 true 时都会自动调整。
        if (!(p_ensureTileVisible === false))
        {
            this.ensureVisible($newTile);
        }
    }

    ensureVisible($p_tile)
    {
        if ($p_tile)
        {
            // 判断是否需要移动滚动条的位置，以使日报内容可见。
            // 71 是 body 的 padding-top 与 FlexTile 的 margin-top 之和（即 51 + 20）。
            const newTop = $p_tile.offset().top - 71;
            const moveDown = newTop + $p_tile.outerHeight(true) - $(document).scrollTop() > $(window).height();
            const moveUp = newTop < $(document).scrollTop();
            if (moveDown || moveUp)
            {
                // 此处用 animate 的话，存在问题，按住按键不放会出问题。
                $(document).scrollTop(newTop);
            }
        }
    }

    render()
    {
        // 幻灯片（不好看。。。隐藏了吧-_-）。
        //<div className="CarouselContainer container-fluid">
        //    <Carousel onClick={this._carouselClickHandler.bind(this)} storyIDs={this.state.topStoryIDs} />
        //</div>

        return (
            <div className="DailyPage container-fluid">
                <FlexView
                    onTileClick={this._tileClickHandler.bind(this)}
                    contents={this.state.storyIDs}
                    loading={this.state.loading} />
                <ArticleView story={this.state.currentStory} />
                <ShortcutsView />
            </div>
        );
    }
}