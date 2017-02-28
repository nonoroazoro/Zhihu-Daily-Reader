import React from "react";

import NavbarHeader from "./NavbarHeader";
import NavbarContent from "./NavbarContent";

import "./res/index.less";

/**
 * 导航栏。
 */
const Navbar = () =>
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

export default Navbar;
