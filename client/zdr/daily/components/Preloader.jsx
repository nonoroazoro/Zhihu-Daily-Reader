import "./res/Preloader.less";

import _               from "lodash";
import React           from "react";
import ClassNames      from "classnames";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default class Preloader extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes = { className: React.PropTypes.string };

    static defaultProps = { className: null };

    render()
    {
        const className = _.trim(this.props.className);
        const classes = ClassNames(
            "Preloader",
            {
                [className]: !_.isEmpty(className)
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
