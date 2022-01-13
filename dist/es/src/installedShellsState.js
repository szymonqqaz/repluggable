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
var UPDATE_INSTALLED_SHELLS_ACTION = '$installedShells/update';
export var contributeInstalledShellsState = function () {
    return {
        $installedShells: installedShellsReducer
    };
};
var selectRootState = function (state) { return state.$installedShells; };
export var InstalledShellsSelectors = {
    getInstalledShellsSet: function (state) {
        return selectRootState(state).installedShells;
    }
};
export var InstalledShellsActions = {
    updateInstalledShells: function (updates) {
        return {
            type: UPDATE_INSTALLED_SHELLS_ACTION,
            updates: updates
        };
    }
};
var toggleInstalledShells = function (currentlyInstalled, updates) {
    return _.pickBy(_.assign({}, currentlyInstalled, updates), _.identity);
};
export var installedShellsReducer = function (state, action) {
    if (state === void 0) { state = { installedShells: {} }; }
    switch (action.type) {
        case UPDATE_INSTALLED_SHELLS_ACTION:
            return __assign(__assign({}, state), { installedShells: toggleInstalledShells(state.installedShells, action.updates) });
    }
    return state;
};
//# sourceMappingURL=installedShellsState.js.map