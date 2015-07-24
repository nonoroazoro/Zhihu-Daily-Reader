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
            for (var i = 0; i < length; i++)
            {
                indicators.push(<li data-target={this.props.target} data-slide-to={i} />);
            }
            indicators[0].props.className = "active";
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
    render: function ()
    {
        var rows = _.map(this.props.data, function (value, key)
        {
            var style = {
                backgroundImage: "url(" + value.image + ")"
            };

            return (
                <div className="item">
                    <a href={"http://daily.zhihu.com/story/" + value.id}
                       target="_blank"
                       data-target={value.id}>
                        <div className="carousel-picture" style={style} />
                    </a>
                    <div className="carousel-caption">
                        <h3>{value.title}</h3>
                    </div>
                </div>
            );
        });

        if (rows.length > 0)
        {
            rows[0].props.className = "item active";
        }

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
            api: "/api/4/news/top"
        };
    },

    getInitialState: function ()
    {
        return {
            stories: []
        };
    },

    componentDidMount: function ()
    {
        $.get(this.props.api, function (data)
        {
            if (this.isMounted() && data)
            {
                this.setState(
                {
                    stories: data.stories
                });
            }
        }.bind(this)).fail(function ()
        {
            console.log("error loading top stories");
        });
    },

    render: function ()
    {
        var target = "#" + this.props.id;
        var length = this.state.stories.length;

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
                <CarouselInner data={this.state.stories} />
                <CarouselControls className={controlsClassNames} href={target} length={length} />
            </div>
        );
    }
});

module.exports = Carousel;