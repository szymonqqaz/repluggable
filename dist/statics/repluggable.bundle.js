(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("_"), require("React"), require("ReactRedux"), require("Redux"));
	else if(typeof define === 'function' && define.amd)
		define("repluggable", ["_", "React", "ReactRedux", "Redux"], factory);
	else if(typeof exports === 'object')
		exports["repluggable"] = factory(require("_"), require("React"), require("ReactRedux"), require("Redux"));
	else
		root["repluggable"] = factory(root["_"], root["React"], root["ReactRedux"], root["Redux"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "http://localhost:3201/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/*! exports used: createContext, default, isValidElement */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/*!*****************************!*\
  !*** external "ReactRedux" ***!
  \*****************************/
/*! no static exports found */
/*! exports used: Provider, connect */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/*!*********************************************************!*\
  !*** ../node_modules/redux-devtools-extension/index.js ***!
  \*********************************************************/
/*! no static exports found */
/*! exports used: devToolsEnhancer */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(/*! redux */ 3).compose;

exports.__esModule = true;
exports.composeWithDevTools =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
        if (arguments.length === 0) return undefined;
        if (typeof arguments[0] === 'object') return compose;
        return compose.apply(null, arguments);
      };

exports.devToolsEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    : function () {
        return function (noop) {
          return noop;
        };
      };


/***/ }),
/* 5 */,
/* 6 */
/*!*******************************!*\
  !*** ./index.ts + 80 modules ***!
  \*******************************/
/*! exports provided: AppHostAPI, AppMainView, createAppHost, makeLazyEntryPoint, mainViewSlotKey, stateSlotKey, SlotRenderer, ShellRenderer, invokeSlotCallbacks, connectWithShell, mapObservablesToSelectors, observeWithShell, connectWithShellAndObserve, ErrorBoundary, interceptEntryPoints, interceptEntryPointsMap, interceptAnyObject, monitorAPI, hot */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ../node_modules/redux-devtools-extension/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "React" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "ReactRedux" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "Redux" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "_" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "AppHostAPI", function() { return /* reexport */ AppHostAPI; });
__webpack_require__.d(__webpack_exports__, "AppMainView", function() { return /* reexport */ AppMainView; });
__webpack_require__.d(__webpack_exports__, "createAppHost", function() { return /* reexport */ createAppHost; });
__webpack_require__.d(__webpack_exports__, "makeLazyEntryPoint", function() { return /* reexport */ makeLazyEntryPoint; });
__webpack_require__.d(__webpack_exports__, "mainViewSlotKey", function() { return /* reexport */ mainViewSlotKey; });
__webpack_require__.d(__webpack_exports__, "stateSlotKey", function() { return /* reexport */ stateSlotKey; });
__webpack_require__.d(__webpack_exports__, "SlotRenderer", function() { return /* reexport */ SlotRenderer; });
__webpack_require__.d(__webpack_exports__, "ShellRenderer", function() { return /* reexport */ ShellRenderer; });
__webpack_require__.d(__webpack_exports__, "invokeSlotCallbacks", function() { return /* reexport */ invokeSlotCallbacks; });
__webpack_require__.d(__webpack_exports__, "connectWithShell", function() { return /* reexport */ connectWithShell; });
__webpack_require__.d(__webpack_exports__, "mapObservablesToSelectors", function() { return /* reexport */ mapObservablesToSelectors; });
__webpack_require__.d(__webpack_exports__, "observeWithShell", function() { return /* reexport */ observeWithShell; });
__webpack_require__.d(__webpack_exports__, "connectWithShellAndObserve", function() { return /* reexport */ connectWithShellAndObserve; });
__webpack_require__.d(__webpack_exports__, "ErrorBoundary", function() { return /* reexport */ errorBoundary_ErrorBoundary; });
__webpack_require__.d(__webpack_exports__, "interceptEntryPoints", function() { return /* reexport */ interceptEntryPoints; });
__webpack_require__.d(__webpack_exports__, "interceptEntryPointsMap", function() { return /* reexport */ interceptEntryPointsMap; });
__webpack_require__.d(__webpack_exports__, "interceptAnyObject", function() { return /* reexport */ interceptAnyObject; });
__webpack_require__.d(__webpack_exports__, "monitorAPI", function() { return /* reexport */ monitorAPI; });
__webpack_require__.d(__webpack_exports__, "hot", function() { return /* reexport */ hot; });

// CONCATENATED MODULE: ./appHostServices.ts
var AppHostServicesEntryPointName = 'APP-HOST-SERVICES';
var AppHostAPI = {
    name: 'AppHost API',
    public: true
};
function createAppHostServicesEntryPoint(apiFactory) {
    var cachedShell = null;
    return {
        name: AppHostServicesEntryPointName,
        declareAPIs: function () {
            return [AppHostAPI];
        },
        attach: function (shell) {
            cachedShell = shell;
            shell.contributeAPI(AppHostAPI, apiFactory);
        },
        getAppHostServicesShell: function () {
            if (cachedShell) {
                return cachedShell;
            }
            throw new Error('Shell for AppHostServices entry point was not yet created');
        }
    };
}

// CONCATENATED MODULE: ./API.ts


// EXTERNAL MODULE: external "_"
var external_ = __webpack_require__(0);
var external_default = /*#__PURE__*/__webpack_require__.n(external_);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "ReactRedux"
var external_ReactRedux_ = __webpack_require__(2);

// CONCATENATED MODULE: ./extensionSlot.ts
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};

var alwaysTrue = function () { return true; };
function createExtensionSlot(key, host, declaringShell) {
    var items = [];
    return {
        host: host,
        declaringShell: declaringShell,
        name: key.name,
        contribute: contribute,
        getItems: getItems,
        getSingleItem: getSingleItem,
        getItemByName: getItemByName,
        discardBy: discardBy
    };
    function contribute(fromShell, item, condition) {
        items.push({
            shell: fromShell,
            contribution: item,
            condition: condition || alwaysTrue,
            uniqueId: external_default.a.uniqueId(fromShell.name + "_extItem_")
        });
    }
    function getItems(forceAll) {
        if (forceAll === void 0) { forceAll = false; }
        return forceAll ? items : items.filter(function (item) { return item.condition(); });
    }
    function getSingleItem() {
        return items.find(function (item) { return item.condition(); });
    }
    function getItemByName(name) {
        return items.find(function (item) { return item.name === name && item.condition(); });
    }
    function discardBy(predicate) {
        items = items.filter(function (v) { return !predicate(v); });
    }
}
function createCustomExtensionSlot(key, handler, host, declaringShell) {
    return {
        name: key.name,
        host: host,
        declaringShell: declaringShell,
        contribute: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return handler.contribute.apply(handler, __spreadArray([], __read(args)));
        },
        discardBy: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return handler.discardBy.apply(handler, __spreadArray([], __read(args)));
        }
    };
}

// CONCATENATED MODULE: ./installedShellsState.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var UPDATE_INSTALLED_SHELLS_ACTION = '$installedShells/update';
var contributeInstalledShellsState = function () {
    return {
        $installedShells: installedShellsReducer
    };
};
var selectRootState = function (state) { return state.$installedShells; };
var InstalledShellsSelectors = {
    getInstalledShellsSet: function (state) {
        return selectRootState(state).installedShells;
    }
};
var InstalledShellsActions = {
    updateInstalledShells: function (updates) {
        return {
            type: UPDATE_INSTALLED_SHELLS_ACTION,
            updates: updates
        };
    }
};
var toggleInstalledShells = function (currentlyInstalled, updates) {
    return external_default.a.pickBy(external_default.a.assign({}, currentlyInstalled, updates), external_default.a.identity);
};
var installedShellsReducer = function (state, action) {
    if (state === void 0) { state = { installedShells: {} }; }
    switch (action.type) {
        case UPDATE_INSTALLED_SHELLS_ACTION:
            return __assign(__assign({}, state), { installedShells: toggleInstalledShells(state.installedShells, action.updates) });
    }
    return state;
};

// CONCATENATED MODULE: ./appHostUtils.ts

var dependentAPIs = function (entryPoint) {
    return external_default.a.chain(entryPoint).invoke('getDependencyAPIs').defaultTo([]).value();
};
var declaredAPIs = function (entryPoint) {
    return external_default.a.chain(entryPoint).invoke('declareAPIs').defaultTo([]).value();
};

// EXTERNAL MODULE: external "Redux"
var external_Redux_ = __webpack_require__(3);

// EXTERNAL MODULE: ../node_modules/redux-devtools-extension/index.js
var redux_devtools_extension = __webpack_require__(4);

// CONCATENATED MODULE: ./interceptAnyObject.ts

function interceptAnyObject(inner, onFunction, onProperty, includeNestedLevels) {
    var result = external_default.a.mapValues(inner, function (original, key) {
        if (typeof original === 'function' && typeof onFunction === 'function') {
            return onFunction(key, original);
        }
        if (includeNestedLevels && external_default.a.isObjectLike(original)) {
            return interceptAnyObject(original, onFunction ? function (name, func) { return onFunction(key + "." + name, func); } : undefined, onProperty ? function (name, value) { return onProperty(key + "." + name, value); } : undefined, includeNestedLevels - 1);
        }
        if (typeof onProperty === 'function') {
            return onProperty(key, original);
        }
        return original;
    });
    return result;
}

// CONCATENATED MODULE: ./invokeSlotCallbacks.ts
var invokeSlotCallbacks_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var invokeSlotCallbacks_spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function invokeSlotCallbacks(slot) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var slotItems = slot.getItems();
    if (slot.host.options.monitoring.disableMonitoring) {
        slotItems.forEach(function (slotItem) {
            try {
                slotItem.contribution.apply(slotItem, invokeSlotCallbacks_spreadArray([], invokeSlotCallbacks_read(args)));
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    else {
        slotItems.forEach(function (slotItem) {
            var messageId = slot.host + "-" + slot.name + ":" + slotItem.shell.name + (slotItem.name && '-' + slotItem.name);
            slotItem.shell.log.monitor(messageId, {}, function () { return slotItem.contribution.apply(slotItem, invokeSlotCallbacks_spreadArray([], invokeSlotCallbacks_read(args))); });
        });
    }
}

// CONCATENATED MODULE: ../node_modules/rxjs/node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var tslib_es6_assign = function() {
    tslib_es6_assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return tslib_es6_assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function tslib_es6_read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(tslib_es6_read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function tslib_es6_spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/Subscription.js




var Subscription_Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = tslib_es6_spreadArray(tslib_es6_spreadArray([], tslib_es6_read(errors)), tslib_es6_read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription_Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription_Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execTeardown(teardown) {
    if (isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js


var Action_Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_Subscription));

//# sourceMappingURL=Action.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js

var intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, tslib_es6_spreadArray([], tslib_es6_read(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js




var AsyncAction_AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action_Action));

//# sourceMappingURL=AsyncAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js


var QueueAction_QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_AsyncAction));

//# sourceMappingURL=QueueAction.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/Scheduler.js

var Scheduler_Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

//# sourceMappingURL=Scheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js


var AsyncScheduler_AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_Scheduler));

//# sourceMappingURL=AsyncScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js


var QueueScheduler_QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_AsyncScheduler));

