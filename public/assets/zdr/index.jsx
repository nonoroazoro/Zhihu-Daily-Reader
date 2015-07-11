require("./res/index.css");

var $ = require("jquery");
var React = require("react");

var Navbar = require("./components/Navbar");
React.render(
    <Navbar />,
    $("#container")[0]
);
