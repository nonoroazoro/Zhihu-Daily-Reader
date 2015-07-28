require("./res/ArticleView.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;

var ArticleHeader = React.createClass(
{
    render : function()
    {
        var rows = [];
        if (this.props.story)
        {
            var row =
                <div className="">

                </div>;
        }

        var header = 
            <div className="modal-header">
                {rows}
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
    mixins: [PureRenderMixin],

    getDefaultProps: function ()
    {
        return {
            id: "ArticleView"
        };
    },

    render: function ()
    {
        // 无内容时隐藏 ArticleView。
        var classes = classNames(
            "ArticleView", "modal", "fade", "in",
            {
                "hide": (!this.props.story),
            }
        );

        var articleView =
            <div id={this.props.id} className={classes}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <ArticleHeader data={this.props.story} />
                        <ArticleBody data={this.props.story} />
                        <ArticleFooter data={this.props.story} />
                    </div>
                </div>
            </div>;
        return articleView;
    }
});

module.exports = ArticleView;