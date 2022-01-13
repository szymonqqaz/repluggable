"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDebugInfo = void 0;
var performanceDebugInfo_1 = require("./performanceDebugInfo");
var lodash_1 = __importDefault(require("lodash"));
var hot_1 = require("../hot");
function setupDebugInfo(_a) {
    var host = _a.host, uniqueShellNames = _a.uniqueShellNames, readyAPIs = _a.readyAPIs, getAPI = _a.getAPI, getOwnSlotKey = _a.getOwnSlotKey, getUnreadyEntryPoints = _a.getUnreadyEntryPoints, extensionSlots = _a.extensionSlots, addedShells = _a.addedShells, lazyShells = _a.lazyShells, shellInstallers = _a.shellInstallers, _b = _a.performance, options = _b.options, trace = _b.trace, memoizedArr = _b.memoizedArr;
    var utils = {
        apis: function () {
            return Array.from(readyAPIs).map(function (apiKey) {
                return {
                    key: apiKey,
                    impl: function () { return getAPI(apiKey); }
                };
            });
        },
        unReadyEntryPoints: function () { return getUnreadyEntryPoints(); },
        whyEntryPointUnready: function (name) {
            var unreadyEntryPoint = lodash_1.default.find(utils.unReadyEntryPoints(), function (entryPoint) { return entryPoint.name.toLowerCase() === name.toLowerCase(); });
            var dependencies = lodash_1.default.invoke(unreadyEntryPoint, 'getDependencyAPIs');
            var unreadyDependencies = lodash_1.default.filter(dependencies, function (key) { return !readyAPIs.has(getOwnSlotKey(key)); });
            if (!lodash_1.default.isEmpty(unreadyDependencies)) {
                var unreadyDependenciesNames = lodash_1.default(unreadyDependencies).map('name').join(',');
                console.log("There are unready dependencies for " + name + ": " + unreadyDependenciesNames);
            }
        },
        findAPI: function (name) {
            return lodash_1.default.filter(utils.apis(), function (api) { return api.key.name.toLowerCase().indexOf(name.toLowerCase()) !== -1; });
        },
        performance: performanceDebugInfo_1.getPerformanceDebug(options, trace, memoizedArr)
    };
    window.repluggableAppDebug = {
        host: host,
        uniqueShellNames: uniqueShellNames,
        extensionSlots: extensionSlots,
        addedShells: addedShells,
        lazyShells: lazyShells,
        readyAPIs: readyAPIs,
        shellInstallers: shellInstallers,
        utils: utils,
        hmr: {
            hot: hot_1.hot
        }
    };
}
exports.setupDebugInfo = setupDebugInfo;
//# sourceMappingURL=repluggableAppDebug.js.map