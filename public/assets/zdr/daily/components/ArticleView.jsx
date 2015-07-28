require("./res/ArticleView.less");

var $ = require("jquery");
var _ = require("lodash");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;

var ArticleHeader = React.createClass(
{
    render : function()
    {
        var rows = [];
        var titileRow =
            <div className="article-header-content">
                <div className="article-header-picture" style={{backgroundImage: "url(" + this.props.story.image + ")"}}>
                    <div className="article-header-caption">
                        <h3>{this.props.story.title}</h3>
                        <a href={"https://www.google.com/search?q=" + this.props.story.imageSource}
                           target="_blank">
                            <span className="glyphicon glyphicon-copyright-mark" />
                            {this.props.story.imageSource}
                        </a>
                    </div>
                </div>
            </div>;


        rows.push(titileRow);

        var header = 
            <div className="ArticleHeader modal-header">
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
            <div className="ArticleBody modal-body">
            </div>;
        
        return body;
    }
});

var ArticleFooter = React.createClass(
{
    render : function()
    {
        var footer = 
            <div className="ArticleFooter modal-footer">
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
        var rows = [];
        if(this.props.story)
        {
            rows = [
                <ArticleHeader key="header" story={this.props.story} />,
                <ArticleBody key="body" story={this.props.story} />,
                <ArticleFooter key="footer" story={this.props.story} />
            ];
        }

        var articleView =
            <div id={this.props.id} className="ArticleView modal fade in">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {rows}
                    </div>
                </div>
            </div>;
        return articleView;
    }
});

module.exports = ArticleView;