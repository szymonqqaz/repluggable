"use strict";
var __read = (this && this.__read) || function (o, n) {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomExtensionSlot = exports.createExtensionSlot = void 0;
var lodash_1 = __importDefault(require("lodash"));
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
            uniqueId: lodash_1.default.uniqueId(fromShell.name + "_extItem_")
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
exports.createExtensionSlot = createExtensionSlot;
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
exports.createCustomExtensionSlot = createCustomExtensionSlot;
//# sourceMappingURL=extensionSlot.js.map