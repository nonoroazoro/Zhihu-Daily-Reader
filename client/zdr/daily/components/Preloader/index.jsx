import classNames from "classnames";
import React, { PropTypes } from "react";

import "./res/index.less";

const Preloader = ({ className }) =>
{
    return (
        <div className={classNames("Preloader", className)}>
            <span className="wave1" />
            <span className="wave2" />
            <span className="wave3" />
            <span className="wave4" />
            <span className="wave5" />
        </div>
    );
};

Preloader.propTypes = {
    className: PropTypes.string
};

Preloader.defaultProps = {
    className: null
};

export default Preloader;
