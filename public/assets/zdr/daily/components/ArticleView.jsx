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

            rows.push(
                <div className="article-backgrounds" key="article-backgrounds">
                    {backgroundRows}
                    <span className="article-backgrounds-arrow glyphicon glyphicon-chevron-right" />
                </div>
            );
        }

        return (
            <div className="ArticleHeader modal-header">
                {rows}
            </div>
        );
    }
});

var ArticleBody = React.createClass(
{
    render : function()
    {
        var questions = [];
        var item = null;
        var length = this.props.contents.length;
        for (var i = 0; i < length; i++)
        {
            // innerRows 包含：标题、答案、外链。
            var innerRows = [];
            item = this.props.contents[i];

            // 1、标题。
            if(!_.isEmpty(item.title))
            {
                innerRows.push(<h3 className="question-title">{item.title}</h3>);
            }

            // 2、答案。
            var answers = _.map(item.answers, function(value, i)
            {
                return (
                    <div className="question-answer">
                        <div className="question-answer-meta">
                            <img className="avatar" src={value.avatar} />
                            <span className="author">{value.name}</span>
                            <span className="bio">{value.bio}</span>
                        </div>
                        <div className="question-answer-content" dangerouslySetInnerHTML={{__html: value.content}} />
                    </div>
                );
            });
            Array.prototype.push.apply(innerRows, answers);

            // 3、外链。
            innerRows.push(
                <div className="view-more">
                    <a href={item.link.href} target="_blank">{item.link.text}</a>
                </div>
            );

            questions.push(
                <div className="question">
                    {innerRows}
                </div>
            );

            if (i < length -1)
            {
                questions.push(<hr className="question-separator"/>);
            }
        }

        return (
            <div className="ArticleBody modal-body">
                {questions}
            </div>
        );
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
                <ArticleBody key="body" contents={this.props.story.contents} />,
                <ArticleFooter key="footer" story={this.props.story} />
            ];
        }

        return (
            <div id={this.props.id} className="ArticleView modal fade in">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ArticleView;