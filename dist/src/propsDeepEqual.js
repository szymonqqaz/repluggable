"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propsDeepEqual = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = require("react");
var propsDeepEqual = function (propsA, propsB) {
    var customizer = function (a, b, key, objectA) {
        if (react_1.isValidElement(a)) {
            if (!react_1.isValidElement(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
            return a.key === b.key && a.type === b.type && exports.propsDeepEqual(a.props, b.props);
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
    return lodash_1.default.isEqualWith(propsA, propsB, customizer);
};
exports.propsDeepEqual = propsDeepEqual;
//# sourceMappingURL=propsDeepEqual.js.map