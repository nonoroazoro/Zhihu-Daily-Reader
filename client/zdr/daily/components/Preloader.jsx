import "./res/Preloader.less";

import React      from "react";
import classNames from "classnames";

export default class Preloader extends React.Component
{
    static defaultProps =
    {
        className: null
    };

    render()
    {
        const classes = classNames(
            "Preloader",
            {
                [this.props.className]: (this.props.className != null && this.props.className.trim() != "")
            }
        );

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
}
