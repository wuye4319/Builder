/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(17);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(20)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(23)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @author MG Ding (丁文强)
 * @desc Link (链接)
 */

var Link = function Link(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      href = _ref.href,
      target = _ref.target,
      rest = _objectWithoutProperties(_ref, ['children', 'onClick', 'href', 'target']);

  var handleClick = function handleClick(e) {
    var flag = false;
    try {
      flag = window.parent.builderBridge.changePage(href);
    } catch (e) {}
    flag && e.preventDefault();
    onClick && onClick(e);
  };
  return React.createElement(
    'a',
    _extends({}, rest, { href: href, target: target, onClick: handleClick }),
    children
  );
};

Link.goTo = function (href) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'self';

  var a = document.createElement('a');
  a.href = href;

  if (target !== 'replace') {
    a.target = '_' + target;
  }

  var flag = false;
  try {
    flag = window.parent.builderBridge.changePage(href);
  } catch (e) {}

  if (!flag) {
    target === 'replace' ? window.location.replace(href) : a.click();
  }

  return flag;
};

exports.default = Link;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-param-reassign,prefer-destructuring */

exports.fixedZero = fixedZero;
exports.getDomPosition = getDomPosition;
exports.getConstructorName = getConstructorName;
exports.random = random;
exports.copyJson = copyJson;
exports.formatTime = formatTime;
exports.setClass = setClass;
exports.setText = setText;
exports.color = color;
exports.font = font;
exports.formatPrice = formatPrice;
exports.serialize = serialize;
exports.query2Obj = query2Obj;
exports.obj2Query = obj2Query;
exports.updateColor = updateColor;
exports.moveArrayItem = moveArrayItem;
exports._fetch = _fetch;
exports.fetch = fetch;
exports.fetchLite = fetchLite;

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(6);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @author MG Ding (丁文强)
 * @desc 工具方法
 */
function fixedZero(val) {
  return val * 1 < 10 ? '0' + val : val;
}

/**
 * 获取元素相对于页面的位置
 * @author MG
 * @param ele <DOM object>
 * @return object {top:*,left:*}
 * */
function getDomPosition(ele) {
  var left = 0;
  var top = 0;
  while (ele) {
    left += ele.offsetLeft;
    top += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return { left: left, top: top };
}

/**
 * 获取任意值的构造函数名
 * @author MG
 * @param obj <任意值>
 * @return string 除[undefined]和[null]返回他本身外,其他值都返回其构造函数名(字符串)
 *
 * @example getConstructorName(null)  >>>  null
 * @example getConstructorName({})  >>>  'Object'
 * @example getConstructorName([])  >>>  'Array'
 * @example getConstructorName(new FormData)  >>>  'FormData'
 * */
function getConstructorName(obj) {
  if (obj === 0) return 'Number';
  return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1];
}

/**
 * 取n到m的随机数 [n,m]
 * @author MG
 * @param n <number> 整数, m > n
 * @param m <number> 整数, m > n
 * @return number n到m之间的任意整数,包含n和m
 * */
function random(n, m) {
  // eslint-disable-next-line no-mixed-operators
  return window.parseInt(Math.random() * (m - n + 1) + n);
}

/**
 * 拷贝json数据
 * @author MG
 * @param obj <object|array>
 * @return obj <object|array>
 * */
function copyJson(obj) {
  var name = getConstructorName(obj);
  if (name === 'Object' || name === 'Array') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    console.warn('copyJson函数的参数不是对象或数组');
    return null;
  }
}

/**
 * 把时间戳转换为时间对象
 * @author MG
 * @param t <number> 时间戳，精确到毫秒的时间数字
 * @return obj <object>
 * */
function formatTime(t) {
  var obj = {
    date: '',
    time: '',
    dateTime: ''
  };

  var zeroPadding = function zeroPadding(n) {
    return n - 0 >= 10 ? n : '0' + n;
  };

  try {
    var D = new Date(t);

    var hours = zeroPadding(D.getHours());
    var minutes = zeroPadding(D.getMinutes());
    var seconds = zeroPadding(D.getSeconds());
    var year = D.getFullYear();
    var month = zeroPadding(D.getMonth() + 1);
    var day = zeroPadding(D.getDate());
    var time = hours + ':' + minutes + ':' + seconds;
    var date = year + '-' + month + '-' + day;

    obj = {
      date: date,
      time: time,
      dateTime: date + ' ' + time
    };
  } catch (err) {
    //
  }

  return obj;
}

/**
 * 类名格式化
 * @author MG
 * @param data Object
 * @return String
 * */
function setClass(data) {
  try {
    return Object.keys(data).filter(function (item) {
      return data[item];
    }).join(' ');
  } catch (e) {
    console.error(e);
    return '';
  }
}

/**
 * 文案格式化
 * @author MG
 * @param data Object
 * @return String
 * */
function setText(data) {
  try {
    return Object.keys(data).filter(function (item) {
      return data[item];
    }).join(' ');
  } catch (e) {
    console.error(e);
    return '';
  }
}

function color(key) {
  return 'c-' + key;
}

color.border = function (key) {
  return 'c-' + key + '-border';
};

color.bg = function (key) {
  return 'c-' + key + '-bg';
};

function font(key) {
  return 'f-' + key;
}

/**
 * 格式化价格：把字符串(或数字)转化成最多包含两位小数的数
 * @author MG
 * @param price <string|number> 要被格式化的数
 * @param zeroPadding <boolean> 小数部分是否补零，补零后返回的是字符串
 * @param min <number> 最小数
 * @param max <number> 最大数
 * @return NaN|number|string
 * **/
function formatPrice(price, zeroPadding, min, max) {
  var src = parseFloat(price);
  if (isNaN(src)) return src;
  if ((min || min === 0) && src < min) src = min;
  if ((max || max === 0) && src > max) src = max;
  src = Math.round(src * 100) / 100;
  if (zeroPadding) {
    src = parseInt(src) === src ? src + '.00' : (src + '00').match(/^\d*\.\d{2}/)[0];
  }
  return src;
}

/**
 * 对象序列化函数 {a:b,c:d} => 'a=b&c=d'
 * @author Code Lai
 * @param obj {object} 需要被序列化的对象
 * @param encode {boolean|undefined}
 * @return {string} 序列化结果
 */
function serialize(obj) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (obj.constructor !== Object) {
    console.error('传入的值必须是对象'); //eslint-disable-line
    return '';
  }
  var serializeArr = [];
  (function iteration(obj, key) {
    var _loop = function _loop(ele) {
      if (!obj.hasOwnProperty(ele)) return 'continue';
      (function () {
        var itemKey = key ? key + '[' + ele + ']' : ele;
        if (obj[ele].constructor === Object) {
          iteration(obj[ele], key);
        } else if (obj[ele].constructor === Array) {
          for (var i = obj[ele]; i--;) {
            serializeArr.push(itemKey + '[]=' + obj[ele][i]);
          }
        } else {
          serializeArr.push(itemKey + '=' + obj[ele]);
        }
      })(obj, key);
    };

    //eslint-disable-line
    for (var ele in obj) {
      var _ret = _loop(ele);

      if (_ret === 'continue') continue;
    }
  })(obj);
  return encode ? encodeURIComponent(serializeArr.join('&')) : serializeArr.join('&');
}

/**
 * 把search字符串转为对象
 * @author MG
 * @param search <string|undefined> search字符串
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return object search字符串转换成的对象,没有传参时返回本页面url的search的对象
 * */
function query2Obj(search, tag) {
  search = search || window.location[tag === '#' ? 'hash' : 'search'];
  if (typeof search !== 'string' || !search) {
    return {};
  }
  var obj = {};
  var arr = search.slice(1).split('&');

  arr.forEach(function (item) {
    var a = item.split('=');
    obj[a[0]] = a[1];
  });

  return obj;
}

/**
 * 把对象转为search字符串
 * @author MG
 * @param obj <object>
 * @param tag <string|undefined> 标记'#'，'?'(默认)
 * @return string
 * */
function obj2Query(obj, tag) {
  return (tag === '#' ? '#' : '?') + serialize(obj);
}

/**
 * 通过style写入颜色
 * @author MG
 * @param obj <object>
 * @param id <string|undefined> style标签的id
 * */
function updateColor(obj) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'theme-style';

  var style = document.getElementById(id);
  var formatColor = function formatColor() {
    return Object.keys(obj).map(function (item) {
      var value = obj[item].value;

      return '.c-' + item + '{color:' + value + '}.c-' + item + '-border{border-color:' + value + '}.c-' + item + '-bg{background-color:' + value + '}';
    }).join('');
  };

  if (style) {
    style.innerHTML = formatColor();
  } else {
    style = document.createElement('style');
    style.id = id;
    style.innerHTML = formatColor();
    document.head.appendChild(style);
  }
}

