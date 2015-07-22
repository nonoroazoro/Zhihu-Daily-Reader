require("./res/FlexView.less");

var React = require("react");

var FlexTile = React.createClass(
{
    getDefaultProps: function()
    {
        return {
            api: "/api/4/news/",
        };
    },

    getInitialState: function()
    {
        return {
            story: null
        };
    },

    componentDidMount: function()
    {
        $.get(this.props.api + this.props.data, function(data)
        {
            if(this.isMounted() && data)
            {
                this.setState(
                {
                    story : data
                });
            }
        }.bind(this)).fail(function()
        {
            console.log("error loading story");
        });
    },

    render: function ()
    {
        var item = null;
        var story = this.state.story;
        if(story)
        {
            var style = {
                backgroundImage: "url(" + story.image + ")"
            };

            // 如果没有 img 要作处理，否则不好看。
            item =
                <div className="flex-tile" data-target={story.id}>
                    <div className="flex-tile-content">
                        <div className="flex-tile-picture" style={style}/>
                        <div className="flex-tile-title">
                            <a
                                className="flex-tile-link"
                                href={story.share_url}
                                target="_blank">
                                {story.title}
                            </a>
                        </div>
                    </div>
                    <div className="flex-tile-stripe"/>
                    <div className="flex-tile-footer">
                        <div className="flex-tile-footer-right-buttons">
                            <a href={story.share_url} target="_blank">
                                <span className="glyphicon glyphicon-new-window" title="在新标签页中打开"/>
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
    getDefaultProps: function()
    {
        return {
            api: "/api/4/news/before"
        };
    },

    getInitialState: function()
    {
        return {
            stories: []
        };
    },

    componentDidMount: function()
    {
        $.get(this.props.api, function(data)
        {
            if(this.isMounted() && data)
            {
                this.setState(
                {
                    stories : [data]
                });
            }
        }.bind(this)).fail(function()
        {
            console.log("error loading stories");
        });
    },

    render: function ()
    {
        var item = null;
        var items =[];
        _.each(this.state.stories, function(value)
        {
            _.each(value.stories, function(story)
            {
                items.push(<FlexTile data={story.id} />);
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