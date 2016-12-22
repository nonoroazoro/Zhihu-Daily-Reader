import classNames from "classnames";
import React, { PropTypes, PureComponent } from "react";

/**
 * 幻灯片指示器。
 */
export default class CarouselIndicator extends PureComponent
{
    static propTypes = {
        length: PropTypes.number,
        target: PropTypes.string
    };

    static defaultProps = {
        length: 0,
        target: null
    };

    render()
    {
        const indicators = [];
        const length = this.props.length;
        if (length > 0)
        {
            indicators.push(<li className="active" key="indicator0" data-target={this.props.target} data-slide-to={0} />);
            for (let i = 1; i < length; i++)
            {
                indicators.push(
                    <li key={`indicator${i}`} data-target={this.props.target} data-slide-to={i} />
                );
            }
        }

        // 少于1页时隐藏指示器。
        const classes = classNames(
            "CarouselIndicator",
            "carousel-indicators",
            {
                "hide": (length <= 1)
            }
        );

        return (
            <ol className={classes}>
                {indicators}
            </ol>
        );
    }
}