/**
 * 在数组内移动数组元素
 * @author MG
 * @param arr <array> 原数组
 * @param fromIndex <number> 起始位置
 * @param toIndex <number> 到达位置
 * @return arr <array> 排序后的数组
 * */

function moveArrayItem(arr, fromIndex, toIndex) {
  var target = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, target);
  return arr;
}

/**
 * 请求方法
 * @author MG
 */

function _fetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // options.credentials = options.credentials === undefined ? 'include' : options.credentials;
  options.headers = options.headers || {};

  if (getConstructorName(options.body) === 'Object') {
    /** POST请求,把参数转化为JSON字符串,并设置Content-Type **/
    if (options.method === 'POST' || options.method === 'post') {
      options.headers['Content-type'] = options.headers['Content-type'] || 'application/json; charset=UTF-8';
      options.body = JSON.stringify(options.body);
    } else {
      /** GET请求,把参数转化为查询字符串,并拼接到url后面 **/
      url = url + obj2Query(options.body || {});
      delete options.body;
    }
  }

  options.headers['Origin-Host'] = 'www.test.com';

  return window.fetch('http://192.168.0.38/web/v1' + url, options).then(function (response) {
    return response.json();
  });
}

/**
 * 请求方法
 * @author MG
 */

function fetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options.credentials = options.credentials || 'include';
  options.headers = _extends({}, options.headers || {});

  options.method = (options.method || 'GET').toUpperCase();

  if (getConstructorName(options.query) === 'Object') {
    url += obj2Query(options.query);
  }

  if (getConstructorName(options.body) === 'Object') {
    options.headers['Content-type'] = options.headers['Content-type'] || 'application/json; charset=UTF-8';
    options.body = JSON.stringify(options.body);
  }

  var query = options.query,
      rest = _objectWithoutProperties(options, ['query']);

  return window.fetch(url, rest).then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to fetch');
    }
  });
}

/**
 * 可处理错误的请求方法
 * @author MG
 * @params
 *  fetch <function> 返回一个promise对象的函数，一般是一个fetch函数
 *  options.done <function> data.state === 0 成功时的回调
 *  options.fail <function|string|false|其他> data.state !== 0 失败时的回调 | 失败时的提示文案 | 失败时什么也不做 | 失败时弹出接口返回的错误文案
 *  options.error <function|string|false|其他> 请求非200，失败时的回调 | 失败时的提示文案 | 失败时什么也不做 | 失败时弹出默认文案
 *  options.complete <function> promise finally 时的回调
 *  options.authority <boolean> 默认false 是否需要登录，传true时，未登录跳转到登录页
 */
function fetchLite(fetch) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var done = options.done,
      fail = options.fail,
      error = options.error,
      complete = options.complete,
      _options$authority = options.authority,
      authority = _options$authority === undefined ? false : _options$authority;


  fetch().then(function (data) {
    if (data.state === 0) {
      done && done(data);
    } else {
      var failType = typeof fail === 'undefined' ? 'undefined' : _typeof(fail);
      if (failType === 'function') {
        fail(data);
      } else if (failType === 'string') {
        _index2.default.error(fail);
      } else if (fail !== false) {
        _index2.default.error(data.msg);
      }

      if (authority && data.state === 10008) {
        _index4.default.goTo('/login/?ref=' + encodeURIComponent(window.location.href));
      }
    }
  }).catch(function (err) {
    var errorType = typeof error === 'undefined' ? 'undefined' : _typeof(error);
    console.error(err);
    if (errorType === 'function') {
      error(err);
    } else if (errorType === 'string') {
      _index2.default.error(error);
    } else if (error !== false) {
      err.message === 'Failed to fetch' && _index2.default.error('Network is busy');
    }
  }).finally(complete);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = __webpack_require__(30);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Icon2.default; /**
                                   * @author MG Ding (丁文强)
                                   * @desc Icon (图标)
                                   */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./ItemsList.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./ItemsList.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Message = __webpack_require__(24);

var _Message2 = _interopRequireDefault(_Message);

var _reactDom = __webpack_require__(34);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author MG Ding (丁文强)
 * @desc Message (全局提示)
 */
var container = document.createElement('div');
var instant = null;
var initMessage = function initMessage() {
  document.body.appendChild(container);
  instant = _reactDom2.default.render(React.createElement(_Message2.default, null), container);
};
var add = function add(type, content, duration) {
  !instant && initMessage();
  return instant.add(type, content, duration);
};

var message = {
  info: function info() {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    return add.apply(undefined, ['info'].concat(rest));
  },
  success: function success() {
    for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }

    return add.apply(undefined, ['success'].concat(rest));
  },
  error: function error() {
    for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      rest[_key3] = arguments[_key3];
    }

    return add.apply(undefined, ['error'].concat(rest));
  },
  warning: function warning() {
    for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      rest[_key4] = arguments[_key4];
    }

    return add.apply(undefined, ['warning'].concat(rest));
  },
  // loading: (...rest) => {
  //   return add('loading', ...rest)
  // },
  hide: function hide(id) {
    instant && instant.hide(id);
  }

};

exports.default = message;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setClass;
/**
 * 类名格式化
 * @author MG
 * @param data Object
 * @return String
 * */
