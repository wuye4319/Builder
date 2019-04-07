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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

var	fixUrls = __webpack_require__(18);

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

var _Message = __webpack_require__(12);

var _Message2 = _interopRequireDefault(_Message);

var _Link = __webpack_require__(10);

var _Link2 = _interopRequireDefault(_Link);

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
 * @param n <number> 时间戳，精确到毫秒的时间数字
 * @return obj <date,time>
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
  options.headers = _extends({
    // 'Business-Id': 'g9jP2e',
    'Origin-Host': 'www.test.com'
  }, options.headers || {});

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
        _Message2.default.error(fail);
      } else if (fail !== false) {
        _Message2.default.error(data.msg);
      }

      if (authority && data.state === 10008) {
        _Link2.default.goTo('/login/?ref=' + encodeURIComponent(window.location.href));
      }
    }
  }).catch(function (err) {
    var errorType = typeof error === 'undefined' ? 'undefined' : _typeof(error);
    console.error(err);
    if (errorType === 'function') {
      error(err);
    } else if (errorType === 'string') {
      _Message2.default.error(error);
    } else if (error !== false) {
      err.message === 'Failed to fetch' && _Message2.default.error('Network is busy');
    }
  }).finally(complete);
}

/***/ }),
/* 4 */
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
  module.exports = __webpack_require__(19)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(22)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = __webpack_require__(23);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Icon2.default; /**
                                   * @author MG Ding (丁文强)
                                   * @desc Icon (图标)
                                   */

/***/ }),
/* 10 */
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
      rest = _objectWithoutProperties(_ref, ['children', 'onClick', 'href']);

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
    _extends({}, rest, { href: href, onClick: handleClick }),
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(6);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
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

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Message = __webpack_require__(26);

var _Message2 = _interopRequireDefault(_Message);

var _reactDom = __webpack_require__(32);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Cart = __webpack_require__(15);

var _Cart2 = _interopRequireDefault(_Cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Alan (曹昌盛)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc 购物车
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/** modules **/


var _module = { Cart: _Cart2.default
  /** modules **/
  // const config = require('./config.json')

};
var CartPage = function (_React$Component) {
  _inherits(CartPage, _React$Component);

  function CartPage() {
    _classCallCheck(this, CartPage);

    return _possibleConstructorReturn(this, (CartPage.__proto__ || Object.getPrototypeOf(CartPage)).apply(this, arguments));
  }

  _createClass(CartPage, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var config = this.props.config;
      // return <Cart {...this.props} />

      return _react2.default.createElement(
        'div',
        null,
        config.module.map(function (moduleConfig) {
          var name = moduleConfig.name,
              key = moduleConfig.key;

          var id = name + '-' + key;
          return _react2.default.createElement(
            'div',
            { id: id, key: id },
            _react2.default.createElement(_module[name], _extends({}, _this2.props, {
              config: moduleConfig
            }))
          );
        })
      );
    }
  }]);

  return CartPage;
}(_react2.default.Component);

window.wrapper(CartPage);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(16);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(9);

var _Icon2 = _interopRequireDefault(_Icon);

var _Quantity = __webpack_require__(33);

var _Quantity2 = _interopRequireDefault(_Quantity);

var _Button = __webpack_require__(37);

var _Button2 = _interopRequireDefault(_Button);

var _Link = __webpack_require__(10);

var _Link2 = _interopRequireDefault(_Link);

var _util = __webpack_require__(3);

var _Message = __webpack_require__(12);

var _Message2 = _interopRequireDefault(_Message);

var _page = __webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable camelcase */
/**
 * @author Alan (曹昌盛)
 * @desc Cart模块
 */


var initialConfig = __webpack_require__(43);

