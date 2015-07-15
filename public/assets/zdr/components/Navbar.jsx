require("./res/Navbar.less");

var React = require("react");

/**
 * 头部。
 */
var NavbarHeader = React.createClass(
{
    render: function ()
    {
        var navbarHeader =
            <div className="navbar-header">
                <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target={this.props.collapseTarget ? this.props.collapseTarget : ".navbar-collapse"}>
                    <span className="sr-only">导航</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">
                    <img alt="知乎日报" src={require("common/res/img/zhihu_daily_logo.png")} />
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
    render: function ()
    {
        var navbarContent =
            <div id={this.props.id ? this.props.id : "NavbarContent"}
                className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">日报</a></li>
                    <li><a href="#">专栏</a></li>
                    <li><a href="#">关于</a></li>
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
    render: function ()
    {
        var navbar =
            <nav id={this.props.id ? this.props.id : null}
                className="Navbar navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <NavbarHeader collapseTarget="#NavbarContent"/>
                    <NavbarContent />
                </div>
            </nav>;
        return navbar;
    }
});

module.exports = Navbar;