function setClass(data) {
  try {
    return Object.keys(data).filter(function (item) {
      return data[item];
    }).join(' ');
  } catch (e) {
    console.error(e);
    return '';
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TopicsDetails = __webpack_require__(14);

var _TopicsDetails2 = _interopRequireDefault(_TopicsDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author：Gavin Yang (杨伟伟)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc：专题集合页
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @paramsDesc: 传入Topics的props说明
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  config: C端页面对应的builder配置文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  pageMode: C端页面模式 0 桌面版 1 移动版
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  userInfo: 用户信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date：2018.4.11
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page() {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
    }

    _createClass(Page, [{
        key: 'render',
        value: function render() {
            var moduleConfig = this.props.config.module[0];
            var _props = this.props,
                userInfo = _props.userInfo,
                pageMode = _props.pageMode;

            return _react2.default.createElement(_TopicsDetails2.default, {
                userInfo: userInfo,
                pageMode: pageMode,
                config: moduleConfig
            });
        }
    }]);

    return Page;
}(_react2.default.Component);

window.wrapper(Page);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(15);

__webpack_require__(9);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ItemsList = __webpack_require__(19);

var _ItemsList2 = _interopRequireDefault(_ItemsList);

var _Select = __webpack_require__(35);

var _Select2 = _interopRequireDefault(_Select);

var _Message = __webpack_require__(10);

var _Message2 = _interopRequireDefault(_Message);

var _Pagination = __webpack_require__(39);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _SubNavigation = __webpack_require__(42);

var _SubNavigation2 = _interopRequireDefault(_SubNavigation);

var _util = __webpack_require__(7);

var _page = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author：Gavin Yang (杨伟伟)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc：专题集合页面
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date：2018.4.11
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

/**
 组件state中关键字段说明:
 product_list: [
 {
   currency: "USD",
   currency_symbol: "US $",
   main_img: "",
   market_price: 49.8,
   platform: 9,
   platform_name: "SELF",
   product_id: "g9jP2e",
   product_name: "",
   sell_price: 11.95,
   source_url: "",
   spu_code: "91800012857512",
 },
 ...
 ]
 collectionInfo：{
  id: "",
  handle: "",
  created_at: "",
  description: "",
  collect_type: "",
 }

 组件中props说明：
 config: {
    bgImg: "" //Banner背景图
    checkbox: {
      showTagCtrl: true, //是否显示Banner
      showSortCtrl: false,  //是否显示价格筛选器
      showCategoryCtrl: false // 是否显示分类筛选器
    }
    cols: 3 //需要显示的商品列数
    key: 1 //(暂无用)
    name: "TopicsDetails" //模块名（暂无用）
  }

 **/

var route = [{ name: '专题', href: '/topics/' }, { name: '详情', href: '' }];

var TopicsDetails = function (_React$Component) {
  _inherits(TopicsDetails, _React$Component);

  function TopicsDetails(props) {
    _classCallCheck(this, TopicsDetails);

    var _this = _possibleConstructorReturn(this, (TopicsDetails.__proto__ || Object.getPrototypeOf(TopicsDetails)).call(this, props));

    _this.getProductList = function (n) {
      var config = _this.props.config;
      var cols = config.cols;

      return (0, _page.fetchTopicsDedails)({ page: n, id: _this.state.id, pageSize: cols * 8 }).then(function (res) {
        // 请求集合详情信息
        if (res.state !== 0) {
          _Message2.default.error(res.msg);
          return;
        }

        if (!res.data || !res.data.product_list) {
          return;
        }

        _this.setState({
          product_list: res.data.product_list,
          page: res.current_page,
          totalPage: res.total_page,
          collectionInfo: res.data.collection
        });
      });
    };

    _this.state = {
      page: 1, // 当前页码
      totalPage: 1, //总页数
      product_list: null, //商品列表数据
      collectionInfo: null, //集合信息
      id: (0, _util.query2Obj)()['id'] //专题ID
    };
    return _this;
  }

  _createClass(TopicsDetails, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getProductList();
    }
  }, {
    key: 'render',
    value: function render() {
      var product_list = this.state.product_list;


      if (!product_list || product_list.length === 0) {
        return _react2.default.createElement(
          'span',
          { style: { color: '#ccc', display: 'block', margin: '80px auto', textAlign: 'center' } },
          'no data~'
        );
      }

      var classPrefix = TopicsDetails.classPrefix;
      var _props = this.props,
          pageMode = _props.pageMode,
          config = _props.config;
      var _state = this.state,
          page = _state.page,
          totalPage = _state.totalPage,
          collectionInfo = _state.collectionInfo;
      var checkbox = config.checkbox,
          bgImg = config.bgImg,
          cols = config.cols;

      var isModile = pageMode === 1;

      if (isModile) {
        cols = 2;
      }

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'l-centerBlock' },
          _react2.default.createElement(_SubNavigation2.default, { route: route })
        ),
        checkbox['showTagCtrl'] && _react2.default.createElement(
          'div',
          { className: classPrefix + '-banner',
            style: { backgroundImage: 'url(' + (collectionInfo.main_img || '/source/img/default.png') + ')' } },
          _react2.default.createElement(
            'div',
            { className: 'banner-text' },
            _react2.default.createElement(
              'h2',
              null,
              collectionInfo.title
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: classPrefix + '-centerBlock l-centerBlock' },
          _react2.default.createElement(
            'div',
            { className: classPrefix + '-container' },
            _react2.default.createElement(
              'div',
              { className: 'topics-header' },
              _react2.default.createElement('h2', { dangerouslySetInnerHTML: { __html: collectionInfo.description } }),
              _react2.default.createElement(
                'div',
                { className: 'topics-ctrl' },
                checkbox['showCategoryCtrl'] && _react2.default.createElement(
                  'div',
                  { className: 'ctrl-item' },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Category:'
                  ),
                  _react2.default.createElement(
                    _Select2.default,
                    null,
                    _react2.default.createElement(
                      'option',
                      { value: 0 },
                      'Small fresh style1'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 1 },
                      'Small fresh style2'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 2 },
                      'Small fresh style3'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 3 },
                      'Small fresh style4'
                    )
                  )
                ),
                checkbox['showSortCtrl'] && _react2.default.createElement(
                  'div',
                  { className: 'ctrl-item' },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Sorting:'
                  ),
                  _react2.default.createElement(
                    _Select2.default,
                    null,
                    _react2.default.createElement(
                      'option',
                      { value: 0 },
                      'Small fresh style1'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 1 },
                      'Small fresh style2'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 2 },
                      'Small fresh style3'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 3 },
                      'Small fresh style4'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'products-list' },
              _react2.default.createElement(_ItemsList2.default, { data: product_list, column: cols }),
              _react2.default.createElement(_Pagination2.default, {
                pageNo: page,
                totalPage: totalPage,
                scrollLoad: isModile,
                handleChangePage: this.getProductList
              })
            )
          )
        )
      );
    }
  }]);

  return TopicsDetails;
}(_react2.default.Component);

TopicsDetails.classPrefix = 'm-topicsDetails';
exports.default = TopicsDetails;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./TopicsDetails.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./TopicsDetails.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0;\n}\n/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.m-topicsDetails-banner {\n  position: relative;\n  width: 100%;\n  height: 4rem;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  overflow: hidden;\n}\n.m-topicsDetails-banner .banner-text {\n  display: flex;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.28);\n  justify-content: center;\n  align-items: center;\n}\n.m-topicsDetails-banner .banner-text h2 {\n  font-size: 0.48rem;\n  color: #FFFFFF;\n  text-align: center;\n}\n.m-topicsDetails-centerBlock .m-topicsDetails-container .topics-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.4rem 0;\n  border-bottom: 1px solid #EDE9EA;\n}\n.m-topicsDetails-centerBlock .m-topicsDetails-container .topics-header .topics-ctrl {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.m-topicsDetails-centerBlock .m-topicsDetails-container .topics-header .topics-ctrl .ctrl-item span {\n  padding: 0 0.1rem 0 0.4rem;\n}\n.m-topicsDetails-centerBlock .m-topicsDetails-container .products-list {\n  padding-bottom: 0.15rem;\n}\n@media screen and (max-width: 750px) {\n  .m-topicsDetails-banner .banner-text h2 {\n    font-size: 0.32rem;\n  }\n  .bc-subnav-container {\n    display: none!important;\n  }\n  .l-mobile .l-centerBlock {\n    padding: 0 0.2rem;\n  }\n  .l-mobile .l-centerBlock .m-topicsDetails-container .topics-header {\n    display: block;\n    padding: 0.2rem 0;\n  }\n  .l-mobile .l-centerBlock .m-topicsDetails-container .topics-header h2 {\n    width: 100%;\n    text-align: center;\n    padding: 0.2rem 0;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    /* IE/Safari */\n    -ms-text-overflow: ellipsis;\n    -o-text-overflow: ellipsis;\n    /* Opera */\n  }\n  .l-mobile .l-centerBlock .m-topicsDetails-container .topics-header .topics-ctrl .ctrl-item {\n    width: 48.5%;\n  }\n  .l-mobile .l-centerBlock .m-topicsDetails-container .topics-header .topics-ctrl .ctrl-item span {\n    display: none;\n  }\n  .l-mobile .l-centerBlock .m-topicsDetails-container .topics-header .topics-ctrl .ctrl-item select {\n    width: 100%;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 产品列表 **/\n/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.m-search-itemsList {\n  margin-top: 0.4rem;\n  margin-bottom: 0.1rem;\n}\n.m-search-itemsList li {\n  display: inline-block;\n  vertical-align: top;\n  margin-bottom: 0.3rem;\n  width: 22.5%;\n  margin-right: 3.3%;\n}\n.m-search-itemsList li:nth-child(4n) {\n  margin-right: 0;\n}\n.m-search-itemsList li a {\n  display: inline-block;\n}\n.m-search-itemsList li a > div {\n  width: 100%;\n  text-align: center;\n  vertical-align: top;\n  line-height: 0;\n  max-width: 100%;\n  background-position: center;\n  background-size: cover;\n  height: 270px;\n}\n.m-search-itemsList li p {\n  line-height: 1.4em;\n  margin-top: 0.1rem;\n}\n.m-search-itemsList li p:first-of-type {\n  max-height: 2.8em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.m-search-itemsList.column-2 li {\n  width: 45%;\n  margin-right: 10%;\n  margin-bottom: 0.35rem;\n}\n.m-search-itemsList.column-2 li:nth-child(2n) {\n  margin-right: 0;\n}\n.m-search-itemsList.column-3 li {\n  width: 31%;\n  margin-right: 3.5%;\n}\n.m-search-itemsList.column-3 li:nth-child(4n) {\n  margin-right: 3.5%;\n}\n.m-search-itemsList.column-3 li:nth-child(3n) {\n  margin-right: 0;\n}\n.m-search-itemsList.column-3 li p {\n  line-height: 1.5em;\n  margin-top: 0.15rem;\n}\n.m-search-itemsList.column-5 li {\n  width: 18%;\n  margin-right: 2.5%;\n}\n.m-search-itemsList.column-5 li:nth-child(5n) {\n  margin-right: 0;\n}\n.l-mobile .m-search-itemsList li {\n  width: 47% !important;\n  margin-right: 0 !important;\n}\n.l-mobile .m-search-itemsList li:nth-child(2n) {\n  margin-left: 3% !important;\n}\n.l-mobile .m-search-itemsList li:nth-child(2n + 1) {\n  margin-right: 3% !important;\n}\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(9);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = __webpack_require__(6);

var _Link2 = _interopRequireDefault(_Link);

var _util = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc 产品列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/* eslint-disable camelcase */


var ItemsList = function (_React$Component) {
  _inherits(ItemsList, _React$Component);

  function ItemsList() {
    _classCallCheck(this, ItemsList);

    return _possibleConstructorReturn(this, (ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).apply(this, arguments));
  }

  _createClass(ItemsList, [{
    key: 'render',
    value: function render() {
      var classPrefix = ItemsList.classPrefix;
      var _props = this.props,
          data = _props.data,
          column = _props.column;


      return data && data.length ? _react2.default.createElement(
        'ul',
        { className: classPrefix + ' column-' + column },
        data.map(function (_ref, index) {
          var sell_price = _ref.sell_price,
              href = _ref.href,
              name = _ref.name,
              main_img = _ref.main_img,
              currency = _ref.currency;
          return _react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              _Link2.default,
              { href: href, target: '_blank' },
              _react2.default.createElement('div', { style: { backgroundImage: 'url(' + main_img + ')' } }),
              _react2.default.createElement(
                'p',
                { className: (0, _util.color)('text') + ' ' + (0, _util.font)('secTitle') },
                name
              ),
              _react2.default.createElement(
                'p',
                { className: (0, _util.color)('price') + ' ' + (0, _util.font)('price') },
                currency,
                ' ',
                sell_price
              )
            )
          );
        })
      ) : null;
    }
  }]);

  return ItemsList;
}(_react2.default.Component);

