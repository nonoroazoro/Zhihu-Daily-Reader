import "./res/Preloader.less";

import trim            from "lodash/trim";
import isEmpty         from "lodash/isEmpty";
import React           from "react";
import cs              from "classnames";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default class Preloader extends React.Component
{
    static propTypes = { className: React.PropTypes.string };
    static defaultProps = { className: null };

    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render()
    {
        const className = trim(this.props.className);
        const classes = cs(
            "Preloader",
            {
                [className]: !isEmpty(className)
            }
        );

        return (
            <div className={classes}>
                <span className="wave1" />
                <span className="wave2" />
                <span className="wave3" />
                <span className="wave4" />
                <span className="wave5" />
            </div>
        );
    }
}
