require("./res/index.less");

var $ = require("jquery");
var React = require("react");

var Navbar = require("./daily/components/Navbar");
var Carousel = require("./daily/components/Carousel");
var FlexView = require("./daily/components/FlexView");
var ArticleView = require("./daily/components/ArticleView");
var DailyPage = require("./daily/components/DailyPage");

$(function ()
{
    React.render(
        <div className="MainContainer container-fluid">
            <Navbar />
            <div className="CarouselContainer container-fluid">
                <Carousel />
            </div>
            <div className="ContentContainer container-fluid">
                <FlexView />
            </div>
        </div>
        ,
        document.body
    );
});