ItemsList.propTypes = {
  data: _propTypes2.default.array,
  column: _propTypes2.default.number
};
ItemsList.defaultProps = {
  data: [],
  column: 5
};
ItemsList.classPrefix = 'm-search-itemsList';
exports.default = ItemsList;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(21);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(22);

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(5);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(25);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Item = __webpack_require__(27);

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Message (全局提示)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Message = function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Message.__proto__ || Object.getPrototypeOf(Message)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      message: {}
    }, _this.add = function (type, content, duration) {
      Message.n += 1;
      var id = Message.n;
      _this.setState(function (_ref2) {
        var message = _ref2.message;

        message[id] = { type: type, content: content, duration: duration, key: id, id: id };
        return { message: message };
      });

      return id;
    }, _this.remove = function (id) {
      delete Message.items[id];
      _this.setState(function (_ref3) {
        var message = _ref3.message;

        delete message[id];
        return { message: message };
      });
    }, _this.hide = function (id) {
      if (Message.items[id]) {
        Message.items[id].fadeOut();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // 默认挂载点


  _createClass(Message, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classPrefix = Message.classPrefix,
          message2List = Message.message2List;

      var list = message2List(this.state.message);

      return _react2.default.createElement(
        'ol',
        { className: classPrefix },
        list && list.map(function (_ref4) {
          var key = _ref4.key,
              rest = _objectWithoutProperties(_ref4, ['key']);

          return _react2.default.createElement(_Item2.default, _extends({}, rest, { ref: function ref(_ref5) {
              Message.storeItems(_ref5, key);
            }, key: key, remove: _this2.remove }));
        })
      );
    }
  }]);

  return Message;
}(_react2.default.Component);

Message.classPrefix = 'bc-message';
Message.container = window.document.body;

Message.message2List = function (message) {
  return Object.keys(message).map(function (key) {
    var msg = message[key];
    msg.key = key;
    return msg;
  });
};

Message.n = 0;
Message.items = {};

Message.storeItems = function (ref, key) {
  if (ref) Message.items[key] = ref;
};

exports.default = Message;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Message.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Message.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".bc-message {\n  position: fixed;\n  width: 100%;\n  height: 0;\n  top: 80px;\n  left: 0;\n  z-index: 10000;\n}\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(28);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(8);

var _Icon2 = _interopRequireDefault(_Icon);

var _setClass2 = __webpack_require__(11);

var _setClass3 = _interopRequireDefault(_setClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Message (全局提示)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import Spin from '../../Spin'


var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.timer = null, _this.fadeOutTimer = null, _this.state = {
      fadeIn: true,
      fadeOut: false
    }, _this.fadeOut = function () {
      clearTimeout(_this.timer);
      _this.setState({
        fadeIn: false,
        fadeOut: true
      });
      _this.fadeOutTimer = setTimeout(_this.remove, 300);
    }, _this.remove = function () {
      var _this$props = _this.props,
          id = _this$props.id,
          remove = _this$props.remove;

      remove(id);
    }, _this.componentDidMount = function () {
      _this.timer = setTimeout(_this.fadeOut, _this.props.duration * 1000);
    }, _this.icon = function () {
      var type = _this.props.type;
      var classPrefix = Item.classPrefix;

      var res = null;

      switch (type) {
        // case 'loading':
        //   res = <Spin type='light' className={`${classPrefix}-icon`} />
        //   break
        case 'info':
          res = _react2.default.createElement(
            'span',
            { className: classPrefix + '-icon ' + classPrefix + '-icon-' + type },
            _react2.default.createElement(_Icon2.default, { type: 'info' })
          );
          break;
        case 'success':
          res = _react2.default.createElement(
            'span',
            { className: classPrefix + '-icon ' + classPrefix + '-icon-' + type },
            _react2.default.createElement(_Icon2.default, { type: 'yes' })
          );
          break;
        case 'error':
          res = _react2.default.createElement(
            'span',
            { className: classPrefix + '-icon ' + classPrefix + '-icon-' + type },
            _react2.default.createElement(_Icon2.default, { type: 'info' })
          );
          break;
        case 'warning':
          res = _react2.default.createElement(
            'span',
            { className: classPrefix + '-icon ' + classPrefix + '-icon-' + type },
            _react2.default.createElement(_Icon2.default, { type: 'info' })
          );
          break;
      }

      return res;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Item, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timer = null;
      this.fadeOutTimer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _setClass;

      var classPrefix = Item.classPrefix;
      var content = this.props.content;
      var _state = this.state,
          fadeIn = _state.fadeIn,
          fadeOut = _state.fadeOut;


      return _react2.default.createElement(
        'li',
        { className: (0, _setClass3.default)((_setClass = {}, _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-fadeIn', fadeIn), _defineProperty(_setClass, classPrefix + '-fadeOut', fadeOut), _setClass)) },
        _react2.default.createElement(
          'div',
          null,
          this.icon(),
          _react2.default.createElement(
            'span',
            null,
            content
          )
        )
      );
    }
  }]);

  return Item;
}(_react2.default.Component);

Item.propTypes = {
  duration: _propTypes2.default.number
};
Item.defaultProps = {
  duration: 3
};
Item.classPrefix = 'bc-messageItem';
exports.default = Item;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Item.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Item.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-messageItem {\n  width: 0;\n  text-align: center;\n  margin-left: 50%;\n  white-space: nowrap;\n}\n.bc-messageItem > div {\n  display: inline-block;\n  max-width: 750px;\n  background: rgba(0, 0, 0, 0.8);\n  padding: 18px 20px;\n  border-radius: 3px;\n  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);\n  margin-bottom: 20px;\n  transform: translateX(-50%);\n}\n.bc-messageItem > div span {\n  display: inline-block;\n  font-size: 16px;\n  color: #fff;\n  line-height: 22px;\n  white-space: nowrap;\n  vertical-align: top;\n}\n.bc-messageItem-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 1px 10px 1px 0;\n  border-radius: 50%;\n}\n.bc-messageItem-icon .bc-icon {\n  color: #fff !important;\n}\n.bc-messageItem-icon-info {\n  background-color: #1890FF;\n}\n.bc-messageItem-icon-success {\n  background-color: #29CA40;\n}\n.bc-messageItem-icon-error {\n  background-color: #FF6158;\n}\n.bc-messageItem-icon-warning {\n  background-color: #FFBD2F;\n}\n.bc-messageItem-fadeIn {\n  animation: fadeIn 330ms ease;\n}\n.bc-messageItem-fadeOut {\n  animation: fadeOut 330ms ease;\n}\n.bc-messageItem .bc-icon {\n  display: inherit;\n  vertical-align: top;\n  line-height: 20px;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n  to {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n  to {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(31);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _setClass2 = __webpack_require__(11);

var _setClass3 = _interopRequireDefault(_setClass2);

var _color = __webpack_require__(33);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Icon (图标)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// const {setClass, color} = window.supervar.util

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _setClass;

      var classPrefix = Icon.classPrefix;

      var _props = this.props,
          type = _props.type,
          className = _props.className,
          colorClass = _props.color,
          rest = _objectWithoutProperties(_props, ['type', 'className', 'color']);

      return _react2.default.createElement('i', _extends({
        className: (0, _setClass3.default)((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-' + type, type), _defineProperty(_setClass, (0, _color2.default)(colorClass), colorClass), _setClass))
      }, rest));
    }
  }]);

  return Icon;
}(_react2.default.Component);

