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
        DailyManager.getTopStoryIndexes(function (data)
        {
            if (data && this.isMounted())
            {
                this.setState(
                {
                    topStoryIndexes: data.indexes
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
                    <FlexView onTileClick={this.handleTileClick} />
                </div>
            </div>;
        return page;
    }
});

module.exports = DailyPage;