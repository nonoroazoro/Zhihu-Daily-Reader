import isFunction from "lodash/isFunction";
import React, { PropTypes, PureComponent } from "react";

import DailyManager from "../../controllers/DailyManager";

export default class FlexTile extends PureComponent
{
    static propTypes = {
        storyID: PropTypes.number,
        onClick: PropTypes.func
    };

    static defaultProps = {
        storyID: null,
        onClick: null
    };

    state = { story: null };

    async componentDidMount()
    {
        const story = await DailyManager.getStory(this.props.storyID);
        this.setState({ story });
    }

    shouldComponentUpdate(p_nextProps, p_nextState)
    {
        return p_nextProps.storyID !== this.props.storyID || p_nextState.story !== this.state.story;
    }

    handleClick = (e) =>
    {
        if (isFunction(this.props.onClick))
        {
            this.props.onClick({ story: this.state.story });
        }
    };

    render()
    {
        const { story } = this.state;
        if (story)
        {
            // 如果没有 img 要处理，否则不好看。
            return (
                <div id={`story${story.id}`} className="flex-tile">
                    <div className="flex-tile-content">
                        <div
                            className="flex-tile-picture"
                            style={{ backgroundImage: `url(${story.image})` }}
                            onClick={this.handleClick}
                        />
                        <div className="flex-tile-title">
                            <a
                                className="flex-tile-link"
                                href="javascript:;"
                                onClick={this.handleClick}
                            >
                                {story.title}
                            </a>
                        </div>
                    </div>
                    <div className="flex-tile-stripe" />
                    <div className="flex-tile-footer">
                        <div className="flex-tile-footer-right-buttons">
                            <a href={story.shareURL} target="_blank" rel="noopener noreferrer">
                                <span
                                    className="glyphicon glyphicon-new-window"
                                    title="在新标签页中打开原文"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