Icon.propTypes = {
  type: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  color: _propTypes2.default.string
};
Icon.defaultProps = {
  color: 'icon'
};
Icon.classPrefix = 'bc-icon';
exports.default = Icon;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Icon.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Icon.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n@font-face {\n  font-family: \"bcicon\";\n  src: url('/source/font/iconfont.eot?t=1542080293133');\n  /* IE9*/\n  src: url('/source/font/iconfont.eot?t=1542080293133#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAzwAAsAAAAAFlgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8fEgkY21hcAAAAYAAAAEOAAADRE0qELxnbHlmAAACkAAAB2QAAAzEwI9Z12hlYWQAAAn0AAAALwAAADYTQBRGaGhlYQAACiQAAAAcAAAAJAfeA6FobXR4AAAKQAAAAA8AAACAgAAAAGxvY2EAAApQAAAAQgAAAEIrrCkQbWF4cAAACpQAAAAfAAAAIAE2AJ5uYW1lAAAKtAAAAUsAAAJVVYg4l3Bvc3QAAAwAAAAA8AAAAV6kDPaIeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByesT4zYm7438AQw9zA0AgUZgTJAQDhTQwbeJzt0klSwzAUhOHfZGBIIEBIAhkw8ximnJE1B2LFafoaoeVmAXdAqs9VfmVJLvUDOkDLltaG6ouKMj5drZp6i52m3ubD7/ue/l4d9TTQUBMttFqvf1VGmqoulT+jalZmHjFtKhveac6CU2oOOGTkMzp0GbPJFts+d+hvj5nQo88uewy8+sSrZ17e5X/0y6N6/3mrSwpRslMvfM9oEE12w/Ddo1E4BTQO54Em0ew5DWeEZuG00Dwoeyyi9JDqKL2ls3Cq6Dwo51yEk0aX4czRVTh9dB2l/3QTlH+/DfcGugt3CboPyr8/BOUOHqPclpbhbkJP4b5Cz0G5p5dwr6HXcNehtyjdq1Uw+wbJbFnyAAB4nIVWb2gc1xGfeW/vTrd7Ot/qbncV6SSxt5KuiiUFtPeHhFZWoig6Eqv+oApjlTaFpHvEiqElIXGLWy1K0yQ2pjZuP1Qf0i/F4AbpS2iwEyzUtGAouZLUH4qowcQURwRCK5x88u2q83bvxMlHor3def/mzbyZ+c28AwTY/Yqf4wooAJiPYyyORhzLyM/O+tf967P4hL8xi9M4PetvsL8SwSf2LQAAIxmvS8BdUKEPIIKTWBzHfBJj/WhMlMpxpNEklmmURAn8T/OHpe219W1J2l6fWS7hgPfZyrokra+srEnSmo0DpeWZcHVtWxo97H+K49LaSpMl1OcG+uLQBTCCqlk0VVO1uGajgZqtcvBcdH1icd3L/qlFvOQy1627jPa6wfgyusD35HCyPk32m5oZMWm/qdpoqeJnoouwC8ytg8vB3YVNd5MFcl2PZPpAakhsy5kOwQBJIltVcoBJlqtk+pBJA5UmTRqo48hhfomxpXm/0TLw4cWLnF98kYUtn9q3Su0ULbYytepUwAh1kpbQ11GI6WCUoDxMbJv3I5H7myHd8m9Ho2hubaEZjfq3+dTeyub9GZrYamGg2PJ9dg0dbBnmywYaB9rnf/ezxfP40OLBdnojXyxewvQigLTP3m4Y/HqbuUkLNBXA8BsdsLUL/MKpUxd4SL/JHX50j41fIN9Q7lAQ3mDnRSRQRfw5Jth57y52NtZ4J4uJtbSJ91iPf49F/S+hPW4t507H8rF8mVxYNmIMHjhqd+XKlebL3QcO5/2gZXW/DnW/jjBCbdL9/16r/BQzlXbJQ9crr+Ch2RYsKISG9H6p3CraRUu12+ReduhpFxp1qmgH5yQyxTZJeowk2qql2ZqFmyLD2KZPtOHLU+w1iAAMBafH9wV8Tiye+eLEJZw/0fT3GFsL6xi50YiRE8t5PrZ482bzZfMtA4iSPXfJnp5Ad2gTxUOlKtD8kM6iNj5W8+zmx+1a8PCe6i44u1DlhUZnX86I+Iqcaal/PCyLATbRCsukVRos6xKDlXXOqcQF9PjLjL18PKB4xeG3r169zZ0IDty6hQPYs8e2so4ef+l4g/ul+gtzZyTpzNzr73D+DoQYbZyFfBdnVOBFDfShgtf8WU71S3Sv4tU9XlYJeSPBPSBYGVT8WbwWFM+KTz9oYl8C9rsgJkg13mBNWZUKg6M+dY9C4OPlQH8HdEIyyFvySLpoiTKbLsY4+RmtfpwoFYZz0YiVoe4kFsYxl8RazWE7V5xz3gb5HArYd7iPXrZrJ7t7uzs7iSTZ3VXHs/HDf33o/wYpMHo2O9rXpyeNZNLICgL77wtNZKMqKjzdGUMWHUPgzS7azQvCd4PiTg8HUdmp7odPaEvTlyKrDOgVtT5NyNesgNoRkQWE4SK1gWX0OU6tWq05VcJM1XGqtZq3yhy6OFZ9h71bc+pOMM2cqlOvhQtwUP5SDrTn7+ci9f/XnmmamN9p4pLXSKYc3tR7+OOmKKTWJGI6cIb40vy3N0IE3pjkf/Dtw4/hR/iY//eRpepH1aVx9m6IuXqNr7JHR0cfrf+DVcXj/R4OqHHk82LgJ629WpRuORsbzq12K24SGGo1SAR5/hf2JWHpIboBSvBtmIMfwk/gFViGN+GiuMWTqKm6YdJfD7qQ0km0zNxwUS1TxGPFQqlMd4OGuhFYOYl5OosVM/RyVItpliHgxwrjLJdkGb08ySb6WSbJcuOsYOxt+Q42tmQ0g2pVLprRBXzttg5/s35H03CE9+smkoGoyvU78QjnM/UPeCzG++UuL8qlX2TzHPHhvrMc30L88T+TQ6PDvalU7/DoUDaV6omku3u604oSNPKfubSSzUnSw7lzEp5lJ32zQ1FSijLdIcvUPClGsszuoal7Z0ZQ09ivtJw3E4tF4iyCWfZ8vAvpHH6R4VNPYUTqeu+9LumP0Yhy+skuVR0sP10e7OoSzSW9N5HoHX18rFdRescef76NH98WClNyK4UGzjb5UV4BHXIwTvXBKFO9o3+FoV+1jE5uTrdc3SJkGd02hc/w84ym3rB1Y+LZ02+cfnai2yj8bWhqgbGFqSOC4lFvO5FKJVh3ZyplaVrqk2PDC2PTxEkbpseP5+c+Zsu4MBVumVrwnsZUd4peQj3s3uGbvJuwnwcbjsAzMA/fh+dgCV4VuMlFw38y4hghZkxVBLJIMIoQcuiAeh8OWSK8BuGAIv01/Yg5USAJGcMsBW3EjGZodyFGfdGWhwNVR7BUyHPXgx6LLoMe/I+sKLKf7VD4txLpBBus31Q6OHQo3gtzYuWYrHT+8lg8kYhTT1k+1phT/FX2lix7r1LYwxb/7T8iy/iJLDfa5xK9jPUmVqJRblg93q9JHylQOvCOnxVS2M+yg3862ZFIdJxcUDIKIpEH27uatoSZzPfoO6lpP1IU1a+rirISS3c07nH+CPuAKotFNbFQmhjAcmlCz8QwmsvjsNo287Hep+zsJLK67H+l9ClE2ibwtaQu7+zIuhiRIYqCuUM6MSnBDA0VBf4PtBMDcHicY2BkYGAA4icbuB7F89t8ZeBmYQCBGwIZqgj6fz0LA3MDkMvBwAQSBQAZvQkqAHicY2BkYGBu+N/AEMPCAAJAkpEBFSgAAEcmAol4nGNhYGBgGUAMACGAAIEAAAAAAAAiAFoAfgCkAN4BEAFWAZ4BrAG6AewCFgJAAlICZAJ+AqoC8AMGAxwDMANyA5YDzAP2BCwEWAUqBXYGJAZiAAB4nGNgZGBgUGCYxMDDAAJMQMwFhAwM/8F8BgAbAAHVAHicXZA9TsNAEIWf84dwEAUIGpoVBUIgOT8daSgiJTUp0sfOOj+yvdZmEykF5+EAnIADcAAarsABaHixJxLJrnb0zds3O6MFcIFveCjXFU/JHhrMSq7gBDfCVeq3wjXyvXAdTQTCDe4nYR+PeBZu4hJLvuDVTpk94FXYwxnehCs4x7twlfqHcI38KVzHNb6EG9R/hH2M8SvcxJ334vetnjg9VeFWLSKTxSZzfhjtcKRn62Riy6SMY21XC5OpTtAuhaHOtN3XrzazrnOxiq1J1YAP6SQxKrdmqSMXzJ3Le61WLHoQmZTj9GGhMYFjnEIhxJZxgQgGGeIiOvpCKnt1RO8MaySsswc3/3lMl8WK+S5T6PDz2weOIR1Z4Truv8KGHbpUHWdQPJYVKWkgE2l2T8gKeXG3pBJRDzAvqnL00OKOj/xB0Tv9A6B+aGoAeJxtjktygzAQRNUgsAHbcf7/xDkAl8kNhDSAyrJUJQmT3D7ELrJKr97rnsWwhJ1Tsv+zQ4IUHBlyLLBEgRIVVlhjgwtscYkrXOMGt7jDPR7wiCc84wWveMM7dvhgmTQuUB5IeNlzUjrmigxFWsqe5L5xX5kXSrvtrPUJSK1P9WyV8N6NtdddH8szKzfa0rq61cZo21XfFGZeadv+DfxX0mlNrOMHsgMfAvlF6/wovOKNkPt8mE6MyqXwsXaZUCq6sh2MCdITWX7UNKaN6NJpKbR0to4U4uaTJOkjTaWnEApL46jt9BY/OE+M/QDkxlvp') format('woff'), url('/source/font/iconfont.ttf?t=1542080293133') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('/source/font/iconfont.svg?t=1542080293133#bcicon') format('svg');\n  /* iOS 4.1- */\n}\n.bc-icon {\n  font-family: \"bcicon\" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.bc-icon-close:before {\n  content: \"\\E605\";\n}\n.bc-icon-search:before {\n  content: \"\\E60B\";\n}\n.bc-icon-edit:before {\n  content: \"\\E60F\";\n}\n.bc-icon-delete:before {\n  content: \"\\E61D\";\n}\n.bc-icon-checkbox:before {\n  content: \"\\E61F\";\n}\n.bc-icon-radio:before {\n  content: \"\\E620\";\n}\n.bc-icon-checkbox-checked:before {\n  content: \"\\E622\";\n}\n.bc-icon-radio-checked:before {\n  content: \"\\E623\";\n}\n.bc-icon-arrow-right:before {\n  content: \"\\E624\";\n}\n.bc-icon-arrow-down:before {\n  content: \"\\E625\";\n}\n.bc-icon-no-filling:before {\n  content: \"\\E62A\";\n}\n.bc-icon-yes-filling:before {\n  content: \"\\E62B\";\n}\n.bc-icon-info-filling:before {\n  content: \"\\E62C\";\n}\n.bc-icon-info:before {\n  content: \"\\E62D\";\n}\n.bc-icon-yes:before {\n  content: \"\\E62E\";\n}\n.bc-icon-no:before {\n  content: \"\\E62F\";\n}\n.bc-icon-menu:before {\n  content: \"\\E61A\";\n}\n.bc-icon-user:before {\n  content: \"\\E61B\";\n}\n.bc-icon-forward:before {\n  content: \"\\E626\";\n}\n.bc-icon-back:before {\n  content: \"\\E627\";\n}\n.bc-icon-unfold:before {\n  content: \"\\E61C\";\n}\n.bc-icon-cart-o:before {\n  content: \"\\E621\";\n}\n.bc-icon-addto:before {\n  content: \"\\E629\";\n}\n.bc-icon-fullscreen:before {\n  content: \"\\E628\";\n}\n.bc-icon-view:before {\n  content: \"\\E630\";\n}\n.bc-icon-bag:before {\n  content: \"\\E631\";\n}\n.bc-icon-add:before {\n  content: \"\\E632\";\n}\n.bc-icon-icon-test:before {\n  content: \"\\E613\";\n}\n.bc-icon-Receiveaddress:before {\n  content: \"\\E615\";\n}\n.bc-icon-newwindow:before {\n  content: \"\\E616\";\n}\n.bc-icon-more:before {\n  content: \"\\E617\";\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 颜色类名
 * @author MG
 * @param key <string>
 * @return String
 * */

function color(key) {
  return "c-" + key;
}

color.border = function (key) {
  return "c-" + key + "-border";
};

color.bg = function (key) {
  return "c-" + key + "-bg";
};

exports.default = color;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = __webpack_require__(36);

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Select2.default; /**
                                     * @author MG Ding (丁文强)
                                     * @desc Select (下拉选择器)
                                     */

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(37);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @author MG Ding (丁文强)
                                                                                                                                                                                                                              * @desc Select (下拉选择器)
                                                                                                                                                                                                                              */


var _window$supervar$util = window.supervar.util,
    setClass = _window$supervar$util.setClass,
    color = _window$supervar$util.color,
    font = _window$supervar$util.font;

var classPrefix = 'bc-select';

var Select = function Select(props) {
  var _setClass;

  var className = props.className,
      children = props.children,
      rest = _objectWithoutProperties(props, ['className', 'children']);

  return _react2.default.createElement(
    'select',
    _extends({
      className: setClass((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, color.border('border'), 1), _defineProperty(_setClass, color('text'), 1), _defineProperty(_setClass, font('text'), 1), _setClass))
    }, rest),
    children
  );
};

