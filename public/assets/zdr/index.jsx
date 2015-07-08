define(function (require)
{
    var React = require("react");
    var $ = require("jquery");
    var Header = React.createClass(
        {
            render: function ()
            {
                return (<header><h1>Hello</h1></header>);
            }
        }
    );
    
    React.render(
        <Header />,
        $(".container-fluid")[0]
    );
});