require("./res/ArticleView.less");

var $ = require("jquery");
var _ = require("lodash");
var classNames = require("classnames");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;

var ArticleHeader = React.createClass(
{
    mixins: [PureRenderMixin],

    render : function()
    {
        var hasBackgrounds = this.props.story.backgrounds.length > 0;
        var classesHeaderPicture = classNames(
            "article-header-picture",
            {
                "radius-all": !hasBackgrounds,
                "radius-top": hasBackgrounds,
            }
        );

        var classesHeaderCaption = classNames(
            "article-header-caption",
            {
                "radius-bottom": !hasBackgrounds,
            }
        );
        
        // 没有图片版权信息时隐藏。
        var classesImageSource = classNames(
            {
                "hide": !this.props.story.imageSource,
            }
        );

        var rows = [];
        var titileRow =
            <div className="article-header-title" key="article-header">
                <div className={classesHeaderPicture} style={{backgroundImage: "url(" + this.props.story.image + ")"}}>
                    <div className={classesHeaderCaption}>
                        <a href={this.props.story.shareURL} target="_blank">
                            <h3>{this.props.story.title}</h3>
                        </a>
                        <a classNames={classesImageSource} href={"https://www.google.com/search?q=" + this.props.story.imageSource}
                           target="_blank">
                            <span className="glyphicon glyphicon-copyright-mark" />
                            {this.props.story.imageSource}
                        </a>
                    </div>
                </div>
            </div>;
        rows.push(titileRow);
    
        if(hasBackgrounds)
        {
            var backgroundRows = _.map(this.props.story.backgrounds, function(value, i)
            {
                return (
                    <a className="article-backgrounds-content"
                        href={value.href}
                        target="_blank"
                        key={"background" + i}>
                        <h4>{value.title + "：" + value.text}</h4>
                    </a>
                );
            });

            var backgroundsRow =
                         <div className="article-backgrounds" key="article-backgrounds">
                             {backgroundRows}
                             <span className="article-backgrounds-arrow glyphicon glyphicon-chevron-right" />
                         </div>;
            rows.push(backgroundsRow);
        }

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
                <ArticleBody key="body" story={this.props.story.contents} />,
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