exports.default = Select;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Select.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Select.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-select {\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  height: 0.48rem;\n  border-radius: 2px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  padding: 0 0.48rem 0 0.2rem;\n  position: relative;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAFAQMAAACKM9XAAAAABlBMVEUAAAAwLi8h2mgqAAAAAXRSTlMAQObYZgAAABlJREFUCNdj+N/AwMBQzwAEdiBCBkRwADEAMW4CYaYy38MAAAAASUVORK5CYII=\") no-repeat scroll right center #fff;\n}\n.bc-select:focus {\n  outline: 0;\n}\n.bc-select:disabled {\n  cursor: not-allowed;\n}\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(40);

var _Icon = __webpack_require__(8);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Pagination分页组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * author: Alan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * props:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   style            : <object> 应用到Pagination组件的样式(默认{marginTop:"30px"})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   language         : <string> 英文版:en;中文版:cn(默认)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   totalPage        : <number> 总页数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   totalRow         : <number> 总条数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   pageNo           : <Number> 当前页
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   size             : <number> 尺寸，传入'sm'显示小尺寸，默认大尺寸
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   handleChangePage : <function> 分页时调用,传入目标页码(number)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   onEndReached     : <Number> 滚动到距离最底部距离开始加载
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 注意:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   传入的handleChangePage函数必须返回一个Promise对象,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   调用handleChangePage时,分页组件会被禁用,当promise触发resolve或reject时解除禁用,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   如果分页成功(resolve),可给resolve传入一个数字,滚动条会滚动到数字位置(scrollTop)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   例如:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   handleChangePage(n){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       return new Promise((resolve,reject) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           util.fetch('url',{page:n}).then(data=>{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               if(data.state === 0){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                   resolve(0);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               }else{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *                   reject();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           }).catch(err=>{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *               reject();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *           });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var _window$supervar$util = window.supervar.util,
    color = _window$supervar$util.color,
    font = _window$supervar$util.font;

// const {util} = window.supervar

var modelCN = {
  prev: '上一页',
  next: '下一页',
  page: ['共', '页，到第', '页'],
  confirm: '确认'
};

var modelEN = {
  prev: 'Previous',
  next: 'Next',
  page: ['Total ', ' page, to page ', ''],
  confirm: 'Go'
};

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this));

    _this.loadMore = true;
    _this.direction = 'down';
    _this.beforeScrollTop = 0;

    _this.pullMore = function () {
      // 文档高度
      var sHeight = document.documentElement.scrollHeight;
      //  可视区域高度
      var cHeight = document.documentElement.clientHeight;
      // 滚动条下拉高度 移动端和PC获取方式不一致
      var sTop = document.body.scrollTop || document.documentElement.scrollTop;
      // footer高度
      var fHeight = document.getElementById('Footer-1').offsetHeight;
      var _this$props$onEndReac = _this.props.onEndReached,
          onEndReached = _this$props$onEndReac === undefined ? fHeight : _this$props$onEndReac;

      var disY = sHeight - cHeight - sTop - onEndReached;
      var delta = sTop - _this.beforeScrollTop;
      _this.getDirection(delta > 0 ? 'down' : 'up');
      _this.beforeScrollTop = sTop;
      if (disY <= 20 && _this.direction === 'down') {
        var pageNo = _this.props.pageNo;

        var n = pageNo + 1;
        if (n >= 1 && n <= _this.props.totalPage && _this.loadMore) {
          _this.loadMore = false;
          var loading = _this.props.handleChangePage(n);
          loading.then(function (data) {
            _this.loadMore = true;
          }).catch(function () {
            _this.loadMore = true;
          });
        }
      }
    };

    _this.getDirection = function (direction) {
      _this.direction = direction;
    };

    _this.bindScroll = function () {
      _this.beforeScrollTop = document.documentElement.scrollTop;
      window.onscroll = _this.pullMore;
    };

    _this.state = {
      loading: false // 调用handleChangePage时被设置为true(组件被禁用),handleChangePage返回的Promise返回结果时被设置为false(组件解除禁用)
    };
    return _this;
  }

  /** 设置loading, 并且当loading成功时inputPage被设置为''(清空页码输入框)**/


  _createClass(Pagination, [{
    key: 'setLoading',
    value: function setLoading(b) {
      this.setState(function (state) {
        return {
          loading: b
        };
      });
    }

    /** 分页动作,参数n代表跳转到第几页(pageNo) **/

  }, {
    key: 'handleChangePage',
    value: function handleChangePage(n) {
      var _this2 = this;

      if (n !== this.props.pageNo && n !== '' && n >= 1 && n <= this.props.totalPage) {
        var loading = this.props.handleChangePage(n);
        this.setLoading(true);

        loading.then(function (data) {
          // if (util.getConstructorName(data) === 'Number') {
          //   util.setScrollTop(data) // 设置滚动条高度
          // }
          _this2.setLoading(false);
        }).catch(function () {
          _this2.setLoading(false);
        });
      }
    }

    /** 格式化页码按钮组(参考京东分页逻辑) **/

  }, {
    key: 'formatButtonGroup',
    value: function formatButtonGroup() {
      var buttonGroup = []; // 得到的结果是类似[1,2,null,6,7,8,9,10,null]这样的数组,数字表示页码,null表示省略号
      var totalPage = this.props.totalPage;
      var pageNo = this.props.pageNo;

      /** 总页数小于等于5, 把所有页码都渲染出来 **/
      if (totalPage <= 5) {
        for (var i = 0; i < totalPage; i++) {
          buttonGroup.push(i + 1);
        }

        /**
         * 总页数大于5页, 只渲染部分页码:
         *   1.当前页大于等于5页,始终渲染1,2,3页,当前页(pageNo)及左右各2页:
         *      最右的页码小于总页码数,在右边添加省略号
         *      左侧的页码大于4,在左边添加省略号
         *   2.当前页小于5页,渲染前5页,右侧添加省略号
         * **/
      } else {
        buttonGroup = [1, 2, 3];
        if (pageNo - 3 >= 4) buttonGroup.push(null);

        for (var _i = 0; _i < 5; _i++) {
          var cachePage = pageNo - 2 + _i;
          if (cachePage <= totalPage && cachePage > 3) buttonGroup.push(cachePage);
        }
        if (pageNo == 1) {
          buttonGroup = buttonGroup.concat([4, 5]);
        }
        if (pageNo == 2) {
          buttonGroup.push(5);
        }
        if (buttonGroup[buttonGroup.length - 1] < totalPage) buttonGroup.push(null);
      }
      return buttonGroup;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.scrollLoad) {
        this.bindScroll();
      } else {
        window.onscroll = null;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // this.model = this.props.language === 'en' ? modelEN : modelCN
      this.model = modelEN;
      if (this.props.scrollLoad) {
        this.bindScroll();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.onscroll = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var buttonGroup = this.formatButtonGroup();
      var pageNo = this.props.pageNo;
      var totalPage = this.props.totalPage;
      // let totalRow = this.props.totalRow
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        !this.props.scrollLoad && _react2.default.createElement(
          'div',
          {
            className: (this.state.loading ? 'm-pagination-loading' : '') + (this.props.size === 'sm' ? ' m-pagination-sm' : '') + ' m-pagination',
            style: this.props.style },
          _react2.default.createElement('div', { className: 'm-pagination-mask' }),
          _react2.default.createElement(
            'button',
            {
              className: 'button-prev ' + color('text') + ' ' + color.border('border') + ' ' + color.bg('button') + ' ' + font('text') + ' ',
              disabled: pageNo <= 1,
              onClick: this.handleChangePage.bind(this, pageNo - 1) },
            _react2.default.createElement(_Icon2.default, {
              type: 'back',
              className: '' + font('subText'),
              color: ''
            }),
            this.model.prev
          ),
          _react2.default.createElement(
            'ul',
            { className: 'button-group' },
            buttonGroup.map(function (page, index) {
              return page ? _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(
                  'button',
                  {
                    className: color('text') + ' ' + color.border('border') + ' ' + color.bg('button') + ' ' + font('text') + ' ' + (page == pageNo ? 'active' : ''),
                    onClick: _this3.handleChangePage.bind(_this3, page) },
                  page
                )
              ) : _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(
                  'span',
                  { className: '' + color('text') },
                  '...'
                )
              );
            })
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'button-next ' + color('text') + ' ' + color.border('border') + ' ' + color.bg('button') + ' ' + font('text'),
              disabled: pageNo >= totalPage,
              onClick: this.handleChangePage.bind(this, pageNo + 1) },
            this.model.next,
            _react2.default.createElement(_Icon2.default, {
              className: '' + font('subText'),
              type: 'forward',
              color: ''
            })
          )
        ),
        this.props.scrollLoad && pageNo >= totalPage && _react2.default.createElement(
          'p',
          { className: 'm-pagination-noMore ' + color('subText') + ' ' + font('text') },
          'No More'
        )
      );
    }
  }]);

  return Pagination;
}(_react2.default.Component);

