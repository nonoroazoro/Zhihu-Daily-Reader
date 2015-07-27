require("./res/Carousel.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");

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
            indicators.push(<li className="active" data-target={this.props.target} data-slide-to={0} />);
            for (var i = 1; i < length; i++)
            {
                indicators.push(<li data-target={this.props.target} data-slide-to={i} />);
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
        var rows = _.map(this.props.data, function (value, key)
        {
            return (
                <div className={key == 0 ? "item active" : "item"}>
                    <a href={"http://daily.zhihu.com/story/" + value.id}
                       target="_blank"
                       data-target={value.id}
                       onClick={that.handleClick.bind(this, value.id)}>
                        <div className="carousel-picture" style={{backgroundImage: "url(" + value.image + ")"}} />
                    </a>
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
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control"
                   href={this.props.href}
                   role="button"
                   data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
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
    getDefaultProps: function ()
    {
        return {
            id: "Carousel",
        };
    },

    render: function ()
    {
        var data = this.props.data || [];
        var length = data.length;
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
                <CarouselInner onClick={this.props.onClick} data={data} />
                <CarouselControls className={controlsClassNames} href={target} length={length} />
            </div>
        );
    }
});

module.exports = Carousel;