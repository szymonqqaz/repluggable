import { getPerformanceDebug } from './performanceDebugInfo';
import _ from 'lodash';
import { hot } from '../hot';
export function setupDebugInfo(_a) {
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
            var unreadyEntryPoint = _.find(utils.unReadyEntryPoints(), function (entryPoint) { return entryPoint.name.toLowerCase() === name.toLowerCase(); });
            var dependencies = _.invoke(unreadyEntryPoint, 'getDependencyAPIs');
            var unreadyDependencies = _.filter(dependencies, function (key) { return !readyAPIs.has(getOwnSlotKey(key)); });
            if (!_.isEmpty(unreadyDependencies)) {
                var unreadyDependenciesNames = _(unreadyDependencies).map('name').join(',');
                console.log("There are unready dependencies for " + name + ": " + unreadyDependenciesNames);
            }
        },
        findAPI: function (name) {
            return _.filter(utils.apis(), function (api) { return api.key.name.toLowerCase().indexOf(name.toLowerCase()) !== -1; });
        },
        performance: getPerformanceDebug(options, trace, memoizedArr)
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
            hot: hot
        }
    };
}
//# sourceMappingURL=repluggableAppDebug.js.map