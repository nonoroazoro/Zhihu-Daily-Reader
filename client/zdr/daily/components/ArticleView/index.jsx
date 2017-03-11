import React, { PropTypes } from "react";

import ArticleBody from "./ArticleBody";
import ArticleHeader from "./ArticleHeader";
import ArticleControl from "./ArticleControl";

import "./index.less";

const ArticleView = ({ id, story, onPrevClick, onNextClick }) =>
{
    let header = null;
    let body = null;
    if (story)
    {
        header = <ArticleHeader story={story} />;
        if (story.contents)
        {
            body = <ArticleBody contents={story.contents} />;
        }
    }

    return (
        <div id={id} className="ArticleView modal fade">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {header}
                    {body}
                </div>
                <ArticleControl onPrevClick={onPrevClick} onNextClick={onNextClick} />
            </div>
        </div>
    );
};

ArticleView.propTypes = {
    id: PropTypes.string,
    story: PropTypes.shape({
        backgrounds: PropTypes.arrayOf(
            PropTypes.shape({
                href: PropTypes.string,
                text: PropTypes.string,
                title: PropTypes.string
            })
        ),
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
        ),
        image: PropTypes.string,
        imageSource: PropTypes.string,
        shareURL: PropTypes.string,
        title: PropTypes.string
    }),
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func
};

ArticleView.defaultProps = {
    id: "ArticleView",
    story: null,
    onPrevClick: () => { },
    onNextClick: () => { }
};

export default ArticleView;
