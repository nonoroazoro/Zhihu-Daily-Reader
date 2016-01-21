/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/9272991fdbcf498a736b/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(18);
	
	var $ = __webpack_require__(3);
	var React = __webpack_require__(1);
	
	var Navbar = __webpack_require__(6);
	var DailyPage = __webpack_require__(7);
	// Other Pages...
	
	$(function () {
	    React.render(React.createElement(
	        "div",
	        { className: "MainContainer container-fluid" },
	        React.createElement(Navbar, null),
	        React.createElement(DailyPage, null)
	    ), document.body);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _ = __webpack_require__(2);
	var $ = __webpack_require__(3);
	
	var _stories = {};
	
	/**
	 * 获取目前已从服务端获取到的所有日报内容的缓存（以日报 id 进行检索，无序，请勿用 index 检索）。
	 */
	exports.getFetchedStories = function () {
	    return _stories;
	};
	
	/**
	 * 获取最新热门日报的 ID 列表。
	 * @param {Function(err, res)} [p_callback]
	 */
	exports.getTopStoryIDs = function (p_callback) {
	    $.get("/api/4/news/top", function (p_data) {
	        p_callback(null, p_data);
	    }).fail(function () {
	        p_callback("/api/4/news/top error");
	    });
	};
	
	/**
	 * 获取指定日期的日报的 ID 列表。
	 * @param String p_date 指定的日期。如果未指定，则返回最新日报的索引；如果小于 20130519，则返回 {}。
	 * @param {Function(err, res)} [p_callback]
	 */
	exports.getStoryIDs = function (p_date, p_callback) {
	    if (_.isFunction(p_date)) {
	        p_callback = p_date;
	        p_date = null;
	    }
	
	    if (_.isEmpty(_.trim(p_date))) {
	        $.get("/api/4/news/before", function (p_data) {
	            p_callback(null, p_data);
	        }).fail(function () {
	            p_callback("/api/4/news/before error");
	        });
	    } else {
	        $.get("/api/4/news/before/" + p_date, function (p_data) {
	            p_callback(null, p_data);
	        }).fail(function () {
	            p_callback("/api/4/news/before/" + p_date + " error");
	        });
	    }
	};
	
	/**
	 * 获取指定唯一标识的日报。
	 * @param String p_id 指定的唯一标识。
	 * @param {Function(err, res)} [p_callback]
	 */
	exports.getStory = function (p_id, p_callback) {
	    if (_.isFunction(p_callback)) {
	        if (_.isEmpty(_.trim(p_id))) {
	            if (_.isFunction(p_callback)) {
	                p_callback("p_id must not be null");
	            }
	        } else {
	            $.get("/api/4/news/" + p_id, function (p_data) {
	                _stories[p_id] = p_data;
	                p_callback(null, p_data);
	            }).fail(function () {
	                p_callback("/api/4/news/ error");
	            });
	        }
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(13);
	
	var React = __webpack_require__(1);
	
	/**
	 * 头部。
	 */
	var NavbarHeader = React.createClass({
	    displayName: "NavbarHeader",
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            target: ".navbar-collapse"
	        };
	    },
	
	    render: function render() {
	        var navbarHeader = React.createElement(
	            "div",
	            { className: "navbar-header" },
	            React.createElement(
	                "button",
	                { type: "button",
	                    className: "navbar-toggle collapsed",
	                    "data-toggle": "collapse",
	                    "data-target": this.props.target },
	                React.createElement(
	                    "span",
	                    { className: "sr-only" },
	                    "导航"
	                ),
	                React.createElement("span", { className: "icon-bar" }),
	                React.createElement("span", { className: "icon-bar" }),
	                React.createElement("span", { className: "icon-bar" })
	            ),
	            React.createElement(
	                "a",
	                { className: "navbar-brand", href: "/" },
	                React.createElement("img", { alt: "知乎日报", src: __webpack_require__(19) })
	            )
	        );
	        return navbarHeader;
	    }
	});
	
	/**
	 * 菜单。
	 */
	var NavbarContent = React.createClass({
	    displayName: "NavbarContent",
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            id: "NavbarContent"
	        };
	    },
	
	    render: function render() {
	        var navbarContent = React.createElement(
	            "div",
	            { id: this.props.id,
	                className: "navbar-collapse collapse" },
	            React.createElement(
	                "ul",
	                { className: "nav navbar-nav navbar-right" },
	                React.createElement(
	                    "li",
	                    { className: "active" },
	                    React.createElement(
	                        "a",
	                        { href: "#" },
	                        "日报"
	                    )
	                ),
	                React.createElement(
	                    "li",
	                    { className: "disabled" },
	                    React.createElement(
	                        "a",
	                        { href: "#" },
	                        "专栏"
	                    )
	                ),
	                React.createElement(
	                    "li",
	                    { className: "disabled" },
	                    React.createElement(
	                        "a",
	                        { href: "#" },
	                        "关于"
	                    )
	                )
	            )
	        );
	        return navbarContent;
	    }
	});
	
	/**
	 * 导航栏。
	 */
	var Navbar = React.createClass({
	    displayName: "Navbar",
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            id: "Navbar"
	        };
	    },
	
	    render: function render() {
	        var navbar = React.createElement(
	            "nav",
	            { id: this.props.id,
	                className: "Navbar navbar navbar-default navbar-fixed-top" },
	            React.createElement(
	                "div",
	                { className: "container" },
	                React.createElement(NavbarHeader, { target: "#NavbarContent" }),
	                React.createElement(NavbarContent, null)
	            )
	        );
	        return navbar;
	    }
	});
	
	module.exports = Navbar;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(17);
	
	var $ = __webpack_require__(3);
	var Mousetrap = __webpack_require__(20);
	var React = __webpack_require__(1);
	var ReactUpdate = React.addons.update;
	var PureRenderMixin = React.addons.PureRenderMixin;
	var DailyManager = __webpack_require__(4);
	var Utils = __webpack_require__(11);
	
	//var Carousel = require("./components/Carousel");
	var FlexView = __webpack_require__(9);
	var ArticleView = __webpack_require__(8);
	
	/**
	 * 知乎日报页面。
	 */
	var DailyPage = React.createClass({
	    displayName: "DailyPage",
	
	    _currentLoadedDate: null,
	    _currentIndex: -1,
	    _isLoading: false,
	    _isArticleViewVisible: false,
	
	    _$ArticleView: null,
	    _$ArticleViewContent: null,
	
	    mixins: [PureRenderMixin],
	
	    getInitialState: function getInitialState() {
	        return {
	            topStoryIndexes: [],
	            storyIndexes: [],
	            currentStory: null,
	            loading: false
	        };
	    },
	
	    componentDidMount: function componentDidMount() {
	        // 1、初始化。
	        this._$ArticleView = $("#ArticleView");
	        this._$ArticleViewContent = $("#ArticleView .modal-content");
	
	        // 2、加载热门日报（不好看。。。隐藏了吧-_-）。
	        //this._loadTopStories();
	
	        // 3、加载最新日报。
	        this._loadOtherStories();
	
	        // 4、事件处理。
	        this._addEventHandler();
	    },
	
	    componentWillUnmount: function componentWillUnmount() {
	        // 1、事件处理。
	        this._removeEventHandler();
	    },
	
	    /**
	    * 加载热门日报（Carousel）。
	    */
	    _loadTopStories: function _loadTopStories() {
	        DailyManager.getTopStoryIDs((function (err, res) {
	            if (this.isMounted() && !err && res) {
	                this.setState({
	                    topStoryIndexes: res.ids
	                });
	            }
	        }).bind(this));
	    },
	
	    /**
	    * 加载最新日报（默认仅加载今日、昨日的日报）（FlexView）。
	    */
	    _loadOtherStories: function _loadOtherStories() {
	        this.setState({
	            loading: true
	        }, function () {
	            DailyManager.getStoryIDs((function (err, res) {
	                if (this.isMounted() && !err && res) {
	                    this._currentLoadedDate = res.date;
	                    this._addStoryIndexes(res.ids);
	                    this._loadPrevStories();
	                }
	
	                this.setState({
	                    loading: false
	                });
	            }).bind(this));
	        });
	    },
	
	    /**
	    * 加载前一天的日报（相对当前已加载日报的日期）。
	    */
	    _loadPrevStories: function _loadPrevStories(p_callback) {
	        this.setState({
	            loading: true
	        }, function () {
	            DailyManager.getStoryIDs(Utils.prevZhihuDay(this._currentLoadedDate), (function (err, res) {
	                if (!err && res) {
	                    this._currentLoadedDate = res.date;
	                    this._addStoryIndexes(res.ids);
	                }
	
	                this.setState({
	                    loading: false
	                });
	
	                if (_.isFunction(p_callback)) {
	                    p_callback();
	                }
	            }).bind(this));
	        });
	    },
	
	    /**
	    * 订购事件。
	    */
	    _addEventHandler: function _addEventHandler() {
	        this._$ArticleView.on("hide.bs.modal", (function (e) {
	            this._resetArticleViewScroll();
	        }).bind(this));
	
	        this._$ArticleView.on("hidden.bs.modal", (function (e) {
	            this._isArticleViewVisible = false;
	        }).bind(this));
	
	        this._$ArticleView.on("shown.bs.modal", (function (e) {
	            this._isArticleViewVisible = true;
	            this._$ArticleViewContent.focus();
	        }).bind(this));
	
	        this._addKeyboardShortcuts();
	        $(document).on("scroll", this._scrollHandler);
	    },
	
	    /**
	    * 退购事件。
	    */
	    _removeEventHandler: function _removeEventHandler() {
	        this._$ArticleView.off("hide.bs.modal");
	        this._removeKeyboardShortcuts();
	        $(document).off("scroll");
	    },
	
	    /**
	    * 添加键盘快捷键。
	    */
	    _addKeyboardShortcuts: function _addKeyboardShortcuts() {
	        Mousetrap.bind("esc", this._closeArticleView);
	
	        Mousetrap.bind("j", this._keydownShowNextStory);
	        Mousetrap.bind("k", this._keydownShowPrevStory);
	
	        Mousetrap.bind(["o", "enter"], (function () {
	            if (!this._isArticleViewVisible) {
	                this._showArticle(DailyManager.getFetchedStories()[this.state.storyIndexes[this._currentIndex]]);
	            }
	        }).bind(this));
	
	        Mousetrap.bind("left", (function () {
	            this._isArticleViewVisible ? this._keydownShowPrevStory() : this._minusCurrentIndex();
	        }).bind(this));
	        Mousetrap.bind("right", (function () {
	            this._isArticleViewVisible ? this._keydownShowNextStory() : this._addCurrentIndex();
	        }).bind(this));
	
	        Mousetrap.bind("v", (function () {
	            if (this._isArticleViewVisible) {
	                $(".view-more a").map(function (i, o) {
	                    o.click();
	                });
	            }
	        }).bind(this));
	    },
	
	    /**
	    * 移除键盘快捷键。
	    */
	    _removeKeyboardShortcuts: function _removeKeyboardShortcuts() {
	        Mousetrap.reset();
	    },
	
	    /**
	    * ArticleView 显示下一个日报（如果当前未打开 ArticleView 则自动打开）。
	    */
	    _keydownShowNextStory: function _keydownShowNextStory() {
	        var index = this._currentIndex + 1;
	        if (index < this.state.storyIndexes.length) {
	            if (!this._isLoading) {
	                var story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
	                if (this._isArticleViewVisible) {
	                    this._loadArticle(story, function () {
	                        this._addCurrentIndex();
	                        this._resetArticleViewScroll();
	                    });
	                } else {
	                    this._showArticle(story);
	                }
	            }
	        } else {
	            // 自动加载前一天日报。
	            if (!this._isLoading) {
	                this._isLoading = true;
	                this._loadPrevStories((function () {
	                    this._isLoading = false;
	                }).bind(this));
	            }
	        }
	    },
	
	    /**
	    * ArticleView 显示上一个日报（如果当前未打开 ArticleView 则自动打开）。
	    */
	    _keydownShowPrevStory: function _keydownShowPrevStory() {
	        var index = this._currentIndex - 1;
	        if (index >= 0) {
	            var story = DailyManager.getFetchedStories()[this.state.storyIndexes[index]];
	            if (this._isArticleViewVisible) {
	                this._loadArticle(story, function () {
	                    this._minusCurrentIndex();
	                    this._resetArticleViewScroll();
	                });
	            } else {
	                this._showArticle(story);
	            }
	        }
	    },
	
	    /**
	    * 监控垂直滚动条位置，动态加载内容。
	    */
	    _scrollHandler: function _scrollHandler(e) {
	        // 185 是 Flex-Tile 的一半高度。
	        if (!this._isLoading && $(document).scrollTop() >= $(document).height() - $(window).height() - 185) {
	            this._isLoading = true;
	            this._loadPrevStories((function () {
	                this._isLoading = false;
	            }).bind(this));
	        }
	    },
	
	    /**
	    * 重设 ArticleView 的垂直滚动条位置。
	    */
	    _resetArticleViewScroll: function _resetArticleViewScroll() {
	        this._$ArticleViewContent.scrollTop(0);
	    },
	
	    /**
	    * 增量加载指定的日报。
	    */
	    _addStoryIndexes: function _addStoryIndexes(p_indexes) {
	        this.setState({
	            storyIndexes: ReactUpdate(this.state.storyIndexes, {
	                $push: p_indexes
	            })
	        });
	    },
	
	    _carouselClickHandler: function _carouselClickHandler(e) {
	        this._showArticle(DailyManager.getFetchedStories()[e.id]);
	    },
	
	    _tileClickHandler: function _tileClickHandler(e) {
	        this._showArticle(e.story);
	    },
	
	    /**
	    * 打开 ArticleView 并加载指定的日报。
	    */
	    _showArticle: function _showArticle(p_story) {
	        this._loadArticle(p_story, function () {
	            this._setCurrentIndex(this._getStoryIndexById(p_story.id));
	            this._openArticleView();
	        });
	    },
	
	    /**
	    * 向 ArticleView 中加载指定的日报（仅改变内容，不改变显示状态，允许在回调中进行控制）。
	    */
	    _loadArticle: function _loadArticle(p_story, p_callback) {
	        if (p_story) {
	            this.setState({
	                currentStory: p_story
	            }, p_callback);
	        }
	    },
	
	    /**
	    * 获取指定唯一标识的日报的索引。
	    */
	    _getStoryIndexById: function _getStoryIndexById(p_id) {
	        return _.indexOf(this.state.storyIndexes, p_id);
	    },
	
	    /**
	    * 打开 ArticleView。
	    */
	    _openArticleView: function _openArticleView() {
	        if (!this._isArticleViewVisible) {
	            this._$ArticleView.modal();
	        }
	    },
	
	    /**
	    * 关闭 ArticleView。
	    */
	    _closeArticleView: function _closeArticleView() {
	        if (this._isArticleViewVisible) {
	            this._$ArticleView.modal("hide");
	        }
	    },
	
	    /**
	    * 当前日报索引增加1。
	    */
	    _addCurrentIndex: function _addCurrentIndex() {
	        if (this._currentIndex + 1 < this.state.storyIndexes.length) {
	            this._setCurrentIndex(this._currentIndex + 1);
	        }
	    },
	
	    /**
	    * 当前日报索引减少1。
	    */
	    _minusCurrentIndex: function _minusCurrentIndex() {
	        if (this._currentIndex > 0) {
	            this._setCurrentIndex(this._currentIndex - 1);
	        }
	    },
	
	    /**
	    * 设置日报索引。
	    */
	    _setCurrentIndex: function _setCurrentIndex(p_index) {
	        var e = { oldIndex: this._currentIndex, newIndex: p_index };
	        this._currentIndex = p_index;
	        this._currentIndexChangedHandler(e);
	    },
	
	    _currentIndexChangedHandler: function _currentIndexChangedHandler(e) {
	        this._updateCurrentTile(e.oldIndex, e.newIndex);
	    },
	
	    /**
	    * 更新当前 FlexTile 样式。
	    */
	    _updateCurrentTile: function _updateCurrentTile(p_oldIndex, p_newIndex) {
	        if (p_oldIndex >= 0) {
	            $("#story" + this.state.storyIndexes[p_oldIndex]).removeClass("current");
	        }
	
	        var $newTile = $("#story" + this.state.storyIndexes[p_newIndex]);
	        $newTile.addClass("current");
	
	        // 判断是否需要移动滚动条的位置，以使内容可见。
	        // 71 是 body 的 padding-top 与 FlexTile 的 margin-top 之和（即 51 + 20）。
	        var newTop = $newTile.offset().top - 71;
	        var moveDown = newTop + $newTile.outerHeight(true) - $(document).scrollTop() > $(window).height();
	        var moveUp = newTop < $(document).scrollTop();
	        if (moveDown || moveUp) {
	            // 此处用 animate 的话，存在问题，按住按键不放会出问题。
	            $(document).scrollTop(newTop);
	        }
	    },
	
	    render: function render() {
	        // 幻灯片（不好看。。。隐藏了吧-_-）。
	        //<div className="CarouselContainer container-fluid">
	        //    <Carousel onClick={this._carouselClickHandler} indexes={this.state.topStoryIndexes} />
	        //</div>
	
	        var page = React.createElement(
	            "div",
	            { className: "DailyPage container-fluid" },
	            React.createElement(FlexView, { onTileClick: this._tileClickHandler, indexes: this.state.storyIndexes, loading: this.state.loading }),
	            React.createElement(ArticleView, { story: this.state.currentStory })
	        );
	        return page;
	    }
	});
	
	module.exports = DailyPage;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(14);
	
	var _ = __webpack_require__(2);
	var classNames = __webpack_require__(5);
	var React = __webpack_require__(1);
	var PureRenderMixin = React.addons.PureRenderMixin;
	
	var ArticleHeader = React.createClass({
	    displayName: "ArticleHeader",
	
	    render: function render() {
	        var hasBackgrounds = this.props.story.backgrounds.length > 0;
	        var classesHeaderPicture = classNames("article-header-picture", {
	            "radius-all": !hasBackgrounds,
	            "radius-top": hasBackgrounds
	        });
	
	        var classesHeaderCaption = classNames("article-header-caption", {
	            "radius-bottom": !hasBackgrounds
	        });
	
	        // 没有图片版权信息时隐藏。
	        var classesImageSource = classNames({
	            "hide": !this.props.story.imageSource
	        });
	
	        var rows = [];
	        var titleRow = React.createElement(
	            "div",
	            { className: "article-header-title", key: "article-header" },
	            React.createElement(
	                "button",
	                { type: "button", className: "close", "data-dismiss": "modal" },
	                React.createElement(
	                    "span",
	                    null,
	                    "×"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: classesHeaderPicture, style: { backgroundImage: "url(" + this.props.story.image + ")" } },
	                React.createElement(
	                    "div",
	                    { className: classesHeaderCaption },
	                    React.createElement(
	                        "a",
	                        { href: this.props.story.shareURL, target: "_blank" },
	                        React.createElement(
	                            "h3",
	                            null,
	                            this.props.story.title
	                        )
	                    ),
	                    React.createElement(
	                        "a",
	                        { classNames: classesImageSource, href: "https://www.google.com/search?q=" + this.props.story.imageSource,
	                            target: "_blank" },
	                        React.createElement("span", { className: "glyphicon glyphicon-copyright-mark" }),
	                        this.props.story.imageSource
	                    )
	                )
	            )
	        );
	        rows.push(titleRow);
	
	        if (hasBackgrounds) {
	            var backgroundRows = _.map(this.props.story.backgrounds, function (value, i) {
	                return React.createElement(
	                    "a",
	                    { className: "article-backgrounds-content",
	                        href: value.href,
	                        target: "_blank",
	                        key: "background" + i },
	                    React.createElement(
	                        "h4",
	                        null,
	                        value.title + "：" + value.text
	                    )
	                );
	            });
	
	            rows.push(React.createElement(
	                "div",
	                { className: "article-backgrounds", key: "article-backgrounds" },
	                backgroundRows,
	                React.createElement("span", { className: "article-backgrounds-arrow glyphicon glyphicon-chevron-right" })
	            ));
	        }
	
	        return React.createElement(
	            "div",
	            { className: "ArticleHeader modal-header" },
	            rows
	        );
	    }
	});
	
	var ArticleBody = React.createClass({
	    displayName: "ArticleBody",
	
	    render: function render() {
	        var questions = [];
	        var item = null;
	        var length = this.props.contents.length;
	        for (var i = 0; i < length; i++) {
	            // innerRows 包含：标题、答案、外链。
	            var innerRows = [];
	            item = this.props.contents[i];
	
	            // 1、标题。
	            if (!_.isEmpty(item.title)) {
	                innerRows.push(React.createElement(
	                    "h3",
	                    { className: "question-title", key: "question-title" + i },
	                    item.title
	                ));
	            }
	
	            // 2、答案。
	            var answers = _.map(item.answers, function (value, j) {
	                // 没有作者图片时隐藏。
	                var classesAvatar = classNames("avatar", {
	                    "hide": _.isEmpty(value.avatar)
	                });
	
	                return React.createElement(
	                    "div",
	                    { className: "question-answer", key: "question-answer-" + i + "-" + j },
	                    React.createElement(
	                        "div",
	                        { className: "question-answer-meta" },
	                        React.createElement("img", { className: classesAvatar, src: value.avatar }),
	                        React.createElement(
	                            "span",
	                            { className: "author" },
	                            value.name
	                        ),
	                        React.createElement(
	                            "span",
	                            { className: "bio" },
	                            value.bio
	                        )
	                    ),
	                    React.createElement("div", { className: "question-answer-content", dangerouslySetInnerHTML: { __html: value.content } })
	                );
	            });
	            Array.prototype.push.apply(innerRows, answers);
	
	            // 3、外链。
	            if (item.link) {
	                innerRows.push(React.createElement(
	                    "div",
	                    { className: "view-more", key: "view-more" + i },
	                    React.createElement(
	                        "a",
	                        { href: item.link.href, target: "_blank" },
	                        React.createElement(
	                            "b",
	                            null,
	                            item.link.text
	                        )
	                    )
	                ));
	            }
	
	            questions.push(React.createElement(
	                "div",
	                { className: "question", key: "question" + i },
	                innerRows
	            ));
	
	            // 分隔符。
	            if (i < length - 1) {
	                questions.push(React.createElement("hr", { className: "question-separator", key: "question-separator" + i }));
	            }
	        }
	
	        return React.createElement(
	            "div",
	            { className: "ArticleBody modal-body" },
	            questions
	        );
	    }
	});
	
	var ArticleView = React.createClass({
	    displayName: "ArticleView",
	
	    mixins: [PureRenderMixin],
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            id: "ArticleView"
	        };
	    },
	
	    render: function render() {
	        var rows = [];
	        if (this.props.story) {
	            rows = [React.createElement(ArticleHeader, { key: "header", story: this.props.story }), React.createElement(ArticleBody, { key: "body", contents: this.props.story.contents })];
	        }
	
	        return React.createElement(
	            "div",
	            { id: this.props.id, className: "ArticleView modal fade" },
	            React.createElement(
	                "div",
	                { className: "modal-dialog modal-lg" },
	                React.createElement(
	                    "div",
	                    { className: "modal-content" },
	                    rows
	                )
	            )
	        );
	    }
	});
	
	module.exports = ArticleView;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(15);
	
	var _ = __webpack_require__(2);
	var classNames = __webpack_require__(5);
	var React = __webpack_require__(1);
	var PureRenderMixin = React.addons.PureRenderMixin;
	var DailyManager = __webpack_require__(4);
	var Preloader = __webpack_require__(10);
	
	var FlexTile = React.createClass({
	    displayName: "FlexTile",
	
	    mixins: [PureRenderMixin],
	
	    getInitialState: function getInitialState() {
	        return {
	            story: null
	        };
	    },
	
	    componentDidMount: function componentDidMount() {
	        if (this.props.id) {
	            DailyManager.getStory(this.props.id, (function (err, res) {
	                if (this.isMounted() && !err && res) {
	                    this.setState({
	                        story: res
	                    });
	                }
	            }).bind(this));
	        }
	    },
	
	    handleClick: function handleClick(e) {
	        if (_.isFunction(this.props.onClick)) {
	            this.props.onClick({
	                story: this.state.story
	            });
	        }
	    },
	
	    render: function render() {
	        var item = null;
	        var story = this.state.story;
	        if (story) {
	            // 如果没有 img 要作处理，否则不好看。
	            item = React.createElement(
	                "div",
	                { id: "story" + story.id, className: "flex-tile" },
	                React.createElement(
	                    "div",
	                    { className: "flex-tile-content" },
	                    React.createElement("div", { className: "flex-tile-picture", style: { backgroundImage: "url(" + story.image + ")" }, onClick: this.handleClick }),
	                    React.createElement(
	                        "div",
	                        { className: "flex-tile-title" },
	                        React.createElement(
	                            "a",
	                            { className: "flex-tile-link", href: "javascript:;", onClick: this.handleClick },
	                            story.title
	                        )
	                    )
	                ),
	                React.createElement("div", { className: "flex-tile-stripe" }),
	                React.createElement(
	                    "div",
	                    { className: "flex-tile-footer" },
	                    React.createElement(
	                        "div",
	                        { className: "flex-tile-footer-right-buttons" },
	                        React.createElement(
	                            "a",
	                            { href: story.shareURL, target: "_blank" },
	                            React.createElement("span", { className: "glyphicon glyphicon-new-window", title: "在新标签页中打开原文" })
	                        )
	                    )
	                )
	            );
	        }
	        return item;
	    }
	});
	
	var FlexView = React.createClass({
	    displayName: "FlexView",
	
	    mixins: [PureRenderMixin],
	
	    render: function render() {
	        var that = this;
	        var items = _.map(that.props.indexes, function (value) {
	            return React.createElement(FlexTile, { onClick: that.props.onTileClick, key: "tile" + value, id: value });
	        });
	
	        var preloaderClasses = classNames("flex-preloader", {
	            "loading": this.props.loading
	        });
	
	        return React.createElement(
	            "div",
	            { className: "FlexView" },
	            React.createElement(
	                "div",
	                { className: "flex-content" },
	                items
	            ),
	            React.createElement(Preloader, { className: preloaderClasses })
	        );
	    }
	});
	
	module.exports = FlexView;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(16);
	
	var _ = __webpack_require__(2);
	var React = __webpack_require__(1);
	
	var Preloader = React.createClass({
	    displayName: "Preloader",
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            className: null
	        };
	    },
	
	    render: function render() {
	        var classes = "Preloader";
	        if (!_.isEmpty(_.trim(this.props.className))) {
	            classes = classes + " " + this.props.className;
	        }
	
	        return React.createElement(
	            "div",
	            { className: classes },
	            React.createElement("span", { className: "wave1" }),
	            React.createElement("span", { className: "wave2" }),
	            React.createElement("span", { className: "wave3" }),
	            React.createElement("span", { className: "wave4" }),
	            React.createElement("span", { className: "wave5" })
	        );
	    }
	});
	
	module.exports = Preloader;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _ = __webpack_require__(2);
	var moment = __webpack_require__(21);
	
	var FormatString = "YYYYMMDD";
	var MinDateString = "20130520";
	
	/**
	 * 知乎日报的起始日期（早于该日期还没有日报呢）。
	 */
	exports.MIN_DATE = moment(MinDateString, FormatString, true);
	
	/**
	 * 转换日期为知乎日期格式。
	 * @param {String|Date} p_date 日期。
	 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
	 */
	exports.convertToZhihuDate = function (p_date) {
	    var m = null;
	    if (_.isDate(p_date)) {
	        m = moment(p_date);
	    } else if (_.isString(p_date)) {
	        m = this.convertZhihuDateToMoment(p_date);
	        if (!m.isValid()) {
	            m = moment(new Date(p_date));
	        }
	    }
	
	    if (m) {
	        return m.isValid() ? m.format(FormatString) : null;
	    } else {
	        return null;
	    }
	};
	
	/**
	 * 转换知乎日期为 Moment 对象。
	 * @param {String} p_date 形如"20150726"的日期字符串。
	 * @return {Moment}
	 */
	exports.convertZhihuDateToMoment = function (p_date) {
	    return moment(p_date, FormatString, true);
	};
	
	/**
	 * 计算指定日期的后一天对应的知乎日期。
	 * @param {String|Date} p_date 日期。
	 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
	 */
	exports.nextZhihuDay = function (p_date) {
	    return this.subZhihuDate(p_date, -1);
	};
	
	/**
	 * 计算指定日期的前一天对应的知乎日期。
	 * @param {Date|String} p_date 日期。
	 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
	 */
	exports.prevZhihuDay = function (p_date) {
	    return this.subZhihuDate(p_date);
	};
	
	/**
	 * 计算指定日期减去指定天数后对应的知乎日期。
	 * @param {Date|String} p_date 日期。
	 * @param {Number} p_day 要减去的天数，可以为负数（相当于增加天数）；如果不指定，天数减1。
	 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
	 */
	exports.subZhihuDate = function (p_date, p_day) {
	    var m = this.convertZhihuDateToMoment(this.convertToZhihuDate(p_date));
	    return m.isValid() ? m.subtract(p_day || 1, "day").format(FormatString) : null;
	};
	
	/**
	 * 检查指定的日期是否符合知乎日期格式，即是否形如"20150726"。
	 * @param {String} p_date 日期。
	 * @return {Boolean}
	 */
	exports.isValidZhihuDate = function (p_date) {
	    return this.convertZhihuDateToMoment(p_date).isValid();
	};

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = Mousetrap;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI3Mjk5MWZkYmNmNDk4YTczNmIiLCJ3ZWJwYWNrOi8vL0M6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJfXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vL0M6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb250cm9sbGVycy9kYWlseS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9jb21wb25lbnRzL05hdmJhci5qc3giLCJ3ZWJwYWNrOi8vL0M6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9EYWlseVBhZ2UuanN4Iiwid2VicGFjazovLy9DOi9Xb3Jrc3BhY2UvVmlzdWFsIFN0dWRpby9aaGlodS1EYWlseS1SZWFkZXIvcHVibGljL2Fzc2V0cy96ZHIvZGFpbHkvY29tcG9uZW50cy9BcnRpY2xlVmlldy5qc3giLCJ3ZWJwYWNrOi8vL0M6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb21wb25lbnRzL0ZsZXhWaWV3LmpzeCIsIndlYnBhY2s6Ly8vQzovV29ya3NwYWNlL1Zpc3VhbCBTdHVkaW8vWmhpaHUtRGFpbHktUmVhZGVyL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbXBvbmVudHMvUHJlbG9hZGVyLmpzeCIsIndlYnBhY2s6Ly8vQzovV29ya3NwYWNlL1Zpc3VhbCBTdHVkaW8vWmhpaHUtRGFpbHktUmVhZGVyL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbnRyb2xsZXJzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9hc3NldHMvemRyL2NvbXBvbmVudHMvcmVzL05hdmJhci5sZXNzIiwid2VicGFjazovLy8uL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbXBvbmVudHMvcmVzL0FydGljbGVWaWV3Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2Fzc2V0cy96ZHIvZGFpbHkvY29tcG9uZW50cy9yZXMvRmxleFZpZXcubGVzcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb21wb25lbnRzL3Jlcy9QcmVsb2FkZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9yZXMvRGFpbHlQYWdlLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2Fzc2V0cy96ZHIvcmVzL2luZGV4Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2Fzc2V0cy96ZHIvY29tbW9uL3Jlcy9pbWcvemhpaHVfZGFpbHlfbG9nb19ibHVlLnBuZyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJNb3VzZXRyYXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLG9CQUFPLENBQUMsRUFBa0IsQ0FBQyxDQUFDOztBQUU1QixLQUFJLENBQUMsR0FBRyxtQkFBTyxDQUFDLENBQVEsQ0FBQyxDQUFDO0FBQzFCLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBTyxDQUFDLENBQUM7O0FBRTdCLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBcUIsQ0FBQyxDQUFDO0FBQzVDLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsQ0FBbUIsQ0FBQyxDQUFDOzs7QUFHN0MsRUFBQyxDQUFDLFlBQ0Y7QUFDSSxVQUFLLENBQUMsTUFBTSxDQUNSOztXQUFLLFNBQVMsRUFBQywrQkFBK0I7U0FDMUMsb0JBQUMsTUFBTSxPQUFHO1NBQ1Ysb0JBQUMsU0FBUyxPQUFHO01BQ1gsRUFFTixRQUFRLENBQUMsSUFBSSxDQUNoQixDQUFDO0VBQ0wsQ0FBQyxDOzs7Ozs7QUNuQkYsd0I7Ozs7OztBQ0FBLG9COzs7Ozs7QUNBQSx5Qjs7Ozs7Ozs7QUNBQSxLQUFJLENBQUMsR0FBRyxtQkFBTyxDQUFDLENBQVEsQ0FBQyxDQUFDO0FBQzFCLEtBQUksQ0FBQyxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7O0FBRTFCLEtBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLbEIsUUFBTyxDQUFDLGlCQUFpQixHQUFHLFlBQzVCO0FBQ0ksWUFBTyxRQUFRLENBQUM7RUFDbkIsQ0FBQzs7Ozs7O0FBTUYsUUFBTyxDQUFDLGNBQWMsR0FBRyxVQUFVLFVBQVUsRUFDN0M7QUFDSSxNQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxFQUN6QztBQUNJLG1CQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO01BQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFDUjtBQUNJLG1CQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztNQUN2QyxDQUFDLENBQUM7RUFDTixDQUFDOzs7Ozs7O0FBT0YsUUFBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLE1BQU0sRUFBRSxVQUFVLEVBQ2xEO0FBQ0ksU0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUN4QjtBQUNJLG1CQUFVLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLGVBQU0sR0FBRyxJQUFJLENBQUM7TUFDakI7O0FBRUQsU0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDN0I7QUFDSSxVQUFDLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsTUFBTSxFQUM1QztBQUNJLHVCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1VBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFDUjtBQUNJLHVCQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztVQUMxQyxDQUFDLENBQUM7TUFDTixNQUVEO0FBQ0ksVUFBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLEVBQUUsVUFBVSxNQUFNLEVBQ3REO0FBQ0ksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7VUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUNSO0FBQ0ksdUJBQVUsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7VUFDekQsQ0FBQyxDQUFDO01BQ047RUFDSixDQUFDOzs7Ozs7O0FBT0YsUUFBTyxDQUFDLFFBQVEsR0FBRyxVQUFVLElBQUksRUFBRSxVQUFVLEVBQzdDO0FBQ0ksU0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUM1QjtBQUNJLGFBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzNCO0FBQ0ksaUJBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFDNUI7QUFDSSwyQkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Y0FDdkM7VUFDSixNQUVEO0FBQ0ksY0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxFQUFFLFVBQVUsTUFBTSxFQUM3QztBQUNJLHlCQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLDJCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2NBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFDUjtBQUNJLDJCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztjQUNwQyxDQUFDLENBQUM7VUFDTjtNQUNKO0VBQ0osQzs7Ozs7O0FDM0ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFnQjs7QUFFaEI7QUFDQTs7QUFFQSxrQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7O0FDL0NELG9CQUFPLENBQUMsRUFBbUIsQ0FBQyxDQUFDOztBQUU3QixLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDOzs7OztBQUs3QixLQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNwQzs7O0FBQ0ksb0JBQWUsRUFBRSwyQkFDakI7QUFDSSxnQkFBTztBQUNILG1CQUFNLEVBQUUsa0JBQWtCO1VBQzdCLENBQUM7TUFDTDs7QUFFRCxXQUFNLEVBQUUsa0JBQ1I7QUFDSSxhQUFJLFlBQVksR0FDWjs7ZUFBSyxTQUFTLEVBQUMsZUFBZTthQUMxQjs7bUJBQVEsSUFBSSxFQUFDLFFBQVE7QUFDYiw4QkFBUyxFQUFDLHlCQUF5QjtBQUNuQyxvQ0FBWSxVQUFVO0FBQ3RCLG9DQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTztpQkFDbkM7O3VCQUFNLFNBQVMsRUFBQyxTQUFTOztrQkFBVTtpQkFDbkMsOEJBQU0sU0FBUyxFQUFDLFVBQVUsR0FBUTtpQkFDbEMsOEJBQU0sU0FBUyxFQUFDLFVBQVUsR0FBUTtpQkFDbEMsOEJBQU0sU0FBUyxFQUFDLFVBQVUsR0FBUTtjQUM3QjthQUNUOzttQkFBRyxTQUFTLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxHQUFHO2lCQUNoQyw2QkFBSyxHQUFHLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBRSxtQkFBTyxDQUFDLEVBQTZDLENBQUUsR0FBRztjQUMvRTtVQUNGLENBQUM7QUFDWCxnQkFBTyxZQUFZLENBQUM7TUFDdkI7RUFDSixDQUFDLENBQUM7Ozs7O0FBS0gsS0FBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FDckM7OztBQUNJLG9CQUFlLEVBQUUsMkJBQ2pCO0FBQ0ksZ0JBQU87QUFDSCxlQUFFLEVBQUUsZUFBZTtVQUN0QixDQUFDO01BQ0w7O0FBRUQsV0FBTSxFQUFFLGtCQUNSO0FBQ0ksYUFBSSxhQUFhLEdBQ2I7O2VBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztBQUNsQiwwQkFBUyxFQUFDLDBCQUEwQjthQUNyQzs7bUJBQUksU0FBUyxFQUFDLDZCQUE2QjtpQkFDdkM7O3VCQUFJLFNBQVMsRUFBQyxRQUFRO3FCQUFDOzsyQkFBRyxJQUFJLEVBQUMsR0FBRzs7c0JBQU87a0JBQUs7aUJBQzlDOzt1QkFBSSxTQUFTLEVBQUMsVUFBVTtxQkFBQzs7MkJBQUcsSUFBSSxFQUFDLEdBQUc7O3NCQUFPO2tCQUFLO2lCQUNoRDs7dUJBQUksU0FBUyxFQUFDLFVBQVU7cUJBQUM7OzJCQUFHLElBQUksRUFBQyxHQUFHOztzQkFBTztrQkFBSztjQUMvQztVQUNILENBQUM7QUFDWCxnQkFBTyxhQUFhLENBQUM7TUFDeEI7RUFDSixDQUFDLENBQUM7Ozs7O0FBS0gsS0FBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FDOUI7OztBQUNJLG9CQUFlLEVBQUUsMkJBQ2pCO0FBQ0ksZ0JBQU87QUFDSCxlQUFFLEVBQUUsUUFBUTtVQUNmLENBQUM7TUFDTDs7QUFFRCxXQUFNLEVBQUUsa0JBQ1I7QUFDSSxhQUFJLE1BQU0sR0FDTjs7ZUFBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFHO0FBQ2xCLDBCQUFTLEVBQUMsK0NBQStDO2FBQzFEOzttQkFBSyxTQUFTLEVBQUMsV0FBVztpQkFDdEIsb0JBQUMsWUFBWSxJQUFDLE1BQU0sRUFBQyxnQkFBZ0IsR0FBRztpQkFDeEMsb0JBQUMsYUFBYSxPQUFHO2NBQ2Y7VUFDSixDQUFDO0FBQ1gsZ0JBQU8sTUFBTSxDQUFDO01BQ2pCO0VBQ0osQ0FBQyxDQUFDOztBQUVILE9BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDOzs7Ozs7OztBQzFGdkIsb0JBQU8sQ0FBQyxFQUFzQixDQUFDLENBQUM7O0FBRWhDLEtBQUksQ0FBQyxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7QUFDMUIsS0FBSSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxFQUFXLENBQUMsQ0FBQztBQUNyQyxLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDO0FBQzdCLEtBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3RDLEtBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0FBQ25ELEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsQ0FBcUIsQ0FBQyxDQUFDO0FBQ2xELEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDOzs7QUFHM0MsS0FBSSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxDQUF1QixDQUFDLENBQUM7QUFDaEQsS0FBSSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxDQUEwQixDQUFDLENBQUM7Ozs7O0FBS3RELEtBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ2pDOzs7QUFDSSx1QkFBa0IsRUFBRSxJQUFJO0FBQ3hCLGtCQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ2pCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLDBCQUFxQixFQUFFLEtBQUs7O0FBRTVCLGtCQUFhLEVBQUUsSUFBSTtBQUNuQix5QkFBb0IsRUFBRSxJQUFJOztBQUUxQixXQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLG9CQUFlLEVBQUUsMkJBQ2pCO0FBQ0ksZ0JBQU87QUFDSCw0QkFBZSxFQUFFLEVBQUU7QUFDbkIseUJBQVksRUFBRSxFQUFFO0FBQ2hCLHlCQUFZLEVBQUUsSUFBSTtBQUNsQixvQkFBTyxFQUFFLEtBQUs7VUFDakIsQ0FBQztNQUNMOztBQUVELHNCQUFpQixFQUFFLDZCQUNuQjs7QUFFSSxhQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2QyxhQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUM7Ozs7OztBQU03RCxhQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7O0FBR3pCLGFBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO01BQzNCOztBQUVELHlCQUFvQixFQUFFLGdDQUN0Qjs7QUFFSSxhQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztNQUM5Qjs7Ozs7QUFLRCxvQkFBZSxFQUFFLDJCQUNqQjtBQUNJLHFCQUFZLENBQUMsY0FBYyxDQUFDLFdBQVUsR0FBRyxFQUFFLEdBQUcsRUFDOUM7QUFDSSxpQkFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxFQUNuQztBQUNJLHFCQUFJLENBQUMsUUFBUSxDQUNiO0FBQ0ksb0NBQWUsRUFBRSxHQUFHLENBQUMsR0FBRztrQkFDM0IsQ0FBQyxDQUFDO2NBQ047VUFDSixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO01BQ2pCOzs7OztBQUtELHNCQUFpQixFQUFFLDZCQUNuQjtBQUNJLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixvQkFBTyxFQUFFLElBQUk7VUFDaEIsRUFBRSxZQUNIO0FBQ0kseUJBQVksQ0FBQyxXQUFXLENBQUMsV0FBVSxHQUFHLEVBQUUsR0FBRyxFQUMzQztBQUNJLHFCQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQ25DO0FBQ0kseUJBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ25DLHlCQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLHlCQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztrQkFDM0I7O0FBRUQscUJBQUksQ0FBQyxRQUFRLENBQUM7QUFDViw0QkFBTyxFQUFFLEtBQUs7a0JBQ2pCLENBQUMsQ0FBQztjQUNOLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7VUFDakIsQ0FBQyxDQUFDO01BQ047Ozs7O0FBS0QscUJBQWdCLEVBQUUsMEJBQVUsVUFBVSxFQUN0QztBQUNJLGFBQUksQ0FBQyxRQUFRLENBQUM7QUFDVixvQkFBTyxFQUFFLElBQUk7VUFDaEIsRUFBRSxZQUNIO0FBQ0kseUJBQVksQ0FBQyxXQUFXLENBQ3BCLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQzNDLFdBQVUsR0FBRyxFQUFFLEdBQUcsRUFDbEI7QUFDSSxxQkFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQ2Y7QUFDSSx5QkFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDbkMseUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7a0JBQ2xDOztBQUVELHFCQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1YsNEJBQU8sRUFBRSxLQUFLO2tCQUNqQixDQUFDLENBQUM7O0FBRUgscUJBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFDM0I7QUFDSSwrQkFBVSxFQUFFLENBQUM7a0JBQ2hCO2NBQ0osRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2YsQ0FBQztVQUNMLENBQUMsQ0FBQztNQUNOOzs7OztBQUtELHFCQUFnQixFQUFFLDRCQUNsQjtBQUNJLGFBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxXQUFVLENBQUMsRUFDbEQ7QUFDSSxpQkFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7VUFDbEMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFZCxhQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxXQUFVLENBQUMsRUFDcEQ7QUFDSSxpQkFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztVQUN0QyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVkLGFBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFdBQVUsQ0FBQyxFQUNuRDtBQUNJLGlCQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLGlCQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7VUFDckMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFZCxhQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUM3QixVQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7TUFDakQ7Ozs7O0FBS0Qsd0JBQW1CLEVBQUUsK0JBQ3JCO0FBQ0ksYUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsYUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7QUFDaEMsVUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUM3Qjs7Ozs7QUFLRCwwQkFBcUIsRUFBRSxpQ0FDdkI7QUFDSSxrQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRTlDLGtCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNoRCxrQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRWhELGtCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLGFBQy9CO0FBQ0ksaUJBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQy9CO0FBQ0kscUJBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNwRztVQUNKLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRWQsa0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQ3ZCO0FBQ0ksaUJBQUksQ0FBQyxxQkFBcUIsR0FDcEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEdBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1VBQ25DLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDZCxrQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFDeEI7QUFDSSxpQkFBSSxDQUFDLHFCQUFxQixHQUNwQixJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FDNUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7VUFDakMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFZCxrQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsYUFDcEI7QUFDSSxpQkFBSSxJQUFJLENBQUMscUJBQXFCLEVBQzlCO0FBQ0ksa0JBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUNwQztBQUNJLHNCQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7a0JBQ2IsQ0FBQyxDQUFDO2NBQ047VUFDSixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO01BQ2pCOzs7OztBQUtELDZCQUF3QixFQUFFLG9DQUMxQjtBQUNJLGtCQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7TUFDckI7Ozs7O0FBS0QsMEJBQXFCLEVBQUUsaUNBQ3ZCO0FBQ0ksYUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDbkMsYUFBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN6QztBQUNJLGlCQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFDbkI7QUFDSSxxQkFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3RSxxQkFBRyxJQUFJLENBQUMscUJBQXFCLEVBQzdCO0FBQ0kseUJBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQ3pCO0FBQ0ksNkJBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3hCLDZCQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztzQkFDbEMsQ0FBQyxDQUFDO2tCQUNOLE1BRUQ7QUFDSSx5QkFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztrQkFDNUI7Y0FDSjtVQUNKLE1BRUQ7O0FBRUksaUJBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNuQjtBQUNJLHFCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixxQkFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQ3RCO0FBQ0kseUJBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2tCQUMzQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2NBQ2pCO1VBQ0o7TUFDSjs7Ozs7QUFLRCwwQkFBcUIsRUFBRSxpQ0FDdkI7QUFDSSxhQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUNuQyxhQUFHLEtBQUssSUFBSSxDQUFDLEVBQ2I7QUFDSSxpQkFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3RSxpQkFBRyxJQUFJLENBQUMscUJBQXFCLEVBQzdCO0FBQ0kscUJBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQ3pCO0FBQ0kseUJBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQzFCLHlCQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztrQkFDbEMsQ0FBQyxDQUFDO2NBQ04sTUFFRDtBQUNJLHFCQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2NBQzVCO1VBQ0o7TUFDSjs7Ozs7QUFLRCxtQkFBYyxFQUFFLHdCQUFVLENBQUMsRUFDM0I7O0FBRUksYUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBSSxFQUNqRztBQUNJLGlCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixpQkFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQ3RCO0FBQ0kscUJBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2NBQzNCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7VUFDakI7TUFDSjs7Ozs7QUFLRCw0QkFBdUIsRUFBRSxtQ0FDekI7QUFDSSxhQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzFDOzs7OztBQUtELHFCQUFnQixFQUFFLDBCQUFVLFNBQVMsRUFDckM7QUFDSSxhQUFJLENBQUMsUUFBUSxDQUNiO0FBQ0kseUJBQVksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQ2pEO0FBQ0ksc0JBQUssRUFBRSxTQUFTO2NBQ25CLENBQUM7VUFDTCxDQUFDLENBQUM7TUFDTjs7QUFFRCwwQkFBcUIsRUFBRSwrQkFBVSxDQUFDLEVBQ2xDO0FBQ0ksYUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUM3RDs7QUFFRCxzQkFBaUIsRUFBRSwyQkFBVSxDQUFDLEVBQzlCO0FBQ0ksYUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDOUI7Ozs7O0FBS0QsaUJBQVksRUFBRSxzQkFBVSxPQUFPLEVBQy9CO0FBQ0ksYUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFDM0I7QUFDSSxpQkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCxpQkFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7VUFDM0IsQ0FBQyxDQUFDO01BQ047Ozs7O0FBS0QsaUJBQVksRUFBRSxzQkFBVSxPQUFPLEVBQUUsVUFBVSxFQUMzQztBQUNJLGFBQUcsT0FBTyxFQUNWO0FBQ0ksaUJBQUksQ0FBQyxRQUFRLENBQUM7QUFDViw2QkFBWSxFQUFFLE9BQU87Y0FDeEIsRUFBRSxVQUFVLENBQUMsQ0FBQztVQUNsQjtNQUNKOzs7OztBQUtELHVCQUFrQixFQUFFLDRCQUFVLElBQUksRUFDbEM7QUFDSSxnQkFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ25EOzs7OztBQUtELHFCQUFnQixFQUFFLDRCQUNsQjtBQUNJLGFBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQzlCO0FBQ0ksaUJBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7VUFDOUI7TUFDSjs7Ozs7QUFLRCxzQkFBaUIsRUFBRSw2QkFDbkI7QUFDSSxhQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFDN0I7QUFDSSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDcEM7TUFDSjs7Ozs7QUFLRCxxQkFBZ0IsRUFBRSw0QkFDbEI7QUFDSSxhQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFDMUQ7QUFDSSxpQkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7VUFDakQ7TUFDSjs7Ozs7QUFLRCx1QkFBa0IsRUFBRSw4QkFDcEI7QUFDSSxhQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUN6QjtBQUNJLGlCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztVQUNqRDtNQUNKOzs7OztBQUtELHFCQUFnQixFQUFFLDBCQUFVLE9BQU8sRUFDbkM7QUFDSSxhQUFJLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztBQUMxRCxhQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUM3QixhQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdkM7O0FBRUQsZ0NBQTJCLEVBQUUscUNBQVUsQ0FBQyxFQUN4QztBQUNJLGFBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUNuRDs7Ozs7QUFLRCx1QkFBa0IsRUFBRSw0QkFBVSxVQUFVLEVBQUUsVUFBVSxFQUNwRDtBQUNJLGFBQUcsVUFBVSxJQUFJLENBQUMsRUFDbEI7QUFDSSxjQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQzVFOztBQUVELGFBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNqRSxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztBQUk3QixhQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUN4QyxhQUFJLFFBQVEsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2xHLGFBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDOUMsYUFBRyxRQUFRLElBQUksTUFBTSxFQUNyQjs7QUFFSSxjQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1VBQ2pDO01BQ0o7O0FBRUQsV0FBTSxFQUFFLGtCQUNSOzs7Ozs7QUFNSSxhQUFJLElBQUksR0FDSjs7ZUFBSyxTQUFTLEVBQUMsMkJBQTJCO2FBQ3RDLG9CQUFDLFFBQVEsSUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFrQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWEsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLEdBQUU7YUFDL0csb0JBQUMsV0FBVyxJQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWEsR0FBRztVQUM3QyxDQUFDO0FBQ1gsZ0JBQU8sSUFBSSxDQUFDO01BQ2Y7RUFDSixDQUFDLENBQUM7O0FBRUgsT0FBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLEM7Ozs7Ozs7O0FDamQxQixvQkFBTyxDQUFDLEVBQXdCLENBQUMsQ0FBQzs7QUFFbEMsS0FBSSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyxDQUFRLENBQUMsQ0FBQztBQUMxQixLQUFJLFVBQVUsR0FBRyxtQkFBTyxDQUFDLENBQVksQ0FBQyxDQUFDO0FBQ3ZDLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBTyxDQUFDLENBQUM7QUFDN0IsS0FBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7O0FBRW5ELEtBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ3JDOzs7QUFDSSxXQUFNLEVBQUcsa0JBQ1Q7QUFDSSxhQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM3RCxhQUFJLG9CQUFvQixHQUFHLFVBQVUsQ0FDakMsd0JBQXdCLEVBQ3hCO0FBQ0kseUJBQVksRUFBRSxDQUFDLGNBQWM7QUFDN0IseUJBQVksRUFBRSxjQUFjO1VBQy9CLENBQ0osQ0FBQzs7QUFFRixhQUFJLG9CQUFvQixHQUFHLFVBQVUsQ0FDakMsd0JBQXdCLEVBQ3hCO0FBQ0ksNEJBQWUsRUFBRSxDQUFDLGNBQWM7VUFDbkMsQ0FDSixDQUFDOzs7QUFHRixhQUFJLGtCQUFrQixHQUFHLFVBQVUsQ0FDL0I7QUFDSSxtQkFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVztVQUN4QyxDQUNKLENBQUM7O0FBRUYsYUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsYUFBSSxRQUFRLEdBQ1I7O2VBQUssU0FBUyxFQUFDLHNCQUFzQixFQUFDLEdBQUcsRUFBQyxnQkFBZ0I7YUFDdEQ7O21CQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxnQkFBYSxPQUFPO2lCQUN4RDs7OztrQkFBb0I7Y0FDZjthQUNUOzttQkFBSyxTQUFTLEVBQUUsb0JBQXFCLEVBQUMsS0FBSyxFQUFFLEVBQUMsZUFBZSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFO2lCQUNsRzs7dUJBQUssU0FBUyxFQUFFLG9CQUFxQjtxQkFDakM7OzJCQUFHLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFTLEVBQUMsTUFBTSxFQUFDLFFBQVE7eUJBQy9DOzs7NkJBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSzswQkFBTTtzQkFDakM7cUJBQ0o7OzJCQUFHLFVBQVUsRUFBRSxrQkFBbUIsRUFBQyxJQUFJLEVBQUUsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBWTtBQUN4RyxtQ0FBTSxFQUFDLFFBQVE7eUJBQ2QsOEJBQU0sU0FBUyxFQUFDLG9DQUFvQyxHQUFHO3lCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXO3NCQUM3QjtrQkFDRjtjQUNKO1VBQ0osQ0FBQztBQUNYLGFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXBCLGFBQUcsY0FBYyxFQUNqQjtBQUNJLGlCQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxVQUFTLEtBQUssRUFBRSxDQUFDLEVBQzFFO0FBQ0ksd0JBQ0k7O3VCQUFHLFNBQVMsRUFBQyw2QkFBNkI7QUFDdEMsNkJBQUksRUFBRSxLQUFLLENBQUMsSUFBSztBQUNqQiwrQkFBTSxFQUFDLFFBQVE7QUFDZiw0QkFBRyxFQUFFLFlBQVksR0FBRyxDQUFFO3FCQUN0Qjs7O3lCQUFLLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJO3NCQUFNO2tCQUN6QyxDQUNOO2NBQ0wsQ0FBQyxDQUFDOztBQUVILGlCQUFJLENBQUMsSUFBSSxDQUNMOzttQkFBSyxTQUFTLEVBQUMscUJBQXFCLEVBQUMsR0FBRyxFQUFDLHFCQUFxQjtpQkFDekQsY0FBYztpQkFDZiw4QkFBTSxTQUFTLEVBQUMsNkRBQTZELEdBQUc7Y0FDOUUsQ0FDVCxDQUFDO1VBQ0w7O0FBRUQsZ0JBQ0k7O2VBQUssU0FBUyxFQUFDLDRCQUE0QjthQUN0QyxJQUFJO1VBQ0gsQ0FDUjtNQUNMO0VBQ0osQ0FBQyxDQUFDOztBQUVILEtBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ25DOzs7QUFDSSxXQUFNLEVBQUcsa0JBQ1Q7QUFDSSxhQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIsYUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUN4QyxjQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUMvQjs7QUFFSSxpQkFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLGlCQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUc5QixpQkFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUN6QjtBQUNJLDBCQUFTLENBQUMsSUFBSSxDQUFDOzt1QkFBSSxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsR0FBRyxFQUFFLGdCQUFnQixHQUFDLENBQUU7cUJBQUUsSUFBSSxDQUFDLEtBQUs7a0JBQU0sQ0FBQyxDQUFDO2NBQzdGOzs7QUFHRCxpQkFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBSyxFQUFFLENBQUMsRUFDbkQ7O0FBRUkscUJBQUksYUFBYSxHQUFHLFVBQVUsQ0FDMUIsUUFBUSxFQUNSO0FBQ0ksMkJBQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7a0JBQ2xDLENBQ0osQ0FBQzs7QUFFRix3QkFDSTs7dUJBQUssU0FBUyxFQUFDLGlCQUFpQixFQUFDLEdBQUcsRUFBRSxrQkFBa0IsR0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUU7cUJBQzdEOzsyQkFBSyxTQUFTLEVBQUMsc0JBQXNCO3lCQUNqQyw2QkFBSyxTQUFTLEVBQUUsYUFBYyxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTyxHQUFHO3lCQUNwRDs7K0JBQU0sU0FBUyxFQUFDLFFBQVE7NkJBQUUsS0FBSyxDQUFDLElBQUk7MEJBQVE7eUJBQzVDOzsrQkFBTSxTQUFTLEVBQUMsS0FBSzs2QkFBRSxLQUFLLENBQUMsR0FBRzswQkFBUTtzQkFDdEM7cUJBQ04sNkJBQUssU0FBUyxFQUFDLHlCQUF5QixFQUFDLHVCQUF1QixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRztrQkFDM0YsQ0FDUjtjQUNMLENBQUMsQ0FBQztBQUNILGtCQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7QUFHL0MsaUJBQUcsSUFBSSxDQUFDLElBQUksRUFDWjtBQUNJLDBCQUFTLENBQUMsSUFBSSxDQUNWOzt1QkFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBRSxXQUFXLEdBQUMsQ0FBRTtxQkFDMUM7OzJCQUFHLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUssRUFBQyxNQUFNLEVBQUMsUUFBUTt5QkFBQzs7OzZCQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTswQkFBSztzQkFBSTtrQkFDbEUsQ0FDVCxDQUFDO2NBQ0w7O0FBRUQsc0JBQVMsQ0FBQyxJQUFJLENBQ1Y7O21CQUFLLFNBQVMsRUFBQyxVQUFVLEVBQUMsR0FBRyxFQUFFLFVBQVUsR0FBQyxDQUFFO2lCQUN2QyxTQUFTO2NBQ1IsQ0FDVCxDQUFDOzs7QUFHRixpQkFBSSxDQUFDLEdBQUcsTUFBTSxHQUFFLENBQUMsRUFDakI7QUFDSSwwQkFBUyxDQUFDLElBQUksQ0FBQyw0QkFBSSxTQUFTLEVBQUMsb0JBQW9CLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixHQUFDLENBQUUsR0FBRSxDQUFDLENBQUM7Y0FDckY7VUFDSjs7QUFFRCxnQkFDSTs7ZUFBSyxTQUFTLEVBQUMsd0JBQXdCO2FBQ2xDLFNBQVM7VUFDUixDQUNSO01BQ0w7RUFDSixDQUFDLENBQUM7O0FBRUgsS0FBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FDbkM7OztBQUNJLFdBQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7QUFFekIsb0JBQWUsRUFBRSwyQkFDakI7QUFDSSxnQkFBTztBQUNILGVBQUUsRUFBRSxhQUFhO1VBQ3BCLENBQUM7TUFDTDs7QUFFRCxXQUFNLEVBQUUsa0JBQ1I7QUFDSSxhQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxhQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUNuQjtBQUNJLGlCQUFJLEdBQUcsQ0FDSCxvQkFBQyxhQUFhLElBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFNLEdBQUcsRUFDdkQsb0JBQUMsV0FBVyxJQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVMsR0FBRyxDQUNsRSxDQUFDO1VBQ0w7O0FBRUQsZ0JBQ0k7O2VBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRyxFQUFDLFNBQVMsRUFBQyx3QkFBd0I7YUFDdEQ7O21CQUFLLFNBQVMsRUFBQyx1QkFBdUI7aUJBQ2xDOzt1QkFBSyxTQUFTLEVBQUMsZUFBZTtxQkFDekIsSUFBSTtrQkFDSDtjQUNKO1VBQ0osQ0FDUjtNQUNMO0VBQ0osQ0FBQyxDQUFDOztBQUVILE9BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDOzs7Ozs7OztBQ2pNNUIsb0JBQU8sQ0FBQyxFQUFxQixDQUFDLENBQUM7O0FBRS9CLEtBQUksQ0FBQyxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7QUFDMUIsS0FBSSxVQUFVLEdBQUcsbUJBQU8sQ0FBQyxDQUFZLENBQUMsQ0FBQztBQUN2QyxLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDO0FBQzdCLEtBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0FBQ25ELEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsQ0FBc0IsQ0FBQyxDQUFDO0FBQ25ELEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7O0FBRXZDLEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ2hDOzs7QUFDSSxXQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLG9CQUFlLEVBQUUsMkJBQ2pCO0FBQ0ksZ0JBQU87QUFDSCxrQkFBSyxFQUFFLElBQUk7VUFDZCxDQUFDO01BQ0w7O0FBRUQsc0JBQWlCLEVBQUUsNkJBQ25CO0FBQ0ksYUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDakI7QUFDSSx5QkFBWSxDQUFDLFFBQVEsQ0FDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQ2IsV0FBVSxHQUFHLEVBQUUsR0FBRyxFQUNsQjtBQUNJLHFCQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQ25DO0FBQ0kseUJBQUksQ0FBQyxRQUFRLENBQ2I7QUFDSSw4QkFBSyxFQUFFLEdBQUc7c0JBQ2IsQ0FBQyxDQUFDO2tCQUNOO2NBQ0osRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2YsQ0FBQztVQUNMO01BQ0o7O0FBRUQsZ0JBQVcsRUFBRSxxQkFBVSxDQUFDLEVBQ3hCO0FBQ0ksYUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ3BDO0FBQ0ksaUJBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ2Ysc0JBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Y0FDMUIsQ0FBQyxDQUFDO1VBQ047TUFDSjs7QUFFRCxXQUFNLEVBQUUsa0JBQ1I7QUFDSSxhQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsYUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDN0IsYUFBSSxLQUFLLEVBQ1Q7O0FBRUksaUJBQUksR0FDQTs7bUJBQUssRUFBRSxFQUFFLE9BQU8sR0FBQyxLQUFLLENBQUMsRUFBRyxFQUFDLFNBQVMsRUFBQyxXQUFXO2lCQUM1Qzs7dUJBQUssU0FBUyxFQUFDLG1CQUFtQjtxQkFDOUIsNkJBQUssU0FBUyxFQUFDLG1CQUFtQixFQUFDLEtBQUssRUFBRSxFQUFDLGVBQWUsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVksR0FBRztxQkFDdEg7OzJCQUFLLFNBQVMsRUFBQyxpQkFBaUI7eUJBQzVCOzsrQkFBRyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVk7NkJBQ3ZFLEtBQUssQ0FBQyxLQUFLOzBCQUNaO3NCQUNGO2tCQUNKO2lCQUNOLDZCQUFLLFNBQVMsRUFBQyxrQkFBa0IsR0FBRztpQkFDcEM7O3VCQUFLLFNBQVMsRUFBQyxrQkFBa0I7cUJBQzdCOzsyQkFBSyxTQUFTLEVBQUMsZ0NBQWdDO3lCQUMzQzs7K0JBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFTLEVBQUMsTUFBTSxFQUFDLFFBQVE7NkJBQ3BDLDhCQUFNLFNBQVMsRUFBQyxnQ0FBZ0MsRUFBQyxLQUFLLEVBQUMsWUFBWSxHQUFHOzBCQUN0RTtzQkFDRjtrQkFDSjtjQUNKLENBQUM7VUFDZDtBQUNELGdCQUFPLElBQUksQ0FBQztNQUNmO0VBQ0osQ0FBQyxDQUFDOztBQUVILEtBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQ2hDOzs7QUFDSSxXQUFNLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBRXpCLFdBQU0sRUFBRSxrQkFDUjtBQUNJLGFBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixhQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUNyRDtBQUNJLG9CQUFRLG9CQUFDLFFBQVEsSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFZLEVBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxLQUFNLEVBQUMsRUFBRSxFQUFFLEtBQU0sR0FBRyxDQUFFO1VBQzFGLENBQUMsQ0FBQzs7QUFFSCxhQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FDN0IsZ0JBQWdCLEVBQ2hCO0FBQ0ksc0JBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87VUFDaEMsQ0FDSixDQUFDOztBQUVGLGdCQUNJOztlQUFLLFNBQVMsRUFBQyxVQUFVO2FBQ3JCOzttQkFBSyxTQUFTLEVBQUMsY0FBYztpQkFDeEIsS0FBSztjQUNKO2FBQ04sb0JBQUMsU0FBUyxJQUFDLFNBQVMsRUFBRSxnQkFBaUIsR0FBRztVQUN4QyxDQUNSO01BQ0w7RUFDSixDQUFDLENBQUM7O0FBRUgsT0FBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLEM7Ozs7Ozs7O0FDL0d6QixvQkFBTyxDQUFDLEVBQXNCLENBQUMsQ0FBQzs7QUFFaEMsS0FBSSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyxDQUFRLENBQUMsQ0FBQztBQUMxQixLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDOztBQUU3QixLQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUNqQzs7O0FBQ0ksb0JBQWUsRUFBRSwyQkFDakI7QUFDSSxnQkFBTztBQUNILHNCQUFTLEVBQUUsSUFBSTtVQUNsQixDQUFDO01BQ0w7O0FBRUQsV0FBTSxFQUFFLGtCQUNSO0FBQ0ksYUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDO0FBQzFCLGFBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUMzQztBQUNJLG9CQUFPLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7VUFDakQ7O0FBRUQsZ0JBQ0k7O2VBQUssU0FBUyxFQUFFLE9BQVE7YUFDcEIsOEJBQU0sU0FBUyxFQUFDLE9BQU8sR0FBRTthQUN6Qiw4QkFBTSxTQUFTLEVBQUMsT0FBTyxHQUFFO2FBQ3pCLDhCQUFNLFNBQVMsRUFBQyxPQUFPLEdBQUU7YUFDekIsOEJBQU0sU0FBUyxFQUFDLE9BQU8sR0FBRTthQUN6Qiw4QkFBTSxTQUFTLEVBQUMsT0FBTyxHQUFFO1VBQ3ZCLENBQ1I7TUFDTDtFQUNKLENBQUMsQ0FBQzs7QUFFSCxPQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQzs7Ozs7Ozs7QUNsQzFCLEtBQUksQ0FBQyxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7QUFDMUIsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxFQUFRLENBQUMsQ0FBQzs7QUFFL0IsS0FBSSxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQzlCLEtBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQzs7Ozs7QUFLL0IsUUFBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztBQU83RCxRQUFPLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxNQUFNLEVBQzdDO0FBQ0ksU0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2IsU0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUNwQjtBQUNJLFVBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDdEIsTUFDSSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQzNCO0FBQ0ksVUFBQyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxhQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUNoQjtBQUNJLGNBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztVQUNoQztNQUNKOztBQUVELFNBQUksQ0FBQyxFQUNMO0FBQ0ksZ0JBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO01BQ3RELE1BRUQ7QUFDSSxnQkFBTyxJQUFJLENBQUM7TUFDZjtFQUNKLENBQUM7Ozs7Ozs7QUFPRixRQUFPLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxNQUFNLEVBQ25EO0FBQ0ksWUFBTyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUM3QyxDQUFDOzs7Ozs7O0FBT0YsUUFBTyxDQUFDLFlBQVksR0FBRyxVQUFVLE1BQU0sRUFDdkM7QUFDSSxZQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEMsQ0FBQzs7Ozs7OztBQU9GLFFBQU8sQ0FBQyxZQUFZLEdBQUcsVUFBVSxNQUFNLEVBQ3ZDO0FBQ0ksWUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3BDLENBQUM7Ozs7Ozs7O0FBUUYsUUFBTyxDQUFDLFlBQVksR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLLEVBQzlDO0FBQ0ksU0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLFlBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQ2xGLENBQUM7Ozs7Ozs7QUFPRixRQUFPLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxNQUFNLEVBQzNDO0FBQ0ksWUFBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDMUQsQzs7Ozs7OztBQzVGRCwwQzs7Ozs7O0FDQUEsMEM7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSwwQzs7Ozs7O0FDQUEsMEM7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSxrQ0FBaUMsZ3BLOzs7Ozs7QUNBakMsNEI7Ozs7OztBQ0FBLHlCIiwiZmlsZSI6Inpkci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvOTI3Mjk5MWZkYmNmNDk4YTczNmIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MjcyOTkxZmRiY2Y0OThhNzM2YlxuICoqLyIsInJlcXVpcmUoXCIuL3Jlcy9pbmRleC5sZXNzXCIpO1xuXG52YXIgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBOYXZiYXIgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL05hdmJhclwiKTtcbnZhciBEYWlseVBhZ2UgPSByZXF1aXJlKFwiLi9kYWlseS9EYWlseVBhZ2VcIik7XG4vLyBPdGhlciBQYWdlcy4uLlxuXG4kKGZ1bmN0aW9uICgpXG57XG4gICAgUmVhY3QucmVuZGVyKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk1haW5Db250YWluZXIgY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgICAgICA8RGFpbHlQYWdlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAsXG4gICAgICAgIGRvY3VtZW50LmJvZHlcbiAgICApO1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovV29ya3NwYWNlL1Zpc3VhbCBTdHVkaW8vWmhpaHUtRGFpbHktUmVhZGVyL3B1YmxpYy9hc3NldHMvemRyL2luZGV4LmpzeFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF87XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIl9cIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJqUXVlcnlcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xyXG52YXIgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XHJcblxyXG52YXIgX3N0b3JpZXMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiDojrflj5bnm67liY3lt7Lku47mnI3liqHnq6/ojrflj5bliLDnmoTmiYDmnInml6XmiqXlhoXlrrnnmoTnvJPlrZjvvIjku6Xml6XmiqUgaWQg6L+b6KGM5qOA57Si77yM5peg5bqP77yM6K+35Yu/55SoIGluZGV4IOajgOe0ou+8ieOAglxyXG4gKi9cclxuZXhwb3J0cy5nZXRGZXRjaGVkU3RvcmllcyA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiBfc3RvcmllcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiDojrflj5bmnIDmlrDng63pl6jml6XmiqXnmoQgSUQg5YiX6KGo44CCXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb24oZXJyLCByZXMpfSBbcF9jYWxsYmFja11cclxuICovXHJcbmV4cG9ydHMuZ2V0VG9wU3RvcnlJRHMgPSBmdW5jdGlvbiAocF9jYWxsYmFjaylcclxue1xyXG4gICAgJC5nZXQoXCIvYXBpLzQvbmV3cy90b3BcIiwgZnVuY3Rpb24gKHBfZGF0YSlcclxuICAgIHtcclxuICAgICAgICBwX2NhbGxiYWNrKG51bGwsIHBfZGF0YSk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgcF9jYWxsYmFjayhcIi9hcGkvNC9uZXdzL3RvcCBlcnJvclwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaMh+WumuaXpeacn+eahOaXpeaKpeeahCBJRCDliJfooajjgIJcclxuICogQHBhcmFtIFN0cmluZyBwX2RhdGUg5oyH5a6a55qE5pel5pyf44CC5aaC5p6c5pyq5oyH5a6a77yM5YiZ6L+U5Zue5pyA5paw5pel5oql55qE57Si5byV77yb5aaC5p6c5bCP5LqOIDIwMTMwNTE577yM5YiZ6L+U5ZueIHt944CCXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb24oZXJyLCByZXMpfSBbcF9jYWxsYmFja11cclxuICovXHJcbmV4cG9ydHMuZ2V0U3RvcnlJRHMgPSBmdW5jdGlvbiAocF9kYXRlLCBwX2NhbGxiYWNrKVxyXG57XHJcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHBfZGF0ZSkpXHJcbiAgICB7XHJcbiAgICAgICAgcF9jYWxsYmFjayA9IHBfZGF0ZTtcclxuICAgICAgICBwX2RhdGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoXy5pc0VtcHR5KF8udHJpbShwX2RhdGUpKSlcclxuICAgIHtcclxuICAgICAgICAkLmdldChcIi9hcGkvNC9uZXdzL2JlZm9yZVwiLCBmdW5jdGlvbiAocF9kYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcF9jYWxsYmFjayhudWxsLCBwX2RhdGEpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBfY2FsbGJhY2soXCIvYXBpLzQvbmV3cy9iZWZvcmUgZXJyb3JcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgJC5nZXQoXCIvYXBpLzQvbmV3cy9iZWZvcmUvXCIgKyBwX2RhdGUsIGZ1bmN0aW9uIChwX2RhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwX2NhbGxiYWNrKG51bGwsIHBfZGF0YSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcF9jYWxsYmFjayhcIi9hcGkvNC9uZXdzL2JlZm9yZS9cIiArIHBfZGF0ZSArIFwiIGVycm9yXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiOt+WPluaMh+WumuWUr+S4gOagh+ivhueahOaXpeaKpeOAglxyXG4gKiBAcGFyYW0gU3RyaW5nIHBfaWQg5oyH5a6a55qE5ZSv5LiA5qCH6K+G44CCXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb24oZXJyLCByZXMpfSBbcF9jYWxsYmFja11cclxuICovXHJcbmV4cG9ydHMuZ2V0U3RvcnkgPSBmdW5jdGlvbiAocF9pZCwgcF9jYWxsYmFjaylcclxue1xyXG4gICAgaWYgKF8uaXNGdW5jdGlvbihwX2NhbGxiYWNrKSlcclxuICAgIHtcclxuICAgICAgICBpZiAoXy5pc0VtcHR5KF8udHJpbShwX2lkKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHBfY2FsbGJhY2spKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwX2NhbGxiYWNrKFwicF9pZCBtdXN0IG5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICQuZ2V0KFwiL2FwaS80L25ld3MvXCIgKyBwX2lkLCBmdW5jdGlvbiAocF9kYXRhKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc3Rvcmllc1twX2lkXSA9IHBfZGF0YTtcclxuICAgICAgICAgICAgICAgIHBfY2FsbGJhY2sobnVsbCwgcF9kYXRhKTtcclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwX2NhbGxiYWNrKFwiL2FwaS80L25ld3MvIGVycm9yXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb250cm9sbGVycy9kYWlseS5qc1xuICoqLyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoXCIuL3Jlcy9OYXZiYXIubGVzc1wiKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG4vKipcbiAqIOWktOmDqOOAglxuICovXG52YXIgTmF2YmFySGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3MoXG57XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFyZ2V0OiBcIi5uYXZiYXItY29sbGFwc2VcIixcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKVxuICAgIHtcbiAgICAgICAgdmFyIG5hdmJhckhlYWRlciA9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZSBjb2xsYXBzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRhcmdldD17dGhpcy5wcm9wcy50YXJnZXR9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+5a+86IiqPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uLWJhclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwi55+l5LmO5pel5oqlXCIgc3JjPXtyZXF1aXJlKFwiLi4vY29tbW9uL3Jlcy9pbWcvemhpaHVfZGFpbHlfbG9nb19ibHVlLnBuZ1wiKX0gLz5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj47XG4gICAgICAgIHJldHVybiBuYXZiYXJIZWFkZXI7XG4gICAgfVxufSk7XG5cbi8qKlxuICog6I+c5Y2V44CCXG4gKi9cbnZhciBOYXZiYXJDb250ZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3MoXG57XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IFwiTmF2YmFyQ29udGVudFwiLFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpXG4gICAge1xuICAgICAgICB2YXIgbmF2YmFyQ29udGVudCA9XG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuYXZiYXItY29sbGFwc2UgY29sbGFwc2VcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIj48YSBocmVmPVwiI1wiPuaXpeaKpTwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZGlzYWJsZWRcIj48YSBocmVmPVwiI1wiPuS4k+agjzwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZGlzYWJsZWRcIj48YSBocmVmPVwiI1wiPuWFs+S6jjwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj47XG4gICAgICAgIHJldHVybiBuYXZiYXJDb250ZW50O1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIOWvvOiIquagj+OAglxuICovXG52YXIgTmF2YmFyID0gUmVhY3QuY3JlYXRlQ2xhc3MoXG57XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IFwiTmF2YmFyXCIsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKClcbiAgICB7XG4gICAgICAgIHZhciBuYXZiYXIgPVxuICAgICAgICAgICAgPG5hdiBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiTmF2YmFyIG5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPE5hdmJhckhlYWRlciB0YXJnZXQ9XCIjTmF2YmFyQ29udGVudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJDb250ZW50IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25hdj47XG4gICAgICAgIHJldHVybiBuYXZiYXI7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2YmFyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9jb21wb25lbnRzL05hdmJhci5qc3hcbiAqKi8iLCJyZXF1aXJlKFwiLi9yZXMvRGFpbHlQYWdlLmxlc3NcIik7XHJcblxyXG52YXIgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XHJcbnZhciBNb3VzZXRyYXAgPSByZXF1aXJlKFwibW91c2V0cmFwXCIpO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBSZWFjdFVwZGF0ZSA9IFJlYWN0LmFkZG9ucy51cGRhdGU7XHJcbnZhciBQdXJlUmVuZGVyTWl4aW4gPSBSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluO1xyXG52YXIgRGFpbHlNYW5hZ2VyID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvZGFpbHlcIik7XHJcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3V0aWxzXCIpO1xyXG5cclxuLy92YXIgQ2Fyb3VzZWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL0Nhcm91c2VsXCIpO1xyXG52YXIgRmxleFZpZXcgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL0ZsZXhWaWV3XCIpO1xyXG52YXIgQXJ0aWNsZVZpZXcgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL0FydGljbGVWaWV3XCIpO1xyXG5cclxuLyoqXHJcbiAqIOefpeS5juaXpeaKpemhtemdouOAglxyXG4gKi9cclxudmFyIERhaWx5UGFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKFxyXG57XHJcbiAgICBfY3VycmVudExvYWRlZERhdGU6IG51bGwsXHJcbiAgICBfY3VycmVudEluZGV4OiAtMSxcclxuICAgIF9pc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgX2lzQXJ0aWNsZVZpZXdWaXNpYmxlOiBmYWxzZSxcclxuXHJcbiAgICBfJEFydGljbGVWaWV3OiBudWxsLFxyXG4gICAgXyRBcnRpY2xlVmlld0NvbnRlbnQ6IG51bGwsXHJcblxyXG4gICAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3BTdG9yeUluZGV4ZXM6IFtdLFxyXG4gICAgICAgICAgICBzdG9yeUluZGV4ZXM6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50U3Rvcnk6IG51bGwsXHJcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gMeOAgeWIneWni+WMluOAglxyXG4gICAgICAgIHRoaXMuXyRBcnRpY2xlVmlldyA9ICQoXCIjQXJ0aWNsZVZpZXdcIik7XHJcbiAgICAgICAgdGhpcy5fJEFydGljbGVWaWV3Q29udGVudCA9ICQoXCIjQXJ0aWNsZVZpZXcgLm1vZGFsLWNvbnRlbnRcIik7XHJcblxyXG4gICAgICAgIC8vIDLjgIHliqDovb3ng63pl6jml6XmiqXvvIjkuI3lpb3nnIvjgILjgILjgILpmpDol4/kuoblkKctXy3vvInjgIJcclxuICAgICAgICAvL3RoaXMuX2xvYWRUb3BTdG9yaWVzKCk7XHJcblxyXG4gICAgICAgIC8vIDPjgIHliqDovb3mnIDmlrDml6XmiqXjgIJcclxuICAgICAgICB0aGlzLl9sb2FkT3RoZXJTdG9yaWVzKCk7XHJcblxyXG4gICAgICAgIC8vIDTjgIHkuovku7blpITnkIbjgIJcclxuICAgICAgICB0aGlzLl9hZGRFdmVudEhhbmRsZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gMeOAgeS6i+S7tuWkhOeQhuOAglxyXG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50SGFuZGxlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog5Yqg6L2954Ot6Zeo5pel5oql77yIQ2Fyb3VzZWzvvInjgIJcclxuICAgICovXHJcbiAgICBfbG9hZFRvcFN0b3JpZXM6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgRGFpbHlNYW5hZ2VyLmdldFRvcFN0b3J5SURzKGZ1bmN0aW9uIChlcnIsIHJlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpICYmICFlcnIgJiYgcmVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcFN0b3J5SW5kZXhlczogcmVzLmlkc1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog5Yqg6L295pyA5paw5pel5oql77yI6buY6K6k5LuF5Yqg6L295LuK5pel44CB5pio5pel55qE5pel5oql77yJ77yIRmxleFZpZXfvvInjgIJcclxuICAgICovXHJcbiAgICBfbG9hZE90aGVyU3RvcmllczogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYWlseU1hbmFnZXIuZ2V0U3RvcnlJRHMoZnVuY3Rpb24gKGVyciwgcmVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSAmJiAhZXJyICYmIHJlcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9hZGVkRGF0ZSA9IHJlcy5kYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFN0b3J5SW5kZXhlcyhyZXMuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUHJldlN0b3JpZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliqDovb3liY3kuIDlpKnnmoTml6XmiqXvvIjnm7jlr7nlvZPliY3lt7LliqDovb3ml6XmiqXnmoTml6XmnJ/vvInjgIJcclxuICAgICovXHJcbiAgICBfbG9hZFByZXZTdG9yaWVzOiBmdW5jdGlvbiAocF9jYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYWlseU1hbmFnZXIuZ2V0U3RvcnlJRHMoXHJcbiAgICAgICAgICAgICAgICBVdGlscy5wcmV2WmhpaHVEYXkodGhpcy5fY3VycmVudExvYWRlZERhdGUpLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVyciwgcmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIHJlcylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2FkZWREYXRlID0gcmVzLmRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFN0b3J5SW5kZXhlcyhyZXMuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihfLmlzRnVuY3Rpb24ocF9jYWxsYmFjaykpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDorqLotK3kuovku7bjgIJcclxuICAgICovXHJcbiAgICBfYWRkRXZlbnRIYW5kbGVyOiBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fJEFydGljbGVWaWV3Lm9uKFwiaGlkZS5icy5tb2RhbFwiLCBmdW5jdGlvbiAoZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0QXJ0aWNsZVZpZXdTY3JvbGwoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLl8kQXJ0aWNsZVZpZXcub24oXCJoaWRkZW4uYnMubW9kYWxcIiwgZnVuY3Rpb24gKGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0FydGljbGVWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuXyRBcnRpY2xlVmlldy5vbihcInNob3duLmJzLm1vZGFsXCIsIGZ1bmN0aW9uIChlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faXNBcnRpY2xlVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl8kQXJ0aWNsZVZpZXdDb250ZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkS2V5Ym9hcmRTaG9ydGN1dHMoKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCB0aGlzLl9zY3JvbGxIYW5kbGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOmAgOi0reS6i+S7tuOAglxyXG4gICAgKi9cclxuICAgIF9yZW1vdmVFdmVudEhhbmRsZXI6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl8kQXJ0aWNsZVZpZXcub2ZmKFwiaGlkZS5icy5tb2RhbFwiKTtcclxuICAgICAgICB0aGlzLl9yZW1vdmVLZXlib2FyZFNob3J0Y3V0cygpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZihcInNjcm9sbFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOa3u+WKoOmUruebmOW/q+aNt+mUruOAglxyXG4gICAgKi9cclxuICAgIF9hZGRLZXlib2FyZFNob3J0Y3V0czogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIE1vdXNldHJhcC5iaW5kKFwiZXNjXCIsIHRoaXMuX2Nsb3NlQXJ0aWNsZVZpZXcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE1vdXNldHJhcC5iaW5kKFwialwiLCB0aGlzLl9rZXlkb3duU2hvd05leHRTdG9yeSk7XHJcbiAgICAgICAgTW91c2V0cmFwLmJpbmQoXCJrXCIsIHRoaXMuX2tleWRvd25TaG93UHJldlN0b3J5KTtcclxuXHJcbiAgICAgICAgTW91c2V0cmFwLmJpbmQoW1wib1wiLCBcImVudGVyXCJdLCBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzQXJ0aWNsZVZpZXdWaXNpYmxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93QXJ0aWNsZShEYWlseU1hbmFnZXIuZ2V0RmV0Y2hlZFN0b3JpZXMoKVt0aGlzLnN0YXRlLnN0b3J5SW5kZXhlc1t0aGlzLl9jdXJyZW50SW5kZXhdXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBNb3VzZXRyYXAuYmluZChcImxlZnRcIiwgZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faXNBcnRpY2xlVmlld1Zpc2libGVcclxuICAgICAgICAgICAgICAgID8gdGhpcy5fa2V5ZG93blNob3dQcmV2U3RvcnkoKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9taW51c0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgTW91c2V0cmFwLmJpbmQoXCJyaWdodFwiLCBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0FydGljbGVWaWV3VmlzaWJsZVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9rZXlkb3duU2hvd05leHRTdG9yeSgpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuX2FkZEN1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIE1vdXNldHJhcC5iaW5kKFwidlwiLCBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBcnRpY2xlVmlld1Zpc2libGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICQoXCIudmlldy1tb3JlIGFcIikubWFwKGZ1bmN0aW9uIChpLCBvKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOenu+mZpOmUruebmOW/q+aNt+mUruOAglxyXG4gICAgKi9cclxuICAgIF9yZW1vdmVLZXlib2FyZFNob3J0Y3V0czogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIE1vdXNldHJhcC5yZXNldCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogQXJ0aWNsZVZpZXcg5pi+56S65LiL5LiA5Liq5pel5oql77yI5aaC5p6c5b2T5YmN5pyq5omT5byAIEFydGljbGVWaWV3IOWImeiHquWKqOaJk+W8gO+8ieOAglxyXG4gICAgKi9cclxuICAgIF9rZXlkb3duU2hvd05leHRTdG9yeTogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgIGlmKGluZGV4IDwgdGhpcy5zdGF0ZS5zdG9yeUluZGV4ZXMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuX2lzTG9hZGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3J5ID0gRGFpbHlNYW5hZ2VyLmdldEZldGNoZWRTdG9yaWVzKClbdGhpcy5zdGF0ZS5zdG9yeUluZGV4ZXNbaW5kZXhdXTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2lzQXJ0aWNsZVZpZXdWaXNpYmxlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRBcnRpY2xlKHN0b3J5LCBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDdXJyZW50SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRBcnRpY2xlVmlld1Njcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dBcnRpY2xlKHN0b3J5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDoh6rliqjliqDovb3liY3kuIDlpKnml6XmiqXjgIJcclxuICAgICAgICAgICAgaWYoIXRoaXMuX2lzTG9hZGluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRQcmV2U3RvcmllcyhmdW5jdGlvbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogQXJ0aWNsZVZpZXcg5pi+56S65LiK5LiA5Liq5pel5oql77yI5aaC5p6c5b2T5YmN5pyq5omT5byAIEFydGljbGVWaWV3IOWImeiHquWKqOaJk+W8gO+8ieOAglxyXG4gICAgKi9cclxuICAgIF9rZXlkb3duU2hvd1ByZXZTdG9yeTogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgIGlmKGluZGV4ID49IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RvcnkgPSBEYWlseU1hbmFnZXIuZ2V0RmV0Y2hlZFN0b3JpZXMoKVt0aGlzLnN0YXRlLnN0b3J5SW5kZXhlc1tpbmRleF1dO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9pc0FydGljbGVWaWV3VmlzaWJsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZEFydGljbGUoc3RvcnksIGZ1bmN0aW9uKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9taW51c0N1cnJlbnRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0QXJ0aWNsZVZpZXdTY3JvbGwoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0FydGljbGUoc3RvcnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog55uR5o6n5Z6C55u05rua5Yqo5p2h5L2N572u77yM5Yqo5oCB5Yqg6L295YaF5a6544CCXHJcbiAgICAqL1xyXG4gICAgX3Njcm9sbEhhbmRsZXI6IGZ1bmN0aW9uIChlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIDE4NSDmmK8gRmxleC1UaWxlIOeahOS4gOWNiumrmOW6puOAglxyXG4gICAgICAgIGlmKCF0aGlzLl9pc0xvYWRpbmcgJiYgKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID49ICQoZG9jdW1lbnQpLmhlaWdodCgpLSQod2luZG93KS5oZWlnaHQoKSAtIDE4NSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkUHJldlN0b3JpZXMoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDph43orr4gQXJ0aWNsZVZpZXcg55qE5Z6C55u05rua5Yqo5p2h5L2N572u44CCXHJcbiAgICAqL1xyXG4gICAgX3Jlc2V0QXJ0aWNsZVZpZXdTY3JvbGw6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fJEFydGljbGVWaWV3Q29udGVudC5zY3JvbGxUb3AoMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlop7ph4/liqDovb3mjIflrprnmoTml6XmiqXjgIJcclxuICAgICovXHJcbiAgICBfYWRkU3RvcnlJbmRleGVzOiBmdW5jdGlvbiAocF9pbmRleGVzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdG9yeUluZGV4ZXM6IFJlYWN0VXBkYXRlKHRoaXMuc3RhdGUuc3RvcnlJbmRleGVzLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkcHVzaDogcF9pbmRleGVzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jYXJvdXNlbENsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fc2hvd0FydGljbGUoRGFpbHlNYW5hZ2VyLmdldEZldGNoZWRTdG9yaWVzKClbZS5pZF0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdGlsZUNsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fc2hvd0FydGljbGUoZS5zdG9yeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmiZPlvIAgQXJ0aWNsZVZpZXcg5bm25Yqg6L295oyH5a6a55qE5pel5oql44CCXHJcbiAgICAqL1xyXG4gICAgX3Nob3dBcnRpY2xlOiBmdW5jdGlvbiAocF9zdG9yeSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9sb2FkQXJ0aWNsZShwX3N0b3J5LCBmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRDdXJyZW50SW5kZXgodGhpcy5fZ2V0U3RvcnlJbmRleEJ5SWQocF9zdG9yeS5pZCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcGVuQXJ0aWNsZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWQkSBBcnRpY2xlVmlldyDkuK3liqDovb3mjIflrprnmoTml6XmiqXvvIjku4XmlLnlj5jlhoXlrrnvvIzkuI3mlLnlj5jmmL7npLrnirbmgIHvvIzlhYHorrjlnKjlm57osIPkuK3ov5vooYzmjqfliLbvvInjgIJcclxuICAgICovXHJcbiAgICBfbG9hZEFydGljbGU6IGZ1bmN0aW9uIChwX3N0b3J5LCBwX2NhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHBfc3RvcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yeTogcF9zdG9yeVxyXG4gICAgICAgICAgICB9LCBwX2NhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5bmjIflrprllK/kuIDmoIfor4bnmoTml6XmiqXnmoTntKLlvJXjgIJcclxuICAgICovXHJcbiAgICBfZ2V0U3RvcnlJbmRleEJ5SWQ6IGZ1bmN0aW9uIChwX2lkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfLmluZGV4T2YodGhpcy5zdGF0ZS5zdG9yeUluZGV4ZXMsIHBfaWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog5omT5byAIEFydGljbGVWaWV344CCXHJcbiAgICAqL1xyXG4gICAgX29wZW5BcnRpY2xlVmlldzogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5faXNBcnRpY2xlVmlld1Zpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl8kQXJ0aWNsZVZpZXcubW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlhbPpl60gQXJ0aWNsZVZpZXfjgIJcclxuICAgICovXHJcbiAgICBfY2xvc2VBcnRpY2xlVmlldzogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pc0FydGljbGVWaWV3VmlzaWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuXyRBcnRpY2xlVmlldy5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog5b2T5YmN5pel5oql57Si5byV5aKe5YqgMeOAglxyXG4gICAgKi9cclxuICAgIF9hZGRDdXJyZW50SW5kZXg6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fY3VycmVudEluZGV4ICsgMSA8IHRoaXMuc3RhdGUuc3RvcnlJbmRleGVzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEN1cnJlbnRJbmRleCh0aGlzLl9jdXJyZW50SW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlvZPliY3ml6XmiqXntKLlvJXlh4/lsJEx44CCXHJcbiAgICAqL1xyXG4gICAgX21pbnVzQ3VycmVudEluZGV4OiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2N1cnJlbnRJbmRleCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRDdXJyZW50SW5kZXgodGhpcy5fY3VycmVudEluZGV4IC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICog6K6+572u5pel5oql57Si5byV44CCXHJcbiAgICAqL1xyXG4gICAgX3NldEN1cnJlbnRJbmRleDogZnVuY3Rpb24gKHBfaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGUgPSB7b2xkSW5kZXg6IHRoaXMuX2N1cnJlbnRJbmRleCwgbmV3SW5kZXg6IHBfaW5kZXh9O1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHBfaW5kZXg7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4Q2hhbmdlZEhhbmRsZXIoZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jdXJyZW50SW5kZXhDaGFuZ2VkSGFuZGxlcjogZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudFRpbGUoZS5vbGRJbmRleCwgZS5uZXdJbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmm7TmlrDlvZPliY0gRmxleFRpbGUg5qC35byP44CCXHJcbiAgICAqL1xyXG4gICAgX3VwZGF0ZUN1cnJlbnRUaWxlOiBmdW5jdGlvbiAocF9vbGRJbmRleCwgcF9uZXdJbmRleClcclxuICAgIHtcclxuICAgICAgICBpZihwX29sZEluZGV4ID49IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKFwiI3N0b3J5XCIgKyB0aGlzLnN0YXRlLnN0b3J5SW5kZXhlc1twX29sZEluZGV4XSkucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyICRuZXdUaWxlID0gJChcIiNzdG9yeVwiICsgdGhpcy5zdGF0ZS5zdG9yeUluZGV4ZXNbcF9uZXdJbmRleF0pO1xyXG4gICAgICAgICRuZXdUaWxlLmFkZENsYXNzKFwiY3VycmVudFwiKTtcclxuXHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm6ZyA6KaB56e75Yqo5rua5Yqo5p2h55qE5L2N572u77yM5Lul5L2/5YaF5a655Y+v6KeB44CCXHJcbiAgICAgICAgLy8gNzEg5pivIGJvZHkg55qEIHBhZGRpbmctdG9wIOS4jiBGbGV4VGlsZSDnmoQgbWFyZ2luLXRvcCDkuYvlkozvvIjljbMgNTEgKyAyMO+8ieOAglxyXG4gICAgICAgIHZhciBuZXdUb3AgPSAkbmV3VGlsZS5vZmZzZXQoKS50b3AgLSA3MTtcclxuICAgICAgICB2YXIgbW92ZURvd24gPSBuZXdUb3AgKyAkbmV3VGlsZS5vdXRlckhlaWdodCh0cnVlKSAtICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID4gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIHZhciBtb3ZlVXAgPSBuZXdUb3AgPCAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZihtb3ZlRG93biB8fCBtb3ZlVXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyDmraTlpITnlKggYW5pbWF0ZSDnmoTor53vvIzlrZjlnKjpl67popjvvIzmjInkvY/mjInplK7kuI3mlL7kvJrlh7rpl67popjjgIJcclxuICAgICAgICAgICAgJChkb2N1bWVudCkuc2Nyb2xsVG9wKG5ld1RvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8g5bm754Gv54mH77yI5LiN5aW955yL44CC44CC44CC6ZqQ6JeP5LqG5ZCnLV8t77yJ44CCXHJcbiAgICAgICAgLy88ZGl2IGNsYXNzTmFtZT1cIkNhcm91c2VsQ29udGFpbmVyIGNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICAgIC8vICAgIDxDYXJvdXNlbCBvbkNsaWNrPXt0aGlzLl9jYXJvdXNlbENsaWNrSGFuZGxlcn0gaW5kZXhlcz17dGhpcy5zdGF0ZS50b3BTdG9yeUluZGV4ZXN9IC8+XHJcbiAgICAgICAgLy88L2Rpdj5cclxuXHJcbiAgICAgICAgdmFyIHBhZ2UgPVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRhaWx5UGFnZSBjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgICAgICAgICAgIDxGbGV4VmlldyBvblRpbGVDbGljaz17dGhpcy5fdGlsZUNsaWNrSGFuZGxlcn0gaW5kZXhlcz17dGhpcy5zdGF0ZS5zdG9yeUluZGV4ZXN9IGxvYWRpbmc9e3RoaXMuc3RhdGUubG9hZGluZ30vPlxyXG4gICAgICAgICAgICAgICAgPEFydGljbGVWaWV3IHN0b3J5PXt0aGlzLnN0YXRlLmN1cnJlbnRTdG9yeX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+O1xyXG4gICAgICAgIHJldHVybiBwYWdlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGFpbHlQYWdlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9EYWlseVBhZ2UuanN4XG4gKiovIiwicmVxdWlyZShcIi4vcmVzL0FydGljbGVWaWV3Lmxlc3NcIik7XG5cbnZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbnZhciBjbGFzc05hbWVzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgUHVyZVJlbmRlck1peGluID0gUmVhY3QuYWRkb25zLlB1cmVSZW5kZXJNaXhpbjtcblxudmFyIEFydGljbGVIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyhcbntcbiAgICByZW5kZXIgOiBmdW5jdGlvbigpXG4gICAge1xuICAgICAgICB2YXIgaGFzQmFja2dyb3VuZHMgPSB0aGlzLnByb3BzLnN0b3J5LmJhY2tncm91bmRzLmxlbmd0aCA+IDA7XG4gICAgICAgIHZhciBjbGFzc2VzSGVhZGVyUGljdHVyZSA9IGNsYXNzTmFtZXMoXG4gICAgICAgICAgICBcImFydGljbGUtaGVhZGVyLXBpY3R1cmVcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInJhZGl1cy1hbGxcIjogIWhhc0JhY2tncm91bmRzLFxuICAgICAgICAgICAgICAgIFwicmFkaXVzLXRvcFwiOiBoYXNCYWNrZ3JvdW5kcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY2xhc3Nlc0hlYWRlckNhcHRpb24gPSBjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJhcnRpY2xlLWhlYWRlci1jYXB0aW9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJyYWRpdXMtYm90dG9tXCI6ICFoYXNCYWNrZ3JvdW5kcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIC8vIOayoeacieWbvueJh+eJiOadg+S/oeaBr+aXtumakOiXj+OAglxuICAgICAgICB2YXIgY2xhc3Nlc0ltYWdlU291cmNlID0gY2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImhpZGVcIjogIXRoaXMucHJvcHMuc3RvcnkuaW1hZ2VTb3VyY2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcbiAgICAgICAgdmFyIHRpdGxlUm93ID1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aWNsZS1oZWFkZXItdGl0bGVcIiBrZXk9XCJhcnRpY2xlLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc0hlYWRlclBpY3R1cmV9IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBcInVybChcIiArIHRoaXMucHJvcHMuc3RvcnkuaW1hZ2UgKyBcIilcIn19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc0hlYWRlckNhcHRpb259PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17dGhpcy5wcm9wcy5zdG9yeS5zaGFyZVVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPnt0aGlzLnByb3BzLnN0b3J5LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWVzPXtjbGFzc2VzSW1hZ2VTb3VyY2V9IGhyZWY9e1wiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT1cIiArIHRoaXMucHJvcHMuc3RvcnkuaW1hZ2VTb3VyY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNvcHlyaWdodC1tYXJrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zdG9yeS5pbWFnZVNvdXJjZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj47XG4gICAgICAgIHJvd3MucHVzaCh0aXRsZVJvdyk7XG4gICAgXG4gICAgICAgIGlmKGhhc0JhY2tncm91bmRzKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZFJvd3MgPSBfLm1hcCh0aGlzLnByb3BzLnN0b3J5LmJhY2tncm91bmRzLCBmdW5jdGlvbih2YWx1ZSwgaSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJhcnRpY2xlLWJhY2tncm91bmRzLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17dmFsdWUuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiYmFja2dyb3VuZFwiICsgaX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3ZhbHVlLnRpdGxlICsgXCLvvJpcIiArIHZhbHVlLnRleHR9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm93cy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aWNsZS1iYWNrZ3JvdW5kc1wiIGtleT1cImFydGljbGUtYmFja2dyb3VuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAge2JhY2tncm91bmRSb3dzfVxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhcnRpY2xlLWJhY2tncm91bmRzLWFycm93IGdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1yaWdodFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXJ0aWNsZUhlYWRlciBtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICB7cm93c31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgQXJ0aWNsZUJvZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyhcbntcbiAgICByZW5kZXIgOiBmdW5jdGlvbigpXG4gICAge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gW107XG4gICAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMucHJvcHMuY29udGVudHMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbm5lclJvd3Mg5YyF5ZCr77ya5qCH6aKY44CB562U5qGI44CB5aSW6ZO+44CCXG4gICAgICAgICAgICB2YXIgaW5uZXJSb3dzID0gW107XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5wcm9wcy5jb250ZW50c1tpXTtcblxuICAgICAgICAgICAgLy8gMeOAgeagh+mimOOAglxuICAgICAgICAgICAgaWYoIV8uaXNFbXB0eShpdGVtLnRpdGxlKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbm5lclJvd3MucHVzaCg8aDMgY2xhc3NOYW1lPVwicXVlc3Rpb24tdGl0bGVcIiBrZXk9e1wicXVlc3Rpb24tdGl0bGVcIitpfT57aXRlbS50aXRsZX08L2gzPik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDLjgIHnrZTmoYjjgIJcbiAgICAgICAgICAgIHZhciBhbnN3ZXJzID0gXy5tYXAoaXRlbS5hbnN3ZXJzLCBmdW5jdGlvbih2YWx1ZSwgailcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyDmsqHmnInkvZzogIXlm77niYfml7bpmpDol4/jgIJcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3Nlc0F2YXRhciA9IGNsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIFwiYXZhdGFyXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGlkZVwiOiBfLmlzRW1wdHkodmFsdWUuYXZhdGFyKSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uLWFuc3dlclwiIGtleT17XCJxdWVzdGlvbi1hbnN3ZXItXCIraStcIi1cIitqfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb24tYW5zd2VyLW1ldGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT17Y2xhc3Nlc0F2YXRhcn0gc3JjPXt2YWx1ZS5hdmF0YXJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXV0aG9yXCI+e3ZhbHVlLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJpb1wiPnt2YWx1ZS5iaW99PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uLWFuc3dlci1jb250ZW50XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IHZhbHVlLmNvbnRlbnR9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShpbm5lclJvd3MsIGFuc3dlcnMpO1xuXG4gICAgICAgICAgICAvLyAz44CB5aSW6ZO+44CCXG4gICAgICAgICAgICBpZihpdGVtLmxpbmspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5uZXJSb3dzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlldy1tb3JlXCIga2V5PXtcInZpZXctbW9yZVwiK2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17aXRlbS5saW5rLmhyZWZ9IHRhcmdldD1cIl9ibGFua1wiPjxiPntpdGVtLmxpbmsudGV4dH08L2I+PC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXN0aW9uXCIga2V5PXtcInF1ZXN0aW9uXCIraX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbm5lclJvd3N9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyDliIbpmpTnrKbjgIJcbiAgICAgICAgICAgIGlmIChpIDwgbGVuZ3RoIC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKDxociBjbGFzc05hbWU9XCJxdWVzdGlvbi1zZXBhcmF0b3JcIiBrZXk9e1wicXVlc3Rpb24tc2VwYXJhdG9yXCIraX0vPik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcnRpY2xlQm9keSBtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAge3F1ZXN0aW9uc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgQXJ0aWNsZVZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyhcbntcbiAgICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBcIkFydGljbGVWaWV3XCJcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKVxuICAgIHtcbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5zdG9yeSlcbiAgICAgICAge1xuICAgICAgICAgICAgcm93cyA9IFtcbiAgICAgICAgICAgICAgICA8QXJ0aWNsZUhlYWRlciBrZXk9XCJoZWFkZXJcIiBzdG9yeT17dGhpcy5wcm9wcy5zdG9yeX0gLz4sXG4gICAgICAgICAgICAgICAgPEFydGljbGVCb2R5IGtleT1cImJvZHlcIiBjb250ZW50cz17dGhpcy5wcm9wcy5zdG9yeS5jb250ZW50c30gLz4sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT1cIkFydGljbGVWaWV3IG1vZGFsIGZhZGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGVWaWV3O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb21wb25lbnRzL0FydGljbGVWaWV3LmpzeFxuICoqLyIsInJlcXVpcmUoXCIuL3Jlcy9GbGV4Vmlldy5sZXNzXCIpO1xyXG5cclxudmFyIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBQdXJlUmVuZGVyTWl4aW4gPSBSZWFjdC5hZGRvbnMuUHVyZVJlbmRlck1peGluO1xyXG52YXIgRGFpbHlNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2RhaWx5XCIpO1xyXG52YXIgUHJlbG9hZGVyID0gcmVxdWlyZShcIi4vUHJlbG9hZGVyXCIpO1xyXG5cclxudmFyIEZsZXhUaWxlID0gUmVhY3QuY3JlYXRlQ2xhc3MoXHJcbntcclxuICAgIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXHJcblxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0b3J5OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYWlseU1hbmFnZXIuZ2V0U3RvcnkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmlkLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVyciwgcmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpICYmICFlcnIgJiYgcmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcnk6IHJlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DbGljaykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soe1xyXG4gICAgICAgICAgICAgICAgc3Rvcnk6IHRoaXMuc3RhdGUuc3RvcnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBudWxsO1xyXG4gICAgICAgIHZhciBzdG9yeSA9IHRoaXMuc3RhdGUuc3Rvcnk7XHJcbiAgICAgICAgaWYgKHN0b3J5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8g5aaC5p6c5rKh5pyJIGltZyDopoHkvZzlpITnkIbvvIzlkKbliJnkuI3lpb3nnIvjgIJcclxuICAgICAgICAgICAgaXRlbSA9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXtcInN0b3J5XCIrc3RvcnkuaWR9IGNsYXNzTmFtZT1cImZsZXgtdGlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC10aWxlLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXRpbGUtcGljdHVyZVwiIHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBcInVybChcIiArIHN0b3J5LmltYWdlICsgXCIpXCJ9fSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtdGlsZS10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiZmxleC10aWxlLWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDo7XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3N0b3J5LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtdGlsZS1zdHJpcGVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC10aWxlLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtdGlsZS1mb290ZXItcmlnaHQtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17c3Rvcnkuc2hhcmVVUkx9IHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tbmV3LXdpbmRvd1wiIHRpdGxlPVwi5Zyo5paw5qCH562+6aG15Lit5omT5byA5Y6f5paHXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBGbGV4VmlldyA9IFJlYWN0LmNyZWF0ZUNsYXNzKFxyXG57XHJcbiAgICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gXy5tYXAodGhhdC5wcm9wcy5pbmRleGVzLCBmdW5jdGlvbiAodmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKDxGbGV4VGlsZSBvbkNsaWNrPXt0aGF0LnByb3BzLm9uVGlsZUNsaWNrfSBrZXk9e1widGlsZVwiICsgdmFsdWV9IGlkPXt2YWx1ZX0gLz4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcHJlbG9hZGVyQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwiZmxleC1wcmVsb2FkZXJcIixcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsb2FkaW5nXCI6IHRoaXMucHJvcHMubG9hZGluZyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRmxleFZpZXdcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge2l0ZW1zfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8UHJlbG9hZGVyIGNsYXNzTmFtZT17cHJlbG9hZGVyQ2xhc3Nlc30gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZsZXhWaWV3O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L1dvcmtzcGFjZS9WaXN1YWwgU3R1ZGlvL1poaWh1LURhaWx5LVJlYWRlci9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb21wb25lbnRzL0ZsZXhWaWV3LmpzeFxuICoqLyIsInJlcXVpcmUoXCIuL3Jlcy9QcmVsb2FkZXIubGVzc1wiKTtcclxuXHJcbnZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG5cclxudmFyIFByZWxvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKFxyXG57XHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjbGFzc2VzID0gXCJQcmVsb2FkZXJcIjtcclxuICAgICAgICBpZighXy5pc0VtcHR5KF8udHJpbSh0aGlzLnByb3BzLmNsYXNzTmFtZSkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIndhdmUxXCIvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwid2F2ZTJcIi8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3YXZlM1wiLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIndhdmU0XCIvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwid2F2ZTVcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQcmVsb2FkZXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovV29ya3NwYWNlL1Zpc3VhbCBTdHVkaW8vWmhpaHUtRGFpbHktUmVhZGVyL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbXBvbmVudHMvUHJlbG9hZGVyLmpzeFxuICoqLyIsInZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxudmFyIG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XHJcblxyXG52YXIgRm9ybWF0U3RyaW5nID0gXCJZWVlZTU1ERFwiO1xyXG52YXIgTWluRGF0ZVN0cmluZyA9IFwiMjAxMzA1MjBcIjtcclxuXHJcbi8qKlxyXG4gKiDnn6XkuY7ml6XmiqXnmoTotbflp4vml6XmnJ/vvIjml6nkuo7or6Xml6XmnJ/ov5jmsqHmnInml6XmiqXlkaLvvInjgIJcclxuICovXHJcbmV4cG9ydHMuTUlOX0RBVEUgPSBtb21lbnQoTWluRGF0ZVN0cmluZywgRm9ybWF0U3RyaW5nLCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiDovazmjaLml6XmnJ/kuLrnn6XkuY7ml6XmnJ/moLzlvI/jgIJcclxuICogQHBhcmFtIHtTdHJpbmd8RGF0ZX0gcF9kYXRlIOaXpeacn+OAglxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IOefpeS5juaXpeacn+agvOW8j+Wtl+espuS4su+8m+WmguaenCBwX2RhdGUg5piv5peg5pWI55qE5pel5pyf77yM6L+U5ZueIG51bGzjgIJcclxuICovXHJcbmV4cG9ydHMuY29udmVydFRvWmhpaHVEYXRlID0gZnVuY3Rpb24gKHBfZGF0ZSlcclxue1xyXG4gICAgdmFyIG0gPSBudWxsO1xyXG4gICAgaWYgKF8uaXNEYXRlKHBfZGF0ZSkpXHJcbiAgICB7XHJcbiAgICAgICAgbSA9IG1vbWVudChwX2RhdGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoXy5pc1N0cmluZyhwX2RhdGUpKVxyXG4gICAge1xyXG4gICAgICAgIG0gPSB0aGlzLmNvbnZlcnRaaGlodURhdGVUb01vbWVudChwX2RhdGUpO1xyXG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtID0gbW9tZW50KG5ldyBEYXRlKHBfZGF0ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKG0pXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG0uaXNWYWxpZCgpID8gbS5mb3JtYXQoRm9ybWF0U3RyaW5nKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICog6L2s5o2i55+l5LmO5pel5pyf5Li6IE1vbWVudCDlr7nosaHjgIJcclxuICogQHBhcmFtIHtTdHJpbmd9IHBfZGF0ZSDlvaLlpoJcIjIwMTUwNzI2XCLnmoTml6XmnJ/lrZfnrKbkuLLjgIJcclxuICogQHJldHVybiB7TW9tZW50fVxyXG4gKi9cclxuZXhwb3J0cy5jb252ZXJ0WmhpaHVEYXRlVG9Nb21lbnQgPSBmdW5jdGlvbiAocF9kYXRlKVxyXG57XHJcbiAgICByZXR1cm4gbW9tZW50KHBfZGF0ZSwgRm9ybWF0U3RyaW5nLCB0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDorqHnrpfmjIflrprml6XmnJ/nmoTlkI7kuIDlpKnlr7nlupTnmoTnn6XkuY7ml6XmnJ/jgIJcclxuICogQHBhcmFtIHtTdHJpbmd8RGF0ZX0gcF9kYXRlIOaXpeacn+OAglxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IOefpeS5juaXpeacn+agvOW8j+Wtl+espuS4su+8m+WmguaenCBwX2RhdGUg5piv5peg5pWI55qE5pel5pyf77yM6L+U5ZueIG51bGzjgIJcclxuICovXHJcbmV4cG9ydHMubmV4dFpoaWh1RGF5ID0gZnVuY3Rpb24gKHBfZGF0ZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuc3ViWmhpaHVEYXRlKHBfZGF0ZSwgLTEpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIOiuoeeul+aMh+WumuaXpeacn+eahOWJjeS4gOWkqeWvueW6lOeahOefpeS5juaXpeacn+OAglxyXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfSBwX2RhdGUg5pel5pyf44CCXHJcbiAqIEByZXR1cm4ge1N0cmluZ30g55+l5LmO5pel5pyf5qC85byP5a2X56ym5Liy77yb5aaC5p6cIHBfZGF0ZSDmmK/ml6DmlYjnmoTml6XmnJ/vvIzov5Tlm54gbnVsbOOAglxyXG4gKi9cclxuZXhwb3J0cy5wcmV2WmhpaHVEYXkgPSBmdW5jdGlvbiAocF9kYXRlKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5zdWJaaGlodURhdGUocF9kYXRlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDorqHnrpfmjIflrprml6XmnJ/lh4/ljrvmjIflrprlpKnmlbDlkI7lr7nlupTnmoTnn6XkuY7ml6XmnJ/jgIJcclxuICogQHBhcmFtIHtEYXRlfFN0cmluZ30gcF9kYXRlIOaXpeacn+OAglxyXG4gKiBAcGFyYW0ge051bWJlcn0gcF9kYXkg6KaB5YeP5Y6755qE5aSp5pWw77yM5Y+v5Lul5Li66LSf5pWw77yI55u45b2T5LqO5aKe5Yqg5aSp5pWw77yJ77yb5aaC5p6c5LiN5oyH5a6a77yM5aSp5pWw5YePMeOAglxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IOefpeS5juaXpeacn+agvOW8j+Wtl+espuS4su+8m+WmguaenCBwX2RhdGUg5piv5peg5pWI55qE5pel5pyf77yM6L+U5ZueIG51bGzjgIJcclxuICovXHJcbmV4cG9ydHMuc3ViWmhpaHVEYXRlID0gZnVuY3Rpb24gKHBfZGF0ZSwgcF9kYXkpXHJcbntcclxuICAgIHZhciBtID0gdGhpcy5jb252ZXJ0WmhpaHVEYXRlVG9Nb21lbnQodGhpcy5jb252ZXJ0VG9aaGlodURhdGUocF9kYXRlKSk7XHJcbiAgICByZXR1cm4gbS5pc1ZhbGlkKCkgPyBtLnN1YnRyYWN0KHBfZGF5IHx8IDEsIFwiZGF5XCIpLmZvcm1hdChGb3JtYXRTdHJpbmcpIDogbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDmo4Dmn6XmjIflrprnmoTml6XmnJ/mmK/lkKbnrKblkIjnn6XkuY7ml6XmnJ/moLzlvI/vvIzljbPmmK/lkKblvaLlpoJcIjIwMTUwNzI2XCLjgIJcclxuICogQHBhcmFtIHtTdHJpbmd9IHBfZGF0ZSDml6XmnJ/jgIJcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICovXHJcbmV4cG9ydHMuaXNWYWxpZFpoaWh1RGF0ZSA9IGZ1bmN0aW9uIChwX2RhdGUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRaaGlodURhdGVUb01vbWVudChwX2RhdGUpLmlzVmFsaWQoKTtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovV29ya3NwYWNlL1Zpc3VhbCBTdHVkaW8vWmhpaHUtRGFpbHktUmVhZGVyL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbnRyb2xsZXJzL3V0aWxzLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHVibGljL2Fzc2V0cy96ZHIvY29tcG9uZW50cy9yZXMvTmF2YmFyLmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHVibGljL2Fzc2V0cy96ZHIvZGFpbHkvY29tcG9uZW50cy9yZXMvQXJ0aWNsZVZpZXcubGVzc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvYXNzZXRzL3pkci9kYWlseS9jb21wb25lbnRzL3Jlcy9GbGV4Vmlldy5sZXNzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L2NvbXBvbmVudHMvcmVzL1ByZWxvYWRlci5sZXNzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9hc3NldHMvemRyL2RhaWx5L3Jlcy9EYWlseVBhZ2UubGVzc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wdWJsaWMvYXNzZXRzL3pkci9yZXMvaW5kZXgubGVzc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFIc0FBQUFtQ0FZQUFBRGsxK1JXQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUFhZEVWWWRGTnZablIzWVhKbEFGQmhhVzUwTGs1RlZDQjJNeTQxTGpFeFIvTkNOd0FBRHRWSlJFRlVlRjd0V3d0Y1ZGVWE5MjJaanhaVHNZUzBUSTFxTFJOekkxM3NiWW0yWVNWdWFXbWFwRmI0U0MxZExYZlR0Q0FESHlnaUNnNm9pQm9QSHdncVBrSFhGK3Rya2NwS1hiZVl1WSs1YysvTWtIZi8zK1hNN013d0E0T0F0dTc4Zjcvdk56UG5udmYvTzkvM25YUHVOS2dKc2tzdGJlWWVNQVgyWHNNRk52MnlMSEQ5V2JNVWUxUlc1eFhLNnNMRHNycjhwS0p1Kzg2aXhoNVZ3cC9kSUFUR24xRHVaRVY5K0YvQi9FTDU5aEU1eHBDcHU2V0V0N2NiMVI0ck9iWEpsMlZxZzRYdTVkWVl2UnFjekttVGQwbi92bXVwSVdSQmtSeHlUbC9lbVZYbncyOFJpY1ZLNDgrTFRCR1BwZkIvNjVjcXFMZUFSSGZrVmlWK3NYcDFlSmFJMVcvS2VpOVA2c2FxOXVHM2hvSHB3cVNCRzRsazkwUjZLdzBoblpZWjFJZFhjMXRpanNqVDl2NWs5V2ROK0hDalVmeHorZGpRTkNFdVlKbEJka2VlVFpwRjY5Vk9TdzNxZlFtY2V1OEtnOW8yVGwrbGVXOGVYYWIyUytYVnp3NloxaWVjVkZxeDVueTRVU2k4WkIwYm1XdTgzSDZ4UVZ1UnJvU1JXUjZVSWFqdzQ3UmFYK21aeElXRnB2RmhJVG8rck10eVF4Z0lEUnV6M1hqcThiVzgydWlMeXVXcHptNVFqazhPbURKWmt6N2NDSlFZeXQrY3NsdjZtVmFvSzlHdEYrblZQOFAzZnJ6WE5HZGluckVuVEhIUG8xZktHN0dpVGxoVnJIUWR1a1hzdWZhMGNyVnZDdTlXYVdBUnJxYWZNMy9EaXZod1BURjZtN0ZKbnhSK1pnZXNhRWRTYUhYZW44aVZUOXNqcmZ3Z1gvTExLclUwWjBXcVJkRmxxeC9NOWRNZjdUV0pyUmJwelk2a04wYTlyMmVMLzJSWmZiaGV3Q3B0TVRGUG12elFLczZKYUNLa2Z5cHZ6djNlc3BKbHZXWTh1b1oveTMrSm9jeG0ycHZEMzBPQmZHUmZiMkQxaFl6ZFlYUWltZ1FydmZ6Z0pXc0N5MVpyL0Q2Skd3Y2YveTk4cW9IeFhQNjMzSysxVmlJZmFnQ3MycFl6Q3FUNUZKQTVFbjEzdkVGZGRseXBjekxXblRWSHBwdzJMMDgrWmZaRjQ5Y2IyQVlGdk9PeXFwdGgrL1QwZW1ISnFHM0dGaXliRHpjRHNEOE91QXQ3WlVleS80QnRVL2dXc1JmTDRzUE5ncmlqOHY2R0R2dGhpcGpoVTJkaWkrVXpzemNiSW5NbHAxVk5KMklQcithR3NNYyszRXdnaysxSTluTWJCUFhqdlZLOWtZMEFiVDNpQWZPb3JVYUJKZDFRN1ByQjBnTGlUNUpaYXZaSERPTS9lNy9KZitaZWszLzBZZG4vMkpYeUcyTGhsaHlUaDZFdjVua1FmSCtSSlZOL205ajZXd05wcWhYdTZPS3ZFWlNwNjgrWjY0M3NFZG5HRERxaHd4Wk1ZVWwxaGswbDVxNmZGOG5CNytkSndYOU00eXRKd0RKRGNPTXZ5b0l4VHJ0TTNpM05XM3BjVmttaWo4anF1N2xHbGE1eGFSNCtLakNwQlQ5YVkxajFka0FabXIrNTFlaFVUMDJseDBvdUdQVUVzaW9yQWYwZGZzOXl1bmN3cVBnZVJtbkkzMmhCa2Z5S3JiODFrQkN0VXJwN1J1TjJpY3FYMUgwL1dldUZiS3lTbmc4bGNZVjBXYkx3c0Z3bDJTRTZmZ2o2RTE2VnRGNmtEOGRFOUdWRkdxejZoNUkrQmtTOXVGRlFnMVp4bFlTVXpOMTV2YVBRZk55QmZPMGcvVk41RlRHTk83SzdnR3kzNWIwVmVpY0E5U3hpVlZhQ0I3SnZHNzlUVWluR3V1MnJpajU2RXJyRG9Jc24xbDRGMlUxZGJxa203NUxVZzVmcWgreTFwODJMZWlkWHVJMXhPeVFyUHFNOFNGdVFMZURUcVcrdVF1ZjFtSWdOclBvR2EwNlowL3ZDTGRGMWFxODF2RXJmYmZLRWpsY0hieExVb1Z0RWxZNkVTZUc2WThMN3BmSW5VVmUwVGJBemllNmZ4a2VqM3VnUk9XTDBxbUxsSlZhOUhZNWtFMmxVcDdjU2xpSFl5MTByMlMxQTlBT3J1R0xxb3ljWm5pWG1QN3JHZmlKYVFUWnBBRXZRWkJ6MjNObWxsbm9oKzhsMXdpTFNPc2YyUEVnUWtVMksyQXNkSHIvVFdFa2VYczFYSWh1V1k5QWJPV0pVYUJvZkJRc1ZoY214eStlRmN0U1c4K1lvK0s4b2tDKzN3QW9lbENHY3h1K25XSEU3NEFiK3dyNjZCZXF6ay8xWUNwOUxkWG9ySzR1VldWVE9IZGw0M2hBU1RZSzRLUWR1UiswY2IxRG5IalJ0cHJSRGw2eXhSUGJ2d0JuR1hlWEpKdkpQR0pZcDJ1YXpnbXhvaUMxQms1YzNpK1M3NnB4cytOUEJUNjdqUytpOC9YMjRpcTRydUhjR3BndWFPZXE2d3JBTGJUdWE2TlpFTm1ud0N4dUZJK2g0dUt0Z0YvR3JLOWsySkp4UUVtQ3kweEVYZk1LU25JQzZPV29YWlhOWWtoMHhSK1E0OUUyQ0JVcEhPMU5Zc2hNY3lZWjh4cEs5dzhLeTlsVE9IZGx3RzQzSWRaRFFrVEs5R1VSdUJic2pMYTFDMGIwait5LzdUQlBvbXBuMXNZSnNJcGNsYUVLTi9HbXpXT2RrdjVvcFRpR1QxSEdKUVoyMFN4cVJXS3kwbkpnbnFiZFhkRHlKWmJPRHlHYUVaTEVrSjZBT3F5ZXkwODZZTDVPWjlsOWlFSVpzRXVld1pEdXFJanNva1R2ZkdHV2hnS2RBZGxlVzdJVDZJaHVCWVNNS0RrbWc1R29yakkvR1NLYWYwdVlYbXR5UzNlWnJmUnhpa1NMVWF4ZFlydTlKVWU1UEpFVVJLc2hlV0NSYnFIR2JrRlAzaTlPSGYvVjN1YUdXb1E1QTVoV20wVUFFSUlDeUl1anBCYzFyVGgydkQ3S1RUeWwzanQ1bXRKQVY2Ym1hTTgzYVovb1l4Tm52M3QyUlBUTEgyQVNLdmduakwwZUFkalgvZ25VL2UxUUo5VVUyZnBOb1c3OW5Od2lSbmVHejZRMmc1OU9GRVpRV2UxUyt4eDNaQTlQRnJTRDhLczB2Q2JrL2pMMzg3bmlEK1lsVWZpd1V2bUxyaFVFSHVMNUlTTForemdGVG5SNlhvck9qMGVrU2RPQVorbzNPTnUrVHdta2RIN0N1YnNrbXdJUUhJc0Q1aVNMWGx6WUxxdTZNOGc1N1ZJbHNCR0YrR0hOR3V6aUQ1bGF3QUE1cEdUMEFZNmtYc2gyQnZua00wTnlaY1NqekRrZ0pDWFpUSlZoZ2xlT08xN09OQVhTUXdqcXVTZXV2OWJSOUdZdlZWNkVSZFFCMEloQXl3Q1lJbHA2ajRJdHUyOTdhYXR6bStBeHlXMjNKSnNEWGhYYkJoSkVnR3ErSzdGR1lnOHMwaVM5dEVnL1NLdGN5ZW9BajJURDNhMTM2WHFVc1BHeDYrVnJJUnN3VHZPS0VNcERJSnZQZUk1SExSajBEdkJGWUJHcjdsZ2FwWjh4K0grNlJjbHozMjRpY1ZUUXdqclZkSzZDaHpnajZVcWNYU0twTnB1NldOUDhOODZNRmhZN1BZSFpud1B6SXRTVWJ3VmFQc2R1TlNSTjJHcE5vb2xteVd6T09pUi96MURvaENSYWhQVXZ5Q0VleTZRVFNzZS9WeVh0NUZlVzhKZnZPcFFhNmJvNFp1OE40NGFPOWt1YXpIWG55UnVpUEhCaC9nRll4L0dnSWtldVlnUTRmVUxHbHhGRCtycGFwRmtCRHI0N0x0WnU5YXVYZFhFbkZYbGN6cWQ2U2pjOW40V3RwVzFPdEJNUWI1R2FJVGJDblB1ZnV1YXZBZjg0Q01mZHJEUU9PWkYrcmVDSWJDdG9HU2pHciswckRCckkwNUlQSnpaSTdva1ZCWk5QdkRrdjB4N0JROXRBaUpZWEQyQmVqM2s5dEFxdTVsYzRScUszNEU0cDY4S0sxZ3V4MVo4MGRZRXFYdTc1L1J1Wmk2aDZKTzZjdmo5SXlYaU5BOWowZ2V3enFkSlJJYW9QTU9DWnp2K016a0QybXBpc2JuekYwOGtWMTFyV2dmMFRNVUsxaHdJWHNISWpqdUtxVFNSQzNaRWNmbGhkZ3pLbTAxV3FKc1ZNK21nUGFvaUpRK3pSeWh6VGUwV2RINWhyblVEM1lQYWtJZ0x1emFqU2c3Z21QNjNpMUplWUk3bmcrZkhoTDlxaEJBd3lvSXpieENmUnVHRFZpRXpwaUhMbFYvQVVtZlJMTFdqZFlXTmFjNnFldDNqZm56YlVPME9DT1lzaGNMU2d5VlN2ZDRBZHBaWWZDZXJoNzdpcnpDazN4bUR6N0h4dGN5SzZ6QUcxemlmbEhXc0cwQU9oOVFDS2NEbFZHNW9pekVWZTBRbjZuQUExV29HdTd4ZnJ0dDhNVm9vd1QyZmNsY0JNb0h5bktCL2xTeGRiTEVkaXlURVhFWE9uOG1BNDNvRzJHNVNlVVU5OXl2NGF6N0xWQy9IRmxIOVhkZnJGZW5aaG5OR0F3RTlrakRUVWxHNXJiQVZGb0VLeEl0UUtORjJsTVQ2L25DOXc5ZHlOdHRVWVo2b3ZzblJjczNUODlZTG9ZR0c4SXdyaW0wcXRoMVVYandjbGNJczNENEF6eFBBTExXeWdOcS94SkJLU1h5ZHcvc0lxYkRLV28vTVpSL2dWTFUyeFJvcEhSVEw2Q0RVWVRVZ0R5RDcyVGVRWG1ScHhSWUFydXZZYjNlejFMOUp0N3dPUzMrd2RyalY1aDZwZktYeUV0cGc3UjN2NkZqWUlaQ2pBZXBHazdnTHFJeGozQlhZQldFOVFYMlZCNEVtMGUwVGV2dGw3YnY3UEV3ajliaUsvMGMrYnZDMzYwOXZ6c2tDelR3VkJvbWlDQnA1Y3BuMGRrbnJmRVBMTmVNSkgyc3dGVkVxbzhLSkhUYnBqb1dqQ3hXRW5iY001Y2JTUkxRRWU3Z2VneXYxaTlnckxIT3kwelhDRGk2VndlZFR4UGVmNGZ5WFlFK3ViMVBodmZsNEVyeFgrSndZQTVHVWJQS1g2Qk5aN0tzbFFOckxBWXJPSnN1a0Z5OTQ4T1Y2R0lFQm8xalJYM0NHaHVjTzlrcm9ST2VSNVp6V252amNPdmpLVC9pNUVmeFZaak5yWS9yWWhzc2lUUTJzTTBXRmNabGltVys4aitML3FrOEdkdDdwZDgvZkFzOFZ1NG42cFh0U01tNWtsTkkzT2xsTUVaQXAwelYwazZhZElqcS9rcXlZWUM5WnV5V3pwT2VVRlVPVG8vbTZVL05uMlA2UkR0S2VsWi8xUmhMZ2hScVBNME1CcXdxMUJROGxzZ0d3dGlPeVoxdkxlU2NGS1pUdVhxa215NlpJSy92a0xIdzFRM25WL2c5Mjc0NmtkWUZ1OXcrcGR5djV4U3l6UUVOZE1lVGVaM1lOVnB2dHRHc2swb2VoeWZhL1JJTmdqdGo1Vi9oUDdVUnlZYjV0dnA1UVdzK01jSGJSUUs2VHdZZzZMQmFHZTh0QTJoUHpDNENrWHgxMG8ydGpFY2JVbWVUeGRxVFRhNXNvaE0wV3VoYlJLVnE0NXNqRzg0TGJEcXlNYm4wTUdiaE8vb3FwcXVqMm5lS0E2aWVReE81bmROM2lYTng5emVUWGxyaEFWRjhvT3ZaWW9SYUN3Q0svUWl2Ym9UbGlHcTRSZ0E5bkk3VUdrUXkrb0VhSFJmUkpsSHUyR0F0Rm9wUDRLSk1leXhIZERHUGdnT0k3SkxMUkVJNEdSMnhYa1U1U05jQmZ0MmoxZWNOcUMrSU5TbncrVHEyc2JxZFNCR2g0blFRWWtzTkRFekNreTFKcHUycG5TejVLMFFlWjdJeGxnYVFuUndjN3BXaS9UN3lhM1JGZlRBallJVDJYU2NQU0NOUDQrRnA0T0ZLNlY4RHlJZjZoLzU0UjRwNHQ0VjNCZUJjTCtVVHUzQUZlY2l4dEZwalZ3TEVMbjNXbnBjQ2Zsd2p5a0VuUWpKS3JYY3l4NVZndTYwOHVvYjJhSkdOTjJ4emlpUVJrTXhxangzeDJRS2xQZnRiVWEzQWRxWGgyVXJ6REU5OTBqMjlBSlRLUDI5bUNhWEFrcDZZWUg2UU9ZT1c1WlNtRG0zeWxrZEhNbUdPMWdEZ2tLOGxZZVN1RUdleUc3enRiNFJIUitUMWJINTM0Z3NrVTdBbk1nbXkwcGtraXVpL0NCU25iQlRpaGl5U2RSdTl2RHBoOFVWL2RvM29sWVhqUmZ1UTZWbjlRNFEyd0lUKzFjUXBNNDdaQnFEZldBejlzZ2owUGxPTUxPQnlOdU9KVGxoOFRFNUFCcFB6KzlnU1pWdzRLSTFWSGZHVEljS1RyTDB1Q3hnNGp1eWJEWEdpaE5LRjJ3M2JhODgxU2hBUS83MlZBNFdVa1U5VG1TUDJtcHM5RWEyVWF1WExxZG03VE9wSzR1Vm1mREp0OUp6RzlrVXI3d0NJbWtzSUhSSzNER1pMcG1jTG0vd3UxVlV2aFNJK2Q1Qzg1NXlXdW43SDc1UGZOMjV3RHcvQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3B1YmxpYy9hc3NldHMvemRyL2NvbW1vbi9yZXMvaW1nL3poaWh1X2RhaWx5X2xvZ29fYmx1ZS5wbmdcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBNb3VzZXRyYXA7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIk1vdXNldHJhcFwiXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbW9tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtb21lbnRcIlxuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9