Pagination.defaultProps = {
  style: { marginTop: '30px', marginBottom: '30px' },
  language: 'cn',
  totalPage: 0,
  pageNo: 0,
  scrollLoad: false,
  handleChangePage: function handleChangePage() {
    return new Promise(function (resolve, reject) {
      reject();
    });
  }
};

exports.default = Pagination;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Pagination.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Pagination.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".m-pagination {\n  width: 100%;\n  text-align: center;\n  position: relative;\n}\n.m-pagination > * {\n  display: inline-block;\n}\n.m-pagination button {\n  height: 0.3rem;\n  min-width: 0.3rem;\n  border-width: 0.01rem;\n  border-style: solid;\n  text-align: center;\n  line-height: 0.3rem;\n  cursor: pointer;\n  box-sizing: content-box;\n  position: relative;\n}\n.m-pagination button:focus {\n  outline: 0;\n}\n.m-pagination button:hover {\n  border-color: #ccc;\n  z-index: 2;\n}\n.m-pagination button:disabled {\n  color: #ccc;\n  cursor: default;\n  border-color: #eee;\n  z-index: 1;\n}\n.m-pagination button.active {\n  color: #fff;\n  background: #302E2F;\n  border-color: #302E2F;\n  z-index: 3;\n  cursor: default;\n}\n.m-pagination .button-prev {\n  padding: 0 0.15rem;\n}\n.m-pagination .button-next {\n  padding: 0 0.15rem;\n  background-position: right 0;\n}\n.m-pagination .button-prev .bc-icon,\n.m-pagination .button-next .bc-icon {\n  font-size: 12px;\n}\n.m-pagination .button-group {\n  margin-left: 0.11rem;\n  margin-right: 0.09rem;\n  vertical-align: top;\n}\n.m-pagination .button-group li {\n  display: inline-block;\n  margin-left: -0.01rem;\n  vertical-align: top;\n}\n.m-pagination .button-group li button {\n  display: inline-block;\n  min-width: 0.3rem;\n}\n.m-pagination .button-group li span {\n  display: block;\n  min-width: 0.3rem;\n  height: 0.3rem;\n  text-align: center;\n  border: 0.01rem solid transparent;\n  box-sizing: content-box;\n}\n.m-pagination.m-pagination-loading {\n  opacity: .5;\n}\n.m-pagination.m-pagination-loading .m-pagination-mask {\n  display: block;\n}\n.m-pagination .m-pagination-mask {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 4;\n  background: transparent;\n  display: none;\n}\n.m-pagination.m-pagination-sm {\n  height: 0.3rem;\n}\n.m-pagination.m-pagination-sm > * {\n  height: 0.3rem;\n  line-height: 0.3rem;\n  vertical-align: middle;\n}\n.m-pagination.m-pagination-sm button {\n  height: 0.28rem;\n  line-height: 0.28rem;\n  font-size: 0.12rem;\n}\n.m-pagination.m-pagination-sm input {\n  width: 0.4rem;\n  height: 0.28rem;\n  line-height: 0.28rem;\n}\n.m-pagination.m-pagination-sm .button-confirm {\n  padding: 0 0.1rem;\n  font-size: 0.12rem;\n}\n.m-pagination.m-pagination-sm .button-group li button {\n  min-width: 0.2rem;\n}\n.m-pagination.m-pagination-sm .button-prev {\n  padding: 0 0.16rem;\n}\n.m-pagination.m-pagination-sm .button-next {\n  padding: 0 0.16rem;\n}\n.m-pagination-noMore {\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SubNav = __webpack_require__(43);

