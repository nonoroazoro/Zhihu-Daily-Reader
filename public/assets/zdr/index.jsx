require("./res/index.less");

var $ = require("jquery");
var React = require("react");

var Navbar = require("./components/Navbar");
var Carousel = require("./components/Carousel");

React.render(
    <div className="container">
        <Carousel />
    </div>
    ,
    $("#container")[0]
);
