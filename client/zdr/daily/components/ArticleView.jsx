import "./res/ArticleView.less";

import map        from "lodash/map";
import isEmpty    from "lodash/isEmpty";
import React      from "react";
import cs         from "classnames";

class ArticleHeader extends React.Component
{
    static propTypes = {
        story: React.PropTypes.object
    };

    static defaultProps = {
        story: null
    };

    render()
    {
        const rows = [];
        if (this.props.story)
        {
            const hasBackgrounds = this.props.story.backgrounds.length > 0;
            const classesHeaderPicture = cs(
                "article-header-picture",
                {
                    "radius-all": !hasBackgrounds,
                    "radius-top": hasBackgrounds
                }
            );

            const classesHeaderCaption = cs(
                "article-header-caption",
                {
                    "radius-bottom": !hasBackgrounds
                }
            );

            // 没有图片版权信息时隐藏。
            const classesImageSource = cs(
                {
                    "hide": !this.props.story.imageSource
                }
            );

            const titleRow = (
                <div className="article-header-title" key="article-header">
                    <button type="button" className="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                    <div className={classesHeaderPicture} style={{ backgroundImage: `url(${this.props.story.image})` }}>
                        <div className={classesHeaderCaption}>
                            <a href={this.props.story.shareURL} target="_blank" rel="noopener noreferrer">
                                <h3>{this.props.story.title}</h3>
                            </a>
                            <a
                                className={classesImageSource}
                                href={`https://www.google.com/search?q=${this.props.story.imageSource}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="glyphicon glyphicon-copyright-mark" />
                                    {this.props.story.imageSource}
                            </a>
                        </div>
                    </div>
                </div>
            );
            rows.push(titleRow);

            if (hasBackgrounds)
                                    {
                const backgroundRows = map(this.props.story.backgrounds, (value, index) =>
                                    {
                    return (
                        <a
                            className="article-backgrounds-content"
                            href={value.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={`background-${index}`}
                        >
                            <h4>{`${value.title}：${value.text}`}</h4>
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
    static propTypes = {
        contents: React.PropTypes.array
    };

    static defaultProps = {
        contents: []
    };

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
            if (!isEmpty(item.title))
            {
                innerRows.push(<h3 className="question-title" key={`question-title-${i}`}>{item.title}</h3>);
            }

            // 2、答案。
            const answers = map(item.answers, (value, index) =>
            {
                // 没有作者图片时隐藏。
                const classesAvatar = cs(
                    "avatar",
                    {
                        "hide": isEmpty(value.avatar)
                    }
                );

                return (
                    <div className="question-answer" key={`question-answer-${i}-${index}`}>
                        <div className="question-answer-meta">
                            <img className={classesAvatar} src={value.avatar} />
                            <span className="author">{value.name}</span>
                            <span className="bio">{value.bio}</span>
                        </div>
                        <div className="question-answer-content" dangerouslySetInnerHTML={{ __html: value.content }} />
                    </div>
                );
            });
            innerRows.push(...answers);

            // 3、外链。
            if (item.link)
            {
                innerRows.push(
                    <div className="view-more" key={`view-more-${i}`}>
                        <a href={item.link.href} target="_blank" rel="noopener noreferrer"><b>{item.link.text}</b></a>
                    </div>
                );
            }

            questions.push(
                <div className="question" key={`question-${i}`}>
                    {innerRows}
                </div>
            );

            // 分隔符。
            if (i < length - 1)
            {
                questions.push(<hr className="question-separator" key={`question-separator-${i}`} />);
            }
        }

        return (
            <div className="ArticleBody modal-body">
                {questions}
            </div>
        );
    }
}

/**
 * 两侧控制器。
 */
class ArticleControl extends React.Component
{
    static propTypes = {
        onPrevClick: React.PropTypes.func,
        onNextClick: React.PropTypes.func
    };

    static defaultProps = {
        onPrevClick: null,
        onNextClick: null
    };

    render()
    {
        return (
            <div className="ArticleControl">
                <a
                    className="left carousel-control"
                    href="javascript:;"
                    onClick={this.props.onPrevClick}
                    role="button"
                >
                    <span className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">上一篇</span>
                </a>
                <a
                    className="right carousel-control"
                    href="javascript:;"
                    onClick={this.props.onNextClick}
                    role="button"
                >
                    <span className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">下一篇</span>
                </a>
            </div>
        );
    }
}

export default class ArticleView extends React.Component
{
    static propTypes = {
        id: React.PropTypes.string,
        story: React.PropTypes.object,
        onPrevClick: React.PropTypes.func,
        onNextClick: React.PropTypes.func
    };

    static defaultProps = {
        id: "ArticleView",
        story: null,
        onPrevClick: null,
        onNextClick: null
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
                    <ArticleControl
                        onPrevClick={this.props.onPrevClick}
                        onNextClick={this.props.onNextClick}
                    />
                </div>
            </div>
        );
    }
}
