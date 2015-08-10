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

var $ArticleView = null;
var $ArticleViewContent = null;

/**
 * 知乎日报页面。
 */
var DailyPage = React.createClass(
{
    mixins: [PureRenderMixin],

    _earliestDate: null,

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
        var that = this;
        $ArticleView = $("#ArticleView");
        $ArticleViewContent = $("#ArticleView .modal-content");

        // 1、加载热门日报。
        DailyManager.getTopStoryIndexes(function (data)
        {
            if (that.isMounted() && data)
            {
                that.setState(
                {
                    topStoryIndexes: data.indexes
                });
            }
        });

        // 2、加载最新日报（初始化时仅加载今日、昨日的日报）。
        DailyManager.getStoryIndexes(function (data)
        {
            if (that.isMounted() && data)
            {
                that._addStoryIndexes(that, data.indexes);
                that._earliestDate = data.date;
                DailyManager.getStoryIndexes(function (data)
                {
                    if (data)
                    {
                        that._addStoryIndexes(that, data.indexes);
                        that._earliestDate = data.date;
                    }
                }, Utils.prevZhihuDay(DailyManager.getToday()));
            }
        });

        // 3、事件处理。
        $ArticleView.on("hide.bs.modal", function (e)
        {
            that._resetArticleViewScroll();
        });
        $(document).on("keydown", that._globalKeydownHandler);
        $(document).on("scroll", that._scrollHandler);
    },

    componentWillUnmount: function ()
    {
        // 1、事件处理。
        $ArticleView.off("hide.bs.modal");
        $(document).off("keydown");
        $(document).off("scroll");
    },
    
    /**
    * 处理全局按键事件。
    */
    _globalKeydownHandler: function (e)
    {
        var code = e.which;
        if(code == 27)
        {
            // ESC：关闭 ArticleView。
            if($ArticleView.is(":visible"))
            {
                $ArticleView.modal("hide");
            }
        }
        else if(code == 74)
        {
            // J：切换 ArticleView 到下一个日报。
            if($ArticleView.is(":visible"))
            {
                var index = _.indexOf(this.state.storyIndexes, this.state.currentStory.id) + 1;
                if(index < this.state.storyIndexes.length)
                {
                    this.setState({
                        currentStory: DailyManager.getStories()[this.state.storyIndexes[index]]
                    }, function()
                    {
                        this._resetArticleViewScroll();
                    });
                }
            }
        }
        else if(code == 75)
        {
            // K：切换 ArticleView 到上一个日报。
            if($ArticleView.is(":visible"))
            {
                var index = _.indexOf(this.state.storyIndexes, this.state.currentStory.id) - 1;
                if(index >= 0)
                {
                    this.setState({
                        currentStory: DailyManager.getStories()[this.state.storyIndexes[index]]
                    }, function()
                    {
                        this._resetArticleViewScroll();
                    });
                }
            }
        }
    },
    
    _loading: false,

    /**
    * 监控垂直滚动条位置，动态加载内容。
    */
    _scrollHandler: function (e)
    {
        var that = this;
        if(!that._loading && ($(document).scrollTop() >= $(document).height()-$(window).height() - 375))
        {
            that._loading = true;
            DailyManager.getStoryIndexes(function (data)
            {
                if (data)
                {
                    that._addStoryIndexes(that, data.indexes);
                    that._earliestDate = data.date;
                }
                that._loading = false;
            }, Utils.prevZhihuDay(that._earliestDate));
        }
    },

    /**
    * 重设 ArticleView 的垂直滚动条位置。
    */
    _resetArticleViewScroll: function ()
    {
        $ArticleViewContent.scrollTop(0);
    },

    /**
    * 增量加载制定的日报。
    */
    _addStoryIndexes: function (p_this, p_indexes)
    {
        p_this.setState(
        {
            storyIndexes: ReactUpdate(p_this.state.storyIndexes,
            {
                $push: p_indexes
            })
        });
    },

    handleCarouselClick: function (e)
    {
        if(e.id)
        {
            this.setState({
                currentStory: DailyManager.getStories()[e.id]
            }, function()
            {
                $ArticleView.modal();
            });
        }
    },
    
    handleTileClick: function (e)
    {
        this.setState({
            currentStory: e.story
        }, function()
        {
            $ArticleView.modal();
        });
    },

    render: function ()
    {
        var page =
            <div className="DailyPage container-fluid">
                <div className="CarouselContainer container-fluid">
                    <Carousel onClick={this.handleCarouselClick} indexes={this.state.topStoryIndexes} />
                </div>
                <div className="FlexContainer container-fluid">
                    <FlexView onTileClick={this.handleTileClick} indexes={this.state.storyIndexes} />
                </div>
                <ArticleView story={this.state.currentStory}/>
            </div>;
        return page;
    }
});

module.exports = DailyPage;