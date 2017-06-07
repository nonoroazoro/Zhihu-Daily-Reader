import map from "lodash/map";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import FlexTile from "./FlexTile";

import "./index.less";

export default class FlexView extends PureComponent
{
    static propTypes = {
        storyIDs: PropTypes.arrayOf(PropTypes.number),
        onTileClick: PropTypes.func
    };

    /**
     * storyIDs: 日报 ID 列表。
     * onTileClick: 点击事件。
     */
    static defaultProps = {
        storyIDs: [],
        onTileClick: noop
    };

    render()
    {
        const { storyIDs, onTileClick } = this.props;
        const items = map(storyIDs, (id) =>
        {
            return <FlexTile key={id} storyID={id} onClick={onTileClick} />;
        });

        return (
            <div className="FlexView">
                <div className="flex-content">
                    {items}
                </div>
            </div>
        );
    }
}

function noop() { }
