"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var installedShellsState_1 = require("../src/installedShellsState");
var initialState = {
    installedShells: {
        shellA: true,
        shellB: true
    }
};
var shellsToggleSet = {
    shellB: false,
    shellC: true
};
var expectedState = {
    installedShells: {
        shellA: true,
        shellC: true
    }
};
describe('Installed Shells State', function () {
    it('should toggle shells according to shell toggles', function () {
        var actualState = installedShellsState_1.installedShellsReducer(initialState, installedShellsState_1.InstalledShellsActions.updateInstalledShells(shellsToggleSet));
        expect(actualState).toEqual(expectedState);
    });
    it('should select installed shells from state', function () {
        var rootState = { $installedShells: initialState };
        expect(installedShellsState_1.InstalledShellsSelectors.getInstalledShellsSet(rootState)).toEqual(initialState.installedShells);
    });
});
//# sourceMappingURL=installedShellsState.spec.js.map