require("./res/Carousel.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;

/**
 * 幻灯片指示器。
 */
var CarouselIndicator = React.createClass(
{
    render: function ()
    {
        var indicators = [];
        var length = this.props.length;
        if (length > 0)
        {
            indicators.push(<li className="active" key="indicator0" data-target={this.props.target} data-slide-to={0} />);
            for (var i = 1; i < length; i++)
            {
                indicators.push(<li key={"indicator" + i} data-target={this.props.target} data-slide-to={i} />);
            }
        }

        // 少于1页时隐藏指示器。
        var classes = classNames(
            "CarouselIndicator", "carousel-indicators",
            {
                "hide": (length <= 1),
            }
        );
        return (
            <ol className={classes}>
                {indicators}
            </ol>
        );
    }
});

/**
 * 幻灯片内容。
 */
var CarouselInner = React.createClass(
{
    handleClick: function (p_storyId, e)
    {
        if (_.isFunction(this.props.onClick))
        {
            this.props.onClick(
            {
                id: p_storyId
            });
        }
    },

    render: function ()
    {
        var that = this;
        var rows = _.map(this.props.indexes, function (value, i)
        {
            return (
                <div className={i == 0 ? "item active" : "item"} key={"slide" + i}>
                    <div className="carousel-picture"
                        onClick={that.handleClick.bind(that, value.id)}
                        style={{backgroundImage: "url(" + value.image + ")"}} />
                    <div className="carousel-caption">
                        <h3>{value.title}</h3>
                    </div>
                </div>
            );
        });

        return (
            <div className="CarouselInner carousel-inner" role="listbox">
                {rows}
            </div>
        );
    }
});

/**
 * 两侧控制器。
 */
var CarouselControls = React.createClass(
{
    render: function ()
    {
        // 少于1页时隐藏控制器。
        var classes = classNames(
            "CarouselControl",
            {
                "hide": (this.props.length <= 1),
            }
        );

        return (
            <div className={classes}>
                <a className="left carousel-control"
                   href={this.props.href}
                   role="button"
                   data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control"
                   href={this.props.href}
                   role="button"
                   data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
});

/**
 * 知乎日报：热门消息栏。
 */
var Carousel = React.createClass(
{
    mixins: [PureRenderMixin],

    getDefaultProps: function ()
    {
        return {
            id: "Carousel",
        };
    },

    render: function ()
    {
        var indexes = this.props.indexes || [];
        var length = indexes.length;
        var target = "#" + this.props.id;

        // 无内容时隐藏。
        var carouselClassNames = classNames(
            "Carousel", "carousel", "slide",
            {
                "hide": (length == 0),
            }
        );

        // 1页以下时隐藏控制器。
        var controlsClassNames = classNames(
            {
                "hide": (length <= 1),
            }
        );

        return (
            <div id={this.props.id} className={carouselClassNames} data-ride="carousel">
                <CarouselIndicator target={target} length={length} />
                <CarouselInner onClick={this.props.onClick} indexes={indexes} />
                <CarouselControls className={controlsClassNames} href={target} length={length} />
            </div>
        );
    }
});

module.exports = Carousel;