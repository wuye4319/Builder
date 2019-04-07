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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
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

var _Message = __webpack_require__(28);

var _Message2 = _interopRequireDefault(_Message);

var _Link = __webpack_require__(13);

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
/* 2 */
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
/* 3 */
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

var	fixUrls = __webpack_require__(20);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = __webpack_require__(21);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Icon2.default; /**
                                   * @author MG Ding (丁文强)
                                   * @desc Icon (图标)
                                   */

/***/ }),
/* 5 */
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
  module.exports = __webpack_require__(24)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(27)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = __webpack_require__(35);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Button2.default; /**
                                     * @author MG Ding (丁文强)
                                     * @desc Button (按钮)
                                     */

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



var emptyFunction = __webpack_require__(7);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.register = register;
exports.logout = logout;
exports.getAddress = getAddress;
exports.getCountry = getCountry;
exports.getState = getState;
exports.addressAction = addressAction;
exports.addAddress = addAddress;
exports.updateAddress = updateAddress;
exports.getDelivery = getDelivery;
exports.getOrders = getOrders;
exports.orderDetails = orderDetails;

var _util = __webpack_require__(1);

var _common = __webpack_require__(47);

/** 登录 **/
/**
 * @author MG Ding (丁文强)
 * @date 2018/9/26
 * @desc 数据接口-用户中心
 */

function login(_ref) {
  var eMail = _ref.eMail,
      passWord = _ref.passWord;

  return (0, _util.fetch)(_common.APIRoot + '/member/login', {
    method: 'POST',
    body: {
      'email': eMail,
      'password': passWord
    }
  });
}

/** 注册 **/
function register(_ref2) {
  var firstName = _ref2.firstName,
      lastName = _ref2.lastName,
      eMail = _ref2.eMail,
      firstPassword = _ref2.firstPassword,
      confirmPassword = _ref2.confirmPassword;

  return (0, _util.fetch)(_common.APIRoot + '/member/register', {
    method: 'POST',
    body: {
      'first_name': firstName,
      'last_name': lastName,
      'email': eMail,
      'password': firstPassword,
      'password_confirmation': confirmPassword
    }
  });
}

/** 登出 **/
function logout() {
  return (0, _util.fetch)(_common.APIRoot + '/member/logout');
}

/** 获取地址 **/
function getAddress() {
  return (0, _util.fetch)(_common.APIRoot + '/address');
}

/** 获取国家 **/
function getCountry() {
  return (0, _util.fetch)(_common.APIRoot + '/geo/country');
}

/** 获取省 **/
function getState(countryId) {
  return (0, _util.fetch)(_common.APIRoot + '/geo/state', {
    query: { 'country_id': countryId }
  });
}

/** 操作地址 **/
function addressAction(params) {
  return (0, _util.fetch)(_common.APIRoot + '/address/' + params.id + '/' + params.type, {
    method: 'PUT'
  });
}

/** 新增地址 **/
function addAddress(params) {
  return (0, _util.fetch)(_common.APIRoot + '/address', {
    method: 'POST',
    body: params
  });
}

/** 修改地址 **/
function updateAddress(id, params) {
  return (0, _util.fetch)(_common.APIRoot + '/address/' + id, {
    method: 'PUT',
    body: params
  });
}

/** 获取邮线列表 **/
function getDelivery(country_id, cart_list) {
  return (0, _util.fetch)(_common.APIRoot + '/checkouts/get_shippings', {
    method: 'POST',
    body: { country_id: country_id, cart_list: cart_list }
  });
}
/** 获取订单列表 **/
function getOrders(pageSize, page) {
  return (0, _util.fetch)(_common.APIRoot + '/orders/', {
    query: {
      'per_pagesize': pageSize,
      'page': page
    }
  });
}

