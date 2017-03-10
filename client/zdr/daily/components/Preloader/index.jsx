import cs from "classnames";
import React, { PureComponent, PropTypes } from "react";

import "./res/index.less";

export default class Preloader extends PureComponent
{
    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps =
    {
        className: undefined
    };

    render()
    {
        return (
            <div className={cs("Preloader", this.props.className)}>
                <span className="wave1" />
                <span className="wave2" />
                <span className="wave3" />
                <span className="wave4" />
                <span className="wave5" />
            </div>
        );
    }
}
