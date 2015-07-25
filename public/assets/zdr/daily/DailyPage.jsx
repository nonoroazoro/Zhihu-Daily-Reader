require("./res/DailyPage.less");

var React = require("react");

var Carousel = require("./components/Carousel");
var FlexView = require("./components/FlexView");
var ArticleView = require("./components/ArticleView");

var DailyPage = React.createClass(
{
    render : function()
    {
        var page =
            <div className="DailyPage container-fluid">
                <div className="CarouselContainer container-fluid">
                <Carousel />
                </div>
                <div className="FlexContainer container-fluid">
                    <FlexView />
                </div>
            </div>;
        return page;
    }
});

module.exports = DailyPage;