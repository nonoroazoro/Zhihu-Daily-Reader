import cs from "classnames";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import React, { PropTypes } from "react";

const ArticleBody = ({ contents }) =>
{
    let item = null;
    const questions = [];
    const length = contents.length;
    for (let i = 0; i < length; i++)
    {
        // innerRows 包含：标题、答案、外链。
        const innerRows = [];
        item = contents[i];

        // 1、标题。
        if (!isEmpty(item.title))
        {
            innerRows.push(
                <h3 className="question-title" key={`question-title-${i}`}>
                    {item.title}
                </h3>
            );
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
};

ArticleBody.propTypes = {
    contents: PropTypes.arrayOf(
        PropTypes.shape({
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    avatar: PropTypes.string,
                    bio: PropTypes.string,
                    name: PropTypes.string,
                    content: PropTypes.string
                })
            ),
            link: PropTypes.shape({
                href: PropTypes.string,
                text: PropTypes.string
            }),
            title: PropTypes.string
        })
    ).isRequired
};

export default ArticleBody;
