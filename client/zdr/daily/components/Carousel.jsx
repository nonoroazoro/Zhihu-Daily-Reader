import "./res/Carousel.less";

import isFunction      from "lodash/isFunction";
import map             from "lodash/map";
import React           from "react";
import classNames      from "classnames";
import PureRenderMixin from "react-addons-pure-render-mixin";

/**
 * 幻灯片指示器。
 */
class CarouselIndicator extends React.Component
{
    static propTypes = {
        length: React.PropTypes.number,
        target: React.PropTypes.string
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
                indicators.push(<li key={`indicator${i}`} data-target={this.props.target} data-slide-to={i} />);
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

/**
 * 幻灯片内容。
 */
class CarouselInner extends React.Component
{
    static propTypes = {
        storyIDs: React.PropTypes.array,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        storyIDs: [],
        onClick: null
    };

    handleClick(p_storyID, e)
    {
        if (isFunction(this.props.onClick))
        {
            this.props.onClick(
                {
                    id: p_storyID
                }
            );
        }
    }

    render()
    {
        const rows = map(this.props.storyIDs, (value, index) =>
        {
            return (
                <div
                    className={index === 0 ? "item active" : "item"}
                    key={index}
                >
                    <div
                        className="carousel-picture"
                        onClick={this.handleClick.bind(this, value.id)}
                        style={{ backgroundImage: `url(${value.image})` }}
                    />
                    <div className="carousel-caption">
                        <h3>{value.title}</h3>
                    </div>
                </div>
            );
        });

        return (
            <div
                className="CarouselInner carousel-inner"
                role="listbox"
            >
                {rows}
            </div>
        );
    }
}

/**
 * 两侧控制器。
 */
class CarouselControls extends React.Component
{
    static propTypes = {
        length: React.PropTypes.number,
        target: React.PropTypes.string
    };

    static defaultProps = {
        length: 0,
        target: null
    };

    render()
    {
        // 少于1页时隐藏控制器。
        const classes = classNames(
            "CarouselControl",
            {
                "hide": (this.props.length <= 1)
            }
        );

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

/**
 * 知乎日报：热门消息栏。
 */
export default class Carousel extends React.Component
{
    static propTypes = {
        id: React.PropTypes.string,
        storyIDs: React.PropTypes.array,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        id: "Carousel",
        storyIDs: [],
        onClick: null
    };

    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

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
        const controlsClassNames = classNames(
            {
                "hide": (length <= 1)
            }
        );

        return (
            <div id={this.props.id} className={carouselClassNames} data-ride="carousel">
                <CarouselIndicator target={target} length={length} />
                <CarouselInner onClick={this.props.onClick} storyIDs={storyIDs} />
                <CarouselControls className={controlsClassNames} target={target} length={length} />
            </div>
        );
    }
}
