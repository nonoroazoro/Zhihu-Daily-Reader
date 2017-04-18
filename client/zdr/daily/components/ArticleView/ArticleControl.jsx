import React, { Component, PropTypes } from "react";

/**
 * 两侧控制器。
 */
export default class ArticleControl extends Component
{
    static propTypes = {
        onPrevClick: PropTypes.func,
        onNextClick: PropTypes.func
    };

    static defaultProps = {
        onPrevClick: () => { },
        onNextClick: () => { }
    };

    shouldComponentUpdate(p_nextProps, p_nextState)
    {
        return false;
    }

    render()
    {
        const { onPrevClick, onNextClick } = this.props;
        return (
            <div className="ArticleControl">
                <a
                    className="left carousel-control"
                    href="javascript:;"
                    onClick={onPrevClick}
                    role="button"
                >
                    <span className="glyphicon glyphicon-chevron-left" />
                    <span className="sr-only">上一篇</span>
                </a>
                <a
                    className="right carousel-control"
                    href="javascript:;"
                    onClick={onNextClick}
                    role="button"
                >
                    <span className="glyphicon glyphicon-chevron-right" />
                    <span className="sr-only">下一篇</span>
                </a>
            </div>
        );
    }
}
