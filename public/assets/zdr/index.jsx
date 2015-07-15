require("./res/index.less");

var $ = require("jquery");
var React = require("react");

var Header = require("./components/Header");
var Navbar = require("./components/Navbar");

React.render(
    <Header>
        <Navbar />
    </Header>,
    $("#container")[0]
);
