(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["beyondlib"] = factory();
	else
		root["beyondlib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		assign: __webpack_require__(1),
		browser: __webpack_require__(3),
		dateFormat: __webpack_require__(4),
		storage: __webpack_require__(5),
		url: __webpack_require__(6)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	//扩展函数，目前仅支持浅复制，会过滤原型字段
	var toArray = __webpack_require__(2);
	var assign = null;

	if (typeof Object.assign === 'function') {
		assign = Object.assign;
	} else {
		assign = function () {
			if (Object.assign) {
				var args = toArray(arguments);
				return Object.assign.apply(Object, args);
			} else {
				var dest = arguments[0];
				if (dest == null) {
					throw new TypeError('Cannot convert first argument to object');
				}
				for (var i = 1, len = arguments.length; i < len; i++) {
					if (arguments[i] && (_typeof(arguments[i]) === 'object' || typeof arguments[i] === 'function')) {
						for (var key in arguments[i]) {
							if (arguments[i].hasOwnProperty(key)) dest[key] = arguments[i][key];
						}
					}
				}
				return dest;
			}
		};
	}

	module.exports = assign;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var ArraySlice = Array.prototype.slice;

	module.exports = function (obj) {
		if (!obj || !('length' in obj)) {
			throw new TypeError('Can not convert first argument to Array');
		}
		return ArraySlice.call(obj, 0);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(1);
	var defaults = {
		name: 'unknow',
		version: 'unknow',
		device: 'unknow',
		platform: 'unknow'
	};

	var browsers = [{
		name: 'oIE',
		test: /msie ([\d.]+)/
	}, {
		name: 'IE',
		test: /trident.+rv:([\d.]+)/
	}, {
		name: 'Edge',
		test: /edge\/([\d.]+)/
	}, {
		name: 'MicroMessenger',
		test: /micromessenger.([\d.]+)/
	}, {
		name: 'Chrome',
		test: /chrome\/([\d.]+)/
	}, {
		name: 'Firefox',
		test: /firefox\/([\d.]+)/
	}, {
		name: 'Opera',
		test: /opera.([\d.]+)/
	}, {
		name: 'Safari',
		test: /version\/([\d.]+).*safari/
	}];

	var platform = {
		Windows: /windows nt/,
		Mac: /macintosh/
		// ,WindowsPhone : /windows phone/
		, iPhone: /iphone/,
		iPad: /ipad/,
		iPod: /ipod/,
		Andriod: /andriod/,
		Linux: /linux/
	};

	var IEVersions = [6, 7, 8, 9, 10, 11];

	function parse(ua) {
		ua = ua || navigator.userAgent;
		ua = ua.toLowerCase();
		return assign({}, defaults, parseBrowser(ua), parsePlatform(ua));
	}

	function parseBrowser(ua) {
		var o = {},
		    i,
		    len;
		for (i = 0, len = browsers.length; i < len; i++) {
			var result = browsers[i].test.exec(ua);
			if (result) {
				o.name = browsers[i].name === 'oIE' ? 'IE' : browsers[i].name;
				o.version = result[1];
				break;
			}
		}
		for (i = 0, len = browsers.length; i < len; i++) {
			var name = browsers[i].name;
			if (name === 'oIE') {
				name = 'IE';
			}
			o['is' + name] = o.name === name;
		}
		for (i = IEVersions.length - 1; i >= 0; i--) {
			o['isIE' + IEVersions[i]] = o.name === 'IE' && parseInt(o.version, 10) === IEVersions[i];
		}
		o.isIE678 = o.isIE6 || o.isIE7 || o.isIE8;
		return o;
	}

	function parsePlatform(ua) {
		var o = {};
		for (var i in platform) {
			if (platform[i].test(ua)) {
				o.platform = i;
				break;
			}
		}
		return o;
	}

	var result = typeof navigator !== 'undefined' ? parse() : {};
	assign(result, { parse: parse });

	module.exports = result;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * 返回格式化后的日期时间字符串
	 * @example
	 * beyond.dateFormat()  // 2014.02.01
	 * beyond.dateFormat('yyyy')  // 返回当前时间戳的 2014格式
	 * beyond.dateFormat('yyyy',Date.parse(2000))   // 2000
	 * beyond.dateFormat(Date.parse(2000))  // 返回该时间戳的默认日期 2000.01.01
	 * 
	 * year: 年
	 * yyyy/yyy   2015
	 * yy/y  15
	 * yyyyy 02015
	 * month :  月
	 * 
	 * MM 03
	 * M 3
	 * date :  日
	 * dd 09
	 * d 9
	 * hour :  小时
	 * HH 0~24  24格式
	 * H 0~24
	 * hh 12    12格式
	 * h 09
	 * minuts :  分
	 * mm  
	 * m
	 * second : 秒
	 * ss
	 * s
	 * week day ： 星期几
	 * u
	 */

	// var months = [
	// 	'January',
	// 	'February',
	// 	'March',
	// 	'April',
	// 	'May',
	// 	'June',
	// 	'July',
	// 	'August',
	// 	'September',
	// 	'October',
	// 	'November',
	// 	'December'
	// ],
	// shortMonths = [
	// 	'Jan',
	// 	'Feb',
	// 	'Mar',
	// 	'Apr',
	// 	'May',
	// 	'June',
	// 	'July',
	// 	'Aug',
	// 	'Sep',
	// 	'Oct',
	// 	'Nov',
	// 	'Dec'
	// ],
	var formats = {
		y: function y(match, date) {
			var year = '' + date.getFullYear();
			if (match.length <= 2) {
				return year.slice(2);
			} else if (match.length > 2 && match.length <= 4) {
				return year;
			} else {
				return expandDigit(year, match.length);
			}
		},
		M: function M(match, date) {
			return expandDigit(date.getMonth() + 1, match.length);
		},
		d: 'getDate',
		H: 'getHours',
		h: function h(match, date) {
			var h = date.getHours() % 12;
			return expandDigit(h, match.length);
		},
		m: 'getMinutes',
		s: 'getSeconds',
		S: function S(match, date) {
			return date.getMilliseconds();
		},
		u: function u(match, date) {
			var day = date.getDay();
			return day > 0 ? day : 7;
		}
	},
	    format_reg = null,
	    format_code = [],
	    default_format = 'yyyy.MM.dd';

	for (var k in formats) {
		format_code.push(k + '+');
	}

	format_reg = new RegExp(format_code.join('|'), 'g');

	function expandDigit(number, digit) {
		number = String(number);
		var len = number.length;
		return len < digit ? Array(digit - len + 1).join('0') + number : number;
	}

	function format(match, date) {
		var map = formats[match.charAt(0)];
		if (map) {
			return typeof map === 'function' ? map(match, date) : expandDigit(date[map](), match.length);
		} else {
			return match;
		}
	}

	function dateFormat(format_str, millisecond) {
		var len = arguments.length,
		    date;
		if (len === 0) {
			format_str = default_format;
			date = new Date();
		} else if (len === 1) {
			var type = typeof format_str === 'undefined' ? 'undefined' : _typeof(format_str);
			if (type === 'string') {
				date = new Date();
			} else if (type === 'number') {
				date = new Date(format_str);
				format_str = default_format;
			}
		} else {
			date = new Date(millisecond);
		}
		return format_str.replace(format_reg, function (match) {
			return format(match, date);
		});
	}

	module.exports = dateFormat;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toArray = __webpack_require__(2);

	var defaults = {
		expire: 30,
		path: '/'
	};

	function getCookiePart(expire, path, domain, secure) {
		var result = [];
		if (typeof expire === 'number' && expire !== 0) {
			var d = new Date();
			d.setDate(d.getDate() + expire);
			result.push('; expires=' + d.toGMTString());
		}

		result.push(path ? '; path=' + path : '');
		result.push(domain ? '; domain=' + domain : '');
		result.push(secure ? '; ' + secure : '');
		return result.join('');
	}

	function getCookie(key) {
		var cookies = document.cookie ? document.cookie.split('; ') : [],
		    cookie;
		for (var i = 0, len = cookies.length; i < len; i++) {
			cookie = cookies[i].split('=');
			if (cookie[0] === encodeURIComponent(key)) {
				return decodeURIComponent(cookie[1]);
			}
		}
		return null;
	}

	function setCookie(key, value, expire, path, domain, secure) {
		expire = expire == null ? defaults.expire : parseInt(expire, 10);
		path = path || defaults.path;
		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + getCookiePart(expire, path, domain, secure);
	}

	function removeCookie(key) {
		setCookie(key, '', -30);
	}

	function storageProxy(type) {
		if (!window || !window.localStorage) {
			throw new TypeError('localStorage is undefined');
		}
		var storage = window.localStorage;
		var args = toArray(arguments);
		return storage[type].apply(storage, args.slice(1));
	}

	module.exports = {

		set: function set(key, value) {
			var valueStr;
			try {
				valueStr = JSON.stringify(value);
			} catch (e) {
				valueStr = value;
			}
			return storageProxy('setItem', key, valueStr);
		},

		get: function get(key) {
			var valueStr = storageProxy('getItem', key);
			try {
				return JSON.parse(valueStr);
			} catch (e) {
				return valueStr;
			}
		},

		remove: function remove(key) {
			return storageProxy('removeItem', key);
		},

		clear: function clear() {
			return storageProxy('clear');
		},

		setCookie: setCookie,

		getCookie: getCookie,

		removeCookie: removeCookie
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(1);
	var url = {};
	function Url() {
		this.protocol = null;
		this.auth = null;
		this.user = null;
		this.pass = null;
		this.host = null;
		this.port = null;
		this.hostname = null;
		this.hash = null;
		this.search = null;
		this.query = null;
		this.pathname = null;
		this.href = null;
	}

	function parseUrl(_url) {
		var _urls, result, host, auth, i, path, search, query, hash;
		result = new Url();
		if (!url) {
			return result;
		}
		//protocol fixed
		if (_url.indexOf('//') === 0) _url = window.location.href.split('/')[0] + _url;else if (_url.indexOf('://') < 0) _url = window.location.href.split('://')[0] + '://' + _url;

		//hash parse
		result.hash = '';
		if (0 <= (hash = _url.indexOf('#'))) {
			result.hash = _url.substr(hash + 1);
			_url = _url.substr(0, hash);
		}

		//search parse
		result.query = {};
		result.search = '';
		if (0 <= (search = _url.indexOf('?'))) {
			result.search = _url.substr(search);
			_url = _url.substr(0, search);
			search = result.search.substr(1).split('&');
			for (i = search.length - 1; i >= 0; i--) {
				query = search[i].split('=');
				result.query[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
			}
		}

		//protocol parse
		_urls = _url.split('/');
		result.protocol = _urls[0];
		result.href = _url;

		//host parse
		host = _urls[2].split('@'); // auth host eg rob:abcd1234@www.domain.com:80

		if (host.length === 1) {
			result.host = host[0];
		} else {
			result.auth = host[0];
			auth = result.auth.split(':');
			result.user = auth[0];
			result.pass = auth[1] || '';
			result.host = host[1];
		}

		host = result.host.split(':');
		if (host.length > 1) {
			result.hostname = host[0];
			result.port = host[1];
		} else {
			result.hostname = result.host;
			result.port = result.protocol.toLowerCase() === 'https:' ? '443' : '80';
		}

		//path parse
		result.pathname = '';
		path = _urls.slice(3);
		if (path.length > 0) {
			result.pathname = '/' + path.join('/');
		}
		return result;
	}

	// module.exports = assign({ parse : parseUrl},parseUrl())
	url = { parse: parseUrl };
	if (typeof window !== 'undefined') {
		assign(url, parseUrl(window.location.href));
	}
	module.exports = url;

/***/ }
/******/ ])
});
;