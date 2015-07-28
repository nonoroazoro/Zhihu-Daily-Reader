require("./res/FlexView.less");

var _ = require("lodash");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;
var DailyManager = require("../controllers/DailyManager");

var FlexTile = React.createClass(
{
    mixins: [PureRenderMixin],

    getInitialState: function ()
    {
        return {
            story: null
        };
    },

    componentDidMount: function ()
    {
        if (this.props.id)
        {
            DailyManager.getStory(function (data)
            {
                if (this.isMounted() && data)
                {
                    this.setState(
                    {
                        story: data
                    });
                }
            }.bind(this), this.props.id);
        }
    },

    handleClick: function (e)
    {
        if (_.isFunction(this.props.onClick))
        {
            this.props.onClick({
                story: this.state.story
            });
        }
    },

    render: function ()
    {
        var item = null;
        var story = this.state.story;
        if (story)
        {
            // 如果没有 img 要作处理，否则不好看。
            item =
                <div className="flex-tile" data-target={story.id}>
                    <div className="flex-tile-content">
                        <div className="flex-tile-picture" style={{backgroundImage: "url(" + story.image + ")"}} onClick={this.handleClick} />
                        <div className="flex-tile-title">
                            <a className="flex-tile-link" href={story.shareURL} target="_blank" onClick={this.handleClick}>
                                {story.title}
                            </a>
                        </div>
                    </div>
                    <div className="flex-tile-stripe" />
                    <div className="flex-tile-footer">
                        <div className="flex-tile-footer-right-buttons">
                            <a href={story.shareURL} target="_blank">
                                <span className="glyphicon glyphicon-new-window" title="在新标签页中打开" />
                            </a>
                        </div>
                    </div>
                </div>;
        }
        return item;
    }
});

var FlexView = React.createClass(
{
    mixins: [PureRenderMixin],

    render: function ()
    {
        var that = this;
        var items = _.map(that.props.indexes, function (value)
        {
            return (<FlexTile onClick={that.props.onTileClick} key={"tile" + value} id={value} />);
        });

        return (
            <div className="FlexView">
                {items}
            </div>
        );
    }
});

module.exports = FlexView;