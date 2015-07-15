var React = require("react");

var Header = React.createClass(
{
    render: function ()
    {
        return (<header>{this.props.children}</header>);
    }
});

module.exports = Header;