"use strict";
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withThrowOnError = void 0;
function withThrowOnError(options) {
    if (options === void 0) { options = { monitoring: {} }; }
    var throwError = function (error, keyValuePairs) {
        throw new Error(error + " " + (keyValuePairs ? JSON.stringify(keyValuePairs) : ''));
    };
    var span = {
        end: function (success, error, keyValuePairs) {
            if (error) {
                throwError(error, keyValuePairs);
            }
        }
    };
    var logger = {
        spanRoot: function (messageId, error, keyValuePairs) {
            return span;
        },
        spanChild: function (messageId, error, keyValuePairs) {
            return span;
        },
        log: function (severity, id, error, keyValuePairs) {
            if (severity === 'error' || severity === 'critical') {
                throwError(error || new Error('Unknown error'), keyValuePairs);
            }
        }
    };
    return __assign(__assign({}, options), { logger: logger });
}
exports.withThrowOnError = withThrowOnError;
//# sourceMappingURL=withThrowOnError.js.map