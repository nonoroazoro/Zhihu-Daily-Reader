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
            topStories: []
        };
    },

    componentDidMount: function ()
    {
        DailyManager.getTopStories(function (data)
        {
            if (data && this.isMounted())
            {
                this.setState(
                {
                    topStories: data.stories
                });
            }
        }.bind(this));
    },

    render : function()
    {
        var page =
            <div className="DailyPage container-fluid">
                <div className="CarouselContainer container-fluid">
                <Carousel data={this.state.topStories}/>
                </div>
                <div className="FlexContainer container-fluid">
                    <FlexView />
                </div>
            </div>;
        return page;
    }
});

module.exports = DailyPage;