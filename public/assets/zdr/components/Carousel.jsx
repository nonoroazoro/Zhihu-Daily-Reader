require("./res/Carousel.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");

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

var CarouselInner = React.createClass(
{
    render: function()
    {
        var inner =
            <div className="carousel-inner" role="listbox">
                <div className="item active">
                  <div className="carousel-caption">
                  </div>
                </div>
                <div className="item">
                  <div className="carousel-caption">
                  </div>
                </div>
                <div className="item">
                  <div className="carousel-caption">
                  </div>
                </div>
            </div>;

        return inner;
    }
});

var CarouselControls = React.createClass(
{
    render: function()
    {
        var href = "#" + this.props.id;
        var controls =
            <div>
                <a className="left carousel-control"
                    href={href}
                    role="button"
                    data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control"
                    href={href}
                    role="button"
                    data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>;

        return controls;
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
        var classes = classNames(
            "Carousel", "carousel", "slide",
            {
                "hide": (this.state.topStories.length == 0),
            }
        );

        var carousel =
            <div id={this.props.id} className={classes} data-ride="carousel">
                <CarouselIndicator
                    target={"#" + this.props.id}
                    length={this.state.topStories.length} />
                <CarouselInner {...this.props} />
                <CarouselControls {...this.props} />
            </div>;

        return carousel;
    }
});

module.exports = Carousel;