var Cart = function (_React$Component) {
  _inherits(Cart, _React$Component);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      initBefore: true,
      isEmpty: true,
      checkedAll: true,
      noteValue: '',
      subTotal: 0,
      cartList: []
      // 防止连续多次点击
    }, _this.flag = true, _this.getCartData = function () {
      (0, _page.getCartData)().then(function (res) {
        if (res.state === 0) {
          _this.handleResData(res.data);
        }
        _this.flag = true;
      }).catch(function () {
        _this.flag = true;
        _this.setState({
          initBefore: false
        });
      });
    }, _this.handleResData = function (data) {
      // 购物车列表和商品信息
      var cart_list = data.cart_list,
          price_info = data.price_info;
      // 购物车不为空

      if (cart_list.length > 0) {
        // 判断是否全部选中
        var tempList = cart_list.filter(function (item) {
          return item.is_select;
        });
        var selectAll = tempList.length === cart_list.length;
        _this.setState(function () {
          return {
            cartList: cart_list,
            subTotal: price_info[0].value,
            checkedAll: selectAll,
            initBefore: false,
            isEmpty: false
          };
        });
      } else {
        _this.setState({
          initBefore: false
        });
      }
    }, _this.checkedAll = function () {
      if (_this.flag) {
        _this.flag = false;
        var _this$state = _this.state,
            checkedAll = _this$state.checkedAll,
            cartList = _this$state.cartList;

        var tempList = cartList.map(function (item) {
          return item.cart_id;
        });
        _this.postSelect(tempList, !checkedAll).then(function (status) {
          if (status) {
            cartList.map(function (item) {
              item.is_select = checkedAll ? 0 : 1;
              return item;
            });
            _this.setState({
              checkedAll: !checkedAll,
              cartList: cartList
            });
          }
        });
      }
    }, _this.toggleSelect = function (key) {
      if (_this.flag) {
        _this.flag = false;
        var cartList = [].concat(_toConsumableArray(_this.state.cartList));
        var _cartList$key = cartList[key],
            cart_id = _cartList$key.cart_id,
            is_select = _cartList$key.is_select;

        _this.postSelect([cart_id], !is_select).then(function (status) {
          if (status) {
            cartList[key].is_select = !is_select ? 1 : 0;
            var tempList = cartList.filter(function (item) {
              return item.is_select;
            });
            var selectAll = tempList.length === cartList.length;
            _this.setState({
              checkedAll: selectAll,
              cartList: cartList
            });
          }
        });
      }
    }, _this.postSelect = function (list, select) {
      // return fetch('/carts/select', {
      //   method: 'post',
      //   body: {
      //     'cart_list': list,
      //     'is_select': select ? 1 : 0
      //   }
      // }).then((res) => {
      return (0, _page.selectCartItem)({ list: list, select: select ? 1 : 0 }).then(function (res) {
        _this.flag = true;
        if (res.state === 0) {
          return true;
        } else {
          return false;
        }
      }).catch(function (err) {
        _this.flag = true;
        console.log(err);
      });
    }, _this.deleteGoods = function (key) {
      if (_this.flag) {
        _this.flag = false;
        var cartList = [].concat(_toConsumableArray(_this.state.cartList));
        var cart_id = cartList[key].cart_id;

        _this.postGoodsCount(cart_id).then(function (status) {
          if (status) {
            cartList.splice(key, 1);
            _this.setState({
              cartList: cartList,
              isEmpty: !cartList.length
            });
            _this.props.reloadCartInfo();
          }
        });
      }
    }, _this.handleCount = function (key, count) {
      if (_this.flag) {
        _this.flag = false;
        var cartList = [].concat(_toConsumableArray(_this.state.cartList));
        var cart_id = cartList[key].cart_id;

        _this.postGoodsCount(cart_id, 2, count).then(function (status) {
          if (status) {
            cartList[key].quantity = count;
            _this.setState({
              cartList: cartList
            });
          }
        });
      }
    }, _this.postGoodsCount = function (id) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      // changeCartItem
      // return fetch('/carts/change', {
      //   method: 'post',
      //   body: {
      //     'cart_id': id,
      //     'type': type, // 1:删除,2:更改
      //     'quantity': count
      //   }
      // }).then((res) => {
      return (0, _page.changeCartItem)({ id: id, type: type, count: count }).then(function (res) {
        _this.flag = true;
        if (res.state === 0) {
          return true;
        } else {
          return false;
        }
      }).catch(function (err) {
        _this.flag = true;
        console.log(err);
      });
    }, _this.changeNote = function (e) {
      _this.setState({
        noteValue: e.target.value
      });
    }, _this.sumPrice = function () {
      var cartList = [].concat(_toConsumableArray(_this.state.cartList));
      var sum = 0;
      for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].is_select) {
          sum += Number(cartList[i].quantity * cartList[i].sell_price);
        }
      }
      return sum.toFixed(2);
    }, _this.prdProps2string = function (arr) {
      var prdProps = void 0;
      if (arr) {
        prdProps = arr.map(function (item) {
          return item.valueName;
        }).join('/');
      }
      return prdProps;
    }, _this.submitOrder = function () {
      var cartList = _this.state.cartList;

      var list = [];
      for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].is_select) {
          list.push(cartList[i].cart_id);
        }
      }
      if (list.length > 0) {
        window.sessionStorage.setItem('cart_list', JSON.stringify(list));
        window.sessionStorage.setItem('remarks', _this.state.noteValue);
        _Link2.default.goTo('/order_confirm/');
      } else {
        _Message2.default.error('请选择相关商品');
      }
    }, _this.goToDetails = function (id) {
      _Link2.default.goTo('/products/?id=' + id);
    }, _this.componentDidMount = function () {
      _this.getCartData();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 请求接口获取数据

  // 处理接口数据

  // 全选和反选操作

  // 取消和选中操作

  // 选择商品数据提交

  // 删除商品

  // 改变商品数量

  // 删除或改变商品数量数据提交

  // 商品备注

  // 求总价格

  // 处理商品属性数组为字符串

  // 跳转至订单确认

  // 跳转至商品详情


  _createClass(Cart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classPrefix = Cart.classPrefix;
      var _props = this.props,
          _props$config = _props.config,
          config = _props$config === undefined ? initialConfig : _props$config,
          pageMode = _props.pageMode;
      var _state = this.state,
          isEmpty = _state.isEmpty,
          checkedAll = _state.checkedAll,
          cartList = _state.cartList,
          noteValue = _state.noteValue,
          initBefore = _state.initBefore;
      var selectAll = config.selectAll,
          orderNote = config.orderNote;

      var sumPrice = this.sumPrice();

      return _react2.default.createElement(
        'div',
        { className: classPrefix + '-wrap l-centerBlock' },
        _react2.default.createElement(
          'h2',
          { className: 'cart-title l-mobile-cart-title ' + (0, _util.color)('text') + ' ' + (0, _util.font)('title') },
          'SHOPPING CART'
        ),
        initBefore ? '' : isEmpty ? _react2.default.createElement(
          'div',
          { className: 'cart-empty' },
          _react2.default.createElement('i', { className: 'circle' }),
          _react2.default.createElement(
            'p',
            { className: (0, _util.color)('text') + ' ' + (0, _util.font)('subTitle') },
            'YOUR CART IS EMPTY'
          ),
          _react2.default.createElement(
            _Button2.default,
            { type: 'ghost',
              className: (0, _util.color)('brand') + ' ' + (0, _util.font)('button') + ' ' + _util.color.border('brand'),
              onClick: function onClick() {
                _Link2.default.goTo('/home/');
              }
            },
            'Continue Shopping'
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'cart-list' },
          _react2.default.createElement(
            'div',
            { className: 'cart-sub-title ' + (!selectAll && !!pageMode ? 'no-title' : '') },
            _react2.default.createElement(
              'div',
              { className: 'select-all' },
              _react2.default.createElement(
                'label',
                null,
                selectAll && _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement('input', { type: 'checkbox', onChange: this.checkedAll, checked: checkedAll }),
                  _react2.default.createElement(
                    'span',
                    { className: (0, _util.color)('text') + ' ' + (0, _util.font)('text') },
                    'Select all'
                  )
                )
              ),
              !pageMode && _react2.default.createElement(
                'span',
                { className: 'product-span' },
                'Product'
              )
            ),
            !pageMode && _react2.default.createElement(
              _react2.default.Fragment,
              null,
              _react2.default.createElement(
                'span',
                { className: 'price' },
                'Price'
              ),
              _react2.default.createElement(
                'span',
                { className: 'quantity' },
                'Quantity'
              ),
              _react2.default.createElement(
                'span',
                { className: 'total' },
                'Total'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'lists-wrap' },
            cartList.map(function (item, key) {
              return _react2.default.createElement(
                'div',
                { className: 'list-item', key: key },
                _react2.default.createElement(
                  'div',
                  { className: 'check-goods' },
                  selectAll ? _react2.default.createElement('input', { type: 'checkbox', onChange: _this2.toggleSelect.bind(_this2, key),
                    checked: !!item.is_select }) : _react2.default.createElement('span', { className: 'instead' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'goods-desc', onClick: _this2.goToDetails.bind(_this2, item.spu_code) },
                    _react2.default.createElement('img', { src: item.main_img, alt: item.product_name }),
                    !pageMode && _react2.default.createElement(
                      'div',
                      { className: 'details' },
                      _react2.default.createElement(
                        'h3',
                        { className: (0, _util.color)('text') + ' ' + (0, _util.font)('text') },
                        item.product_name
                      ),
                      !!item.productProps && item.productProps.map(function (val, index) {
                        return _react2.default.createElement(
                          'p',
                          { key: index },
                          val.propName,
                          ': ',
                          val.valueName
                        );
                      })
                    )
                  )
                ),
                !pageMode ? _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement(
                    'span',
                    { className: 'price' },
                    '$',
                    item.sell_price
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'quantity' },
                    _react2.default.createElement(_Quantity2.default, { value: item.quantity, onChange: _this2.handleCount.bind(_this2, key) })
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'total' },
                    _react2.default.createElement(
                      'span',
                      null,
                      '$',
                      (item.sell_price * item.quantity).toFixed(2)
                    ),
                    _react2.default.createElement(_Icon2.default, { type: 'no-filling', onClick: _this2.deleteGoods.bind(_this2, key) })
                  )
                ) : _react2.default.createElement(
                  'div',
                  { className: 'l-mobile-goods-info' },
                  _react2.default.createElement(
                    'div',
                    { className: 'info-top' },
                    _react2.default.createElement(
                      'p',
                      { className: (0, _util.color)('text') + ' ' + (0, _util.font)('text'),
                        onClick: _this2.goToDetails.bind(_this2, item.spu_code) },
                      item.product_name
                    ),
                    _react2.default.createElement(_Icon2.default, { type: 'no-filling', onClick: _this2.deleteGoods.bind(_this2, key) })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'color-size' },
                    _this2.prdProps2string(item.productProps)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'price' },
                    _react2.default.createElement(
                      'span',
                      null,
                      'Price'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      '$',
                      item.sell_price
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'l-mobile-quantity' },
                    _react2.default.createElement(
                      'span',
                      { className: 'l-q-title' },
                      'Quantity'
                    ),
                    _react2.default.createElement(_Quantity2.default, { value: item.quantity, onChange: _this2.handleCount.bind(_this2, key) })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'l-mobile-total' },
                    _react2.default.createElement(
                      'span',
                      null,
                      'Total'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      '$',
                      (item.sell_price * item.quantity).toFixed(2)
                    )
                  )
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'l-mobile-list-bottom list-bottom ' + (!orderNote && !pageMode ? 'no-note' : '') },
            orderNote && _react2.default.createElement(
              'div',
              { className: 'order-note' },
              _react2.default.createElement(
                'h4',
                null,
                'Add order note'
              ),
              _react2.default.createElement(
                'div',
                { className: 'note ' + _util.color.border('border') },
                _react2.default.createElement('textarea', {
                  className: (0, _util.color)('prompt') + ' ' + (0, _util.color)('text') + ' ' + (0, _util.font)('text'),
                  placeholder: 'Text here\u2026',
                  name: 'note',
                  value: noteValue,
                  onChange: this.changeNote
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'order-operate' },
              _react2.default.createElement(
                'div',
                { className: 'total-price' },
                _react2.default.createElement(
                  'span',
                  { className: 'left' },
                  'Subtotal'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'num ' + (0, _util.color)('price') + ' ' + (0, _util.font)('price') },
                  '$',
                  sumPrice
                )
              ),
              _react2.default.createElement(
                'p',
                { className: (0, _util.color)('text') + ' ' + (0, _util.font)('secTitle') },
                'Shipping & taxes calculated at checkout'
              ),
              _react2.default.createElement(
                'div',
                { className: 'o-btm' },
                _react2.default.createElement(
                  _Link2.default,
                  { href: '/home/' },
                  _react2.default.createElement(
                    'span',
                    { className: (0, _util.color)('text') + ' ' + (0, _util.font)('secTitle') },
                    'To Home page'
                  ),
                  _react2.default.createElement(_Icon2.default, { type: 'forward' })
                ),
                _react2.default.createElement(
                  _Button2.default,
                  { onClick: this.submitOrder },
                  'Check Out'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Cart;
}(_react2.default.Component);

Cart.propTypes = {
  config: _propTypes2.default.object.isRequired
};
Cart.classPrefix = 'm-cart';
exports.default = Cart;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
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
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./Cart.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./Cart.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.m-cart-wrap {\n  width: 100%;\n}\n.m-cart-wrap .cart-title {\n  width: 100%;\n  margin: 0 auto;\n  text-align: center;\n  line-height: 1;\n  padding: 0.8rem 0 0.39rem 0;\n  border-bottom: 0.01rem solid #EBE5E7;\n}\n.m-cart-wrap .cart-empty {\n  width: 100%;\n  margin: 0 auto;\n  padding: 0.8rem 0;\n}\n.m-cart-wrap .cart-empty i.circle {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 50%;\n  margin: 0 auto;\n  background: url('/source/img/cartempty.png') 0 0 no-repeat;\n  background-size: 100% 100%;\n}\n.m-cart-wrap .cart-empty p {\n  width: 100%;\n  text-align: center;\n  line-height: 1;\n  margin: 0.4rem 0;\n}\n.m-cart-wrap .cart-empty button {\n  display: block;\n  margin: 0 auto;\n}\n.m-cart-wrap .cart-list {\n  width: 100%;\n  max-width: 12rem;\n  margin: 0 auto;\n}\n.m-cart-wrap .cart-list .cart-sub-title {\n  padding: 0.2rem 0;\n  border-bottom: 0.01rem solid #EDE9EA;\n  display: flex;\n}\n.m-cart-wrap .cart-list .cart-sub-title .select-all {\n  width: 48%;\n  -webkit-tap-highlight-color: transparent;\n  -moz-tap-highlight-color: transparent;\n  display: flex;\n}\n.m-cart-wrap .cart-list .cart-sub-title .select-all label {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  width: 2.36rem;\n}\n.m-cart-wrap .cart-list .cart-sub-title .select-all label input {\n  margin: 0;\n  width: 0.16rem;\n  height: 0.16rem;\n  cursor: pointer;\n}\n.m-cart-wrap .cart-list .cart-sub-title .select-all label span {\n  line-height: 1;\n  margin-left: 0.2rem;\n}\n.m-cart-wrap .cart-list .cart-sub-title span {\n  font-size: 16px;\n  color: #302E2F;\n  line-height: 1;\n}\n.m-cart-wrap .cart-list .cart-sub-title .price {\n  display: block;\n  width: 11%;\n}\n.m-cart-wrap .cart-list .cart-sub-title .quantity {\n  display: block;\n  width: 21%;\n  min-width: 2.2rem;\n}\n.m-cart-wrap .cart-list .cart-sub-title .total {\n  display: block;\n  flex: 1;\n}\n.m-cart-wrap .cart-list .lists-wrap {\n  width: 100%;\n  max-width: 12rem;\n  margin: 0 auto;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item {\n  padding: 0.2rem 0;\n  border-bottom: 0.01rem solid #EDE9EA;\n  display: flex;\n  align-items: center;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods {\n  width: 48%;\n  display: flex;\n  align-items: center;\n  -webkit-tap-highlight-color: transparent;\n  -moz-tap-highlight-color: transparent;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods input {\n  margin: 0;\n  width: 0.16rem;\n  height: 0.16rem;\n  cursor: pointer;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .instead {\n  display: block;\n  opacity: 0;\n  margin: 0;\n  width: 0.16rem;\n  height: 0.16rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc {\n  cursor: pointer;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  margin-left: 0.2rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc img {\n  display: block;\n  width: 1.6rem;\n  height: 1.6rem;\n  margin-right: 0.4rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc .details {\n  flex: 1;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc .details h3 {\n  margin: 0 0.1rem 0.12rem 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  word-break: break-all;\n  overflow: hidden;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc .details p {\n  font-size: 0.16rem;\n  color: #585557;\n  line-height: 0.24rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item span.price {\n  display: block;\n  width: 11%;\n  font-size: 0.18rem;\n  color: #302E2F;\n  line-height: 1;\n  height: 0.18rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item div.quantity {\n  display: block;\n  width: 21%;\n  min-width: 2.2rem;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item p.total {\n  display: flex;\n  flex: 1;\n  justify-content: space-between;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item p.total span {\n  font-size: 18px;\n  line-height: 1;\n}\n.m-cart-wrap .cart-list .lists-wrap .list-item p.total i {\n  font-size: 0.2rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.m-cart-wrap .cart-list .list-bottom {\n  padding: 0.4rem 0;\n  display: flex;\n}\n.m-cart-wrap .cart-list .list-bottom .order-note {\n  flex: 1;\n}\n.m-cart-wrap .cart-list .list-bottom .order-note h4 {\n  font-size: 16px;\n  color: #302E2F;\n  line-height: 1;\n  margin: 0 0 0.2rem 0;\n}\n.m-cart-wrap .cart-list .list-bottom .order-note .note {\n  max-width: 6rem;\n  width: 95%;\n  box-sizing: border-box;\n  border-width: 0.01rem;\n  border-style: solid;\n}\n.m-cart-wrap .cart-list .list-bottom .order-note .note textarea {\n  border: 0;\n  outline: none;\n  width: 100%;\n  height: 1.04rem;\n  padding: 0.16rem 0.2rem;\n  box-sizing: border-box;\n  resize: none;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .total-price {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  margin-bottom: 0.2rem;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .total-price span.left {\n  font-size: 0.2rem;\n  color: #302E2F;\n  line-height: 1;\n  margin-right: 0.13rem;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .total-price span.num {\n  line-height: 1;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate p {\n  text-align: right;\n  line-height: 1;\n  margin-bottom: 0.2rem;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .o-btm {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .o-btm a {\n  display: flex;\n  align-items: center;\n  margin-right: 0.4rem;\n}\n.m-cart-wrap .cart-list .list-bottom .order-operate .o-btm a i {\n  font-size: 0.12rem;\n  margin-left: 0.05rem;\n  color: #8B8185;\n}\n.m-cart-wrap .cart-list .no-note.list-bottom {\n  justify-content: flex-end;\n}\n@media screen and (max-width: 749px) {\n  .m-cart-wrap .l-mobile-cart-title {\n    padding: 0.2rem 0;\n  }\n  .m-cart-wrap .cart-empty {\n    padding: 0.4rem 0;\n  }\n  .m-cart-wrap .cart-empty i.circle {\n    width: 1.4rem;\n    height: 1.4rem;\n  }\n  .m-cart-wrap .cart-empty p {\n    margin: 0.4rem 0;\n  }\n  .m-cart-wrap .cart-list {\n    padding: 0 0.2rem;\n  }\n  .m-cart-wrap .cart-list .cart-sub-title {\n    padding: 0.2rem 0;\n  }\n  .m-cart-wrap .cart-list .no-title.cart-sub-title {\n    display: none;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .list-item {\n    align-items: flex-start;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods {\n    width: auto;\n    -webkit-tap-highlight-color: transparent;\n    -moz-tap-highlight-color: transparent;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .list-item div.check-goods .goods-desc img {\n    width: 0.8rem;\n    height: 0.8rem;\n    margin-right: 0.2rem;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info {\n    flex: 1;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info div.info-top {\n    width: 100%;\n    display: flex;\n    justify-content: flex-start;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info div.info-top p {\n    flex: 1;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info div.info-top i {\n    margin-left: 0.2rem;\n    line-height: 1;\n    font-size: 0.2rem;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .color-size {\n    font-size: 0.16rem;\n    color: #585557;\n    margin: 0.06rem 0 0.1rem 0;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .price {\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    margin-bottom: 0.18rem;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .price span {\n    font-size: 0.16rem;\n    color: #302E2F;\n    line-height: 1;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-quantity {\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 0.18rem;\n    flex-wrap: wrap;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-quantity .l-q-title {\n    font-size: 0.16rem;\n    color: #302E2F;\n    padding: 0.1rem 0;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-quantity span.quantity {\n    min-width: 1.38rem;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-quantity label.bc-quantity-input {\n    width: 0.6rem;\n    padding: 0.12rem 0.03rem;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-total {\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n  }\n  .m-cart-wrap .cart-list .lists-wrap .l-mobile-goods-info .l-mobile-total span {\n    font-size: 0.16rem;\n    color: #302E2F;\n    line-height: 1;\n  }\n  .m-cart-wrap .cart-list .l-mobile-list-bottom {\n    flex-direction: column;\n  }\n  .m-cart-wrap .cart-list .l-mobile-list-bottom .order-note .note {\n    width: 100%;\n    margin-bottom: 0.2rem;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(11);
var assign = __webpack_require__(20);

var ReactPropTypesSecret = __webpack_require__(8);
var checkPropTypes = __webpack_require__(21);

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
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
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
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
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
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
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
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(11);
  var ReactPropTypesSecret = __webpack_require__(8);
  var loggedTypeFailures = {};
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
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(8);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(24);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Icon (图标)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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
        className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-' + type, type), _defineProperty(_setClass, (0, _util.color)(colorClass), colorClass), _setClass))
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n@font-face {\n  font-family: \"bcicon\";\n  src: url('/source/font/iconfont.eot?t=1522204678250');\n  /* IE9*/\n  src: url('/source/font/iconfont.eot?t=1522204678250#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('/source/font/iconfont.ttf?t=1522204678250') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('/source/font/iconfont.svg?t=1522204678250#bcicon') format('svg');\n  /* iOS 4.1- */\n}\n.bc-icon {\n  font-family: \"bcicon\" !important;\n  font-size: 0.16rem;\n  line-height: 1;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.bc-icon-close:before {\n  content: \"\\E605\";\n}\n.bc-icon-search:before {\n  content: \"\\E60B\";\n}\n.bc-icon-edit:before {\n  content: \"\\E60F\";\n}\n.bc-icon-delete:before {\n  content: \"\\E61D\";\n}\n.bc-icon-checkbox:before {\n  content: \"\\E61F\";\n}\n.bc-icon-radio:before {\n  content: \"\\E620\";\n}\n.bc-icon-checkbox-checked:before {\n  content: \"\\E622\";\n}\n.bc-icon-radio-checked:before {\n  content: \"\\E623\";\n}\n.bc-icon-arrow-right:before {\n  content: \"\\E624\";\n}\n.bc-icon-arrow-down:before {\n  content: \"\\E625\";\n}\n.bc-icon-no-filling:before {\n  content: \"\\E62A\";\n}\n.bc-icon-yes-filling:before {\n  content: \"\\E62B\";\n}\n.bc-icon-info-filling:before {\n  content: \"\\E62C\";\n}\n.bc-icon-info:before {\n  content: \"\\E62D\";\n}\n.bc-icon-yes:before {\n  content: \"\\E62E\";\n}\n.bc-icon-no:before {\n  content: \"\\E62F\";\n}\n.bc-icon-menu:before {\n  content: \"\\E61A\";\n}\n.bc-icon-user:before {\n  content: \"\\E61B\";\n}\n.bc-icon-forward:before {\n  content: \"\\E626\";\n}\n.bc-icon-back:before {\n  content: \"\\E627\";\n}\n.bc-icon-unfold:before {\n  content: \"\\E61C\";\n}\n.bc-icon-cart-o:before {\n  content: \"\\E621\";\n}\n.bc-icon-addto:before {\n  content: \"\\E629\";\n}\n.bc-icon-fullscreen:before {\n  content: \"\\E628\";\n}\n.bc-icon-view:before {\n  content: \"\\E630\";\n}\n.bc-icon-bag:before {\n  content: \"\\E631\";\n}\n.bc-icon-add:before {\n  content: \"\\E632\";\n}\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(27);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Item = __webpack_require__(29);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".bc-message {\n  position: fixed;\n  width: 100%;\n  height: 0;\n  top: 80px;\n  left: 0;\n  z-index: 10000;\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(30);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(9);

var _Icon2 = _interopRequireDefault(_Icon);

var _util = __webpack_require__(3);

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
        { className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-fadeIn', fadeIn), _defineProperty(_setClass, classPrefix + '-fadeOut', fadeOut), _setClass)) },
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-messageItem {\n  width: 0;\n  text-align: center;\n  margin-left: 50%;\n  white-space: nowrap;\n}\n.bc-messageItem > div {\n  display: inline-block;\n  max-width: 750px;\n  background: rgba(0, 0, 0, 0.8);\n  padding: 18px 20px;\n  border-radius: 3px;\n  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);\n  margin-bottom: 20px;\n  transform: translateX(-50%);\n}\n.bc-messageItem > div span {\n  display: inline-block;\n  font-size: 16px;\n  color: #fff;\n  line-height: 22px;\n  white-space: nowrap;\n  vertical-align: top;\n}\n.bc-messageItem-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 1px 10px 1px 0;\n  border-radius: 50%;\n}\n.bc-messageItem-icon .bc-icon {\n  color: #fff !important;\n}\n.bc-messageItem-icon-info {\n  background-color: #1890FF;\n}\n.bc-messageItem-icon-success {\n  background-color: #29CA40;\n}\n.bc-messageItem-icon-error {\n  background-color: #FF6158;\n}\n.bc-messageItem-icon-warning {\n  background-color: #FFBD2F;\n}\n.bc-messageItem-fadeIn {\n  animation: fadeIn 330ms ease;\n}\n.bc-messageItem-fadeOut {\n  animation: fadeOut 330ms ease;\n}\n.bc-messageItem .bc-icon {\n  display: inherit;\n  vertical-align: top;\n  line-height: 20px;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n  to {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n  to {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Quantity = __webpack_require__(34);

var _Quantity2 = _interopRequireDefault(_Quantity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Quantity2.default; /**
                                       * @author MG Ding (丁文强)
                                       * @desc Quantity (数量)
                                       */

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(35);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Quantity (数量)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Quantity = function (_React$Component) {
  _inherits(Quantity, _React$Component);

  function Quantity() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Quantity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Quantity.__proto__ || Object.getPrototypeOf(Quantity)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.defaultValue
    }, _this.cache = _this.props.defaultValue, _this.handleChange = function (e) {
      var value = e.target.value.trim();

      if (value) {
        value = parseInt(value.replace(/\D|\./g, ''));
      }

      if (!value) {
        value = 0;
      }

      if (value !== _this.value) _this.updateValue(value);
    }, _this.handleBlur = function () {
      var _this2 = _this,
          value = _this2.value;
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          onBlur = _this$props.onBlur;

      if (value > max || value < min) {
        _this.updateValue(_this.cache);
      }
      onBlur && onBlur();
    }, _this.handleFocus = function () {
      var onFocus = _this.props.onFocus;

      _this.cache = _this.value;
      onFocus && onFocus();
    }, _this.handleMore = function () {
      _this.updateValue(_this.value + 1);
    }, _this.handleLess = function () {
      _this.updateValue(_this.value - 1);
    }, _this.updateValue = function (value) {
      var _this$props2 = _this.props,
          propsValue = _this$props2.value,
          onChange = _this$props2.onChange;

      if (propsValue === undefined) _this.setState({ value: value });
      onChange && onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Quantity, [{
    key: 'render',
    value: function render() {
      var _setClass;

      var classPrefix = Quantity.classPrefix;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          min = _props.min,
          max = _props.max,
          disabled = _props.disabled,
          propsValue = _props.value,
          onChange = _props.onChange,
          defaultValue = _props.defaultValue,
          rest = _objectWithoutProperties(_props, ['className', 'style', 'min', 'max', 'disabled', 'value', 'onChange', 'defaultValue']);

      var stateValue = this.state.value;

      var value = propsValue === undefined ? stateValue : propsValue;
      this.value = value;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, (0, _util.font)('text'), 1), _setClass)),
          style: style
        },
        _react2.default.createElement(
          'button',
          {
            className: classPrefix + '-btn ' + _util.color.border('border'),
            disabled: disabled || value <= min,
            onClick: this.handleLess,
            type: 'button'
          },
          '-'
        ),
        _react2.default.createElement(
          'label',
          { className: classPrefix + '-input ' + _util.color.border('border') },
          _react2.default.createElement('input', _extends({}, rest, {
            value: value || '',
            disabled: disabled,
            className: (0, _util.font)('text'),
            onChange: this.handleChange,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            type: 'text'
          }))
        ),
        _react2.default.createElement(
          'button',
          {
            className: classPrefix + '-btn ' + _util.color.border('border'),
            disabled: disabled || value >= max,
            onClick: this.handleMore,
            type: 'button'
          },
          '+'
        )
      );
    }
  }]);

  return Quantity;
}(_react2.default.Component);

Quantity.propTypes = {
  defaultValue: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};
Quantity.defaultProps = {
  defaultValue: 1,
  min: 1,
  max: Infinity
};
Quantity.classPrefix = 'bc-quantity';
exports.default = Quantity;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
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
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Quantity.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Quantity.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-quantity {\n  display: inline-block;\n}\n.bc-quantity-btn {\n  width: 0.48rem;\n  height: 0.48rem;\n  font-size: 0.22rem;\n  border-width: 1px;\n  border-style: solid;\n  display: inline-block;\n  cursor: pointer;\n  background: #fff;\n  vertical-align: top;\n  text-align: center;\n  padding: 0;\n}\n.bc-quantity-btn:first-of-type {\n  border-radius: 2px 0 0 2px;\n}\n.bc-quantity-btn:last-of-type {\n  border-radius: 0 2px 2px 0;\n}\n.bc-quantity-btn:focus {\n  outline: 0;\n}\n.bc-quantity-btn:disabled {\n  opacity: .7;\n  cursor: not-allowed;\n}\n.bc-quantity-input {\n  display: inline-block;\n  width: 1rem;\n  height: 0.48rem;\n  padding: 0.08rem 0.06rem;\n  vertical-align: top;\n  border-width: 1px;\n  border-style: solid;\n  border-left: 0;\n  border-right: 0;\n  box-shadow: none;\n}\n.bc-quantity-input input {\n  display: inline-block;\n  vertical-align: top;\n  width: 100%;\n  height: 100%;\n  line-height: 0.3rem;\n  text-align: center;\n  border: 0;\n  padding: 0;\n  -moz-appearance: textfield;\n}\n.bc-quantity-input input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n.bc-quantity-input input:focus {\n  outline: 0;\n}\n.bc-quantity-input input:disabled {\n  opacity: .7;\n  cursor: not-allowed;\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = __webpack_require__(38);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Button2.default; /**
                                     * @author MG Ding (丁文强)
                                     * @desc Button (按钮)
                                     */

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(39);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(9);

var _Icon2 = _interopRequireDefault(_Icon);

var _Link = __webpack_require__(10);

var _Link2 = _interopRequireDefault(_Link);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Button (按钮)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _setClass, _setClass2;

      var classPrefix = Button.classPrefix;

      var _props = this.props,
          children = _props.children,
          href = _props.href,
          type = _props.type,
          className = _props.className,
          disabled = _props.disabled,
          loading = _props.loading,
          icon = _props.icon,
          rest = _objectWithoutProperties(_props, ['children', 'href', 'type', 'className', 'disabled', 'loading', 'icon']);

      var _className = (0, _util.setClass)((_setClass = {
        'f-button': 1
      }, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-' + type, type), _defineProperty(_setClass, classPrefix + '-loading', loading), _defineProperty(_setClass, 'disabled', disabled || loading), _defineProperty(_setClass, _util.color.bg('brand'), type === 'primary'), _defineProperty(_setClass, _util.color.border('brand'), 1), _defineProperty(_setClass, (0, _util.color)('brand'), type !== 'primary'), _defineProperty(_setClass, (0, _util.color)('button'), type === 'primary'), _setClass));

      if (disabled || loading) {
        delete rest.onClick;
        if (href) href = 'javascript:;';
      }

      var wrapper = function wrapper(content) {
        var props = _extends({}, rest, {
          className: _className
        });
        return href ? _react2.default.createElement(
          _Link2.default,
          _extends({}, props, { href: href }),
          content
        ) : _react2.default.createElement(
          'button',
          _extends({ type: 'button' }, props, { disabled: disabled }),
          content
        );
      };

      return wrapper(_react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'span',
          { className: (0, _util.font)('button') },
          icon && _react2.default.createElement(_Icon2.default, {
            type: icon,
            color: 'inherit',
            className: (0, _util.setClass)((_setClass2 = {}, _defineProperty(_setClass2, classPrefix + '-icon', 1), _defineProperty(_setClass2, classPrefix + '-icon-noChild', !children), _setClass2)) }),
          children
        )
      ));
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  href: _propTypes2.default.string,
  target: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['primary', 'ghost']),
  icon: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
};
Button.defaultProps = {
  type: 'primary',
  disabled: false
};
Button.classPrefix = 'bc-button';
exports.default = Button;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
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
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Button.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Button.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-button {\n  display: inline-block;\n  min-height: 0.48rem;\n  padding: 0.08rem 0.4rem;\n  border-width: 1px;\n  border-style: solid;\n  cursor: pointer;\n  border-radius: 2px;\n  vertical-align: bottom;\n  box-sizing: border-box;\n  text-align: center;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n}\n.bc-button span {\n  display: inline-block;\n  line-height: 0.3rem;\n  white-space: nowrap;\n  transition: color .2s ease;\n  vertical-align: middle;\n}\n.bc-button:focus {\n  outline: 0;\n}\n.bc-button[disabled],\n.bc-button.disabled {\n  cursor: not-allowed;\n  opacity: .5;\n}\n.bc-button-loading.bc-button {\n  cursor: wait;\n}\n.bc-button-ghost {\n  background-color: transparent;\n}\n.bc-button .bc-button-icon:not(.bc-button-icon-noChild) {\n  margin-right: 0.08rem;\n  font-size: inherit;\n}\n.l-mobile .bc-button {\n  padding-left: 0.2rem;\n  padding-right: 0.2rem;\n}\n", ""]);

// exports


/***/ }),
/* 41 */
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
exports.getCollections = getCollections;
exports.getHomeCollections = getHomeCollections;
exports.fetchTopicsDedails = fetchTopicsDedails;

var _util = __webpack_require__(3);

var _common = __webpack_require__(42);

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

  return (0, _util.fetch)(_common.APIRoot + '/products', {
    query: {
      'keywords': keywords,
      'per_pagesize': pageSize,
      'page': page,
      'sort_type': sort
    }
  });
}

/** 获取商品详情 **/
function productDetail(id) {
  return (0, _util.fetch)(_common.APIRoot + '/products/' + (id || '91800016790798'));
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
  return (0, _util.fetch)(_common.APIRoot + '/blog', {
    query: {
      page: pageNo,
      per_pagesize: pageSize
    }
  });
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

  return (0, _util.fetch)(_common.APIRoot + '/collections/', {
    query: {
      page: page,
      name: name,
      section_id: id,
      per_pagesize: pageSize
    }
  });
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
      _ref4$pageSize = _ref4.pageSize,
      pageSize = _ref4$pageSize === undefined ? 10 : _ref4$pageSize,
      _ref4$page = _ref4.page,
      page = _ref4$page === undefined ? 1 : _ref4$page;

  return (0, _util.fetch)(_common.APIRoot + '/collections/' + id, {
    query: {
      page: page,
      per_pagesize: pageSize
    }
  });
}

/***/ }),
/* 42 */
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
var APIRoot = 'http://buckyshop.test.com/web/v1';
exports.APIRoot = APIRoot;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"name":"Cart"}

/***/ })
/******/ ]);