/** 订单详情 **/
function orderDetails(id) {
  return (0, _util.fetch)(_common.APIRoot + '/orders/' + id);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Address = __webpack_require__(17);

var _Address2 = _interopRequireDefault(_Address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author：Gavin Yang (Y杨伟伟)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc：地址管理页
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date：2018.4.26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// const config = require('./config.json')

var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  _createClass(Page, [{
    key: 'render',
    value: function render() {
      var props = {
        pageMode: this.props.pageMode,
        config: this.props.config.module[0]
      };
      return _react2.default.createElement(_Address2.default, _extends({}, this.props, props));
    }
  }]);

  return Page;
}(_react2.default.Component);

window.wrapper(Page);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(18);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Icon = __webpack_require__(4);

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = __webpack_require__(10);

var _Button2 = _interopRequireDefault(_Button);

var _component = __webpack_require__(38);

var _Modal = __webpack_require__(48);

var _Modal2 = _interopRequireDefault(_Modal);

var _user = __webpack_require__(14);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author：Gavin Yang (杨伟伟)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc：地址管理页面
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date：2018.4.26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/


var Address = function (_React$Component) {
  _inherits(Address, _React$Component);

  function Address() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Address);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Address.__proto__ || Object.getPrototypeOf(Address)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      operateCode: 1, // 1:add 操作,2:edit操作
      modalStatus: false,
      countries: null,
      addressList: null,
      deleteInfo: {
        user: '',
        address: ''
      },
      editAddress: {
        address: '',
        city: '',
        country_id: '3',
        country_name: '',
        first_name: '',
        id: '',
        is_default: 0,
        last_name: '',
        phone_number: '',
        province_id: '',
        province_name: '',
        suite: '',
        zip_code: ''
      },
      addNewAddress: {
        address: '',
        city: '',
        country_id: '3',
        country_name: '',
        first_name: '',
        id: '',
        is_default: 0,
        last_name: '',
        phone_number: '',
        province_id: '',
        province_name: '',
        suite: '',
        zip_code: ''
      }
    }, _this.initAddressData = function (res) {
      if (res.data && res.data.length > 0) {
        var addressList = [].concat(_toConsumableArray(res.data)).sort(function (a, b) {
          return b.is_default - a.is_default;
        });
        addressList.forEach(function (item) {
          item.detailsAddress = item.address + ' ' + item.city + ' ' + item.zip_code + ' ' + item.province_name + ' ' + item.country_name;
        });
        _this.setState({ addressList: addressList }, function () {
          _this.setDomHeight();
        });
      }
    }, _this.upDateState = function (params) {
      if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
        return;
      }
      _this.setState(_extends({}, params), function () {
        if ('addressList' in params) {
          _this.setDomHeight();
        }
      });
    }, _this.editAddress = function (index) {
      var editAddress = Object.assign({}, _this.state.addressList[index]);
      _this.setState({ editAddress: editAddress, operateCode: 2 }, function () {
        _this.addressPanel.togglePanel();
      });
    }, _this.delete = function (index) {
      var data = _this.state.addressList[index];
      _this.delIndex = index;
      _this.setState({
        modalStatus: true,
        deleteInfo: {
          index: index,
          id: data.id,
          address: data.detailsAddress,
          user: data.first_name + ' ' + data.last_name + ' ' + data.phone_number
        }
      });
    }, _this.confirmDelete = function () {
      if (_this.lockDel) {
        return;
      }

      _this.lockDel = true;
      var index = _this.delIndex;
      var data = _this.state.addressList[index];

      (0, _util.fetchLite)(_user.addressAction.bind(null, { type: 1, id: data.id }), {
        done: function done() {
          var addressList = _this.state.addressList.slice();
          addressList.splice(index, 1);
          _this.setState({ addressList: addressList, modalStatus: false }, function () {
            _this.setDomHeight();
          });
        },
        complete: function complete() {
          _this.lockDel = false;
        },
        authority: true
      });
    }, _this.setDefault = function (index) {
      var data = _this.state.addressList[index];
      if (data.is_default) {
        return;
      }

      if (_this.lockEdit) {
        return;
      }
      _this.lockEdit = true;
      (0, _util.fetchLite)(_user.addressAction.bind(null, { id: data.id, type: 2 }), {
        done: function done() {
          var addressList = [].concat(_toConsumableArray(_this.state.addressList));
          addressList.forEach(function (item, i) {
            if (index === i) {
              item.is_default = 1;
            } else {
              item.is_default = 0;
            }
          });

          _this.setState({ addressList: addressList });
        },
        complete: function complete() {
          _this.lockEdit = false;
        },
        authority: true
      });
    }, _this.cancelDelete = function () {
      _this.setState({
        modalStatus: false,
        deleteInfo: {
          user: '',
          address: ''
        }
      });
    }, _this.setDomHeight = function () {
      var ulDom = document.getElementsByClassName('address-list')[0];
      var dom = document.getElementsByClassName('address-container')[0];

      if (dom && ulDom) {
        var inlineStyle = 'height: ' + ulDom.offsetHeight + 'px; transition:height 0.25s linear 1ms;will-change:height';
        if (!_this.init) {
          _this.init = true;
          inlineStyle = 'height: ' + ulDom.offsetHeight + 'px;';
        }
        dom.style.cssText = inlineStyle;
      }
    }, _this.open = function () {
      _this.setState({ operateCode: 1 }, function () {
        _this.addressPanel.togglePanel();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Address, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _util.fetchLite)(_user.getAddress, {
        done: function done(res) {
          _this2.initAddressData(res);
        },
        authority: true
      });

      // 获取国家信息
      var countries = JSON.parse(window.sessionStorage.getItem('countries'));
      if (!countries || countries.length === 0) {
        (0, _util.fetchLite)(_user.getCountry, {
          done: function done(res) {
            var countries = [];
            for (var key in res.data) {
              countries.push({ country_id: key, country_name: res.data[key] });
            }
            _this2.setState({ countries: countries });
            window.sessionStorage.setItem('countries', JSON.stringify(countries));
          }
        });
      } else {
        this.setState({ countries: countries });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          deleteInfo = _state.deleteInfo,
          modalStatus = _state.modalStatus;

      var props = {
        pageMode: this.props.pageMode,
        countries: this.state.countries,
        operateCode: this.state.operateCode,
        addressList: this.state.addressList,
        editAddress: this.state.editAddress,
        addNewAddress: this.state.addNewAddress,
        upDateState: this.upDateState
      };
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'm-address-centerBlock' },
          _react2.default.createElement(
            'h2',
            { className: 'm-address-centerBlock-title' },
            'RECIPIENT ADDRESS'
          ),
          _react2.default.createElement(
            'div',
            { className: 'm-address-centerBlock-content' },
            (!props.addressList || props.addressList.length === 0) && _react2.default.createElement(_component.AddressListNull, { open: this.open }),
            props.addressList && props.addressList.length > 0 && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'address-container' },
                _react2.default.createElement(
                  'ul',
                  { className: 'address-list' },
                  props.addressList.map(function (item, i) {
                    return _react2.default.createElement(
                      'li',
                      { key: item.id },
                      _react2.default.createElement(
                        'p',
                        { className: 'user-phone' },
                        _react2.default.createElement(
                          'span',
                          null,
                          item.first_name + ' ' + item.last_name
                        ),
                        _react2.default.createElement(
                          'span',
                          null,
                          item.phone_number
                        )
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: 'address-details' },
                        item.detailsAddress
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'user-action' },
                        _react2.default.createElement(
                          'a',
                          { href: 'javascript:void(0)', onClick: function onClick() {
                              return _this3.setDefault(i);
                            } },
                          item.is_default === 0 && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_Icon2.default, { type: 'radio' })
                          ),
                          _react2.default.createElement(
                            'span',
                            { style: { color: '' + (item.is_default === 1 ? '#302E2F' : '') } },
                            item.is_default === 0 ? 'SET AS DEFAULT ADDRESS' : '[DEFAULT ADDRESS]'
                          )
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'edit' },
                          _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0)', onClick: function onClick() {
                                return _this3.editAddress(i);
                              } },
                            'Edit'
                          ),
                          item.is_default === 0 && _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0)', onClick: function onClick() {
                                return _this3.delete(i);
                              } },
                            'Delete'
                          )
                        )
                      )
                    );
                  })
                )
              ),
              _react2.default.createElement(
                _Button2.default,
                { onClick: this.open },
                'NEW ADDRESS'
              )
            )
          )
        ),
        _react2.default.createElement(_component.AddNewPanel, _extends({ ref: function ref(_ref2) {
            _this3.addressPanel = _ref2;
          } }, props)),
        _react2.default.createElement(
          _Modal2.default,
          {
            title: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(_Icon2.default, { type: 'info-filling' }),
              _react2.default.createElement(
                'span',
                null,
                'Delete this address?'
              )
            ),
            visible: modalStatus,
            className: 'confirm',
            zIndex: 2000,
            width: 760,
            cancelText: 'CANCEL',
            okText: 'DETERMINE',
            onCancel: this.cancelDelete,
            onOk: this.confirmDelete
          },
          _react2.default.createElement(
            'p',
            null,
            deleteInfo.user
          ),
          _react2.default.createElement(
            'p',
            null,
            deleteInfo.address
          )
        )
      );
    }
  }]);

  return Address;
}(_react2.default.Component);

