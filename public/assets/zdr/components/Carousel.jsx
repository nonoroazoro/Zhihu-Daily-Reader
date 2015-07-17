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
    render: function()
    {
        var indicators = [];
        var length = this.props.length;
        if(length > 0)
        {
            for (var i = 0; i < length; i++)
            {
                indicators.push(<li data-target={this.props.target} data-slide-to={i} />);
            }
            indicators[0].props.className = "active";
        }

        return (
            <ol className="carousel-indicators">
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
    render: function()
    {
        var rows = _.map(this.props.data, function(value, key)
        {
            var itemId = value.id;
            return (
                <div className="item">
                    <img src={value.image} alt={value.title} />
                    <div className="carousel-caption">
                        <h1>{value.title}</h1>
                    </div>
                </div>
            );
        });

        return (
            <div className="carousel-inner" role="listbox">
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
    render: function()
    {
        return (
            <div>
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
    getDefaultProps: function()
    {
        return {
            id: "Carousel",
            src: "/api/4/news/latest"
        };
    },

    getInitialState: function()
    {
        return {
            topStories: []
        };
    },

    componentDidMount: function()
    {
        $.get(this.props.src, function(data)
        {
            if(this.isMounted() && data)
            {
                this.setState(
                {
                    topStories: data.top_stories
                });
            }
        }.bind(this)).fail(function()
        {
            console.log("error loading topStories");
        });
    },

    render: function ()
    {
        var target = "#" + this.props.id;

        // 无内容时隐藏。
        var carouselClassNames = classNames(
            "Carousel", "carousel", "slide",
            {
                "hide": (this.state.topStories.length == 0),
            }
        );

        // 1页以下时隐藏控制器。
        var controlsClassNames = classNames(
            {
                "hide": (this.state.topStories.length <= 1),
            }
        );

        return (
            <div id={this.props.id} className={carouselClassNames} data-ride="carousel">
                <CarouselIndicator target={target} length={this.state.topStories.length} />
                <CarouselInner data={this.state.topStories} />
                <CarouselControls className={controlsClassNames} href={target} />
            </div>
        );
    }
});

module.exports = Carousel;