//# sourceMappingURL=QueueScheduler.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/queue.js


var queueScheduler = new QueueScheduler_QueueScheduler(QueueAction_QueueAction);
var queue_queue = queueScheduler;
//# sourceMappingURL=queue.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/config.js
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, tslib_es6_spreadArray([], tslib_es6_read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js


function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        var onUnhandledError = config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() { }
//# sourceMappingURL=noop.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/errorContext.js

var context = null;
function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/Subscriber.js









var Subscriber_Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new Subscriber_SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription_Subscription));

var Subscriber_SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next, _this) : noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
            complete: complete ? wrapForErrorHandling(complete, _this) : noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber_Subscriber));

function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, tslib_es6_spreadArray([], tslib_es6_read(args)));
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                captureError(err);
            }
            else {
                reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};
//# sourceMappingURL=Subscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable_observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/pipe.js

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/Observable.js







var Observable_Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new Subscriber_SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable_observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber_Subscriber) || (isObserver(value) && isSubscription(value));
}
//# sourceMappingURL=Observable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/Subject.js






var Subject_Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new Subject_AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription_Subscription(function () { return arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new Subject_AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_Observable));

var Subject_AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject_Subject));

//# sourceMappingURL=Subject.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isPromise.js

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js


function isInteropObservable(input) {
    return isFunction(input[observable_observable]);
}
//# sourceMappingURL=isInteropObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator_iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isIterable.js


function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator_iterator]);
}
//# sourceMappingURL=isIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js


function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js












