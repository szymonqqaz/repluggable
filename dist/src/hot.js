"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hot = void 0;
var hot = function (sourceModule, entryPoints) {
    if (!sourceModule.hot) {
        return entryPoints;
    }
    sourceModule.hot.accept();
    sourceModule.hot.dispose(function () {
        var shortModuleId = sourceModule.id.split('/').pop();
        var oldShellNames = entryPoints.map(function (x) { return x.name; });
        console.debug("----- HMR[" + shortModuleId + "] > REMOVING SHELLS >", oldShellNames);
        return window.repluggableAppDebug.host.removeShells(oldShellNames);
    });
    if (sourceModule.hot.status() === 'apply') {
        var shortModuleId = sourceModule.id.split('/').pop();
        console.debug("----- HMR[" + shortModuleId + "] > ADDING SHELLS >", entryPoints.map(function (x) { return x.name; }));
        window.repluggableAppDebug.host.addShells(entryPoints);
    }
    return entryPoints;
};
exports.hot = hot;
//# sourceMappingURL=hot.js.map