require("./res/Navbar.less");

var React = require("react");

/**
 * 头部。
 */
var NavbarHeader = React.createClass(
{
    getDefaultProps: function()
    {
        return {
            target: ".navbar-collapse",
        };
    },

    render: function ()
    {
        var navbarHeader =
            <div className="navbar-header">
                <button type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target={this.props.target}>
                    <span className="sr-only">导航</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">
                    <img alt="知乎日报" src={require("../common/res/img/zhihu_daily_logo_blue.png")} />
                </a>
            </div>;
        return navbarHeader;
    }
});

/**
 * 菜单。
 */
var NavbarContent = React.createClass(
{
    getDefaultProps: function()
    {
        return {
            id: "NavbarContent",
        };
    },

    render: function ()
    {
        var navbarContent =
            <div id={this.props.id}
                 className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">日报</a></li>
                    <li className="disabled"><a href="#">专栏</a></li>
                    <li className="disabled"><a href="#">关于</a></li>
                </ul>
            </div>;
        return navbarContent;
    }
});

/**
 * 导航栏。
 */
var Navbar = React.createClass(
{
    getDefaultProps: function()
    {
        return {
            id: "Navbar",
        };
    },

    render: function ()
    {
        var navbar =
            <nav id={this.props.id}
                 className="Navbar navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <NavbarHeader target="#NavbarContent" />
                    <NavbarContent />
                </div>
            </nav>;
        return navbar;
    }
});

module.exports = Navbar;