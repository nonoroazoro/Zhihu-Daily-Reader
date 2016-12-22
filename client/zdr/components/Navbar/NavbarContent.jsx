import "./res/index.less";

import React from "react";

/**
 * 菜单。
 */
export default () =>
{
    return (
        <div id="NavbarContent" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="#">日报</a></li>
                <li className="disabled"><a href="#">专栏</a></li>
                <li className="disabled"><a href="#">关于</a></li>
            </ul>
        </div>
    );
};
