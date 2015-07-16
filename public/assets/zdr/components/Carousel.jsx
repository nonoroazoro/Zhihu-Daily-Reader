require("./res/Carousel.less");

var React = require("react");

var CarouselIndicator = React.createClass(
{
    render: function()
    {
        var target = "#" + this.props.id;
        var indicator =
            <ol className="carousel-indicators">
                <li data-target={target} data-slide-to="0" className="active"></li>
                <li data-target={target} data-slide-to="1"></li>
                <li data-target={target} data-slide-to="2"></li>
            </ol>;
        return indicator;
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

var Carousel = React.createClass(
{
    getDefaultProps: function  ()
    {
        return { id: "Carousel" };
    },

    render: function ()
    {
        var carousel =
            <div id={this.props.id} className="Carousel carousel slide">
                <CarouselIndicator {...this.props} />
                <CarouselInner {...this.props} />
                <CarouselControls {...this.props} />
            </div>;

        return carousel;
    }
});

module.exports = Carousel;