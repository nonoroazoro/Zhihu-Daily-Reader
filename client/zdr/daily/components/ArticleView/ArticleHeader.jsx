import cs from "classnames";
import map from "lodash/map";
import PropTypes from "prop-types";
import React from "react";

const ArticleHeader = ({ story }) =>
{
    const rows = [];

    const hasBackgrounds = story.backgrounds && story.length > 0;
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
    const classesImageSource = cs({
        "hide": !story.imageSource
    });

    const titleRow = (
        <div className="article-header-title" key="article-header">
            <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
            </button>
            <div className={classesHeaderPicture} style={{ backgroundImage: `url(${story.image})` }}>
                <div className={classesHeaderCaption}>
                    <a href={story.shareURL} target="_blank" rel="noopener noreferrer">
                        <h3>{story.title}</h3>
                    </a>
                    <a
                        className={classesImageSource}
                        href={`https://www.google.com/search?q=${story.imageSource}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="glyphicon glyphicon-copyright-mark" />
                        {story.imageSource}
                    </a>
                </div>
            </div>
        </div>
    );
    rows.push(titleRow);

    if (hasBackgrounds)
    {
        const backgroundRows = map(story.backgrounds, (value, index) =>
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

    return (
        <div className="ArticleHeader modal-header">
            {rows}
        </div>
    );
};

ArticleHeader.propTypes = {
    story: PropTypes.shape({
        backgrounds: PropTypes.arrayOf(
            PropTypes.shape({
                href: PropTypes.string,
                text: PropTypes.string,
                title: PropTypes.string
            })
        ),
        image: PropTypes.string,
        imageSource: PropTypes.string,
        shareURL: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

export default ArticleHeader;
