import "./res/index.less";

import React from "react";

import NavbarHeader from "./NavbarHeader";
import NavbarContent from "./NavbarContent";

/**
 * 导航栏。
 */
export default () =>
{
    return (
        <nav className="Navbar navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <NavbarHeader />
                <NavbarContent />
            </div>
        </nav>
    );
};
