require("./res/DailyPage.less");

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
        var that = this;

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
                DailyManager.getStoryIndexes(function (data)
                {
                    if (data)
                    {
                        that._addStoryIndexes(that, data.indexes);
                    }
                }, Utils.subZhihuDay(DailyManager.getToday()));
            }
        });

        // DEBUG：ArticleView，用完后删除。
        DailyManager.getStory(function (data)
        {
            if (that.isMounted() && data)
            {
                that.setState({
                    currentStory: data
                });
            }
        }, "4893498");
    },

     /**
     * 增量加载制定的日报。
     */
    _addStoryIndexes: function(p_this, p_indexes)
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
        console.log(e.id);
        if(e.id)
        {
            this.setState({
                currentStory: DailyManager.getStories()[e.id]
            });
        }
    },
    
    handleTileClick: function (e)
    {
        console.log(e.story);
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