var _SubNav2 = _interopRequireDefault(_SubNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SubNav2.default; /**
                                     * @author Gavin Yang (杨伟伟)
                                     * @desc subNav (二级页面 导航条)
                                     */

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(44);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Icon = __webpack_require__(8);

var _Icon2 = _interopRequireDefault(_Icon);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classPrefix = 'bc-subnav';

var SubNavigation = function (_React$Component) {
  _inherits(SubNavigation, _React$Component);

  function SubNavigation(props) {
    _classCallCheck(this, SubNavigation);

    var _this = _possibleConstructorReturn(this, (SubNavigation.__proto__ || Object.getPrototypeOf(SubNavigation)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SubNavigation, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // console.log(window.location)
    }
  }, {
    key: 'render',
    value: function render() {
      var route = this.props.route;

      return _react2.default.createElement(
        'div',
        { className: classPrefix + '-container' },
        _react2.default.createElement(
          _index2.default,
          { href: route[0].href },
          route[0].name
        ),
        _react2.default.createElement(
          _index2.default,
          { href: '', className: 'arr' },
          _react2.default.createElement(_Icon2.default, { type: 'forward' })
        ),
        _react2.default.createElement(
          _index2.default,
          { href: route[1].href },
          route[1].name
        )
      );
    }
  }]);

  return SubNavigation;
}(_react2.default.Component);

exports.default = SubNavigation;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./SubNav.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./SubNav.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".bc-subnav-container {\n  display: flex;\n  max-width: 100%;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 0.4rem 0;\n}\n.bc-subnav-container a {\n  display: block;\n  color: #302E2F;\n  text-decoration: underline;\n  border: none;\n  outline: 0;\n}\n.bc-subnav-container a.arr {\n  padding: 0 0.08rem;\n  text-decoration: none;\n}\n.bc-subnav-container a.arr i {\n  font-size: 0.14rem;\n  color: #8B8185;\n}\n.bc-subnav-container a:nth-last-of-type(1) {\n  color: #8B8185;\n  text-decoration: none;\n}\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                   * @date 2018/9/26
                                                                                                                                                                                                                                                                   * @desc 数据接口-主题页面
                                                                                                                                                                                                                                                                   */

exports.getUserInfo = getUserInfo;
exports.searchProducts = searchProducts;
exports.productDetail = productDetail;
exports.add2Cart = add2Cart;
exports.getCartData = getCartData;
exports.selectCartItem = selectCartItem;
exports.changeCartItem = changeCartItem;
exports.getCartList = getCartList;
exports.getCartSize = getCartSize;
exports.addOrder = addOrder;
exports.getBlogs = getBlogs;
exports.getBlogDetails = getBlogDetails;
exports.getCollections = getCollections;
exports.getHomeCollections = getHomeCollections;
exports.fetchTopicsDedails = fetchTopicsDedails;
exports.getSinglePage = getSinglePage;

var _util = __webpack_require__(7);

var _common = __webpack_require__(47);

/** 获取用户数据 **/
function getUserInfo() {
  return (0, _util.fetch)(_common.APIRoot + '/member');
}

/** 商品搜索 **/
function searchProducts(params) {
  var keywords = params.keywords,
      pageSize = params.pageSize,
      page = params.page,
      sort = params.sort;

  return (0, _util.fetch)(_common.APIRoot + '/searchpro/' + keywords + '/' + pageSize + '/' + page);
}

/** 获取商品详情 **/
function productDetail(id) {
  return (0, _util.fetch)(_common.APIRoot + '/products/' + (id || '91800012857512'));
}

/** 加入到购物车 **/
function add2Cart(params) {
  var id = params.id,
      spu = params.spu,
      sku = params.sku,
      count = params.count;

  return (0, _util.fetch)(_common.APIRoot + '/carts', {
    method: 'POST',
    credentials: 'include',
    body: {
      'product_id': id,
      'spu_code': spu,
      'sku_code': sku,
      'quantity': count
    }
  });
}

/** 获取购物车数据 **/
function getCartData() {
  return (0, _util.fetch)(_common.APIRoot + '/carts/list');
}

/** 选中，取消选中购物车项目 **/
function selectCartItem(_ref) {
  var list = _ref.list,
      select = _ref.select;

  return (0, _util.fetch)(_common.APIRoot + '/carts/select', {
    method: 'PUT',
    body: {
      'cart_list': list,
      'is_select': select
    }
  });
}

/** 删除，修改购物车项目数量 **/
function changeCartItem(_ref2) {
  var id = _ref2.id,
      type = _ref2.type,
      count = _ref2.count;

  return (0, _util.fetch)(_common.APIRoot + '/carts/change', {
    method: 'PUT',
    body: {
      'cart_id': id,
      'type': type, // 1:删除,2:更改
      'quantity': count
    }
  });
}

/** order_confirm页面获取购车商品列表 **/
function getCartList(productIdList) {
  return (0, _util.fetch)(_common.APIRoot + '/carts/list', {
    method: 'POST',
    body: { cart_list: productIdList }
  });
}

/** 获取购物车商品数量 **/
function getCartSize() {
  return (0, _util.fetch)(_common.APIRoot + '/carts/size');
}

/** 生成订单 **/
function addOrder(params) {
  return (0, _util.fetch)(_common.APIRoot + '/orders', {
    method: 'POST',
    body: _extends({}, params)
  });
}

/** 获取博客列表 **/
function getBlogs(pageNo, pageSize) {
  return (0, _util.fetch)(_common.APIRoot + '/blog/' + pageSize + '/' + pageNo);
}

/** 获取博客列表 **/
function getBlogDetails(id) {
  return (0, _util.fetch)(_common.APIRoot + '/blog/' + id + '/');
}

/** 获取集合列表 **/
function getCollections() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$name = _ref3.name,
      name = _ref3$name === undefined ? '' : _ref3$name,
      _ref3$id = _ref3.id,
      id = _ref3$id === undefined ? '' : _ref3$id,
      _ref3$page = _ref3.page,
      page = _ref3$page === undefined ? 1 : _ref3$page,
      _ref3$pageSize = _ref3.pageSize,
      pageSize = _ref3$pageSize === undefined ? 10 : _ref3$pageSize;

  return (0, _util.fetch)(_common.APIRoot + '/collections/' + pageSize + '/' + page + '/');
}

/** 获取首页集合模块的集合列表 **/
function getHomeCollections() {
  var collectionIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return (0, _util.fetch)(_common.APIRoot + '/collections/multiple', {
    method: 'POST',
    body: { collection_ids: collectionIds }
  });
}

/** 获取集合详情 **/
function fetchTopicsDedails() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref4.id,
      pageSize = _ref4.pageSize,
      _ref4$page = _ref4.page,
      page = _ref4$page === undefined ? 1 : _ref4$page;

  return (0, _util.fetch)(_common.APIRoot + '/collections/' + id + '/' + pageSize + '/' + page + '/');
}

/** 获取单页数据 **/
function getSinglePage(id) {
  return (0, _util.fetch)(_common.APIRoot + '/pages/' + id);
}

// /** 获取页面导航栏数据**/
// export function getMenus (id) {
//     return fetch(`${APIRoot}/menu/${id}`)
// }

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author MG Ding (丁文强)
 * @date 2018/9/26
 * @desc service config
 */
// const APIRoot = 'http://192.168.0.38/web/v1'
var APIRoot = 'http://builder.test.com:8080/web/v1';
exports.APIRoot = APIRoot;

/***/ })
/******/ ]);