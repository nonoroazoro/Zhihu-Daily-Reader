require("./res/ArticleView.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");

var ArticleHeader = React.createClass(
{
    render : function()
    {
        var header = 
            <div className="modal-header">
            </div>;
        
        return header;
    }
});

var ArticleBody = React.createClass(
{
    render : function()
    {
        var body = 
            <div className="modal-body">
            </div>;
        
        return body;
    }
});

var ArticleFooter = React.createClass(
{
    render : function()
    {
        var footer = 
            <div className="modal-footer">
            </div>;
        
        return footer;
    }
});

var ArticleView = React.createClass(
{
    getDefaultProps: function ()
    {
        return {
            id: "ArticleView"
        };
    },

    // 测试数据
    getInitialState: function ()
    {
        return {
            story: null
        };
    },

    // 测试数据
    componentDidMount: function ()
    {
        $.get("http://127.0.0.1:3000/api/4/news/3892357", function (data)
        {
            if (this.isMounted() && data)
            {
                this.setState(
                {
                    story: data
                });
            }
        }.bind(this)).fail(function ()
        {
            console.log("error loading top story");
        });
    },

    render: function ()
    {
        var articleView =
            <div id={this.props.id} className="ArticleView modal fade in">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <ArticleHeader data={this.state.story} />
                        <ArticleBody data={this.state.story} />
                        <ArticleFooter data={this.state.story} />
                    </div>
                </div>
            </div>;
            
        return articleView;
    }
});

module.exports = ArticleView;