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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { mount } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { AppMainView, createAppHost as _createAppHost } from '../src/index';
import { ShellRenderer } from '../src/renderSlotComponents';
import { createShellLogger } from '../src/loggers';
import { emptyLoggerOptions } from './emptyLoggerOptions';
export { connectWithShell, connectWithShellAndObserve } from '../src/connectWithShell';
export { SlotRenderer } from '../src/renderSlotComponents';
export { withConsoleErrors } from './withConsoleErrors';
export { withThrowOnError } from './withThrowOnError';
export * from './mockPackage';
export var createAppHost = function (packages, options) {
    if (options === void 0) { options = emptyLoggerOptions; }
    return _createAppHost(packages, options);
};
function forEachDeclaredAPI(allPackages, iteration) {
    _.forEach(_.flatten(allPackages), function (entryPoint) {
        _.forEach(entryPoint.declareAPIs ? entryPoint.declareAPIs() : [], function (dependency) {
            iteration(dependency, entryPoint);
        });
    });
}
export var getPackagesDependencies = function (allPackages, requiredPackages) {
    var apiToEntryPoint = new Map();
    var loadedEntryPoints = new Set();
    forEachDeclaredAPI(allPackages, function (dependency, entryPoint) {
        apiToEntryPoint.set(dependency.name, entryPoint);
    });
    var packagesList = [];
    var entryPointsQueue = _.flatten(requiredPackages);
    while (entryPointsQueue.length) {
        var currEntryPoint = entryPointsQueue.shift();
        if (!currEntryPoint || loadedEntryPoints.has(currEntryPoint.name)) {
            continue;
        }
        loadedEntryPoints.add(currEntryPoint.name);
        packagesList.push(currEntryPoint);
        var dependencies = currEntryPoint.getDependencyAPIs ? currEntryPoint.getDependencyAPIs() : [];
        var dependencyEntryPoints = dependencies.map(function (API) { return apiToEntryPoint.get(API.name); });
        entryPointsQueue.push.apply(entryPointsQueue, __spreadArray([], __read(_.compact(dependencyEntryPoints))));
    }
    return _.uniq(packagesList);
};
export function createAppHostWithPacts(packages, pacts) {
    var pactsEntryPoint = {
        name: 'PACTS_ENTRY_POINT',
        declareAPIs: function () {
            return pacts.map(function (pact) { return pact.getAPIKey(); });
        },
        attach: function (shell) {
            _.each(pacts, function (pact) {
                shell.contributeAPI(pact.getAPIKey(), function () { return pact; });
            });
        }
    };
    return createAppHost(__spreadArray(__spreadArray([], __read(packages)), [pactsEntryPoint]), __assign(__assign({}, emptyLoggerOptions), { disableLayersValidation: true }));
}
export var renderHost = function (host) {
    var root = mount(React.createElement(AppMainView, { host: host }));
    return { root: root, DOMNode: root && root.getDOMNode() };
};
export var renderInHost = function (reactElement, host, customShell) {
    if (host === void 0) { host = createAppHost([]); }
    var shell = customShell || createShell(host);
    var root = mount(React.createElement(ShellRenderer, { host: host, shell: shell, component: React.createElement("div", { "data-shell-in-host": "true" }, reactElement), key: "" }));
    var parentWrapper = root.find('[data-shell-in-host="true"]');
    return {
        root: root,
        DOMNode: parentWrapper.children().first().getDOMNode(),
        parentWrapper: parentWrapper,
        host: host
    };
};
// this function assumes that addShells completes synchronously
export var addMockShell = function (host, entryPointOverrides) {
    if (entryPointOverrides === void 0) { entryPointOverrides = {}; }
    var shell = null;
    host.addShells([
        __assign(__assign({ name: _.uniqueId('__MOCK_SHELL_') }, entryPointOverrides), { attach: function (_shell) {
                shell = _shell;
                if (entryPointOverrides.attach) {
                    entryPointOverrides.attach(_shell);
                }
            } })
    ]);
    if (!shell) {
        var dependencies = entryPointOverrides.getDependencyAPIs ? entryPointOverrides.getDependencyAPIs() : [];
        var canGetAPI_1 = function (key) {
            try {
                host.getAPI(key);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        var missing = dependencies.filter(function (key) { return !canGetAPI_1(key); });
        throw new Error("addMockShell: overridden entry point is not ready (missing dependency APIs?) host could not find: " + missing.map(function (v) { return "\"" + v.name + "\""; }));
    }
    return shell;
};
function createShell(host) {
    var entryPoint = {
        name: 'test'
    };
    return __assign(__assign({ name: entryPoint.name, entryPoint: entryPoint }, host), { declareSlot: function () {
            var slot = {};
            return slot;
        },
        declareCustomSlot: function () {
            var slot = {};
            return slot;
        }, setLifecycleState: _.noop, setDependencyAPIs: _.noop, canUseAPIs: function () {
            return true;
        },
        canUseStore: function () {
            return true;
        },
        wasInitializationCompleted: function () {
            return true;
        },
        runLateInitializer: function (initializer) {
            return initializer();
        },
        contributeAPI: function () {
            var API = {};
            return API;
        },
        contributeBoundaryAspect: function (aspect) { },
        getBoundaryAspects: function () {
            return [];
        }, contributeState: _.noop, contributeObservableState: function () { return mockObservable(undefined); }, contributeMainView: _.noop, flushMemoizedForState: _.noop, memoizeForState: _.identity, memoize: _.identity, clearCache: _.noop, getHostOptions: function () { return host.options; }, log: createShellLogger(host, entryPoint) });
}
export function mockObservable(value) {
    return {
        subscribe: function () {
            return function () { };
        },
        current: function () {
            return value;
        }
    };
}
//# sourceMappingURL=index.js.map