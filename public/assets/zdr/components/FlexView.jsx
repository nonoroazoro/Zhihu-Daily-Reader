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
            // 如果没有 img 要作处理，否则不好看。
            item =
                <div className="flex-tile thumbnail" data-target={story.id}>
                    <a href={"http://daily.zhihu.com/story/" + story.id} target="_blank" data-target={story.id}>
                        <img src={story.image} alt={story.title} />
                    </a>
                    <div className="caption">
                        <p>{story.title}</p>
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