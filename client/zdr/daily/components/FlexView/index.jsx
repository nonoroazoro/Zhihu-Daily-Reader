import "./res/index.less";

import cs from "classnames";
import map from "lodash/map";
import React, { PropTypes } from "react";

import FlexTile from "./FlexTile";
import Preloader from "../Preloader";

const FlexView = ({ storyIDs, loading, onTileClick }) =>
{
    const classes = cs("flex-preloader", { "loading": loading });
    const items = map(storyIDs, (value) =>
    {
        return <FlexTile key={value} storyID={value} onClick={onTileClick} />;
    });

    return (
        <div className="FlexView">
            <div className="flex-content">
                {items}
            </div>
            <Preloader className={classes} />
        </div>
    );
};

FlexView.propTypes = {
    storyIDs: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    onTileClick: PropTypes.func
};

FlexView.defaultProps = {
    // 日报 ID 列表。
    storyIDs: [],

    // 加载状态。
    loading: false,

    // 点击事件。
    onTileClick: () => { }
};

export default FlexView;
