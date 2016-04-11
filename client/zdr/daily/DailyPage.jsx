import "./res/DailyPage.less";

import $               from "jquery";
import React           from "react";
import Mousetrap       from "mousetrap";
import ReactUpdate     from "react-addons-update";
import PureRenderMixin from "react-addons-pure-render-mixin";

import Utils           from "./controllers/Utils";
import DailyManager    from "./controllers/DailyManager";

//import Carousel        from "./components/Carousel";
import FlexView        from "./components/FlexView";
import ArticleView     from "./components/ArticleView";

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

    _$ArticleView = null;
    _$ArticleViewContent = null;


    state =
    {
        topStoryIndexes: [],
        storyIndexes: [],
        currentStory: null,
        loading: false
    };

    componentDidMount()
    {
        // 1、初始化。
        this._$ArticleView = $("#ArticleView");
        this._$ArticleViewContent = $("#ArticleView .modal-content");

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
                this.setState(
                {
                    topStoryIndexes: res.ids
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
                    this._addStoryIndexes(res.ids);
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
                        this._addStoryIndexes(res.ids);
                    }

                    this.setState({
                        loading: false
                    });

                    if(_.isFunction(p_callback))
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
        Mousetrap.bind("esc", this._closeArticleView.bind(this));
        
        Mousetrap.bind("j", this._keydownShowNextStory.bind(this));
        Mousetrap.bind("k", this._keydownShowPrevStory.bind(this));

        Mousetrap.bind(["o", "enter"], () =>
        {
            if (!this._isArticleViewVisible)
            {
                this._showArticle(DailyManager.getFetchedStories()[this.state.storyIndexes[this._currentIndex]]);
            }
        });

        Mousetrap.bind("left", () =>
        {
            this._isArticleViewVisible
                ? this._keydownShowPrevStory()
                : this._minusCurrentIndex();
        });
        Mousetrap.bind("right", () =>
        {
            this._isArticleViewVisible
                ? this._keydownShowNextStory()
                : this._addCurrentIndex();
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
    }

    /**
    * 移除键盘快捷键。
    */
    _removeKeyboardShortcuts()
    {
        Mousetrap.reset();
    }

    /**
    * ArticleView 显示下一个日报（如果当前未打开 ArticleView 则自动打开）。
    */
    _keydownShowNextStory()
    {
        const index = this._currentIndex + 1;
        if (index < this.state.storyIndexes.length)
        {
            if (!this._isLoading)
            {
                const story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
                if (this._isArticleViewVisible)
                {
                    this._loadArticle(story, () =>
                    {
                        this._addCurrentIndex();
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
    * ArticleView 显示上一个日报（如果当前未打开 ArticleView 则自动打开）。
    */
    _keydownShowPrevStory()
    {
        const index = this._currentIndex - 1;
        if (index >= 0)
        {
            const story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
            if(this._isArticleViewVisible)
            {
                this._loadArticle(story, () =>
                {
                    this._minusCurrentIndex();
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
        // 185 是 Flex-Tile 的一半高度。
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
    * 增量加载指定的日报。
    */
    _addStoryIndexes(p_indexes)
    {
        this.setState(
        {
            storyIndexes: ReactUpdate(this.state.storyIndexes,
            {
                $push: p_indexes
            })
        });
    }

    _carouselClickHandler(e)
    {
        this._showArticle(DailyManager.getFetchedStories()[e.id]);
    }

    _tileClickHandler(e)
    {
        this._showArticle(e.story);
    }

    /**
    * 打开 ArticleView 并加载指定的日报。
    */
    _showArticle(p_story)
    {
        this._loadArticle(p_story, () =>
        {
            this._setCurrentIndex(this._getStoryIndexById(p_story.id));
            this._openArticleView();
        });
    }

    /**
    * 向 ArticleView 中加载指定的日报（仅改变内容，不改变显示状态，允许在回调中进行控制）。
    */
    _loadArticle(p_story, p_callback)
    {
        if(p_story)
        {
            this.setState({
                currentStory: p_story
            }, p_callback);
        }
    }

    /**
    * 获取指定唯一标识的日报的索引。
    */
    _getStoryIndexById(p_id)
    {
        return _.indexOf(this.state.storyIndexes, p_id);
    }

    /**
    * 打开 ArticleView。
    */
    _openArticleView()
    {
        if (!this._isArticleViewVisible)
        {
            this._$ArticleView.modal();
        }
    }

    /**
    * 关闭 ArticleView。
    */
    _closeArticleView()
    {
        if (this._isArticleViewVisible)
        {
            this._$ArticleView.modal("hide");
        }
    }

    /**
    * 当前日报索引增加1。
    */
    _addCurrentIndex()
    {
        if (this._currentIndex + 1 < this.state.storyIndexes.length)
        {
            this._setCurrentIndex(this._currentIndex + 1);
        }
    }

    /**
    * 当前日报索引减少1。
    */
    _minusCurrentIndex()
    {
        if (this._currentIndex > 0)
        {
            this._setCurrentIndex(this._currentIndex - 1);
        }
    }

    /**
    * 设置日报索引。
    */
    _setCurrentIndex(p_index)
    {
        const e = { oldIndex: this._currentIndex, newIndex: p_index };
        this._currentIndex = p_index;
        this._currentIndexChangedHandler(e);
    }

    _currentIndexChangedHandler(e)
    {
        this._updateCurrentTile(e.oldIndex, e.newIndex);
    }

    /**
    * 更新当前 FlexTile 样式。
    */
    _updateCurrentTile(p_oldIndex, p_newIndex)
    {
        if (p_oldIndex >= 0)
        {
            $("#story" + this.state.storyIndexes[p_oldIndex]).removeClass("current");
        }

        const $newTile = $("#story" + this.state.storyIndexes[p_newIndex]);
        $newTile.addClass("current");

        // 判断是否需要移动滚动条的位置，以使内容可见。
        // 71 是 body 的 padding-top 与 FlexTile 的 margin-top 之和（即 51 + 20）。
        const newTop = $newTile.offset().top - 71;
        const moveDown = newTop + $newTile.outerHeight(true) - $(document).scrollTop() > $(window).height();
        const moveUp = newTop < $(document).scrollTop();
        if (moveDown || moveUp)
        {
            // 此处用 animate 的话，存在问题，按住按键不放会出问题。
            $(document).scrollTop(newTop);
        }
    }

    render()
    {
        // 幻灯片（不好看。。。隐藏了吧-_-）。
        //<div className="CarouselContainer container-fluid">
        //    <Carousel onClick={this._carouselClickHandler.bind(this)} indexes={this.state.topStoryIndexes} />
        //</div>

        return (
            <div className="DailyPage container-fluid">
                <FlexView
                    onTileClick={this._tileClickHandler.bind(this)}
                    contents={this.state.storyIndexes}
                    loading={this.state.loading} />
                <ArticleView story={this.state.currentStory} />
            </div>
        );
    }
}