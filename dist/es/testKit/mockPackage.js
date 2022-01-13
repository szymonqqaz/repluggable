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
import _ from 'lodash';
export var MockAPI = { name: 'mock API' };
export var MockPublicAPI = {
    name: 'mock API public',
    public: true
};
var createMockAPI = function (shell) { return ({
    stubTrue: _.stubTrue,
    getNewObject: function () { return ({}); }
}); };
export var mockShellInitialState = {
    mockValue: true
};
var TOGGLE_MOCK_VALUE = 'mockEntryPoint/mockAction';
var mockReducer = function (state, action) {
    if (state === void 0) { state = mockShellInitialState; }
    switch (action.type) {
        case TOGGLE_MOCK_VALUE:
            return __assign(__assign({}, state), { mockValue: !state.mockValue });
    }
    return state;
};
export var mockShellStateKey = 'mockEntryPoint';
export var mockPackage = {
    name: 'MOCK_ENTRY_POINT',
    declareAPIs: function () {
        return [MockAPI];
    },
    attach: function (shell) {
        shell.contributeAPI(MockAPI, function () { return createMockAPI(shell); });
        shell.contributeState(function () {
            var _a;
            return (_a = {},
                _a[mockShellStateKey] = mockReducer,
                _a);
        });
    }
};
export var mockPackageWithPublicAPI = {
    name: 'MOCK_ENTRY_POINT_PUBLIC',
    declareAPIs: function () {
        return [MockPublicAPI];
    },
    attach: function (shell) {
        shell.contributeAPI(MockPublicAPI, function () { return ({
            stubTrue: function () { return true; }
        }); });
    }
};
//# sourceMappingURL=mockPackage.js.map