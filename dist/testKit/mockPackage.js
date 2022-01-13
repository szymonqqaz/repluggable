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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPackageWithPublicAPI = exports.mockPackage = exports.mockShellStateKey = exports.mockShellInitialState = exports.MockPublicAPI = exports.MockAPI = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports.MockAPI = { name: 'mock API' };
exports.MockPublicAPI = {
    name: 'mock API public',
    public: true
};
var createMockAPI = function (shell) { return ({
    stubTrue: lodash_1.default.stubTrue,
    getNewObject: function () { return ({}); }
}); };
exports.mockShellInitialState = {
    mockValue: true
};
var TOGGLE_MOCK_VALUE = 'mockEntryPoint/mockAction';
var mockReducer = function (state, action) {
    if (state === void 0) { state = exports.mockShellInitialState; }
    switch (action.type) {
        case TOGGLE_MOCK_VALUE:
            return __assign(__assign({}, state), { mockValue: !state.mockValue });
    }
    return state;
};
exports.mockShellStateKey = 'mockEntryPoint';
exports.mockPackage = {
    name: 'MOCK_ENTRY_POINT',
    declareAPIs: function () {
        return [exports.MockAPI];
    },
    attach: function (shell) {
        shell.contributeAPI(exports.MockAPI, function () { return createMockAPI(shell); });
        shell.contributeState(function () {
            var _a;
            return (_a = {},
                _a[exports.mockShellStateKey] = mockReducer,
                _a);
        });
    }
};
exports.mockPackageWithPublicAPI = {
    name: 'MOCK_ENTRY_POINT_PUBLIC',
    declareAPIs: function () {
        return [exports.MockPublicAPI];
    },
    attach: function (shell) {
        shell.contributeAPI(exports.MockPublicAPI, function () { return ({
            stubTrue: function () { return true; }
        }); });
    }
};
//# sourceMappingURL=mockPackage.js.map