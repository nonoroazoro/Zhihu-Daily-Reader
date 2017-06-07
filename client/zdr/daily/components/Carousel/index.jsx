import classNames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import CarouselInner from "./CarouselInner";
import CarouselControls from "./CarouselControls";
import CarouselIndicator from "./CarouselIndicator";

import "./index.less";

/**
 * 知乎日报：热门消息栏。
 */
export default class Carousel extends PureComponent
{
    static propTypes = {
        id: PropTypes.string,
        storyIDs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                image: PropTypes.string,
                title: PropTypes.string
            })
        ),
        onClick: PropTypes.func
    };

    static defaultProps = {
        id: "Carousel",
        storyIDs: [],
        onClick: null
    };

    render()
    {
        const storyIDs = this.props.storyIDs || [];
        const length = storyIDs.length;
        const target = `#${this.props.id}`;

        // 无内容时隐藏。
        const carouselClassNames = classNames(
            "Carousel",
            "carousel",
            "slide",
            {
                "hide": (length === 0)
            }
        );

        // 1页以下时隐藏控制器。
        const controlsClassNames = classNames({
            "hide": (length <= 1)
        });

        return (
            <div id={this.props.id} className={carouselClassNames} data-ride="carousel">
                <CarouselIndicator target={target} length={length} />
                <CarouselInner onClick={this.props.onClick} storyIDs={storyIDs} />
                <CarouselControls className={controlsClassNames} target={target} length={length} />
            </div>
        );
    }
}
