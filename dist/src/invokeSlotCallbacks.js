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
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSlotCallbacks = void 0;
function invokeSlotCallbacks(slot) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var slotItems = slot.getItems();
    if (slot.host.options.monitoring.disableMonitoring) {
        slotItems.forEach(function (slotItem) {
            try {
                slotItem.contribution.apply(slotItem, __spreadArray([], __read(args)));
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    else {
        slotItems.forEach(function (slotItem) {
            var messageId = slot.host + "-" + slot.name + ":" + slotItem.shell.name + (slotItem.name && '-' + slotItem.name);
            slotItem.shell.log.monitor(messageId, {}, function () { return slotItem.contribution.apply(slotItem, __spreadArray([], __read(args))); });
        });
    }
}
exports.invokeSlotCallbacks = invokeSlotCallbacks;
//# sourceMappingURL=invokeSlotCallbacks.js.map