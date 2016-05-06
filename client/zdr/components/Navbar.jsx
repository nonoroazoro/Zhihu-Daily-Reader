import "./res/Navbar.less";

import React from "react";
import logo  from "../common/res/img/zhihu_daily_logo_blue.png";

/**
 * 头部。
 */
class NavbarHeader extends React.Component
{
    render()
    {
        return (
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#NavbarContent"
                >
                    <span className="sr-only">导航</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="/">
                    <img alt="知乎日报" src={logo} />
                </a>
            </div>
        );
    }
}

/**
 * 菜单。
 */
class NavbarContent extends React.Component
{
    render()
    {
        return (
            <div
                id="NavbarContent"
                className="navbar-collapse collapse"
            >
                <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">日报</a></li>
                    <li className="disabled"><a href="#">专栏</a></li>
                    <li className="disabled"><a href="#">关于</a></li>
                </ul>
            </div>
        );
    }
}

/**
 * 导航栏。
 */
export default class Navbar extends React.Component
{
    render()
    {
        return (
            <nav className="Navbar navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <NavbarHeader />
                    <NavbarContent />
                </div>
            </nav>
        );
    }
}
