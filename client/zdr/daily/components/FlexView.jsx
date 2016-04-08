﻿import "./res/FlexView.less";

import _               from "lodash";
import React           from "react";
import classNames      from "classnames";
import PureRenderMixin from "react-addons-pure-render-mixin";

import Preloader       from "./Preloader";
import DailyManager    from "../controllers/DailyManager";

class FlexTile extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static defaultProps =
    {
        id: null,
        onClick: null
    };

    state = { story: null };

    _request = null;

    componentDidMount()
    {
        if (this.props.id)
        {
            this._request = DailyManager.getStory(
                this.props.id,
                (err, res) =>
                {
                    if (!err && res)
                    {
                        this.setState(
                        {
                            story: res
                        });
                    }
                }
            );
        }
    }

    componentWillUnmount()
    {
        if (this._request)
        {
            this._request.abort();
            this._request = null;
        }
    }

    handleClick(e)
    {
        if (_.isFunction(this.props.onClick))
        {
            this.props.onClick({
                story: this.state.story
            });
        }
    }

    render()
    {
        var item = null;
        var story = this.state.story;
        if (story)
        {
            // 如果没有 img 要处理，否则不好看。
            item =
                <div id={"story"+story.id} className="flex-tile">
                    <div className="flex-tile-content">
                        <div className="flex-tile-picture" style={{backgroundImage: "url(" + story.image + ")"}} onClick={this.handleClick.bind(this)} />
                        <div className="flex-tile-title">
                            <a className="flex-tile-link" href="javascript:;" onClick={this.handleClick.bind(this)}>
                                {story.title}
                            </a>
                        </div>
                    </div>
                    <div className="flex-tile-stripe" />
                    <div className="flex-tile-footer">
                        <div className="flex-tile-footer-right-buttons">
                            <a href={story.shareURL} target="_blank">
                                <span className="glyphicon glyphicon-new-window" title="在新标签页中打开原文" />
                            </a>
                        </div>
                    </div>
                </div>;
        }
        return item;
    }
}

export default class FlexView extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static defaultProps =
    {
        indexes: [],
        loading: false,
        onTileClick: null
    };

    render()
    {
        const items = _.map(this.props.indexes, (value) =>
        {
            return (<FlexTile id={value} onClick={this.props.onTileClick} key={"tile" + value} />);
        });

        const preloaderClasses = classNames(
            "flex-preloader",
            {
                "loading": this.props.loading,
            }
        );

        return (
            <div className="FlexView">
                <div className="flex-content">
                    {items}
                </div>
                <Preloader className={preloaderClasses} />
            </div>
        );
    }
}
