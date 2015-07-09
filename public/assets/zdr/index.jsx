var $ = require("jquery");
var React = require("react");
var Hello = require("./Hello");

React.render(
    <Hello />,
    $(".container-fluid")[0]
);