exports.default = Address;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./Address.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!./Address.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\na,\nbutton {\n  -webkit-tap-highlight-color: transparent;\n  -moz-tap-highlight-color: transparent;\n}\n.m-address-centerBlock-title {\n  display: none;\n  font-size: 0.32rem;\n  color: #302E2F;\n  letter-spacing: 0;\n  line-height: 1;\n  text-align: center;\n}\n.m-address-centerBlock-content {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.m-address-centerBlock-content .address-null {\n  float: left;\n  padding-top: 1.2rem;\n  padding-left: 2.13rem;\n}\n.m-address-centerBlock-content .address-null .logo {\n  width: 2rem;\n  height: 2rem;\n  margin: 0 auto;\n  background-color: #F4F2F3;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n}\n.m-address-centerBlock-content .address-null p {\n  font-size: 20px;\n  color: #302E2F;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 0.2rem;\n  padding: 0.4rem 0;\n}\n.m-address-centerBlock-content .address-null button {\n  display: block;\n  width: 2.96rem;\n  background: transparent;\n  color: #302E2F;\n  margin: 0 auto;\n}\n.m-address-centerBlock-content .address-container {\n  height: 0.4rem;\n  margin-bottom: 0.4rem;\n  overflow: hidden;\n}\n.m-address-centerBlock-content .address-container ul li {\n  display: block;\n  padding: 0.4rem 0.1rem;\n  border-bottom: 1px solid #ece7e9;\n}\n.m-address-centerBlock-content .address-container ul li .user-phone span {\n  display: inline-block;\n  font-size: 0.18rem;\n  color: #302E2F;\n  letter-spacing: 0;\n  line-height: 1;\n}\n.m-address-centerBlock-content .address-container ul li .user-phone span:nth-of-type(2) {\n  padding-left: 0.2rem;\n}\n.m-address-centerBlock-content .address-container ul li .address-details {\n  font-size: 0.16rem;\n  color: #302E2F;\n  letter-spacing: 0;\n  line-height: 0.24rem;\n  padding: 0.16rem 0;\n  word-break: break-all;\n}\n.m-address-centerBlock-content .address-container ul li .user-action {\n  display: flex;\n  align-items: center;\n  flex-flow: wrap;\n  justify-content: space-between;\n}\n.m-address-centerBlock-content .address-container ul li .user-action > a {\n  font-size: 0.16rem;\n  color: #B2AFB0;\n  letter-spacing: 0;\n  line-height: 0.16rem;\n}\n.m-address-centerBlock-content .address-container ul li .user-action > a span i {\n  color: #B2AFB0;\n}\n.m-address-centerBlock-content .address-container ul li .user-action > a span:nth-of-type(2) {\n  padding-left: 0.1rem;\n}\n.m-address-centerBlock-content .address-container ul li .user-action > a span.default {\n  color: #302E2F;\n}\n.m-address-centerBlock-content .address-container ul li .user-action .edit a {\n  font-size: 0.16rem;\n  color: #B2AFB0;\n}\n.m-address-centerBlock-content .address-container ul li .user-action .edit a:nth-of-type(2) {\n  padding-left: 0.4rem;\n}\n.m-address-mod {\n  position: fixed;\n  top: 0;\n  left: 0;\n  display: none;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 100;\n}\n.m-address-mod .address-form {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 7rem;\n  height: 6.2rem;\n  padding: 0.4rem;\n  margin: -3.1rem 0 0 -3.5rem;\n  background: #ffffff;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.m-address-mod .address-form .form-item {\n  width: 100%;\n  margin: 0.18rem 0;\n  overflow: hidden;\n}\n.m-address-mod .address-form .form-item input:nth-of-type(1) {\n  float: left;\n}\n.m-address-mod .address-form .form-item input:nth-of-type(2) {\n  float: right;\n}\n.m-address-mod .address-form .form-item.name input {\n  width: 3rem;\n}\n.m-address-mod .address-form .form-item.address input:nth-of-type(1) {\n  width: 3.6rem;\n}\n.m-address-mod .address-form .form-item.address input:nth-of-type(2) {\n  width: 2.4rem;\n}\n.m-address-mod .address-form .form-item.city input,\n.m-address-mod .address-form .form-item.iphone input {\n  width: 100%;\n}\n.m-address-mod .address-form .form-item.stateInfo .country,\n.m-address-mod .address-form .form-item.stateInfo .state,\n.m-address-mod .address-form .form-item.stateInfo .zipCode {\n  float: left;\n}\n.m-address-mod .address-form .form-item.stateInfo .country {\n  width: 2.3rem;\n}\n.m-address-mod .address-form .form-item.stateInfo .country select {\n  width: 100%;\n}\n.m-address-mod .address-form .form-item.stateInfo .state {\n  width: 2.3rem;\n  margin: 0 0.2rem;\n}\n.m-address-mod .address-form .form-item.stateInfo .state select {\n  width: 100%;\n}\n.m-address-mod .address-form .form-item.stateInfo .zipCode {\n  width: 1.2rem;\n}\n.m-address-mod .address-form .form-item.stateInfo .zipCode input {\n  width: 100%;\n}\n.m-address-mod .address-form .form-item.set {\n  margin: 0.18rem 0 0.38rem;\n}\n.m-address-mod .address-form .form-item.set span {\n  color: #B2AFB0;\n  padding-left: 0.15rem;\n}\n.m-address-mod .close {\n  display: block;\n  position: absolute;\n  top: 0.2rem;\n  right: 0.2rem;\n  width: 0.2rem;\n  height: 0.2rem;\n  line-height: 0.2rem;\n}\n.m-address-mod .close i {\n  font-size: 0.2rem;\n  color: #302E2F;\n}\n.bc-modal-wrapper .bc-modal-header h3 p {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.bc-modal-wrapper .bc-modal-header h3 p i {\n  font-size: 0.32rem;\n  color: #ff6158;\n}\n.bc-modal-wrapper .bc-modal-header h3 p span {\n  font-size: 0.2rem;\n  color: #302E2F;\n  margin: 0 0.15rem;\n}\n.bc-modal-wrapper .bc-modal-body p {\n  font-size: 0.16rem;\n  color: #8B8185;\n}\n@media screen and (min-width: 320px) and (max-width: 751px) {\n  .m-address-centerBlock-title {\n    display: block;\n  }\n  .m-address-centerBlock-content .address-null {\n    width: 100%;\n    padding: 1.2rem 0 0 0;\n  }\n  .m-address-centerBlock-content .address-null button {\n    width: 3.2rem;\n  }\n  .m-address-centerBlock-content .address-container ul li {\n    padding: 0.4rem 0;\n  }\n  .m-address-centerBlock-content .address-container ul li .address-details {\n    padding: 0.18rem 0 0.3rem;\n  }\n  .m-address-centerBlock-content .address-container ul li .user-action .edit a:nth-of-type(2) {\n    padding-left: 0.25rem;\n  }\n  .m-address-centerBlock-content button {\n    width: 100%;\n  }\n  .m-address-mod {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 100;\n    opacity: 1;\n    will-change: opacity;\n    -webkit-transition: opacity 0.3s linear 1ms;\n    -moz-transition: opacity 0.3s linear 1ms;\n    -ms-transition: opacity 0.3s linear 1ms;\n    -o-transition: opacity 0.3s linear 1ms;\n    transition: opacity 0.3s linear 1ms;\n  }\n  .m-address-mod .address-form {\n    position: absolute;\n    height: 75%;\n    top: auto;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    padding: 0.2rem 0 0 0;\n    margin: 0;\n    will-change: translate;\n    -webkit-transform: translate(0, 100%);\n    transform: translate(0, 100%);\n    -webkit-transition: transform 0.3s ease 1ms;\n    -moz-transition: transform 0.3s ease 1ms;\n    -ms-transition: transform 0.3s ease 1ms;\n    -o-transition: transform 0.3s ease 1ms;\n    transition: transform 0.3s ease 1ms;\n  }\n  .m-address-mod .address-form .form-container {\n    height: 100%;\n    overflow: hidden;\n    -webkit-overflow-scrolling: touch;\n  }\n  .m-address-mod .address-form .form-container h2 {\n    padding: 0 0.4rem;\n  }\n  .m-address-mod .address-form .form-container form {\n    height: 100%;\n  }\n  .m-address-mod .address-form .form-container .input-area {\n    height: 69%;\n    padding: 0 0.4rem;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n  .m-address-mod .address-form .form-container .form-item > input {\n    float: none;\n    display: block;\n    width: 100% !important;\n  }\n  .m-address-mod .address-form .form-container .form-item.name input + input,\n  .m-address-mod .address-form .form-container .form-item.address input + input,\n  .m-address-mod .address-form .form-container .form-item.city input + input {\n    margin-top: 0.2rem;\n  }\n  .m-address-mod .address-form .form-container .form-item.stateInfo div {\n    width: 100%;\n    margin: 0;\n  }\n  .m-address-mod .address-form .form-container .form-item.stateInfo div + div {\n    margin-top: 0.2rem;\n  }\n  .m-address-mod .address-form .form-container .form-item.set {\n    margin: 0.1rem 0;\n    padding: 0 0.4rem;\n  }\n  .m-address-mod .address-form .form-container .addBtn {\n    padding: 0 0.4rem;\n  }\n  .m-address-mod .address-form .form-container .addBtn.no-set {\n    margin-top: 0.15rem;\n  }\n  .m-address-mod .address-form .form-container .addBtn button {\n    width: 100%;\n  }\n  .m-address-mod.show {\n    opacity: 1;\n  }\n  .m-address-mod.show .address-form {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n  }\n  .bc-modal-wrapper .bc-modal-header h3 p i {\n    font-size: 0.28rem;\n  }\n  .bc-modal-wrapper .bc-modal-header h3 p span {\n    margin: 0 0.05rem;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(22);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = __webpack_require__(1);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n@font-face {\n  font-family: \"bcicon\";\n  src: url('/source/font/iconfont.eot?t=1522204678250');\n  /* IE9*/\n  src: url('/source/font/iconfont.eot?t=1522204678250#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('/source/font/iconfont.ttf?t=1522204678250') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('/source/font/iconfont.svg?t=1522204678250#bcicon') format('svg');\n  /* iOS 4.1- */\n}\n.bc-icon {\n  font-family: \"bcicon\" !important;\n  font-size: 0.16rem;\n  line-height: 1;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.bc-icon-close:before {\n  content: \"\\E605\";\n}\n.bc-icon-search:before {\n  content: \"\\E60B\";\n}\n.bc-icon-edit:before {\n  content: \"\\E60F\";\n}\n.bc-icon-delete:before {\n  content: \"\\E61D\";\n}\n.bc-icon-checkbox:before {\n  content: \"\\E61F\";\n}\n.bc-icon-radio:before {\n  content: \"\\E620\";\n}\n.bc-icon-checkbox-checked:before {\n  content: \"\\E622\";\n}\n.bc-icon-radio-checked:before {\n  content: \"\\E623\";\n}\n.bc-icon-arrow-right:before {\n  content: \"\\E624\";\n}\n.bc-icon-arrow-down:before {\n  content: \"\\E625\";\n}\n.bc-icon-no-filling:before {\n  content: \"\\E62A\";\n}\n.bc-icon-yes-filling:before {\n  content: \"\\E62B\";\n}\n.bc-icon-info-filling:before {\n  content: \"\\E62C\";\n}\n.bc-icon-info:before {\n  content: \"\\E62D\";\n}\n.bc-icon-yes:before {\n  content: \"\\E62E\";\n}\n.bc-icon-no:before {\n  content: \"\\E62F\";\n}\n.bc-icon-menu:before {\n  content: \"\\E61A\";\n}\n.bc-icon-user:before {\n  content: \"\\E61B\";\n}\n.bc-icon-forward:before {\n  content: \"\\E626\";\n}\n.bc-icon-back:before {\n  content: \"\\E627\";\n}\n.bc-icon-unfold:before {\n  content: \"\\E61C\";\n}\n.bc-icon-cart-o:before {\n  content: \"\\E621\";\n}\n.bc-icon-addto:before {\n  content: \"\\E629\";\n}\n.bc-icon-fullscreen:before {\n  content: \"\\E628\";\n}\n.bc-icon-view:before {\n  content: \"\\E630\";\n}\n.bc-icon-bag:before {\n  content: \"\\E631\";\n}\n.bc-icon-add:before {\n  content: \"\\E632\";\n}\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var warning = __webpack_require__(11);
var assign = __webpack_require__(25);

var ReactPropTypesSecret = __webpack_require__(9);
var checkPropTypes = __webpack_require__(26);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(8);
  var warning = __webpack_require__(11);
  var ReactPropTypesSecret = __webpack_require__(9);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var ReactPropTypesSecret = __webpack_require__(9);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Message = __webpack_require__(29);

var _Message2 = _interopRequireDefault(_Message);

var _reactDom = __webpack_require__(12);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(30);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Item = __webpack_require__(32);

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
var update = __webpack_require__(3)(content, options);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".bc-message {\n  position: fixed;\n  width: 100%;\n  height: 0;\n  top: 80px;\n  left: 0;\n  z-index: 10000;\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(33);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(4);

var _Icon2 = _interopRequireDefault(_Icon);

var _util = __webpack_require__(1);

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-messageItem {\n  width: 0;\n  text-align: center;\n  margin-left: 50%;\n  white-space: nowrap;\n}\n.bc-messageItem > div {\n  display: inline-block;\n  max-width: 750px;\n  background: rgba(0, 0, 0, 0.8);\n  padding: 18px 20px;\n  border-radius: 3px;\n  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);\n  margin-bottom: 20px;\n  transform: translateX(-50%);\n}\n.bc-messageItem > div span {\n  display: inline-block;\n  font-size: 16px;\n  color: #fff;\n  line-height: 22px;\n  white-space: nowrap;\n  vertical-align: top;\n}\n.bc-messageItem-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 1px 10px 1px 0;\n  border-radius: 50%;\n}\n.bc-messageItem-icon .bc-icon {\n  color: #fff !important;\n}\n.bc-messageItem-icon-info {\n  background-color: #1890FF;\n}\n.bc-messageItem-icon-success {\n  background-color: #29CA40;\n}\n.bc-messageItem-icon-error {\n  background-color: #FF6158;\n}\n.bc-messageItem-icon-warning {\n  background-color: #FFBD2F;\n}\n.bc-messageItem-fadeIn {\n  animation: fadeIn 330ms ease;\n}\n.bc-messageItem-fadeOut {\n  animation: fadeOut 330ms ease;\n}\n.bc-messageItem .bc-icon {\n  display: inherit;\n  vertical-align: top;\n  line-height: 20px;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n  to {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n    height: 58px;\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n  to {\n    opacity: 0;\n    height: 0;\n    transform: translate3D(0, -20px, 0) scale(0.8);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(36);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(4);

var _Icon2 = _interopRequireDefault(_Icon);

var _Link = __webpack_require__(13);

var _Link2 = _interopRequireDefault(_Link);

var _util = __webpack_require__(1);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-button {\n  display: inline-block;\n  min-height: 0.48rem;\n  padding: 0.08rem 0.4rem;\n  border-width: 1px;\n  border-style: solid;\n  cursor: pointer;\n  border-radius: 2px;\n  vertical-align: bottom;\n  box-sizing: border-box;\n  text-align: center;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n}\n.bc-button span {\n  display: inline-block;\n  line-height: 0.3rem;\n  white-space: nowrap;\n  transition: color .2s ease;\n  vertical-align: middle;\n}\n.bc-button:focus {\n  outline: 0;\n}\n.bc-button[disabled],\n.bc-button.disabled {\n  cursor: not-allowed;\n  opacity: .5;\n}\n.bc-button-loading.bc-button {\n  cursor: wait;\n}\n.bc-button-ghost {\n  background-color: transparent;\n}\n.bc-button .bc-button-icon:not(.bc-button-icon-noChild) {\n  margin-right: 0.08rem;\n  font-size: inherit;\n}\n.l-mobile .bc-button {\n  padding-left: 0.2rem;\n  padding-right: 0.2rem;\n}\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressListNull = exports.AddNewPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(1);

var _Input = __webpack_require__(39);

var _Input2 = _interopRequireDefault(_Input);

var _Select = __webpack_require__(43);

var _Select2 = _interopRequireDefault(_Select);

var _Button = __webpack_require__(10);

var _Button2 = _interopRequireDefault(_Button);

var _Icon = __webpack_require__(4);

var _Icon2 = _interopRequireDefault(_Icon);

var _user = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddNewPanel = exports.AddNewPanel = function (_React$Component) {
  _inherits(AddNewPanel, _React$Component);

  _createClass(AddNewPanel, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var operateCode = nextProps.operateCode;

      var country_id = void 0;
      if (operateCode === 1) {
        country_id = nextProps.addNewAddress['country_id'];
      } else if (operateCode === 2) {
        country_id = nextProps.editAddress['country_id'];
      }

      if (country_id !== prevState.country_id) {
        return { country_id: country_id };
      }
      return null;
    }
  }]);

  function AddNewPanel(props) {
    _classCallCheck(this, AddNewPanel);

    var _this = _possibleConstructorReturn(this, (AddNewPanel.__proto__ || Object.getPrototypeOf(AddNewPanel)).call(this, props));

    _this.submitForm = function () {
      var requestAddress = void 0;
      var operateCode = _this.props.operateCode;

      var id = '';

      if (operateCode === 1) {
        requestAddress = Object.assign({}, _this.props.addNewAddress);
      } else if (operateCode === 2) {
        requestAddress = Object.assign({}, _this.props.editAddress);
        id = requestAddress.id;
      }
      if (!requestAddress.province_id) {
        requestAddress.province_id = _this.state.provinces[0]['province_id'];
        if (!requestAddress.province_name) {
          requestAddress.province_name = _this.state.provinces[0]['province_name'];
        }
      }
      requestAddress.company = '';
      requestAddress.zip = requestAddress.zip_code;
      // this.handleRequest(id, Object.assign({}, requestAddress))
      //请求操作
      if (_this.lock) {
        return;
      }
      _this.lock = true;
      (0, _util.fetchLite)(id ? _user.updateAddress.bind(null, id, requestAddress) : _user.addAddress.bind(null, requestAddress), {
        done: function done(res) {
          _this.handleUpDateAddress(res.data, requestAddress);
        },
        complete: function complete() {
          _this.lock = false;
          _this.togglePanel();
        },
        authority: true,
        error: function error(err) {
          console.log(err);
        }
      });
    };

    _this.handleUpDateAddress = function (data, _source) {
      var _this$props = _this.props,
          operateCode = _this$props.operateCode,
          addressList = _this$props.addressList;

      var source = Object.assign({}, _source);
      var hasSetDefault = !!source.is_default;
      var isNull = !addressList || addressList.length === 0;

      if (!source.id) {
        source.id = data.id;
      }
      var _addressList = [];
      if (!isNull) {
        _addressList = [].concat(_toConsumableArray(addressList));
      }

      // 添加地址时设置了默认地址
      if (hasSetDefault) {
        _addressList.map(function (item) {
          item.is_default = 0;
          return item;
        });
      } else {
        // 地址列表空时，新添加的地址设置默认地址
        if (isNull) {
          source.is_default = 1;
        }
      }

      if (operateCode === 1) {
        if (hasSetDefault) {
          _addressList.unshift(source);
        } else {
          _addressList.push(source);
        }
        source.detailsAddress = source.address + ' ' + source.city + ' ' + source.zip_code + ' ' + source.province_name + ' ' + source.country_name;
        var restData = {};
        for (var key in source) {
          if (key !== 'country_id' || key !== 'provice_id') {
            restData[key] = '';
          } else {
            restData[key] = source[key];
          }
        }

        _this.props.upDateState({ addAddress: restData, addressList: _addressList });
        return;
      }

      if (operateCode === 2) {
        for (var i = 0; _addressList[i]; i++) {
          if (_addressList[i]['id'] === source.id) {
            _addressList[i] = source;
            break;
          }
        }
        _this.props.upDateState({ addressList: _addressList });
      }
    };

    _this.setDefault = function () {
      if (_this.props.operateCode === 1) {
        var addNewAddress = Object.assign({}, _this.props.addNewAddress);
        addNewAddress.is_default = Math.abs(addNewAddress.is_default - 1);
        _this.props.upDateState({ addNewAddress: addNewAddress });
      }if (_this.props.operateCode === 2) {
        var editAddress = Object.assign({}, _this.props.editAddress);
        editAddress.is_default = Math.abs(editAddress.is_default - 1);
        _this.props.upDateState({ editAddress: editAddress });
      }
    };

    _this.togglePanel = function () {
      _this.setState(function (pre) {
        return { show: !pre.show };
      }, function () {
        if (_this.state.show) {
          _this.mod.style.display = 'block';
          document.body.style.cssText = 'overflow:hidden';
          var _t = setTimeout(function () {
            _this.mod.setAttribute('class', 'm-address-mod show');
            clearTimeout(_t);
          }, 80);
        } else {
          if (_this.props.pageMode === 0) {
            _this.mod.style.display = 'none';
          }
          _this.mod.setAttribute('class', 'm-address-mod');
          document.body.style.cssText = '';
        }
      });
    };

    _this.handleInput = function (e, key) {
      var operateCode = _this.props.operateCode;

      if (operateCode === 1) {
        var addNewAddress = Object.assign({}, _this.props.addNewAddress);
        addNewAddress[key] = e.target.value;
        _this.props.upDateState({ addNewAddress: addNewAddress });
      } else if (operateCode === 2) {
        var editAddress = Object.assign({}, _this.props.editAddress);
        editAddress[key] = e.target.value;
        _this.props.upDateState({ editAddress: editAddress });
      }
    };

    _this.handleSelect = function (e, key) {
      var id = void 0;
      var name = void 0;
      var _key = void 0;
      var operateCode = _this.props.operateCode;


      if (key === 'country_id') {
        id = e.target.value;
        name = _this.props.countries.filter(function (ele) {
          return ele.country_id === id;
        })[0]['country_name'];
        _key = 'country_name';
      } else if (key === 'province_id') {
        id = e.target.value;
        name = _this.state.provinces.filter(function (ele) {
          return ele.province_id === id;
        })[0]['province_name'];
        _key = 'province_name';
      }

      if (operateCode === 1) {
        var addNewAddress = Object.assign({}, _this.props.addNewAddress);
        addNewAddress[key] = id;
        addNewAddress[_key] = name;
        _this.props.upDateState({ addNewAddress: addNewAddress });
      } else if (operateCode === 2) {
        var editAddress = Object.assign({}, _this.props.editAddress);
        editAddress[key] = id;
        editAddress[_key] = name;
        _this.props.upDateState({ editAddress: editAddress });
      }
    };

    _this.state = {
      show: false,
      country_id: null
    };
    return _this;
  }

  _createClass(AddNewPanel, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps, prevState) {
      if (this.state.country_id !== prevState.country_id) {
        this.getProvincesInfo(this.state.country_id);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.pageMode === 1) {
        var transEle = document.getElementsByClassName('address-form')[0];
        transEle.addEventListener('transitionend', function () {
          if (!_this2.state.show) {
            var t = setTimeout(function () {
              _this2.mod.style.display = 'none';
              clearTimeout(t);
            }, 80);
          }
        });
      }
      this.getProvincesInfo(3);
    }
  }, {
    key: 'getProvincesInfo',
    value: function getProvincesInfo(countryId) {
      var _this3 = this;

      var provinces = JSON.parse(sessionStorage.getItem('province_' + countryId));

      if (provinces) {
        this.setState({ provinces: provinces });
        return;
      }
      (0, _util.fetchLite)(_user.getState.bind(null, countryId), {
        done: function done(res) {
          var provinces = [];
          var _data = Object.assign({}, res.data.data);
          for (var key in _data) {
            provinces.push({ province_id: key, province_name: _data[key] });
          }
          _this3.setState({ provinces: provinces }, function () {
            window.sessionStorage.setItem('province_' + countryId, JSON.stringify(provinces));
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var data = void 0;
      var provinces = this.state.provinces;
      var _props = this.props,
          countries = _props.countries,
          operateCode = _props.operateCode;


      if (operateCode === 1) {
        data = this.props.addNewAddress;
      } else if (operateCode === 2) {
        data = this.props.editAddress;
      }

      return _react2.default.createElement(
        'div',
        { className: 'm-address-mod', ref: function ref(_ref) {
            _this4.mod = _ref;
          } },
        _react2.default.createElement(
          'div',
          { className: 'address-form' },
          _react2.default.createElement(
            'a',
            { href: 'javascript:void(0)', className: 'close', onClick: this.togglePanel },
            _react2.default.createElement(_Icon2.default, { type: 'close' })
          ),
          data && _react2.default.createElement(
            'div',
            { className: 'form-container' },
            _react2.default.createElement(
              'h2',
              null,
              'New address'
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-area' },
              _react2.default.createElement(
                'div',
                { className: 'form-item name' },
                _react2.default.createElement(_Input2.default, { type: 'text',
                  placeholder: 'First name',
                  value: data.first_name,
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'first_name');
                  }
                }),
                _react2.default.createElement(_Input2.default, { type: 'text',
                  placeholder: 'Last name',
                  value: data.last_name,
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'last_name');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-item address' },
                _react2.default.createElement(_Input2.default, { type: 'text',
                  value: data.address,
                  placeholder: 'Address', name: 'address',
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'address');
                  }
                }),
                _react2.default.createElement(_Input2.default, { type: 'text',
                  value: data.suite,
                  placeholder: 'Apt, suite, etc. (optional)',
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'suite');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-item city' },
                _react2.default.createElement(_Input2.default, { type: 'text',
                  placeholder: 'City',
                  value: data.city,
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'city');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-item stateInfo' },
                _react2.default.createElement(
                  'div',
                  { className: 'country' },
                  _react2.default.createElement(
                    _Select2.default,
                    {
                      value: data.country_id,
                      onChange: function onChange(e) {
                        return _this4.handleSelect(e, 'country_id');
                      }
                    },
                    countries && countries.map(function (item) {
                      return _react2.default.createElement(
                        'option',
                        { key: item.country_id, value: item.country_id },
                        item.country_name
                      );
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'state' },
                  _react2.default.createElement(
                    _Select2.default,
                    {
                      value: data.province_id,
                      onChange: function onChange(e) {
                        return _this4.handleSelect(e, 'province_id');
                      }
                    },
                    provinces && provinces.map(function (item) {
                      return _react2.default.createElement(
                        'option',
                        { key: item.province_id, value: item.province_id },
                        item.province_name
                      );
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'zipCode' },
                  _react2.default.createElement(_Input2.default, { type: 'text',
                    placeholder: 'zip Code',
                    value: data.zip_code,
                    onChange: function onChange(e) {
                      _this4.handleInput(e, 'zip_code');
                    }
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-item iphone' },
                _react2.default.createElement(_Input2.default, { type: 'text',
                  placeholder: 'iphone (optional)',
                  value: data.phone_number,
                  onChange: function onChange(e) {
                    _this4.handleInput(e, 'phone_number');
                  }
                })
              )
            ),
            operateCode === 1 && _react2.default.createElement(
              'div',
              { className: 'form-item set' },
              _react2.default.createElement(
                'a',
                { href: 'javascript:void (0)',
                  className: 'bc-set-default setDefValue',
                  onClick: this.setDefault
                },
                _react2.default.createElement(_Icon2.default, { className: 'check-item',
                  style: { color: '' + (!!data.is_default ? '#D1343E' : '') },
                  type: !!data.is_default ? 'checkbox-checked' : 'checkbox' }),
                _react2.default.createElement(
                  'span',
                  { className: '' + (0, _util.font)('text') },
                  'SET AS DEFAULT ADDRESS'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'addBtn ' + (operateCode === 2 && data.is_default === 1 ? 'no-set' : '') },
              _react2.default.createElement(
                _Button2.default,
                { className: 'submit', onClick: this.submitForm },
                'Save Add'
              )
            )
          )
        )
      );
    }
  }]);

  return AddNewPanel;
}(_react2.default.Component);

var AddressListNull = exports.AddressListNull = function AddressListNull(props) {
  return _react2.default.createElement(
    'div',
    { className: 'address-null' },
    _react2.default.createElement('div', { className: 'logo' }),
    _react2.default.createElement(
      'p',
      null,
      'You haven\'t shipping address'
    ),
    _react2.default.createElement(
      _Button2.default,
      { onClick: props.open },
      'NEW ADDRESS'
    )
  );
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input = __webpack_require__(40);

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Input2.default; /**
                                    * @author MG Ding (丁文强)
                                    * @desc Select (下拉选择器)
                                    */

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(41);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = __webpack_require__(4);

var _Icon2 = _interopRequireDefault(_Icon);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Input (文本输入框)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var classPrefix = 'bc-input';

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.defaultValue || _this.props.value || ''
    }, _this.getInput = function (ref) {
      _this.input = ref;
      _this.props.getInput && _this.props.getInput(ref);
    }, _this.handleClear = function () {
      if (_this.props.value === undefined) {
        _this.input.value = '';
        _this.setState({ value: '' });
      }
      _this.props.onClear && _this.props.onClear();
      _this.input.focus();
    }, _this.handleChange = function (e) {
      if (_this.props.value === undefined) {
        _this.setState({ value: _this.input.value });
      }
      _this.props.onChange && _this.props.onChange(e);
    }, _this.notEmpty = function () {
      var propsValue = _this.props.value;
      var value = _this.state.value;


      if (propsValue !== undefined) {
        value = propsValue;
      }

      return value !== '';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.input.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _setClass;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          clearIcon = _props.clearIcon,
          onChange = _props.onChange,
          onClear = _props.onClear,
          getInput = _props.getInput,
          autoFocus = _props.autoFocus,
          rest = _objectWithoutProperties(_props, ['className', 'disabled', 'clearIcon', 'onChange', 'onClear', 'getInput', 'autoFocus']);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement('input', _extends({
          className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, classPrefix + '-hasClear', clearIcon), _defineProperty(_setClass, _util.color.border('border'), 1), _defineProperty(_setClass, (0, _util.font)('text'), 1), _setClass)),
          ref: this.getInput,
          onChange: this.handleChange,
          disabled: disabled
        }, rest)),
        clearIcon && !disabled && this.notEmpty() && _react2.default.createElement(_Icon2.default, {
          type: 'no-filling',
          className: classPrefix + '-clear ' + (0, _util.color)('icon'),
          onClick: this.handleClear
        })
      );
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = {
  getInput: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  clearIcon: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool
};
exports.default = Input;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Input.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Input.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-input {\n  border-width: 1px;\n  border-style: solid;\n  height: 0.48rem;\n  border-radius: 2px;\n  background: #fff;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  padding: 0.09rem 0.2rem;\n  line-height: 0.3rem;\n}\n.bc-input::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #B2AFB0;\n  font-size: 0.14rem;\n}\n.bc-input:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #B2AFB0;\n  font-size: 0.14rem;\n}\n.bc-input::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #B2AFB0;\n  font-size: 0.14rem;\n}\n.bc-input:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #B2AFB0;\n  font-size: 0.14rem;\n}\n.bc-input:focus {\n  outline: 0;\n}\n.bc-input:disabled {\n  cursor: not-allowed;\n}\n.bc-input-hasClear {\n  padding-right: 0.4rem;\n}\n.bc-input-clear {\n  cursor: pointer;\n  width: 0.3rem;\n  display: inline-block;\n  text-align: left;\n  margin-left: -0.3rem;\n}\n", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Select = __webpack_require__(44);

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Select2.default; /**
                                     * @author MG Ding (丁文强)
                                     * @desc Select (下拉选择器)
                                     */

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(45);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @author MG Ding (丁文强)
                                                                                                                                                                                                                              * @desc Select (下拉选择器)
                                                                                                                                                                                                                              */


var classPrefix = 'bc-select';

var Select = function Select(props) {
  var _setClass;

  var className = props.className,
      children = props.children,
      rest = _objectWithoutProperties(props, ['className', 'children']);

  return _react2.default.createElement(
    'select',
    _extends({
      className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, className, className), _defineProperty(_setClass, classPrefix, 1), _defineProperty(_setClass, _util.color.border('border'), 1), _defineProperty(_setClass, (0, _util.color)('text'), 1), _defineProperty(_setClass, (0, _util.font)('text'), 1), _setClass))
    }, rest),
    children
  );
};

exports.default = Select;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-select {\n  display: inline-block;\n  border-width: 1px;\n  border-style: solid;\n  height: 0.48rem;\n  border-radius: 2px;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  padding: 0 0.48rem 0 0.2rem;\n  position: relative;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAFAQMAAACKM9XAAAAABlBMVEUAAAAwLi8h2mgqAAAAAXRSTlMAQObYZgAAABlJREFUCNdj+N/AwMBQzwAEdiBCBkRwADEAMW4CYaYy38MAAAAASUVORK5CYII=\") no-repeat scroll right center #fff;\n}\n.bc-select:focus {\n  outline: 0;\n}\n.bc-select:disabled {\n  cursor: not-allowed;\n}\n", ""]);

// exports


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
var APIRoot = 'http://buckyshop.test.com/web/v1';
exports.APIRoot = APIRoot;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(49);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {confirm} from './src/confirm'

// Modal.confirm = confirm

exports.default = _Modal2.default; /**
                                    * @author MG Ding (丁文强)
                                    * @desc Modal (对话框)
                                    */

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(50);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(5);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__(10);

var _Button2 = _interopRequireDefault(_Button);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author MG Ding (丁文强)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @desc Modal (对话框)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.isNeverShow = !_this.props.visible, _this.fadeIn = _this.props.visible, _this.fadeOut = false, _this.timerFadeIn = null, _this.timerFadeOut = null, _this.state = {
      n: 0 // 修改n用于触发render()
    }, _this.addScrollingEffect = function () {
      Modal.visibleCount++;
      // console.log(Modal.visibleCount, '+')
      if (Modal.visibleCount !== 1) {
        return;
      }
      document.body.style.overflow = 'hidden';
    }, _this.removeScrollingEffect = function () {
      Modal.visibleCount--;
      // console.log(Modal.visibleCount, '-')
      if (Modal.visibleCount !== 0) {
        return;
      }
      document.body.style.overflow = '';
    }, _this.removeFadeIn = function () {
      _this.fadeIn = false;
      _this.myRender();
    }, _this.removeFadeOut = function () {
      _this.fadeOut = false;
      _this.myRender();
      _this.props.afterClose && _this.props.afterClose();
    }, _this.myRender = function () {
      _this.setState({ n: Date.now() });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // 样式前缀
  // 默认挂载点
  // 打开的对话框个数
  // 对话框是否未显示过
  // 入场动画
  // 出场动画
  // 入场动画timer
  // 出场动画timer


  _createClass(Modal, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref2, _ref3) {
      var visible = _ref2.visible;
      var n = _ref3.n;

      return !!(this.props.visible || visible) || this.state.n !== n;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var props = this.props;

      if (nextProps.visible && !props.visible) {
        clearTimeout(this.timerFadeIn);
        this.fadeIn = true;
        this.timerFadeIn = setTimeout(this.removeFadeIn, 300);
      } else if (!nextProps.visible && props.visible) {
        clearTimeout(this.timerFadeOut);
        this.fadeOut = true;
        this.timerFadeOut = setTimeout(this.removeFadeOut, 300);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var props = this.props;

      if (props.visible) {
        if (!prevProps.visible) {
          this.addScrollingEffect();
        }
      } else if (!this.isNeverShow && !this.fadeIn && !this.fadeOut) {
        this.removeScrollingEffect();
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.fadeIn) {
        this.timerFadeIn = setTimeout(this.removeFadeIn, 300);
      }
      if (this.props.visible) {
        this.addScrollingEffect();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.visible) {
        this.removeScrollingEffect();
      }
      clearTimeout(this.timerFadeIn);
      clearTimeout(this.timerFadeOut);
    }
  }, {
    key: 'render',
    value: function render() {
      var _setClass;

      var classPrefix = Modal.classPrefix,
          container = Modal.container;
      var isNeverShow = this.isNeverShow,
          fadeIn = this.fadeIn,
          fadeOut = this.fadeOut;
      var _props = this.props,
          title = _props.title,
          children = _props.children,
          getContainer = _props.getContainer,
          visible = _props.visible,
          onCancel = _props.onCancel,
          onOk = _props.onOk,
          width = _props.width,
          style = _props.style,
          className = _props.className,
          footer = _props.footer,
          cancelText = _props.cancelText,
          okText = _props.okText,
          maskClosable = _props.maskClosable,
          destroyOnClose = _props.destroyOnClose,
          closable = _props.closable,
          mask = _props.mask,
          okType = _props.okType,
          zIndex = _props.zIndex,
          confirmLoading = _props.confirmLoading;


      this.isNeverShow = !isNeverShow && !visible ? false : !visible;

      var _style = _extends({
        width: width,
        left: -parseInt(width / 2)
      }, style);

      var noAnimation = !fadeIn && !fadeOut;

      return destroyOnClose && !visible && noAnimation ? null : isNeverShow && !visible ? null : _reactDom2.default.createPortal(_react2.default.createElement(
        'div',
        {
          className: (0, _util.setClass)((_setClass = {}, _defineProperty(_setClass, classPrefix + '-wrapper', 1), _defineProperty(_setClass, classPrefix + '-fadeIn', fadeIn), _defineProperty(_setClass, classPrefix + '-fadeOut', fadeOut), _defineProperty(_setClass, classPrefix + '-hidden', !visible && noAnimation), _defineProperty(_setClass, (0, _util.font)('text'), 1), _setClass)),
          style: zIndex !== 1000 ? { zIndex: zIndex } : null
        },
        mask && _react2.default.createElement('div', { className: classPrefix + '-mask' }),
        _react2.default.createElement(
          'div',
          { className: classPrefix + '-inner' },
          _react2.default.createElement('div', { className: classPrefix + '-fill', onClick: maskClosable ? onCancel : null }),
          _react2.default.createElement(
            'div',
            { className: (className ? className + ' ' : '') + ('' + classPrefix), style: _style },
            closable && _react2.default.createElement(
              'div',
              { className: classPrefix + '-close', onClick: onCancel },
              '\xD7'
            ),
            title && _react2.default.createElement(
              'div',
              { className: classPrefix + '-header' },
              _react2.default.createElement(
                'h3',
                null,
                title
              )
            ),
            _react2.default.createElement(
              'div',
              { className: classPrefix + '-body' },
              children
            ),
            footer === null ? null : _react2.default.createElement(
              'div',
              { className: classPrefix + '-footer' },
              footer || [_react2.default.createElement(
                _Button2.default,
                { key: '2', type: okType, onClick: onOk, loading: confirmLoading },
                okText
              ), _react2.default.createElement(
                _Button2.default,
                { key: '1', type: 'ghost', onClick: onCancel },
                cancelText
              )]
            )
          )
        )
      ), getContainer ? getContainer() : container);
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  afterClose: _propTypes2.default.func, // ok 关闭后回调
  cancelText: _propTypes2.default.string, // ok 取消按钮文案
  closable: _propTypes2.default.bool, // ok 右上角关闭按钮
  confirmLoading: _propTypes2.default.bool, // 确认按钮loading状态
  destroyOnClose: _propTypes2.default.bool, // ok 关闭时销毁
  footer: _propTypes2.default.element, // ok 底部
  getContainer: _propTypes2.default.func, // ok 自定义挂载点
  mask: _propTypes2.default.bool, // ok 显示遮罩层
  maskClosable: _propTypes2.default.bool, // ok 遮罩层可关闭对话框
  okText: _propTypes2.default.string, // ok 确定按钮文案
  okType: _propTypes2.default.oneOf(['primary', 'sub']), // ok 确定按钮类型
  // title: PropTypes.string, // ok 标题
  visible: _propTypes2.default.bool, // ok 可视
  zIndex: _propTypes2.default.number, // ok z-index
  onCancel: _propTypes2.default.func, // ok 取消回调
  onOk: _propTypes2.default.func, // ok 确定回调
  width: _propTypes2.default.number, // ok 对话框宽度
  style: _propTypes2.default.object, // ok 自定义style
  className: _propTypes2.default.string // ok 自定义className

};
Modal.defaultProps = {
  closable: true,
  width: 520,
  cancelText: 'Cancel',
  okText: 'OK',
  maskClosable: true,
  destroyOnClose: false,
  mask: true,
  okType: 'primary',
  zIndex: 1000
};
Modal.classPrefix = 'bc-modal';
Modal.container = window.document.body;
Modal.visibleCount = 0;
exports.default = Modal;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Modal.less", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/less-loader/dist/index.js!./Modal.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/** 变量定义 **/\n/* 弹性盒子*/\n/*圆角*/\n/* 文本溢出...*/\n/* 限制文本行数*/\n/* 阴影 */\n/*旋转函数*/\n/*过度动画*/\n/*css3 动画*/\n/*css3 transform*/\n.bc-modal-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n}\n.bc-modal-wrapper.bc-modal-hidden {\n  display: none;\n}\n.bc-modal-wrapper .bc-modal-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n.bc-modal-wrapper .bc-modal-inner {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow-y: auto;\n  box-sizing: border-box;\n  padding: 100px 0 30px 0;\n}\n.bc-modal-wrapper .bc-modal-fill {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.bc-modal {\n  background-color: #fff;\n  border-radius: 5px;\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);\n  position: relative;\n  margin-left: 50%;\n}\n.bc-modal-close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 58px;\n  height: 58px;\n  text-align: center;\n  line-height: 58px;\n  cursor: pointer;\n  font-size: 26px;\n  color: #666;\n}\n.bc-modal-header {\n  padding: 20px;\n}\n.bc-modal-header h3 {\n  font-size: 16px;\n  color: #302E2F;\n  line-height: 24px;\n  font-weight: bold;\n  padding-right: 40px;\n}\n.bc-modal-body {\n  padding: 10px 20px;\n}\n.bc-modal-footer {\n  padding: 20px;\n}\n.bc-modal-footer .bc-button {\n  margin-right: 10px;\n}\n.bc-modal-fadeIn {\n  animation: fadeIn 330ms ease;\n}\n.bc-modal-fadeIn .bc-modal {\n  animation: show 330ms ease;\n}\n.bc-modal-fadeOut {\n  animation: fadeOut 330ms ease;\n}\n.bc-modal-fadeOut .bc-modal {\n  animation: hide 330ms ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes show {\n  from {\n    transform: translate3D(0, 70px, 0) scale(0.85);\n  }\n  to {\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n}\n@keyframes hide {\n  from {\n    transform: translate3D(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3D(0, 70px, 0) scale(0.85);\n  }\n}\n@media (max-width: 767px) {\n  .bc-modal {\n    width: 90% !important;\n    margin-left: auto !important;\n    margin-right: auto !important;\n    left: 0 !important;\n  }\n  .bc-modal .bc-button {\n    padding-left: 0.2rem;\n    padding-right: 0.2rem;\n  }\n}\n", ""]);

// exports


/***/ })
/******/ ]);