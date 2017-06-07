import classNames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

/**
 * 两侧控制器。
 */
export default class CarouselControls extends PureComponent
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
        // 少于1页时隐藏控制器。
        const classes = classNames("CarouselControl", {
            "hide": (this.props.length <= 1)
        });

        return (
            <div className={classes}>
                <a
                    className="left carousel-control"
                    href={this.props.target}
                    role="button"
                    data-slide="prev"
                >
                    <span className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">上一页</span>
                </a>
                <a
                    className="right carousel-control"
                    href={this.props.target}
                    role="button"
                    data-slide="next"
                >
                    <span className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">下一页</span>
                </a>
            </div>
        );
    }
}
