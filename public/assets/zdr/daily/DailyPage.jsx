require("./res/DailyPage.less");

var $ = require("jquery");
var React = require("react");
var ReactUpdate = React.addons.update;
var PureRenderMixin = React.addons.PureRenderMixin;
var DailyManager = require("./controllers/daily");
var Utils = require("./controllers/utils");

//var Carousel = require("./components/Carousel");
var FlexView = require("./components/FlexView");
var ArticleView = require("./components/ArticleView");

/**
 * 知乎日报页面。
 */
var DailyPage = React.createClass(
{
    _currentLoadedDate: null,
    _currentIndex: -1,
    _isLoading: false,
    _isArticleViewVisible: false,

    _$ArticleView: null,
    _$ArticleViewContent: null,

    mixins: [PureRenderMixin],

    getInitialState()
    {
        return {
            topStoryIndexes: [],
            storyIndexes: [],
            currentStory: null,
            loading: false
        };
    },

    componentDidMount: function ()
    {
        // 1、初始化。
        this._$ArticleView = $("#ArticleView");
        this._$ArticleViewContent = $("#ArticleView .modal-content");

        // 2、加载热门日报（不好看。。。隐藏了吧-_-）。
        //this._loadTopStories();

        // 3、加载最新日报。
        this._loadOtherStories();

        // 4、事件处理。
        this._addEventHandler();
    },

    componentWillUnmount: function ()
    {
        // 1、事件处理。
        this._removeEventHandler();
    },

    /**
    * 加载热门日报（Carousel）。
    */
    _loadTopStories: function ()
    {
        DailyManager.getTopStoryIDs(function (err, res)
        {
            if (this.isMounted() && !err && res)
            {
                this.setState(
                {
                    topStoryIndexes: res.ids
                });
            }
        }.bind(this));
    },

    /**
    * 加载最新日报（默认仅加载今日、昨日的日报）（FlexView）。
    */
    _loadOtherStories: function ()
    {
        this.setState({
            loading: true
        }, function ()
        {
            DailyManager.getStoryIDs(function (err, res)
            {
                if (this.isMounted() && !err && res)
                {
                    this._currentLoadedDate = res.date;
                    this._addStoryIndexes(res.ids);
                    this._loadPrevStories();
                }

                this.setState({
                    loading: false
                });
            }.bind(this));
        });
    },

    /**
    * 加载前一天的日报（相对当前已加载日报的日期）。
    */
    _loadPrevStories: function (p_callback)
    {
        this.setState({
            loading: true
        }, function ()
        {
            DailyManager.getStoryIDs(
                Utils.prevZhihuDay(this._currentLoadedDate),
                function (err, res)
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
                }.bind(this)
            );
        });
    },

    /**
    * 订购事件。
    */
    _addEventHandler: function()
    {
        this._$ArticleView.on("hide.bs.modal", function (e)
        {
            this._resetArticleViewScroll();
        }.bind(this));

        this._$ArticleView.on("hidden.bs.modal", function (e)
        {
            this._isArticleViewVisible = false;
        }.bind(this));

        this._$ArticleView.on("shown.bs.modal", function (e)
        {
            this._isArticleViewVisible = true;
            this._$ArticleViewContent.focus();
        }.bind(this));

        $(document).on("keydown", this._globalKeydownHandler);
        $(document).on("scroll", this._scrollHandler);
    },

    /**
    * 退购事件。
    */
    _removeEventHandler: function()
    {
        this._$ArticleView.off("hide.bs.modal");
        $(document).off("keydown");
        $(document).off("scroll");
    },

    /**
    * 处理全局按键事件。
    */
    _globalKeydownHandler: function (e)
    {
        var code = e.which;
        var extraKey = e.altKey || e.ctrlKey || e.shiftKey || e.metaKey;
        if(!extraKey)
        {
            if(code == 27)
            {
                // ESC：关闭 ArticleView。
                this._closeArticleView();
            }
            else if(code == 74)
            {
                // J：ArticleView 显示下一个日报（如果当前未打开 ArticleView 则自动打开）。
                this._keydownShowNextStory();
            }
            else if(code == 75)
            {
                // K：ArticleView 显示上一个日报（如果当前未打开 ArticleView 则自动打开）。
                this._keydownShowPrevStory();
            }
            else if(code == 13 || code == 79)
            {
                // Enter、O：打开选中的日报。
                if(!this._isArticleViewVisible)
                {
                    this._showArticle(DailyManager.getFetchedStories()[this.state.storyIndexes[this._currentIndex]]);
                }
            }
            else if(code == 37)
            {
                // 左方向：切换到上一个日报。
                if(this._isArticleViewVisible)
                {
                    this._keydownShowPrevStory();
                }
                else
                {
                    this._minusCurrentIndex();
                }
            }
            else if(code == 39)
            {
                // 右方向：切换到下一个日报。
                if(this._isArticleViewVisible)
                {
                    this._keydownShowNextStory();
                }
                else
                {
                    this._addCurrentIndex();
                }
            }
            else if(code == 86)
            {
                // V：打开原始链接。
                if(this._isArticleViewVisible)
                {
                    $(".view-more a").map(function(p_index, p_object)
                    {
                        p_object.click();
                    });
                }
                else
                {
                }
            }
        }
    },

    /**
    * ArticleView 显示下一个日报（如果当前未打开 ArticleView 则自动打开）。
    */
    _keydownShowNextStory: function ()
    {
        var index = this._currentIndex + 1;
        if(index < this.state.storyIndexes.length)
        {
            if(!this._isLoading)
            {
                var story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
                if(this._isArticleViewVisible)
                {
                    this._loadArticle(story, function()
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
            if(!this._isLoading)
            {
                this._isLoading = true;
                this._loadPrevStories(function()
                {
                    this._isLoading = false;
                }.bind(this));
            }
        }
    },

    /**
    * ArticleView 显示上一个日报（如果当前未打开 ArticleView 则自动打开）。
    */
    _keydownShowPrevStory: function ()
    {
        var index = this._currentIndex - 1;
        if(index >= 0)
        {
            var story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
            if(this._isArticleViewVisible)
            {
                this._loadArticle(story, function()
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
    },

    /**
    * 监控垂直滚动条位置，动态加载内容。
    */
    _scrollHandler: function (e)
    {
        if(!this._isLoading && ($(document).scrollTop() >= $(document).height()-$(window).height()))
        {
            this._isLoading = true;
            this._loadPrevStories(function()
            {
                this._isLoading = false;
            }.bind(this));
        }
    },

    /**
    * 重设 ArticleView 的垂直滚动条位置。
    */
    _resetArticleViewScroll: function ()
    {
        this._$ArticleViewContent.scrollTop(0);
    },

    /**
    * 增量加载指定的日报。
    */
    _addStoryIndexes: function (p_indexes)
    {
        this.setState(
        {
            storyIndexes: ReactUpdate(this.state.storyIndexes,
            {
                $push: p_indexes
            })
        });
    },

    _carouselClickHandler: function (e)
    {
        this._showArticle(DailyManager.getFetchedStories()[e.id]);
    },

    _tileClickHandler: function (e)
    {
        this._showArticle(e.story);
    },

    /**
    * 打开 ArticleView 并加载指定的日报。
    */
    _showArticle: function (p_story)
    {
        this._loadArticle(p_story, function()
        {
            this._setCurrentIndex(this._getStoryIndexById(p_story.id));
            this._openArticleView();
        });
    },

    /**
    * 向 ArticleView 中加载指定的日报（仅改变内容，不改变显示状态，允许在回调中进行控制）。
    */
    _loadArticle: function (p_story, p_callback)
    {
        if(p_story)
        {
            this.setState({
                currentStory: p_story
            }, p_callback);
        }
    },

    /**
    * 获取指定唯一标识的日报的索引。
    */
    _getStoryIndexById: function (p_id)
    {
        return _.indexOf(this.state.storyIndexes, p_id);
    },

    /**
    * 打开 ArticleView。
    */
    _openArticleView: function ()
    {
        if(!this._isArticleViewVisible)
        {
            this._$ArticleView.modal();
        }
    },

    /**
    * 关闭 ArticleView。
    */
    _closeArticleView: function ()
    {
        if(this._isArticleViewVisible)
        {
            this._$ArticleView.modal("hide");
        }
    },

    /**
    * 当前日报索引增加1。
    */
    _addCurrentIndex: function ()
    {
        if(this._currentIndex + 1 < this.state.storyIndexes.length)
        {
            this._setCurrentIndex(this._currentIndex + 1);
        }
    },

    /**
    * 当前日报索引减少1。
    */
    _minusCurrentIndex: function ()
    {
        if(this._currentIndex > 0)
        {
            this._setCurrentIndex(this._currentIndex - 1);
        }
    },

    /**
    * 设置日报索引。
    */
    _setCurrentIndex: function (p_index)
    {
        var e = {oldIndex: this._currentIndex, newIndex: p_index};
        this._currentIndex = p_index;
        this._currentIndexChangedHandler(e);
    },

    _currentIndexChangedHandler: function (e)
    {
        this._updateCurrentTile(e.oldIndex, e.newIndex);
    },

    /**
    * 更新当前 FlexTile 样式。
    */
    _updateCurrentTile: function (p_oldIndex, p_newIndex)
    {
        if(p_oldIndex >= 0)
        {
            $("#story" + this.state.storyIndexes[p_oldIndex]).removeClass("current");
        }

        var $newTile = $("#story" + this.state.storyIndexes[p_newIndex]);
        $newTile.addClass("current");

        // 判断是否需要移动滚动跳的位置，以使内容可见。
        // 71 是 body 的 padding-top 与 FlexTile 的 margin-top 之和（即 51 + 20）。
        var newTop = $newTile.offset().top - 71;
        var moveDown = newTop + $newTile.outerHeight(true) - $(document).scrollTop() > $(window).height();
        var moveUp = newTop < $(document).scrollTop();
        if(moveDown || moveUp)
        {
            // 此处用 animate 的话，存在问题，按住按键不放会出问题。
            $(document).scrollTop(newTop);
        }
    },

    render: function ()
    {
        // 幻灯片（不好看。。。隐藏了吧-_-）。
        //<div className="CarouselContainer container-fluid">
        //    <Carousel onClick={this._carouselClickHandler} indexes={this.state.topStoryIndexes} />
        //</div>

        var page =
            <div className="DailyPage container-fluid">
                <FlexView onTileClick={this._tileClickHandler} indexes={this.state.storyIndexes} loading={this.state.loading}/>
                <ArticleView story={this.state.currentStory} />
            </div>;
        return page;
    }
});

module.exports = DailyPage;