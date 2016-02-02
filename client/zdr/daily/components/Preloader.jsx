import "./res/Preloader.less";

import _ from "lodash";
import React from "react";

export default class Preloader extends React.Component
{
    static propTypes =
    {
        className: React.PropTypes.string
    };

    static defaultProps =
    {
        className: null
    };

    render()
    {
        let classes = "Preloader";
        if (!_.isEmpty(_.trim(this.props.className)))
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
}
