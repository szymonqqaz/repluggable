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
exports.installedShellsReducer = exports.InstalledShellsActions = exports.InstalledShellsSelectors = exports.contributeInstalledShellsState = void 0;
var lodash_1 = __importDefault(require("lodash"));
var UPDATE_INSTALLED_SHELLS_ACTION = '$installedShells/update';
var contributeInstalledShellsState = function () {
    return {
        $installedShells: exports.installedShellsReducer
    };
};
exports.contributeInstalledShellsState = contributeInstalledShellsState;
var selectRootState = function (state) { return state.$installedShells; };
exports.InstalledShellsSelectors = {
    getInstalledShellsSet: function (state) {
        return selectRootState(state).installedShells;
    }
};
exports.InstalledShellsActions = {
    updateInstalledShells: function (updates) {
        return {
            type: UPDATE_INSTALLED_SHELLS_ACTION,
            updates: updates
        };
    }
};
var toggleInstalledShells = function (currentlyInstalled, updates) {
    return lodash_1.default.pickBy(lodash_1.default.assign({}, currentlyInstalled, updates), lodash_1.default.identity);
};
var installedShellsReducer = function (state, action) {
    if (state === void 0) { state = { installedShells: {} }; }
    switch (action.type) {
        case UPDATE_INSTALLED_SHELLS_ACTION:
            return __assign(__assign({}, state), { installedShells: toggleInstalledShells(state.installedShells, action.updates) });
    }
    return state;
};
exports.installedShellsReducer = installedShellsReducer;
//# sourceMappingURL=installedShellsState.js.map