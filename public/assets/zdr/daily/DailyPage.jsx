require("./res/DailyPage.less");

var React = require("react");
var DailyManager = require("./controllers/DailyManager");

var Carousel = require("./components/Carousel");
var FlexView = require("./components/FlexView");
var ArticleView = require("./components/ArticleView");

/**
 * 知乎日报页面。
 */
var DailyPage = React.createClass(
{
    getInitialState()
    {
        return {
            topStoryIndexes: [],
            storyIndexes: [],
        };
    },

    componentDidMount: function ()
    {
        // 1、加载热门日报。
        DailyManager.getTopStoryIndexes(function (data)
        {
            if (this.isMounted() && data)
            {
                this.setState(
                {
                    topStoryIndexes: data.indexes
                });
            }
        }.bind(this));

        // 2、加载最新日报。
        DailyManager.getStoryIndexes(function (data)
        {
            if (this.isMounted() && data)
            {
                this.setState(function (prevState)
                {
                    Array.prototype.push.apply(prevState.storyIndexes, data.indexes)
                    storyIndexes: prevState.storyIndexes
                });
            }
        }.bind(this));
    },

    handleCarouselClick: function (e)
    {
        console.log(e);
    },
    
    handleTileClick: function (e)
    {
        console.log(e);
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
            </div>;
        return page;
    }
});

module.exports = DailyPage;