function innerFrom(input) {
    if (input instanceof Observable_Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable_Observable(function (subscriber) {
        var obs = obj[observable_observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable_Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable_Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable_Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable_Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/util/lift.js

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js


var OperatorSubscriber_OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber_Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_OperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js



function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js



function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js

function scheduleArray(input, scheduler) {
    return new Observable_Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js




function scheduleIterable(input, scheduler) {
    return new Observable_Observable(function (subscriber) {
        var iterator;
        executeSchedule(subscriber, scheduler, function () {
            iterator = input[iterator_iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable_Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js


function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js













function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}
//# sourceMappingURL=scheduled.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/observable/from.js


function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
//# sourceMappingURL=from.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/map.js


function map_map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom(project(value, index++)).subscribe(new OperatorSubscriber_OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new OperatorSubscriber_OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}
//# sourceMappingURL=mergeInternals.js.map
// CONCATENATED MODULE: ../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map_map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
}
//# sourceMappingURL=mergeMap.js.map
// CONCATENATED MODULE: ../node_modules/redux-observable/node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var tslib_es6_extendStatics = function(d, b) {
    tslib_es6_extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return tslib_es6_extendStatics(d, b);
};

function tslib_es6_extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    tslib_es6_extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var tslib_tslib_es6_assign = function() {
    tslib_tslib_es6_assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return tslib_tslib_es6_assign.apply(this, arguments);
}

function tslib_es6_rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function tslib_es6_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function tslib_es6_param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function tslib_es6_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function tslib_es6_awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function tslib_es6_generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var tslib_es6_createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function tslib_es6_exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) tslib_es6_createBinding(o, m, p);
}

function tslib_es6_values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function tslib_tslib_es6_read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function tslib_es6_spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(tslib_tslib_es6_read(arguments[i]));
    return ar;
}

/** @deprecated */
function tslib_es6_spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function tslib_tslib_es6_spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function tslib_es6_await(v) {
    return this instanceof tslib_es6_await ? (this.v = v, this) : new tslib_es6_await(v);
}

function tslib_es6_asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof tslib_es6_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function tslib_es6_asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: tslib_es6_await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function tslib_es6_asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof tslib_es6_values === "function" ? tslib_es6_values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function tslib_es6_makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var tslib_es6_setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function tslib_es6_importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) tslib_es6_createBinding(result, mod, k);
    tslib_es6_setModuleDefault(result, mod);
    return result;
}

function tslib_es6_importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function tslib_es6_classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function tslib_es6_classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

// CONCATENATED MODULE: ../node_modules/redux-observable/dist/esm/StateObservable.js


var StateObservable_StateObservable = /** @class */ (function (_super) {
    tslib_es6_extends(StateObservable, _super);
    function StateObservable(input$, initialState) {
        var _this = _super.call(this, function (subscriber) {
            var subscription = _this.__notifier.subscribe(subscriber);
            if (subscription && !subscription.closed) {
                subscriber.next(_this.value);
            }
            return subscription;
        }) || this;
        _this.__notifier = new Subject_Subject();
        _this.value = initialState;
        input$.subscribe(function (value) {
            // We only want to update state$ if it has actually changed since
            // redux requires reducers use immutability patterns.
            // This is basically what distinctUntilChanged() does but it's so simple
            // we don't need to pull that code in
            if (value !== _this.value) {
                _this.value = value;
                _this.__notifier.next(value);
            }
        });
        return _this;
    }
    return StateObservable;
}(Observable_Observable));


// CONCATENATED MODULE: ../node_modules/redux-observable/dist/esm/createEpicMiddleware.js




function createEpicMiddleware(options) {
    if (options === void 0) { options = {}; }
    // This isn't great. RxJS doesn't publicly export the constructor for
    // QueueScheduler nor QueueAction, so we reach in. We need to do this because
    // we don't want our internal queuing mechanism to be on the same queue as any
    // other RxJS code outside of redux-observable internals.
    var QueueScheduler = queueScheduler.constructor;
    var uniqueQueueScheduler = new QueueScheduler(queueScheduler.schedulerActionCtor);
    if (false) {}
    var epic$ = new Subject_Subject();
    var store;
    var epicMiddleware = function (_store) {
        if (false) {}
        store = _store;
        var actionSubject$ = new Subject_Subject();
        var stateSubject$ = new Subject_Subject();
        var action$ = actionSubject$
            .asObservable()
            .pipe(observeOn(uniqueQueueScheduler));
        var state$ = new StateObservable_StateObservable(stateSubject$.pipe(observeOn(uniqueQueueScheduler)), store.getState());
        var result$ = epic$.pipe(map_map(function (epic) {
            var output$ = epic(action$, state$, options.dependencies);
            if (!output$) {
                throw new TypeError("Your root Epic \"" + (epic.name ||
                    '<anonymous>') + "\" does not return a stream. Double check you're not missing a return statement!");
            }
            return output$;
        }), mergeMap(function (output$) {
            return from(output$).pipe(subscribeOn(uniqueQueueScheduler), observeOn(uniqueQueueScheduler));
        }));
        result$.subscribe(store.dispatch);
        return function (next) {
            return function (action) {
                // Downstream middleware gets the action first,
                // which includes their reducers, so state is
                // updated before epics receive the action
                var result = next(action);
                // It's important to update the state$ before we emit
                // the action because otherwise it would be stale
                stateSubject$.next(store.getState());
                actionSubject$.next(action);
                return result;
            };
        };
    };
    epicMiddleware.run = function (rootEpic) {
        if (false) {}
        epic$.next(rootEpic);
    };
    return epicMiddleware;
}

// CONCATENATED MODULE: ./throttledStore.tsx
var throttledStore_assign = (undefined && undefined.__assign) || function () {
    throttledStore_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return throttledStore_assign.apply(this, arguments);
};







var curry = external_default.a.curry;
var animationFrameRenderer = curry(function (requestAnimationFrame, cancelAnimationFrame, render) {
    var requestId = null;
    return function () {
        if (!requestId) {
            requestId = requestAnimationFrame(function () {
                requestId = null;
                render();
            });
        }
        return function () {
            cancelAnimationFrame(requestId || -1);
            requestId = null;
        };
    };
});
var buildStoreReducer = function (contributedState, broadcastNotify, observableNotify) {
    function withNotifyAction(originalReducersMap, notifyAction) {
        var decorateReducer = function (originalReducer) {
            return function (state0, action) {
                var state1 = originalReducer(state0, action);
                if (state1 !== state0) {
                    notifyAction();
                }
                return state1;
            };
        };
        var wrapper = interceptAnyObject(originalReducersMap, function (name, func) {
            var originalReducer = func;
            return decorateReducer(originalReducer);
        });
        return wrapper;
    }
    function withBroadcastOrObservableNotify(_a, shellName) {
        var notificationScope = _a.notificationScope, reducerFactory = _a.reducerFactory, observable = _a.observable;
        var originalReducersMap = reducerFactory();
        if (notificationScope === "broadcasting") {
            return withNotifyAction(originalReducersMap, broadcastNotify);
        }
        if (!observable) {
            // should never happen; would be an internal bug
            throw new Error("getPerShellReducersMapObject: notificationScope=observable but 'observable' is falsy, in shell '" + shellName + "'");
        }
        return withNotifyAction(originalReducersMap, function () {
            return observableNotify(observable);
        });
    }
    function getPerShellReducersMapObject() {
        return contributedState
            .getItems()
            .reduce(function (map, item) {
            var shellName = item.shell.name;
            map[shellName] = throttledStore_assign(throttledStore_assign({}, map[shellName]), withBroadcastOrObservableNotify(item.contribution, shellName));
            return map;
        }, {});
    }
    function getCombinedShellReducers() {
        var shellsReducerMaps = getPerShellReducersMapObject();
        var combinedReducersMap = external_default.a.mapValues(shellsReducerMaps, function (singleMap) {
            return Object(external_Redux_["combineReducers"])(singleMap);
        });
        return combinedReducersMap;
    }
    function buildReducersMapObject() {
        // TODO: get rid of builtInReducersMaps
        var builtInReducersMaps = throttledStore_assign({}, contributeInstalledShellsState());
        return throttledStore_assign(throttledStore_assign({}, builtInReducersMaps), getCombinedShellReducers());
    }
    var reducersMap = buildReducersMapObject();
    var combinedReducer = Object(external_Redux_["combineReducers"])(reducersMap);
    return combinedReducer;
};
var updateThrottledStore = function (store, contributedState) {
    var newReducer = buildStoreReducer(contributedState, store.broadcastNotify, store.observableNotify);
    store.replaceReducer(newReducer);
    store.resetPendingNotifications();
};
var createThrottledStore = function (host, contributedState, requestAnimationFrame, cancelAnimationFrame) {
    var pendingBroadcastNotification = false;
    var pendingObservableNotifications;
    var onBroadcastNotify = function () {
        pendingBroadcastNotification = true;
    };
    var onObservableNotify = function (observable) {
        if (!pendingObservableNotifications) {
            pendingObservableNotifications = new Set();
        }
        pendingObservableNotifications.add(observable);
    };
    var resetPendingNotifications = function () {
        pendingBroadcastNotification = false;
        pendingObservableNotifications = undefined;
    };
    console.log("console log from module!");
    var epicMiddleware = createEpicMiddleware();
    var reducer = buildStoreReducer(contributedState, onBroadcastNotify, onObservableNotify);
    var store = host.options.enableReduxDevtoolsExtension
        ? Object(external_Redux_["createStore"])(reducer, Object(external_Redux_["applyMiddleware"])(epicMiddleware), Object(redux_devtools_extension["devToolsEnhancer"])({ name: "repluggable" }))
        : Object(external_Redux_["createStore"])(reducer, Object(external_Redux_["applyMiddleware"])(epicMiddleware));
    var invoke = function (f) { return f(); };
    var broadcastSubscribers = [];
    var subscribe = function (subscriber) {
        broadcastSubscribers = external_default.a.concat(broadcastSubscribers, subscriber);
        return function () {
            broadcastSubscribers = external_default.a.without(broadcastSubscribers, subscriber);
        };
    };
    var notifySubscribers = function () {
        if (pendingBroadcastNotification || !pendingObservableNotifications) {
            host
                .getAppHostServicesShell()
                .log.monitor("ThrottledStore.notifySubscribers", {}, function () {
                return external_default.a.forEach(broadcastSubscribers, invoke);
            });
        }
    };
    var notifyObservers = function () {
        if (pendingObservableNotifications) {
            pendingObservableNotifications.forEach(function (observable) {
                observable.notify();
            });
        }
    };
    var notifyAll = function () {
        try {
            notifySubscribers();
            notifyObservers();
        }
        finally {
            resetPendingNotifications();
        }
    };
    var notifyAllOnAnimationFrame = animationFrameRenderer(requestAnimationFrame, cancelAnimationFrame, notifyAll);
    var cancelRender = external_default.a.noop;
    store.subscribe(function () {
        cancelRender = notifyAllOnAnimationFrame();
    });
    var flush = function () {
        cancelRender();
        notifyAll();
    };
    var dispatch = function (action) {
        resetPendingNotifications();
        var dispatchResult = store.dispatch(action);
        return dispatchResult;
    };
    var result = throttledStore_assign(throttledStore_assign({}, store), { subscribe: subscribe,
        dispatch: dispatch,
        flush: flush, broadcastNotify: onBroadcastNotify, observableNotify: onObservableNotify, resetPendingNotifications: resetPendingNotifications });
    resetPendingNotifications();
    return result;
};
var createObservable = function (shell, uniqueName, selectorFactory) {
    var subscribersSlotKey = {
        name: uniqueName,
    };
    var observersSlot = shell.declareSlot(subscribersSlotKey);
    var cachedSelector;
    var getOrCreateCachedSelector = function () {
        if (cachedSelector) {
            return cachedSelector;
        }
        var newSelector = selectorFactory(shell.getStore().getState());
        cachedSelector = newSelector;
        return newSelector;
    };
    return {
        subscribe: function (fromShell, callback) {
            observersSlot.contribute(fromShell, callback);
            return function () {
                observersSlot.discardBy(function (item) { return item.contribution === callback; });
            };
        },
        notify: function () {
            cachedSelector = undefined;
            var newSelector = getOrCreateCachedSelector();
            invokeSlotCallbacks(observersSlot, newSelector);
        },
        current: getOrCreateCachedSelector,
    };
};

// CONCATENATED MODULE: ./loggers.ts
var loggers_assign = (undefined && undefined.__assign) || function () {
    loggers_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return loggers_assign.apply(this, arguments);
};
var consoleLoggerSpan = {
    end: function (success, error, keyValuePairs) {
        if (error) {
            console.error(error, keyValuePairs);
        }
    }
};
var ConsoleHostLogger = {
    spanRoot: function (messageId, error, keyValuePairs) {
        return consoleLoggerSpan;
    },
    spanChild: function (messageId, error, keyValuePairs) {
        return consoleLoggerSpan;
    },
    log: function (severity, id, error, keyValuePairs) {
        var consoleFunc = getConsoleOutputFunc(severity);
        consoleFunc(id, keyValuePairs);
    }
};
function createShellLogger(host, entryPoint) {
    var entryPointTags = buildEntryPointTags();
    var spanChild = function (messageId, keyValuePairs) {
        return host.log.spanChild(messageId, withEntryPointTags(keyValuePairs));
    };
    var spanRoot = function (messageId, keyValuePairs) {
        return host.log.spanRoot(messageId, withEntryPointTags(keyValuePairs));
    };
    return {
        log: function (severity, id, keyValuePairs) {
            host.log.log(severity, id, undefined, withEntryPointTags(keyValuePairs));
        },
        debug: function (messageId, keyValuePairs) {
            host.log.log('debug', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        info: function (messageId, keyValuePairs) {
            host.log.log('info', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        warning: function (messageId, keyValuePairs) {
            host.log.log('warning', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        error: function (messageId, error, keyValuePairs) {
            host.log.log('error', messageId, error, withEntryPointTags(keyValuePairs));
        },
        critical: function (messageId, error, keyValuePairs) {
            host.log.log('critical', messageId, error, withEntryPointTags(keyValuePairs));
        },
        spanChild: spanChild,
        spanRoot: spanRoot,
        monitor: monitor
    };
    function monitor(messageId, keyValuePairs, monitoredCode) {
        var allTags = withEntryPointTags(keyValuePairs);
        var span = spanChild(messageId, allTags);
        try {
            var returnValue = monitoredCode();
            if (isPromise(returnValue)) {
                return returnValue
                    .then(function (retVal) {
                    span.end(true, undefined, loggers_assign(loggers_assign({}, allTags), { returnValue: retVal }));
                    return retVal;
                })
                    .catch(function (error) {
                    span.end(false, error, allTags);
                    throw error;
                });
            }
            span.end(true, undefined, loggers_assign(loggers_assign({}, allTags), { returnValue: returnValue }));
            return returnValue;
        }
        catch (error) {
            span.end(false, error, allTags);
            throw error;
        }
    }
    function buildEntryPointTags() {
        return entryPoint.tags ? loggers_assign(loggers_assign({}, entryPoint.tags), { $ep: entryPoint.name }) : { $ep: entryPoint.name };
    }
    function withEntryPointTags(keyValuePairs) {
        return keyValuePairs ? loggers_assign(loggers_assign({}, keyValuePairs), entryPointTags) : entryPointTags;
    }
    function isPromise(obj) {
        return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
    }
}
function getConsoleOutputFunc(severity) {
    switch (severity) {
        case 'debug':
            return console.debug;
        case 'event':
            return console.info;
        case 'warning':
            return console.warn;
        case 'error':
        case 'critical':
            return console.error;
        default:
            return console.log;
    }
}

// CONCATENATED MODULE: ./monitorAPI.ts

function isEnrichedMemoizationFunction(func) {
    return func.hasOwnProperty('cache') && func.hasOwnProperty('hit');
}
function isMemberNamesArray(value) {
    return Array.isArray(value);
}
function monitorAPI(shell, hostOptions, apiName, api, 
//trace: Trace[],
//memoized: StatisticsMemoization[]
apiOptions) {
    if (hostOptions.monitoring.disableMonitoring || (apiOptions && apiOptions.disableMonitoring === true)) {
        return api;
    }
    var shouldMonitor = apiOptions && isMemberNamesArray(apiOptions.disableMonitoring)
        ? function (funcName) {
            var disableMonitoring = apiOptions.disableMonitoring;
            if (isMemberNamesArray(disableMonitoring)) {
                return !disableMonitoring.find(function (memberName) {
                    var memberNameString = memberName;
                    return (funcName.indexOf(memberNameString) === 0 &&
                        (funcName.length === memberNameString.length || funcName.charAt(memberNameString.length) === '.'));
                });
            }
        }
        : function () { return true; };
    return interceptAnyObject(api, function (funcName, originalFunc) {
        if (!shouldMonitor(funcName)) {
            console.log('DISABLED MONITORING>', funcName);
            return originalFunc;
        }
        //let funcId = `${apiName}::${funcName}`
        var isMemoized = false;
        if (isEnrichedMemoizationFunction(originalFunc)) {
            isMemoized = true;
            //funcId += '(Memoized)'
            //memoized.push({ name: funcId, func: originalFunc })
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var tags = {
                $api: apiName,
                $apiFunc: funcName,
                $args: args,
                $memoized: isMemoized || undefined
            };
            return shell.log.monitor(apiName + "." + funcName, tags, function () {
                return originalFunc.apply(api, args);
                //wrapWithMeasure(options, originalFunc, api, args, funcId, trace)
            });
        };
    }, undefined, apiOptions && apiOptions.includesNamespaces ? 4 : 0);
}

// CONCATENATED MODULE: ./tarjanGraph.ts
/*
    Based on:
    https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
    https://gist.github.com/chadhutchins/1440602
*/
var tarjanGraph_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Graph = /** @class */ (function () {
    function Graph() {
        this.map = new Map();
    }
    Graph.prototype.addOrGetVertex = function (value) {
        var vertex = this.map.get(value);
        if (!vertex) {
            vertex = new Vertex(value);
            this.map.set(value, vertex);
        }
        return vertex;
    };
    Graph.prototype.getVertices = function () {
        return this.map.values();
    };
    Graph.prototype.addConnection = function (source, target) {
        this.addOrGetVertex(source).connections.push(this.addOrGetVertex(target));
    };
    return Graph;
}());

var Vertex = /** @class */ (function () {
    function Vertex(name) {
        this.name = name;
        this.connections = [];
        this.index = -1;
        this.lowLink = -1;
    }
    return Vertex;
}());
var Tarjan = /** @class */ (function () {
    function Tarjan(graph) {
        this.graph = graph;
        this.index = 0;
        this.stack = [];
        this.scc = [];
    }
    Tarjan.prototype.run = function () {
        var e_1, _a;
        try {
            for (var _b = tarjanGraph_values(this.graph.getVertices()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                if (v.index < 0) {
                    this.strongConnect(v);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.scc;
    };
    Tarjan.prototype.strongConnect = function (vertex) {
        var e_2, _a;
        vertex.index = this.index;
        vertex.lowLink = this.index;
        this.index = this.index + 1;
        this.stack.push(vertex);
        var _loop_1 = function (w) {
            var v = vertex;
            if (w.index < 0) {
                this_1.strongConnect(w);
                v.lowLink = Math.min(v.lowLink, w.lowLink);
            }
            else if (this_1.stack.some(function (x) { return x.name === w.name; })) {
                v.lowLink = Math.min(v.lowLink, w.index);
            }
        };
        var this_1 = this;
        try {
            for (var _b = tarjanGraph_values(vertex.connections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var w = _c.value;
                _loop_1(w);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (vertex.lowLink === vertex.index) {
            var vertices = [];
            var w = null;
            if (this.stack.length > 0) {
                do {
                    w = this.stack.pop();
                    w && vertices.push(w);
                } while (vertex.name !== (w === null || w === void 0 ? void 0 : w.name));
            }
            if (vertices.length > 0) {
                this.scc.push(vertices);
            }
        }
    };
    return Tarjan;
}());


// CONCATENATED MODULE: ./repluggableAppDebug/performanceDebugInfo.ts
var performanceDebugInfo_assign = (undefined && undefined.__assign) || function () {
    performanceDebugInfo_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return performanceDebugInfo_assign.apply(this, arguments);
};

function getPerformanceDebug(options, trace, memoized) {
    var getMemoizedTable = function () {
        return external_default.a.map(memoized, function (memoize) {
            var _a = memoize.func, calls = _a.calls, hit = _a.hit, miss = _a.miss;
            var hitRate = ((hit / calls) * 100).toFixed(2) + "%";
            var name = memoize.name;
            return { name: name, hitRate: hitRate, calls: calls, hit: hit, miss: miss };
        });
    };
    var getGroups = function (apiName) {
        var api = external_default.a.groupBy(trace, 'name')[apiName];
        try {
            var groupedArgs = external_default.a.groupBy(api, function (a) { return JSON.stringify(a.args); });
            var groupedRes = external_default.a.groupBy(api, function (a) { return JSON.stringify(a.res); });
            var groupedArgsAndRes = external_default.a.groupBy(api, function (a) { return JSON.stringify(a.args) + JSON.stringify(a.res); });
            return { groupedArgs: groupedArgs, groupedRes: groupedRes, groupedArgsAndRes: groupedArgsAndRes };
        }
        catch (err) {
            return { groupedArgs: [], groupedRes: [], groupedArgsAndRes: [] };
        }
    };
    var printMemoizeTable = function () {
        console.table(getMemoizedTable());
    };
    return {
        getSortedMeasurments: function () {
            return external_default()(trace)
                .map(function (measurement) { return external_default.a.pick(measurement, ['name', 'duration']); })
                .sortBy('duration')
                .reverse()
                .value();
        },
        start: function () {
            if (!options.monitoring.disableMonitoring) {
                options.monitoring.enablePerformance = true;
            }
            else {
                console.log('Remove "disableMonitoring" in order to use trace');
            }
        },
        stop: function () {
            options.monitoring.enablePerformance = false;
        },
        clean: function () {
            trace.length = 0;
        },
        getTrace: function () {
            return trace;
        },
        getGroupedTrace: function () {
            return external_default.a.groupBy(trace, 'name');
        },
        getGroupedSumTrace: function () {
            var traceData = external_default()(trace)
                .groupBy('name')
                .mapValues(function (arr, name) {
                var totalDuration = Number(external_default.a.sumBy(arr, 'duration').toFixed(2));
                var times = arr.length;
                var avgDuration = Number((totalDuration / times).toFixed(2));
                var groups = external_default()(getGroups(name))
                    .mapValues(function (obj, group) {
                    var keys = Object.keys(obj);
                    length = keys.length;
                    if (group !== 'groupedRes' || length === 0) {
                        return length;
                    }
                    var joined = keys.join(' ');
                    return joined.length < 15 ? length + ": " + joined : length;
                })
                    .value();
                return performanceDebugInfo_assign({ name: name, times: times, totalDuration: totalDuration, avgDuration: avgDuration }, groups);
            })
                .orderBy(function (x) { return x.totalDuration; }, 'desc')
                .value();
            external_default.a.forEach(getMemoizedTable(), function (memoizeData) {
                external_default.a.assign(external_default.a.find(traceData, { name: memoizeData.name }), memoizeData);
            });
            console.table(traceData);
        },
        analyseAPI: function (apiName) {
            var groups = getGroups(apiName);
            if (groups) {
                var groupedArgs = groups.groupedArgs, groupedRes = groups.groupedRes, groupedArgsAndRes = groups.groupedArgsAndRes;
                console.log("groupedArgs: " + Object.keys(groupedArgs).length, groupedArgs);
                console.log("groupedRes: " + Object.keys(groupedRes).length, groupedRes);
                console.log("groupedArgsAndRes: " + Object.keys(groupedArgsAndRes).length, groupedArgsAndRes);
            }
        },
        getMemoized: function () { return memoized; },
        printMemoizeTable: printMemoizeTable
    };
}

// CONCATENATED MODULE: ./hot.ts
var hot = function (sourceModule, entryPoints) {
    if (!sourceModule.hot) {
        return entryPoints;
    }
    sourceModule.hot.accept();
    sourceModule.hot.dispose(function () {
        var shortModuleId = sourceModule.id.split('/').pop();
        var oldShellNames = entryPoints.map(function (x) { return x.name; });
        console.debug("----- HMR[" + shortModuleId + "] > REMOVING SHELLS >", oldShellNames);
        return window.repluggableAppDebug.host.removeShells(oldShellNames);
    });
    if (sourceModule.hot.status() === 'apply') {
        var shortModuleId = sourceModule.id.split('/').pop();
        console.debug("----- HMR[" + shortModuleId + "] > ADDING SHELLS >", entryPoints.map(function (x) { return x.name; }));
        window.repluggableAppDebug.host.addShells(entryPoints);
    }
    return entryPoints;
};

// CONCATENATED MODULE: ./repluggableAppDebug/repluggableAppDebug.ts



function setupDebugInfo(_a) {
    var host = _a.host, uniqueShellNames = _a.uniqueShellNames, readyAPIs = _a.readyAPIs, getAPI = _a.getAPI, getOwnSlotKey = _a.getOwnSlotKey, getUnreadyEntryPoints = _a.getUnreadyEntryPoints, extensionSlots = _a.extensionSlots, addedShells = _a.addedShells, lazyShells = _a.lazyShells, shellInstallers = _a.shellInstallers, _b = _a.performance, options = _b.options, trace = _b.trace, memoizedArr = _b.memoizedArr;
    var utils = {
        apis: function () {
            return Array.from(readyAPIs).map(function (apiKey) {
                return {
                    key: apiKey,
                    impl: function () { return getAPI(apiKey); }
                };
            });
        },
        unReadyEntryPoints: function () { return getUnreadyEntryPoints(); },
        whyEntryPointUnready: function (name) {
            var unreadyEntryPoint = external_default.a.find(utils.unReadyEntryPoints(), function (entryPoint) { return entryPoint.name.toLowerCase() === name.toLowerCase(); });
            var dependencies = external_default.a.invoke(unreadyEntryPoint, 'getDependencyAPIs');
            var unreadyDependencies = external_default.a.filter(dependencies, function (key) { return !readyAPIs.has(getOwnSlotKey(key)); });
            if (!external_default.a.isEmpty(unreadyDependencies)) {
                var unreadyDependenciesNames = external_default()(unreadyDependencies).map('name').join(',');
                console.log("There are unready dependencies for " + name + ": " + unreadyDependenciesNames);
            }
        },
        findAPI: function (name) {
            return external_default.a.filter(utils.apis(), function (api) { return api.key.name.toLowerCase().indexOf(name.toLowerCase()) !== -1; });
        },
        performance: getPerformanceDebug(options, trace, memoizedArr)
    };
    window.repluggableAppDebug = {
        host: host,
        uniqueShellNames: uniqueShellNames,
        extensionSlots: extensionSlots,
        addedShells: addedShells,
        lazyShells: lazyShells,
        readyAPIs: readyAPIs,
        shellInstallers: shellInstallers,
        utils: utils,
        hmr: {
            hot: hot
        }
    };
}

// CONCATENATED MODULE: ./repluggableAppDebug/index.ts


// CONCATENATED MODULE: ./appHost.ts
var appHost_assign = (undefined && undefined.__assign) || function () {
    appHost_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return appHost_assign.apply(this, arguments);
};
var appHost_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var appHost_spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var appHost_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};










var isMultiArray = function (v) { return external_default.a.every(v, external_default.a.isArray); };
var castMultiArray = function (v) {
    return isMultiArray(v) ? v : [v];
};
var makeLazyEntryPoint = function (name, factory) {
    return {
        name: name,
        factory: factory
    };
};
var mainViewSlotKey = {
    name: 'mainView'
};
var stateSlotKey = {
    name: 'state'
};
var toShellToggleSet = function (names, isInstalled) {
    return names.reduce(function (result, name) {
        result[name] = isInstalled;
        return result;
    }, {});
};
var createUnreadyEntryPointsStore = function () {
    var entryPoints = [];
    return {
        get: function () {
            return entryPoints;
        },
        set: function (newEntryPoints) {
            entryPoints = newEntryPoints;
        }
    };
};
var verifyLayersUniqueness = function (layers) {
    if (!layers) {
        return;
    }
    var flatLayers = external_default.a.flatten(layers);
    var nonUnique = external_default()(flatLayers)
        .countBy(function (_a) {
        var name = _a.name;
        return name;
    })
        .pickBy(function (v) { return v > 1; })
        .keys()
        .value();
    if (nonUnique.length > 0) {
        throw new Error("Cannot initialize host with non unique layers: " + nonUnique);
    }
};
function createAppHost(initialEntryPointsOrPackages, options) {
    if (options === void 0) { options = { monitoring: {} }; }
    var store = null;
    var canInstallReadyEntryPoints = true;
    verifyLayersUniqueness(options.layers);
    var unReadyEntryPointsStore = createUnreadyEntryPointsStore();
    var layers = external_default.a.map(options.layers ? castMultiArray(options.layers) : [], function (singleDimension, i) {
        return external_default.a.map(singleDimension, function (layer) { return (appHost_assign(appHost_assign({}, layer), { dimension: i })); });
    });
    var trace = [];
    var memoizedArr = [];
    var readyAPIs = new Set();
    var uniqueShellNames = new Set();
    var extensionSlots = new Map();
    var slotKeysByName = new Map();
    var addedShells = new Map();
    var shellInstallers = new WeakMap();
    var lazyShells = new Map();
    var shellsChangedCallbacks = new Map();
    var APILayers = new WeakMap();
    var memoizedFunctions = [];
    var hostAPI = {
        getAllEntryPoints: function () { return appHost_spreadArray([], appHost_read(addedShells.entries())).map(function (_a) {
            var _b = appHost_read(_a, 2), entryPoint = _b[1].entryPoint;
            return entryPoint;
        }); },
        getAppHostOptions: function () { return options; }
    };
    var appHostServicesEntryPoint = createAppHostServicesEntryPoint(function () { return hostAPI; });
    var host = {
        getStore: getStore,
        getAPI: getAPI,
        getSlot: getSlot,
        getAllSlotKeys: getAllSlotKeys,
        getAllEntryPoints: getAllEntryPoints,
        hasShell: hasShell,
        isLazyEntryPoint: isLazyEntryPoint,
        addShells: addShells,
        removeShells: removeShells,
        onShellsChanged: onShellsChanged,
        removeShellsChangedCallback: removeShellsChangedCallback,
        getAppHostServicesShell: appHostServicesEntryPoint.getAppHostServicesShell,
        log: options.logger ? options.logger : ConsoleHostLogger,
        options: options
    };
    setupDebugInfo({
        host: host,
        readyAPIs: readyAPIs,
        uniqueShellNames: uniqueShellNames,
        extensionSlots: extensionSlots,
        addedShells: addedShells,
        shellInstallers: shellInstallers,
        lazyShells: lazyShells,
        performance: {
            options: options,
            trace: trace,
            memoizedArr: memoizedArr
        },
        getUnreadyEntryPoints: unReadyEntryPointsStore.get,
        getOwnSlotKey: getOwnSlotKey,
        getAPI: getAPI
    });
    declareSlot(mainViewSlotKey);
    declareSlot(stateSlotKey);
    addShells([appHostServicesEntryPoint]);
    var memoize = function (func, resolver) {
        if (options.monitoring.disableMemoization) {
            return func;
        }
        var memoized = external_default.a.memoize(func, resolver);
        if (options.monitoring.disableMonitoring) {
            return memoized;
        }
        var enrichedMemoization = enrichMemoization(memoized);
        if (options.monitoring.debugMemoization) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var memRes = enrichedMemoization.apply(void 0, appHost_spreadArray([], appHost_read(args)));
                var res = func.apply(void 0, appHost_spreadArray([], appHost_read(args)));
                if (!external_default.a.isEqual(memRes, res)) {
                    console.log("Memoization Error");
                    console.log("Memoization returns:", memRes);
                    console.log("Original Func returns:", res);
                    console.log("Original Func:", func);
                }
                return memRes;
            };
        }
        return enrichedMemoization;
    };
    // we know that addShells completes synchronously
    addShells(initialEntryPointsOrPackages);
    return host;
    //TODO: get rid of LazyEntryPointDescriptor
    function isLazyEntryPointDescriptor(value) {
        return typeof value.factory === 'function';
    }
    function enrichMemoization(memoized) {
        var memoizedWithMissHit = external_default.a.assign(memoized, {
            miss: 0,
            calls: 0,
            hit: 0,
            printHitMiss: function () {
                return console.log("calls: " + memoizedWithMissHit.calls + "\nhit: " + memoizedWithMissHit.hit + "\nmiss: " + memoizedWithMissHit.miss + "\n");
            }
        });
        var getter = memoizedWithMissHit.cache.get.bind(memoized.cache);
        memoizedWithMissHit.cache.get = function (key) {
            memoizedWithMissHit.calls++;
            memoizedWithMissHit.hit++;
            return getter(key);
        };
        var setter = memoizedWithMissHit.cache.set.bind(memoizedWithMissHit.cache);
        memoizedWithMissHit.cache.set = function (key, value) {
            memoizedWithMissHit.calls++;
            memoizedWithMissHit.miss++;
            return setter(key, value);
        };
        return memoizedWithMissHit;
    }
    function getLayerByName(layerName) {
        var layer = external_default()(layers).flatten().find({ name: layerName });
        if (!layer) {
            throw new Error("Cannot find layer " + layerName);
        }
        return layer;
    }
    function validateEntryPointLayer(entryPoint) {
        if (!entryPoint.getDependencyAPIs || !entryPoint.layer || external_default.a.isEmpty(layers)) {
            return;
        }
        var highestLevelDependencies = external_default.a.chain(entryPoint.getDependencyAPIs())
            .flatMap(function (apiKey) {
            return apiKey.layer
                ? external_default()(apiKey.layer)
                    .castArray()
                    .map(function (l) { return ({
                    layer: getLayerByName(l),
                    apiKey: apiKey
                }); })
                    .value()
                : { apiKey: apiKey };
        })
            .groupBy(function (dependency) { var _a; return (_a = dependency === null || dependency === void 0 ? void 0 : dependency.layer) === null || _a === void 0 ? void 0 : _a.dimension; })
            .map(function (dimension) { return external_default.a.maxBy(dimension, function (dependency) { return ((dependency === null || dependency === void 0 ? void 0 : dependency.layer) ? dependency.layer.level : -Infinity); }); })
            .value();
        var currentLayers = external_default()(entryPoint.layer)
            .castArray()
            .map(function (l) { return getLayerByName(l); })
            .value();
        var getCurrentLayerOfSameDimension = function (layer) {
            return currentLayers.find(function (entryPointLayer) { return entryPointLayer.dimension === layer.dimension; });
        };
        highestLevelDependencies.forEach(function (highestLevelDependency) {
            var currentLayer = (highestLevelDependency === null || highestLevelDependency === void 0 ? void 0 : highestLevelDependency.layer) && getCurrentLayerOfSameDimension(highestLevelDependency.layer);
            if ((highestLevelDependency === null || highestLevelDependency === void 0 ? void 0 : highestLevelDependency.layer) && currentLayer && currentLayer.level < highestLevelDependency.layer.level) {
                throw new Error("Entry point " + entryPoint.name + " of layer " + currentLayer.name + " cannot depend on API " + slotKeyToName(highestLevelDependency.apiKey) + " of layer " + highestLevelDependency.layer.name);
            }
        });
    }
    function validateLayers(entryPoints) {
        external_default.a.forEach(entryPoints, function (ep) { return validateEntryPointLayer(ep); });
    }
    function addShells(entryPointsOrPackages) {
        host.log.log('debug', "Adding " + entryPointsOrPackages.length + " packages.");
        var entryPoints = external_default.a.flatten(entryPointsOrPackages);
        var existingEntryPoints = Object.values(addedShells).map(function (shell) { return shell.entryPoint; });
        var allEntryPoints = existingEntryPoints.concat(unReadyEntryPointsStore.get(), entryPoints);
        if (!options.disableLayersValidation) {
            validateLayers(entryPoints);
        }
        validateUniqueShellNames(entryPoints);
        !options.disableCheckCircularDependencies && !options.experimentalCyclicMode && validateCircularDependency(allEntryPoints);
        var _a = appHost_read(external_default.a.partition(entryPoints, isLazyEntryPointDescriptor), 2), lazyEntryPointsList = _a[0], readyEntryPointsList = _a[1];
        executeInstallShell(readyEntryPointsList);
        lazyEntryPointsList.forEach(registerLazyEntryPoint);
        setInstalledShellNames(getInstalledShellNames().concat(external_default.a.map(lazyEntryPointsList, 'name')));
        return Promise.resolve();
    }
    function isAllAPIDependenciesAreReadyOrPending(checkedKey, pendingEntryPoints, passed) {
        if (passed === void 0) { passed = []; }
        // TODO: Avoid iterating N (cycle length) times for the same cycle
        var declarers = pendingEntryPoints.flatMap(function (ep) { var _a; return (((_a = ep.declareAPIs) === null || _a === void 0 ? void 0 : _a.call(ep)) || []).map(function (k) { return [k, ep]; }); });
        var _a = appHost_read(declarers.find(function (_a) {
            var _b = appHost_read(_a, 2), k = _b[0], ep = _b[1];
            return external_default.a.isEqual(k, checkedKey);
        }) || [], 2), keyDeclarerEntryPoint = _a[1];
        if (!keyDeclarerEntryPoint) {
            return false;
        }
        var dependencies = keyDeclarerEntryPoint.getDependencyAPIs && keyDeclarerEntryPoint.getDependencyAPIs();
        var uncheckDependencies = external_default.a.differenceWith(dependencies, passed, external_default.a.isEqual);
        var everyDependenciesReadyOrPending = external_default.a.every(uncheckDependencies, function (k) { return readyAPIs.has(getOwnSlotKey(k)) || isAllAPIDependenciesAreReadyOrPending(k, pendingEntryPoints, passed.concat(checkedKey)); });
        return everyDependenciesReadyOrPending;
    }
    function executeInstallShell(entryPoints) {
        var _a = appHost_read(external_default.a.partition(entryPoints, function (entryPoint) {
            var dependencies = entryPoint.getDependencyAPIs && entryPoint.getDependencyAPIs();
            return external_default.a.every(dependencies, function (k) {
                return readyAPIs.has(getOwnSlotKey(k)) ||
                    (options.experimentalCyclicMode && isAllAPIDependenciesAreReadyOrPending(k, entryPoints));
            });
        }), 2), readyEntryPoints = _a[0], currentUnReadyEntryPoints = _a[1];
        unReadyEntryPointsStore.set(external_default.a.union(external_default.a.difference(unReadyEntryPointsStore.get(), readyEntryPoints), currentUnReadyEntryPoints));
        if (store && external_default.a.isEmpty(readyEntryPoints)) {
            return;
        }
        var shells = readyEntryPoints.map(createShell);
        executeReadyEntryPoints(shells);
    }
    function executeReadyEntryPoints(shells) {
        canInstallReadyEntryPoints = false;
        try {
            invokeEntryPointPhase('getDependencyAPIs', shells, function (f) { return f.entryPoint.getDependencyAPIs && f.setDependencyAPIs(f.entryPoint.getDependencyAPIs()); }, function (f) { return !!f.entryPoint.getDependencyAPIs; });
            invokeEntryPointPhase('attach', shells, function (f) { return f.entryPoint.attach && f.entryPoint.attach(f); }, function (f) { return !!f.entryPoint.attach; });
            buildStore();
            shells.forEach(function (f) { return f.setLifecycleState(true, true, false); });
            invokeEntryPointPhase('extend', shells, function (f) { return f.entryPoint.extend && f.entryPoint.extend(f); }, function (f) { return !!f.entryPoint.extend; });
            shells.forEach(function (f) {
                addedShells.set(f.entryPoint.name, f);
                f.setLifecycleState(true, true, true);
            });
        }
        finally {
            canInstallReadyEntryPoints = true;
        }
        executeInstallShell(unReadyEntryPointsStore.get());
    }
    function executeShellsChangedCallbacks() {
        shellsChangedCallbacks.forEach(function (f) { return f(external_default.a.keys(InstalledShellsSelectors.getInstalledShellsSet(getStore().getState()))); });
    }
    function setInstalledShellNames(names) {
        var updates = toShellToggleSet(names, true);
        getStore().dispatch(InstalledShellsActions.updateInstalledShells(updates));
        executeShellsChangedCallbacks();
    }
    function setUninstalledShellNames(names) {
        var updates = toShellToggleSet(names, false);
        getStore().dispatch(InstalledShellsActions.updateInstalledShells(updates));
        executeShellsChangedCallbacks();
    }
    function onShellsChanged(callback) {
        var callbackId = external_default.a.uniqueId('shells-changed-callback-');
        shellsChangedCallbacks.set(callbackId, callback);
        return callbackId;
    }
    function removeShellsChangedCallback(callbackId) {
        shellsChangedCallbacks.delete(callbackId);
    }
    function declareSlot(key, declaringShell) {
        var newSlot = registerSlotOrThrow(key, function () { return createExtensionSlot(key, host, declaringShell); });
        return newSlot;
    }
    function declareCustomSlot(key, handler, declaringShell) {
        var newSlot = registerSlotOrThrow(key, function () { return createCustomExtensionSlot(key, handler, host, declaringShell); });
        return newSlot;
    }
    function slotKeyToName(key) {
        return key.version === undefined ? key.name : key.name + "(v" + key.version + ")";
    }
    function registerSlotOrThrow(key, factory) {
        var slotName = slotKeyToName(key);
        if (!extensionSlots.has(key) && !slotKeysByName.has(slotName)) {
            var newSlot = factory();
            extensionSlots.set(key, newSlot);
            slotKeysByName.set(slotName, key);
            return newSlot;
        }
        throw new Error("Extension slot with key '" + slotName + "' already exists.");
    }
    function getSlot(key) {
        var ownKey = getOwnSlotKey(key);
        var anySlot = extensionSlots.get(ownKey);
        if (anySlot) {
            return anySlot;
        }
        throw new Error("Extension slot with key '" + slotKeyToName(key) + "' doesn't exist.");
    }
    function getAPI(key) {
        var APISlot = getSlot(key);
        var item = APISlot.getSingleItem();
        if (item) {
            return item.contribution;
        }
        throw new Error("API '" + slotKeyToName(key) + "' doesn't exist.");
    }
    function getStore() {
        if (store) {
            return store;
        }
        throw new Error('Store was not yet created');
    }
    function getAllSlotKeys() {
        return Array.from(extensionSlots.keys());
    }
    function getAllEntryPoints() {
        throw new Error('not implemented');
    }
    function hasShell(name) {
        var installedShellsSet = InstalledShellsSelectors.getInstalledShellsSet(getStore().getState());
        return installedShellsSet[name] === true;
    }
    function isLazyEntryPoint(name) {
        return lazyShells.has(name);
    }
    function registerLazyEntryPoint(descriptor) {
        lazyShells.set(descriptor.name, descriptor.factory);
    }
    function getOwnSlotKey(key) {
        if (key.public === true) {
            var ownKey = slotKeysByName.get(slotKeyToName(key));
            if (ownKey && ownKey.public) {
                return ownKey;
            }
        }
        return key;
    }
    function validateUniqueShellNames(entryPoints) {
        entryPoints.forEach(function (f) { return validateUniqueShellName(f.name); });
    }
    function validateUniqueShellName(name) {
        if (!uniqueShellNames.has(name)) {
            uniqueShellNames.add(name);
        }
        else {
            throw new Error("Shell named '" + name + "' already exists");
        }
    }
    function validateCircularDependency(entryPoints) {
        var e_1, _a;
        var graph = new Graph();
        entryPoints.forEach(function (x) {
            var declaredApis = declaredAPIs(x);
            var dependencies = dependentAPIs(x).map(function (child) { return slotKeyToName(child); });
            declaredApis.forEach(function (d) { return dependencies.forEach(function (y) { return graph.addConnection(slotKeyToName(d), y); }); });
        });
        var tarjan = new Tarjan(graph);
        var sccs = tarjan.run();
        try {
            for (var sccs_1 = appHost_values(sccs), sccs_1_1 = sccs_1.next(); !sccs_1_1.done; sccs_1_1 = sccs_1.next()) {
                var scc = sccs_1_1.value;
                if (scc.length > 1) {
                    host.log.log('debug', "Circular API dependency found: " + scc.map(function (x) { return slotKeyToName(x); }).join(' -> '));
                    throw new Error("Circular API dependency found");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sccs_1_1 && !sccs_1_1.done && (_a = sccs_1.return)) _a.call(sccs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    function buildStore() {
        var contributedState = getSlot(stateSlotKey);
        if (store) {
            updateThrottledStore(store, contributedState);
        }
        else {
            store = createThrottledStore(host, contributedState, window.requestAnimationFrame, window.cancelAnimationFrame);
            store.subscribe(function () {
                flushMemoizedForState();
            });
        }
        return store;
    }
    function flushMemoizedForState() {
        memoizedFunctions.forEach(function (_a) {
            var f = _a.f, shouldClear = _a.shouldClear;
            if ((shouldClear || external_default.a.stubTrue)()) {
                clearCache(f);
            }
        });
    }
    function clearCache(memoizedFunction) {
        if (memoizedFunction.cache && memoizedFunction.cache.clear) {
            memoizedFunction.cache.clear();
        }
    }
    function invokeEntryPointPhase(phase, // TODO: Exclude 'name'
    shell, action, predicate) {
        host.log.log('debug', "--- " + phase + " phase ---");
        try {
            shell.filter(function (f) { return !predicate || predicate(f); }).forEach(function (f) { return invokeShell(f, action, phase); });
        }
        catch (err) {
            console.error(phase + " phase FAILED", err);
            throw err;
        }
        host.log.log('debug', "--- End of " + phase + " phase ---");
    }
    function invokeShell(shell, action, phase) {
        host.log.log('debug', phase + " : " + shell.entryPoint.name);
        try {
            action(shell);
        }
        catch (err) {
            host.log.log('error', 'AppHost.shellFailed', err, {
                shell: shell.name,
                phase: phase,
                message: "Shell '" + shell.name + "' FAILED " + phase + " phase",
                error: err
            });
            throw err;
        }
    }
    function getAPIContributor(key) {
        var ownKey = getOwnSlotKey(key);
        return extensionSlots.has(ownKey) ? external_default.a.get(getSlot(ownKey).getSingleItem(), 'shell') : undefined;
    }
    function doesExtensionItemBelongToShells(extensionItem, shellNames) {
        return (external_default.a.includes(shellNames, extensionItem.shell.name) ||
            external_default.a.some(external_default.a.invoke(extensionItem.shell.entryPoint, 'getDependencyAPIs'), function (APIKey) {
                return external_default.a.includes(shellNames, external_default.a.get(getAPIContributor(APIKey), 'name'));
            }));
    }
    function discardSlotKey(key) {
        var ownKey = getOwnSlotKey(key);
        readyAPIs.delete(ownKey);
        extensionSlots.delete(ownKey);
        slotKeysByName.delete(slotKeyToName(ownKey));
        host.log.log('debug', "-- Removed slot keys: " + slotKeyToName(ownKey) + " --");
    }
    function findDependantShells(entryShell) {
        var cache = new Map();
        var _findDependantShells = function (declaringShell) {
            return external_default()(appHost_spreadArray([], appHost_read(addedShells.entries())))
                .flatMap(function (_a) {
                var _b, _c;
                var _d = appHost_read(_a, 2), name = _d[0], shell = _d[1];
                var cachedValue = cache.get(name);
                if (cachedValue) {
                    return cachedValue;
                }
                var dependencyAPIs = ((_c = (_b = shell.entryPoint) === null || _b === void 0 ? void 0 : _b.getDependencyAPIs) === null || _c === void 0 ? void 0 : _c.call(_b)) || [];
                var isDependant = dependencyAPIs.some(function (key) { var _a; return ((_a = getAPIContributor(key)) === null || _a === void 0 ? void 0 : _a.name) === declaringShell.name; });
                if (!isDependant) {
                    return [];
                }
                var dependencies = appHost_spreadArray([shell], appHost_read(_findDependantShells(shell)));
                cache.set(name, dependencies);
                return dependencies;
            })
                .uniqBy('name')
                .value();
        };
        return _findDependantShells(entryShell);
    }
    function isShellBeingDependantOnInGroup(declaringShell, shells) {
        return !!shells.find(function (dependantShell) {
            var _a, _b;
            var dependencyAPIs = ((_b = (_a = dependantShell.entryPoint) === null || _a === void 0 ? void 0 : _a.getDependencyAPIs) === null || _b === void 0 ? void 0 : _b.call(_a)) || [];
            return dependencyAPIs.find(function (key) { var _a; return ((_a = getAPIContributor(key)) === null || _a === void 0 ? void 0 : _a.name) === declaringShell.name; });
        });
    }
    function executeDetachOnShellReadyForRemoval(shellsToBeDetached, originalRequestedRemovalNames) {
        invokeEntryPointPhase('detach', shellsToBeDetached, function (f) { return external_default.a.invoke(f.entryPoint, 'detach', f); });
        var detachedShellsNames = shellsToBeDetached.map(function (_a) {
            var name = _a.name;
            return name;
        });
        var slotKeysToDiscard = findContributedAPIs(detachedShellsNames).concat(findDeclaredSlotKeys(detachedShellsNames));
        extensionSlots.forEach(function (extensionSlot) {
            return extensionSlot.discardBy(function (extensionItem) {
                return doesExtensionItemBelongToShells(extensionItem, detachedShellsNames);
            });
        });
        detachedShellsNames.forEach(function (name) {
            var _a;
            var isResultOfMissingDependency = !originalRequestedRemovalNames.includes(name);
            if (isResultOfMissingDependency) {
                var entryPoint = (_a = addedShells.get(name)) === null || _a === void 0 ? void 0 : _a.entryPoint;
                entryPoint && unReadyEntryPointsStore.get().push(entryPoint);
            }
            addedShells.delete(name);
            uniqueShellNames.delete(name);
        });
        slotKeysToDiscard.forEach(discardSlotKey);
        host.log.log('debug', "Done uninstalling " + detachedShellsNames);
    }
    function executeUninstallShells(names) {
        host.log.log('debug', "-- Uninstalling " + names + " --");
        var shellsCandidatesToBeDetached = external_default()(names)
            .map(function (name) { return addedShells.get(name); })
            .compact()
            .flatMap(function (shell) { return appHost_spreadArray([shell], appHost_read(findDependantShells(shell))); })
            .uniqBy('name')
            .value();
        var queue = shellsCandidatesToBeDetached;
        while (!external_default.a.isEmpty(queue)) {
            var shellsToBeDetached = queue.filter(function (ep) { return !isShellBeingDependantOnInGroup(ep, queue); });
            if (external_default.a.isEmpty(shellsToBeDetached)) {
                throw new Error("Some shells could not detach: " + queue.map(function (_a) {
                    var name = _a.name;
                    return name;
                }).join());
            }
            executeDetachOnShellReadyForRemoval(shellsToBeDetached, names);
            queue = external_default.a.differenceBy(queue, shellsToBeDetached, 'name');
        }
    }
    function findContributedAPIs(shellNames) {
        return appHost_spreadArray([], appHost_read(readyAPIs)).filter(function (APIKey) { return external_default.a.includes(shellNames, external_default.a.get(getAPIContributor(APIKey), 'name')); });
    }
    function findDeclaredSlotKeys(shellNames) {
        var e_2, _a;
        var shellNameSet = new Set(shellNames);
        var result = [];
        try {
            for (var _b = appHost_values(extensionSlots.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                var declaringShell = entry[1].declaringShell;
                if (declaringShell && shellNameSet.has(declaringShell.name)) {
                    result.push(entry[0]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    }
    function getInstalledShellNames() {
        return appHost_spreadArray([], appHost_read(addedShells)).map(function (_a) {
            var _b = appHost_read(_a, 1), v = _b[0];
            return v;
        });
    }
    function removeShells(names) {
        var shellNames = getInstalledShellNames();
        executeUninstallShells(names);
        setUninstalledShellNames(external_default.a.difference(shellNames, getInstalledShellNames()));
        return Promise.resolve();
    }
    function createShell(entryPoint) {
        var storeEnabled = false;
        var APIsEnabled = false;
        var wasInitCompleted = false;
        var dependencyAPIs = [];
        var nextObservableId = 1;
        var boundaryAspects = [];
        var isOwnContributedAPI = function (key) { return getAPIContributor(key) === shell; };
        var shell = {
            name: entryPoint.name,
            entryPoint: entryPoint,
            getSlot: function (key) {
                var slot = host.getSlot(key);
                var declaringShell = slot.declaringShell;
                if (!declaringShell || declaringShell !== shell) {
                    throw new Error("Shell '" + shell.name + "' is trying to get slot '" + slotKeyToName(key) + "' that is owned by '" + (declaringShell ? declaringShell.name : 'Host') + "'");
                }
                return slot;
            },
            getAllSlotKeys: host.getAllSlotKeys,
            getAllEntryPoints: host.getAllEntryPoints,
            hasShell: host.hasShell,
            isLazyEntryPoint: host.isLazyEntryPoint,
            onShellsChanged: host.onShellsChanged,
            removeShellsChangedCallback: host.removeShellsChangedCallback,
            declareSlot: function (key) {
                return declareSlot(key, shell);
            },
            declareCustomSlot: function (key, handler) {
                return declareCustomSlot(key, handler, shell);
            },
            setLifecycleState: function (enableStore, enableAPIs, initCompleted) {
                storeEnabled = enableStore;
                APIsEnabled = enableAPIs;
                wasInitCompleted = initCompleted;
            },
            setDependencyAPIs: function (APIs) {
                dependencyAPIs = APIs;
            },
            canUseAPIs: function () {
                return APIsEnabled;
            },
            canUseStore: function () {
                return storeEnabled;
            },
            wasInitializationCompleted: function () {
                return wasInitCompleted;
            },
            runLateInitializer: function (initializer) {
                var saveWasInitCompleted = wasInitCompleted;
                try {
                    wasInitCompleted = false;
                    return initializer();
                }
                finally {
                    wasInitCompleted = saveWasInitCompleted;
                }
            },
            addShells: function (entryPointsOrPackages) {
                var shellNamesToBeinstalled = external_default.a.flatten(entryPointsOrPackages).map(function (x) { return x.name; });
                var shellNamesInstalledByCurrentEntryPoint = shellInstallers.get(shell) || [];
                shellInstallers.set(shell, appHost_spreadArray(appHost_spreadArray([], appHost_read(shellNamesInstalledByCurrentEntryPoint)), appHost_read(shellNamesToBeinstalled)));
                return host.addShells(entryPointsOrPackages);
            },
            removeShells: function (names) {
                var namesInstalledByCurrentEntryPoint = shellInstallers.get(shell) || [];
                var namesNotInstalledByCurrentEntryPoint = external_default.a.difference(names, namesInstalledByCurrentEntryPoint);
                // TODO: Allow entry point to uninstall its own shell ?
                if (!external_default.a.isEmpty(namesNotInstalledByCurrentEntryPoint)) {
                    throw new Error("Shell " + entryPoint.name + " is trying to uninstall shells: " + names + " which is are not installed by entry point " + entryPoint.name + " - This is not allowed");
                }
                shellInstallers.set(shell, external_default.a.without.apply(external_default.a, appHost_spreadArray([namesInstalledByCurrentEntryPoint], appHost_read(names))));
                return host.removeShells(names);
            },
            getAPI: function (key) {
                if (dependencyAPIs.indexOf(key) >= 0 || isOwnContributedAPI(key)) {
                    return host.getAPI(key);
                }
                throw new Error("API '" + slotKeyToName(key) + "' is not declared as dependency by entry point '" + entryPoint.name + "' (forgot to return it from getDependencyAPIs?)");
            },
            contributeAPI: function (key, factory, apiOptions) {
                host.log.log('debug', "Contributing API " + slotKeyToName(key) + ".");
                if (!external_default.a.includes(external_default.a.invoke(entryPoint, 'declareAPIs') || [], key)) {
                    throw new Error("Entry point '" + entryPoint.name + "' is trying to contribute API '" + slotKeyToName(key) + "' which it didn't declare");
                }
                var areSameLayers = function (l1, l2) {
                    return external_default.a.isEqual(external_default()(l1).castArray().sort().value(), external_default()(l2).castArray().sort().value());
                };
                if (!options.disableLayersValidation && (entryPoint.layer || key.layer) && !areSameLayers(entryPoint.layer, key.layer)) {
                    throw new Error("Cannot contribute API " + slotKeyToName(key) + " of layer " + (key.layer || '<BLANK>') + " from entry point " + entryPoint.name + " of layer " + (entryPoint.layer || '<BLANK>'));
                }
                var api = factory();
                var monitoredAPI = monitorAPI(shell, options, normalizeApiName(slotKeyToName(key)), api /*, trace, memoizedArr*/, apiOptions);
                var apiSlot = declareSlot(key);
                APILayers.set(key, !options.disableLayersValidation && entryPoint.layer
                    ? external_default()(entryPoint.layer)
                        .castArray()
                        .map(function (l) { return getLayerByName(l); })
                        .value()
                    : undefined);
                apiSlot.contribute(shell, monitoredAPI);
                readyAPIs.add(key);
                if (canInstallReadyEntryPoints) {
                    var shellNames = external_default.a.map(unReadyEntryPointsStore.get(), 'name');
                    executeInstallShell(unReadyEntryPointsStore.get());
                    setInstalledShellNames(external_default.a.difference(shellNames, external_default.a.map(unReadyEntryPointsStore.get(), 'name')));
                }
                return monitoredAPI;
            },
            contributeState: function (contributor) {
                var contribution = {
                    notificationScope: 'broadcasting',
                    reducerFactory: contributor
                };
                getSlot(stateSlotKey).contribute(shell, contribution);
            },
            contributeObservableState: function (contributor, mapStateToSelectors) {
                var observableUniqueName = entryPoint.name + "/observable_" + nextObservableId++;
                var observable = createObservable(shell, observableUniqueName, mapStateToSelectors);
                var contribution = {
                    notificationScope: 'observable',
                    reducerFactory: contributor,
                    observable: observable
                };
                getSlot(stateSlotKey).contribute(shell, contribution);
                return observable;
            },
            getStore: function () {
                return {
                    dispatch: host.getStore().dispatch,
                    subscribe: host.getStore().subscribe,
                    getState: function () {
                        var entireStoreState = host.getStore().getState();
                        return entireStoreState[shell.name];
                    },
                    flush: host.getStore().flush
                };
            },
            contributeMainView: function (fromShell, contributor) {
                getSlot(mainViewSlotKey).contribute(fromShell, contributor);
            },
            contributeBoundaryAspect: function (component) {
                boundaryAspects.push(component);
            },
            memoizeForState: function (func, resolver, shouldClear) {
                var memoized = memoize(func, resolver);
                memoizedFunctions.push(shouldClear ? { f: memoized, shouldClear: shouldClear } : { f: memoized });
                return memoized;
            },
            flushMemoizedForState: flushMemoizedForState,
            memoize: function (func, resolver) {
                return memoize(func, resolver);
            },
            clearCache: clearCache,
            getBoundaryAspects: function () {
                return boundaryAspects;
            },
            getHostOptions: function () { return host.options; },
            log: createShellLogger(host, entryPoint)
        };
        return shell;
    }
    function normalizeApiName(name) {
        return name.charAt(0).toLowerCase() + name.substring(1).replace(new RegExp(' ', 'g'), '');
    }
}

// CONCATENATED MODULE: ./errorBoundary.tsx
var errorBoundary_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


function getQualifiedName(shellName, componentName) {
    return componentName ? shellName + " / " + componentName : shellName;
}
function getHostOptions(shell) {
    return shell.getHostOptions();
}
var errorBoundary_ErrorBoundary = /** @class */ (function (_super) {
    errorBoundary_extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.throttledResetError = external_default.a.throttle(function () {
            _this.resetError();
        }, 500, { leading: true });
        _this.state = {
            hasError: false,
            errorMessage: null
        };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return {
            hasError: true,
            errorMessage: error.message
        };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        var _a = this.props, shell = _a.shell, componentName = _a.componentName;
        var enableStickyErrorBoundaries = getHostOptions(shell).enableStickyErrorBoundaries;
        shell.log.error('ErrorBoundary.componentDidCatch', error, { componentName: componentName });
        if (!enableStickyErrorBoundaries) {
            this.attemptToRecoverOnNextState();
        }
    };
    ErrorBoundary.prototype.render = function () {
        var _this = this;
        if (this.state.hasError) {
            var shell = this.props.shell;
            var enableStickyErrorBoundaries = getHostOptions(shell).enableStickyErrorBoundaries;
            var qualifiedName = getQualifiedName(shell.name, this.props.componentName);
            if (enableStickyErrorBoundaries) {
                return (external_React_default.a.createElement("div", { className: "component-error " + (this.props.errorClassName || ''), style: { pointerEvents: 'all' }, title: this.state.errorMessage || '(unknown error)' },
                    "error in ",
                    external_React_default.a.createElement("b", null, qualifiedName),
                    external_React_default.a.createElement("button", { onClick: function () { return _this.resetError(); } }, "reset")));
            }
            return null;
        }
        return this.props.children || null;
    };
    ErrorBoundary.prototype.componentWillUnmount = function () {
        this.cancelAttemptToRecover();
    };
    ErrorBoundary.prototype.resetError = function () {
        this.cancelAttemptToRecover();
        this.setState({
            hasError: false,
            errorMessage: null,
            unsubscribe: undefined
        });
    };
    ErrorBoundary.prototype.attemptToRecoverOnNextState = function () {
        var _this = this;
        var shell = this.props.shell;
        if (!this.state || !this.state.unsubscribe) {
            var unsubscribe = shell.getStore().subscribe(function () {
                _this.throttledResetError();
            });
            this.setState({ unsubscribe: unsubscribe });
        }
    };
    ErrorBoundary.prototype.cancelAttemptToRecover = function () {
        if (this.state && this.state.unsubscribe) {
            this.state.unsubscribe();
        }
    };
    return ErrorBoundary;
}(external_React_default.a.Component));


// CONCATENATED MODULE: ./shellContext.ts

var ShellContext = Object(external_React_["createContext"])(null);

// CONCATENATED MODULE: ./propsDeepEqual.tsx


var propsDeepEqual = function (propsA, propsB) {
    var customizer = function (a, b, key, objectA) {
        if (Object(external_React_["isValidElement"])(a)) {
            if (!Object(external_React_["isValidElement"])(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
            return a.key === b.key && a.type === b.type && propsDeepEqual(a.props, b.props);
        }
        if (key === 'children' && objectA === propsA) {
            if (typeof a === 'function' && typeof b === 'function') {
                return false;
            }
            return;
        }
        if (typeof a === 'function' && typeof b === 'function') {
            return true;
        }
        return;
    };
    return external_default.a.isEqualWith(propsA, propsB, customizer);
};

// CONCATENATED MODULE: ./storeContext.ts

var StoreContext = Object(external_React_["createContext"])(null);

// CONCATENATED MODULE: ./renderSlotComponents.tsx
var renderSlotComponents_assign = (undefined && undefined.__assign) || function () {
    renderSlotComponents_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return renderSlotComponents_assign.apply(this, arguments);
};







var connectOptions = {
    context: StoreContext,
    pure: true,
    areStatePropsEqual: propsDeepEqual,
    areOwnPropsEqual: propsDeepEqual
};
function renderWithAspects(shell, component, aspectIndex) {
    var aspects = shell.getBoundaryAspects();
    if (aspects && aspects.length > aspectIndex) {
        var Aspect = aspects[aspectIndex];
        return external_React_default.a.createElement(Aspect, null, renderWithAspects(shell, component, aspectIndex + 1));
    }
    return component;
}
var HostProvider = function (props) {
    return props.host ? (external_React_default.a.createElement(external_ReactRedux_["Provider"], { store: props.host.getStore(), context: StoreContext }, props.children)) : (external_React_default.a.createElement(external_React_default.a.Fragment, null, props.children));
};
var ShellRenderer = function (_a) {
    var shell = _a.shell, component = _a.component, name = _a.name, host = _a.host;
    return (external_React_default.a.createElement(errorBoundary_ErrorBoundary, { shell: shell, componentName: name },
        external_React_default.a.createElement(HostProvider, { host: host },
            external_React_default.a.createElement(ShellContext.Provider, { value: shell }, renderWithAspects(shell, component, 0)))));
};
function createSlotItemToShellRendererMap(mapFunc) {
    return function (item, index) { return (external_React_default.a.createElement(ShellRenderer, { shell: item.shell, component: external_React_default.a.createElement(ConnectedPredicateHoc, { index: index, item: item, mapFunc: mapFunc }), key: item.uniqueId, name: item.name })); };
}
var SlotRendererPure = function (_a) {
    var items = _a.items, mapFunc = _a.mapFunc, filterFunc = _a.filterFunc, sortFunc = _a.sortFunc;
    return (external_React_default.a.createElement(external_React_default.a.Fragment, null, external_default.a.flow(external_default.a.compact([
        filterFunc && (function (slotItems) { return slotItems.filter(function (item, index) { return filterFunc(item.contribution, index); }); }),
        sortFunc && (function (slotItems) { return slotItems.sort(sortFunc); }),
        function (slotItems) { return slotItems.map(createSlotItemToShellRendererMap(mapFunc)); }
    ]))(items)));
};
var ConnectedSlot = Object(external_ReactRedux_["connect"])(function (state, _a) {
    var slot = _a.slot;
    return ({
        items: slot.getItems()
    });
}, undefined, undefined, { context: StoreContext })(SlotRendererPure);
function SlotRenderer(props) {
    return external_React_default.a.createElement(ConnectedSlot, renderSlotComponents_assign({}, props));
}
var PredicateHoc = function (props) { return (external_React_default.a.createElement(external_React_default.a.Fragment, null, props.predicateResult ? props.children || props.render() : null)); };
var mapPredicateHocStateToProps = function (state, ownProps) { return ({
    index: ownProps.index,
    render: ownProps.mapFunc ? ownProps.mapFunc(ownProps.item.contribution, ownProps.index) : ownProps.item.contribution,
    children: ownProps.children,
    predicateResult: ownProps.item.condition()
}); };
var ConnectedPredicateHoc = Object(external_ReactRedux_["connect"])(mapPredicateHocStateToProps, undefined, undefined, connectOptions)(PredicateHoc);

// CONCATENATED MODULE: ./appMainView.tsx








var sfc = function (props) {
    var appHostServicesShell = props.host.getAppHostServicesShell();
    return (external_React_default.a.createElement(ShellContext.Provider, { value: appHostServicesShell },
        external_React_default.a.createElement(SlotRenderer, { slot: props.host.getSlot(mainViewSlotKey), mapFunc: external_default.a.identity })));
};
var appMainView_mapStateToProps = function (state, ownProps) { return ({
    installedShells: InstalledShellsSelectors.getInstalledShellsSet(state),
    host: ownProps.host
}); };
var ConnectedSfc = Object(external_ReactRedux_["connect"])(appMainView_mapStateToProps, undefined, undefined, { context: StoreContext })(sfc);
var AppMainView = function (props) { return (external_React_default.a.createElement(external_ReactRedux_["Provider"], { store: props.host.getStore(), context: StoreContext },
    external_React_default.a.createElement(ConnectedSfc, { host: props.host }))); };

// CONCATENATED MODULE: ./connectWithShell.tsx
var connectWithShell_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var connectWithShell_assign = (undefined && undefined.__assign) || function () {
    connectWithShell_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return connectWithShell_assign.apply(this, arguments);
};
var connectWithShell_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var connectWithShell_spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};







var reduxConnectOptions = {
    context: StoreContext,
    pure: true,
    areStatePropsEqual: propsDeepEqual,
    areOwnPropsEqual: propsDeepEqual
};
function wrapWithShouldUpdate(shouldUpdate, func, shell) {
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (shouldUpdate && !shouldUpdate(shell) ? true : func.apply(void 0, connectWithShell_spreadArray([], connectWithShell_read(args))));
    });
}
function wrapWithShellContext(component, mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var ConnectedComponent = /** @class */ (function (_super) {
        connectWithShell_extends(ConnectedComponent, _super);
        function ConnectedComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.mapStateToProps = mapStateToProps
                ? function (__, ownProps) {
                    return _this.props.shell.log.monitor("connectWithShell.mapStateToProps " + _this.props.shell.name, {}, function () {
                        return mapStateToProps(_this.props.shell, _this.props.shell.getStore().getState(), ownProps);
                    });
                }
                : external_default.a.stubObject;
            _this.mapDispatchToProps = mapDispatchToProps
                ? function (dispatch, ownProps) {
                    return _this.props.shell.log.monitor("connectWithShell.mapDispatchToProps " + _this.props.shell.name, {}, function () {
                        return mapDispatchToProps(_this.props.shell, dispatch, ownProps);
                    });
                }
                : external_default.a.stubObject;
            var shouldComponentUpdate = options.shouldComponentUpdate && _this.props.shell.memoizeForState(options.shouldComponentUpdate, function () { return '*'; });
            var memoWithShouldUpdate = function (f) {
                var last = null;
                return (function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (last && shouldComponentUpdate && !shouldComponentUpdate(_this.props.shell)) {
                        return last;
                    }
                    last = f.apply(void 0, connectWithShell_spreadArray([], connectWithShell_read(args)));
                    return last;
                });
            };
            _this.connectedComponent = Object(external_ReactRedux_["connect"])(memoWithShouldUpdate(_this.mapStateToProps), _this.mapDispatchToProps, undefined, options.shouldComponentUpdate
                ? connectWithShell_assign(connectWithShell_assign({}, reduxConnectOptions), { areStatePropsEqual: wrapWithShouldUpdate(shouldComponentUpdate, reduxConnectOptions.areStatePropsEqual, boundShell), areOwnPropsEqual: wrapWithShouldUpdate(shouldComponentUpdate, reduxConnectOptions.areOwnPropsEqual, boundShell) }) : reduxConnectOptions)(component); // TODO: Fix 'as any'
            return _this;
        }
        ConnectedComponent.prototype.render = function () {
            var Component = this.connectedComponent;
            var props = external_default.a.omit(this.props, 'shell');
            return external_React_default.a.createElement(Component, connectWithShell_assign({}, props));
        };
        return ConnectedComponent;
    }(external_React_default.a.Component));
    var wrapChildrenIfNeeded = function (props, originalShell) {
        return props.children
            ? connectWithShell_assign(connectWithShell_assign({}, props), { children: external_React_default.a.createElement(ShellContext.Provider, { value: originalShell }, props.children) }) : props;
    };
    return function (props) { return (external_React_default.a.createElement(ShellContext.Consumer, null, function (shell) {
        return (external_React_default.a.createElement(errorBoundary_ErrorBoundary, { shell: boundShell, componentName: options.componentName }, external_React_default.a.createElement(ConnectedComponent, connectWithShell_assign({}, wrapChildrenIfNeeded(props, shell), { shell: boundShell }))));
    })); };
}
function connectWithShell(mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var validateLifecycle = function (component) {
        if (boundShell.wasInitializationCompleted() && !options.allowOutOfEntryPoint) {
            var componentText = component.displayName || component.name || component;
            var errorText = "connectWithShell(" + boundShell.name + ")(" + componentText + "): " +
                'attempt to create component type outside of Entry Point lifecycle. ' +
                'To fix this, call connectWithShell() from Entry Point attach() or extend(). ' +
                'If you really have to create this component type dynamically, ' +
                'either pass {allowOutOfEntryPoint:true} in options, or use shell.runLateInitializer().';
            //TODO: replace with throw after a grace period
            boundShell.log.warning(errorText);
        }
    };
    return function (component) {
        validateLifecycle(component);
        return wrapWithShellContext(component, mapStateToProps, mapDispatchToProps, boundShell, options);
    };
}
function mapObservablesToSelectors(map) {
    var result = external_default.a.mapValues(map, function (observable) {
        var selector = observable.current();
        return selector;
    });
    return result;
}
function observeWithShell(observables, boundShell) {
    return function (innerFactory) {
        var observableConnectedComponentFactory = function (pureComponent) {
            var ObservableWrapperComponent = /** @class */ (function (_super) {
                connectWithShell_extends(ObservableWrapperComponent, _super);
                function ObservableWrapperComponent(props) {
                    var _this = _super.call(this, props) || this;
                    _this.connectedComponent = innerFactory(pureComponent);
                    _this.unsubscribes = [];
                    _this.state = mapObservablesToSelectors(observables);
                    return _this;
                }
                ObservableWrapperComponent.prototype.componentDidMount = function () {
                    var _this = this;
                    for (var key in observables) {
                        var unsubscribe = observables[key].subscribe(boundShell, function () {
                            var newState = mapObservablesToSelectors(observables);
                            _this.setState(newState);
                        });
                        this.unsubscribes.push(unsubscribe);
                    }
                };
                ObservableWrapperComponent.prototype.componentWillUnmount = function () {
                    this.unsubscribes.forEach(function (unsubscribe) { return unsubscribe(); });
                    this.unsubscribes = [];
                };
                ObservableWrapperComponent.prototype.render = function () {
                    var ConnectedComponent = this.connectedComponent;
                    var connectedComponentProps = connectWithShell_assign(connectWithShell_assign({}, this.props), this.state // observed selectors
                    ); // TypeScript doesn't get it
                    return external_React_default.a.createElement(ConnectedComponent, connectWithShell_assign({}, connectedComponentProps));
                };
                return ObservableWrapperComponent;
            }(external_React_default.a.Component));
            var hoc = function (props) {
                return external_React_default.a.createElement(ObservableWrapperComponent, connectWithShell_assign({}, props, mapObservablesToSelectors(observables)));
            };
            return hoc;
        };
        return observableConnectedComponentFactory;
    };
}
function connectWithShellAndObserve(observables, mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var innerFactory = connectWithShell(mapStateToProps, mapDispatchToProps, boundShell, options);
    var wrapperFactory = observeWithShell(observables, boundShell)(innerFactory);
    return wrapperFactory;
}

// CONCATENATED MODULE: ./interceptEntryPoints.ts

function interceptEntryPoints(entryPoints, interceptor) {
    return external_default.a.flatten([entryPoints]).map(function (ep) { return applyInterceptor(ep, interceptor); });
}
function interceptEntryPointsMap(entryPointsMap, interceptor) {
    return external_default.a.mapValues(entryPointsMap, function (ep) { return interceptEntryPoints(ep, interceptor); });
}
function applyInterceptor(inner, interceptor) {
    return {
        name: interceptor.interceptName ? interceptor.interceptName(inner.name) : inner.name,
        layer: inner.layer,
        tags: interceptor.interceptTags ? interceptor.interceptTags(inner.tags) : inner.tags,
        getDependencyAPIs: interceptor.interceptGetDependencyAPIs
            ? interceptor.interceptGetDependencyAPIs(inner.getDependencyAPIs)
            : inner.getDependencyAPIs,
        declareAPIs: interceptor.interceptDeclareAPIs ? interceptor.interceptDeclareAPIs(inner.declareAPIs) : inner.declareAPIs,
        attach: interceptor.interceptAttach ? interceptor.interceptAttach(inner.attach) : inner.attach,
        detach: interceptor.interceptDetach ? interceptor.interceptDetach(inner.detach) : inner.detach,
        extend: interceptor.interceptExtend ? interceptor.interceptExtend(inner.extend) : inner.extend
    };
}

// CONCATENATED MODULE: ./index.ts













/***/ })
/******/ ]);
});