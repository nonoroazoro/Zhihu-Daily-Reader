/**
 * Import all of the vendors here.
 */

import "bootstrap/less/bootstrap.less";

import "jquery";
import "bootstrap";

// Import sub-modules to reduce bundle size.
import "lodash/map";
import "lodash/isDate";
import "lodash/isEmpty";
import "lodash/isFunction";
import "lodash/isString";
import "lodash/trim";

import "moment";
import "mousetrap";
import "react";
import "react-dom";
import "classnames";
import "immutability-helper";

// Debug: Performance Tool.
if (process.env.NODE_ENV !== "production")
{
    window.Perf = require("react-addons-perf");
}
