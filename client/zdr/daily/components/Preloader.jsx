require("./res/Preloader.less");

var _ = require("lodash");
var React = require("react");

var Preloader = React.createClass(
{
    getDefaultProps: function ()
    {
        return {
            className: null
        };
    },

    render: function ()
    {
        var classes = "Preloader";
        if(!_.isEmpty(_.trim(this.props.className)))
        {
            classes = classes + " " + this.props.className;
        }
        
        return (
            <div className={classes}>
                <span className="wave1"/>
                <span className="wave2"/>
                <span className="wave3"/>
                <span className="wave4"/>
                <span className="wave5"/>
            </div>
        );
    }
});

module.exports = Preloader;