import "./res/ArticleView.less";

import _          from "lodash";
import React      from "react";
import classNames from "classnames";

class ArticleHeader extends React.Component
{
    render()
    {
        const hasBackgrounds = this.props.story.backgrounds.length > 0;
        const classesHeaderPicture = classNames(
            "article-header-picture",
            {
                "radius-all": !hasBackgrounds,
                "radius-top": hasBackgrounds,
            }
        );

        const classesHeaderCaption = classNames(
            "article-header-caption",
            {
                "radius-bottom": !hasBackgrounds,
            }
        );
        
        // 没有图片版权信息时隐藏。
        const classesImageSource = classNames(
            {
                "hide": !this.props.story.imageSource,
            }
        );

        const rows = [];
        const titleRow =
            <div className="article-header-title" key="article-header">
                <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
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
        rows.push(titleRow);
    
        if (hasBackgrounds)
        {
            const backgroundRows = _.map(this.props.story.backgrounds, (value, index) =>
            {
                return (
                    <a className="article-backgrounds-content"
                        href={value.href}
                        target="_blank"
                        key={"background" + index}>
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
}

class ArticleBody extends React.Component
{
    render()
    {
        let item = null;
        const questions = [];
        const length = this.props.contents.length;
        for (let i = 0; i < length; i++)
        {
            // innerRows 包含：标题、答案、外链。
            const innerRows = [];
            item = this.props.contents[i];

            // 1、标题。
            if (!_.isEmpty(item.title))
            {
                innerRows.push(<h3 className="question-title" key={"question-title"+i}>{item.title}</h3>);
            }

            // 2、答案。
            const answers = _.map(item.answers, (value, index) =>
            {
                // 没有作者图片时隐藏。
                const classesAvatar = classNames(
                    "avatar",
                    {
                        "hide": _.isEmpty(value.avatar),
                    }
                );

                return (
                    <div className="question-answer" key={"question-answer-" + i + "-" + index}>
                        <div className="question-answer-meta">
                            <img className={classesAvatar} src={value.avatar} />
                            <span className="author">{value.name}</span>
                            <span className="bio">{value.bio}</span>
                        </div>
                        <div className="question-answer-content" dangerouslySetInnerHTML={{__html: value.content}} />
                    </div>
                );
            });
            innerRows.push(...answers);

            // 3、外链。
            if (item.link)
            {
                innerRows.push(
                    <div className="view-more" key={"view-more"+i}>
                        <a href={item.link.href} target="_blank"><b>{item.link.text}</b></a>
                    </div>
                );
            }

            questions.push(
                <div className="question" key={"question"+i}>
                    {innerRows}
                </div>
            );

            // 分隔符。
            if (i < length -1)
            {
                questions.push(<hr className="question-separator" key={"question-separator"+i} />);
            }
        }

        return (
            <div className="ArticleBody modal-body">
                {questions}
            </div>
        );
    }
}

export default class ArticleView extends React.Component
{
    static defaultProps =
    {
        id: "ArticleView",
        story: null
    };

    render()
    {
        let header = null;
        let body = null;
        if (this.props.story)
        {
            header = <ArticleHeader story={this.props.story} />;
            body = <ArticleBody contents={this.props.story.contents} />;
        }

        return (
            <div id={this.props.id} className="ArticleView modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {header}
                        {body}
                    </div>
                </div>
            </div>
        );
    }
}
