"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptAnyObject = void 0;
var lodash_1 = __importDefault(require("lodash"));
function interceptAnyObject(inner, onFunction, onProperty, includeNestedLevels) {
    var result = lodash_1.default.mapValues(inner, function (original, key) {
        if (typeof original === 'function' && typeof onFunction === 'function') {
            return onFunction(key, original);
        }
        if (includeNestedLevels && lodash_1.default.isObjectLike(original)) {
            return interceptAnyObject(original, onFunction ? function (name, func) { return onFunction(key + "." + name, func); } : undefined, onProperty ? function (name, value) { return onProperty(key + "." + name, value); } : undefined, includeNestedLevels - 1);
        }
        if (typeof onProperty === 'function') {
            return onProperty(key, original);
        }
        return original;
    });
    return result;
}
exports.interceptAnyObject = interceptAnyObject;
//# sourceMappingURL=interceptAnyObject.js.map