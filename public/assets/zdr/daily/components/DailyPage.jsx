require("./res/DailyPage.less");

var $ = require("jquery");
var React = require("react");

var Carousel = require("./Carousel");
var FlexView = require("./FlexView");
var ArticleView = require("./ArticleView");

var DailyPage = React.createClass(
{
    render : function()
    {
        var page =
            <div className="DailyPage">
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