require("./res/FlexView.less");

var _ = require("lodash");
var React = require("react");
var DailyManager = require("../controllers/DailyManager");

var FlexTile = React.createClass(
{
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
            this.props.onClick(this.state.story);
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
    getInitialState: function ()
    {
        return {
            indexes: []
        };
    },

    componentDidMount: function ()
    {
        DailyManager.getStoryIndexes(function (data)
        {
            if (this.isMounted() && data)
            {
                this.setState(
                {
                    indexes: [data]
                });
            }
        }.bind(this));
    },

    render: function ()
    {
        var items = [];
        var that = this;
        _.each(that.state.indexes, function (value)
        {
            _.each(value.indexes, function (value)
            {
                items.push(<FlexTile onClick={that.props.onTileClick} id={value.id} />);
            });
        });

        return (
            <div className="FlexView">
                {items}
            </div>
        );
    }
});

module.exports = FlexView;