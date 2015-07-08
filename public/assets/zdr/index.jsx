define(function (require)
{
    var React = require("react");
    var $ = require("jquery");

    var Hello = require("jsx!HelloComponent");
    React.render(
        <Hello />,
        $(".container-fluid")[0]
    );
});