require("./res/DailyPage.less");

var $ = require("jquery");
var moment = require("moment");
var React = require("react");
var ReactUpdate = React.addons.update;
var PureRenderMixin = React.addons.PureRenderMixin;
var DailyManager = require("./controllers/DailyManager");
var Utils = require("./controllers/Utils");

var Carousel = require("./components/Carousel");
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
            currentStory: null
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
        DailyManager.getTopStoryIndexes(function (p_data)
        {
            if (this.isMounted() && p_data)
            {
                this.setState(
                {
                    topStoryIndexes: p_data.indexes
                });
            }
        }.bind(this));
    },

    /**
    * 加载最新日报（默认仅加载今日、昨日的日报）（FlexView）。
    */
    _loadOtherStories: function ()
    {
        DailyManager.getStoryIndexes(function (p_data)
        {
            if (this.isMounted() && p_data)
            {
                this._currentLoadedDate = p_data.date;
                this._addStoryIndexes(p_data.indexes);
                this._loadPrevStories();
            }
        }.bind(this));
    },

    /**
    * 加载前一天的日报（相对当前已加载日报的日期）。
    */
    _loadPrevStories: function (p_callback)
    {
        DailyManager.getStoryIndexes(function (p_data)
        {
            if (p_data)
            {
                this._currentLoadedDate = p_data.date;
                this._addStoryIndexes(p_data.indexes);
            }

            if(_.isFunction(p_callback))
            {
                p_callback();
            }
        }.bind(this), Utils.prevZhihuDay(this._currentLoadedDate));
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
        const code = e.which;
        if(code == 27)
        {
            // ESC：关闭 ArticleView。
            this._closeArticleView();
        }
        else if(code == 74)
        {
            // J：ArticleView 显示下一个日报。
            if(this._isArticleViewVisible)
            {
                var index = this._currentIndex + 1;
                if(index < this.state.storyIndexes.length)
                {
                    if(!this._isLoading)
                    {
                        this._loadArticle(DailyManager.getFetchedStories()[this.state.storyIndexes[index]], function()
                        {
                            this._currentIndex++;
                            this._resetArticleViewScroll();
                        });
                    }
                }
                else
                {
                    if(!this._isLoading)
                    {
                        this._isLoading = true;
                        this._loadPrevStories(function()
                        {
                            this._isLoading = false;
                        }.bind(this));
                    }
                }
            }
        }
        else if(code == 75)
        {
            // K：ArticleView 显示上一个日报。
            if(this._isArticleViewVisible)
            {
                var index = this._currentIndex - 1;
                if(index >= 0)
                {
                    this._loadArticle(DailyManager.getFetchedStories()[this.state.storyIndexes[index]], function()
                    {
                        this._currentIndex--;
                        this._resetArticleViewScroll();
                    });
                }
            }
        }
    },

    /**
    * 监控垂直滚动条位置，动态加载内容。
    */
    _scrollHandler: function (e)
    {
        if(!this._isLoading && ($(document).scrollTop() >= $(document).height()-$(window).height() - 375))
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

    _handleCarouselClick: function (e)
    {
        this._showArticle(DailyManager.getFetchedStories()[e.id]);
    },

    _handleTileClick: function (e)
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
            this._currentIndex = this._getStoryIndexById(p_story.id);
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

    render: function ()
    {
        // 幻灯片（不好看。。。隐藏了吧-_-）。
        //<div className="CarouselContainer container-fluid">
        //    <Carousel onClick={this._handleCarouselClick} indexes={this.state.topStoryIndexes} />
        //</div>

        var page =
            <div className="DailyPage container-fluid">
                <div className="FlexContainer container-fluid">
                    <FlexView onTileClick={this._handleTileClick} indexes={this.state.storyIndexes} />
                </div>
                <ArticleView story={this.state.currentStory}/>
            </div>;
        return page;
    }
});

module.exports = DailyPage;