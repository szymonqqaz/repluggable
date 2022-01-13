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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockObservable = exports.addMockShell = exports.renderInHost = exports.renderHost = exports.createAppHostWithPacts = exports.getPackagesDependencies = exports.createAppHost = exports.withThrowOnError = exports.withConsoleErrors = exports.SlotRenderer = exports.connectWithShellAndObserve = exports.connectWithShell = void 0;
var enzyme_1 = require("enzyme");
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var index_1 = require("../src/index");
var renderSlotComponents_1 = require("../src/renderSlotComponents");
var loggers_1 = require("../src/loggers");
var emptyLoggerOptions_1 = require("./emptyLoggerOptions");
var connectWithShell_1 = require("../src/connectWithShell");
Object.defineProperty(exports, "connectWithShell", { enumerable: true, get: function () { return connectWithShell_1.connectWithShell; } });
Object.defineProperty(exports, "connectWithShellAndObserve", { enumerable: true, get: function () { return connectWithShell_1.connectWithShellAndObserve; } });
var renderSlotComponents_2 = require("../src/renderSlotComponents");
Object.defineProperty(exports, "SlotRenderer", { enumerable: true, get: function () { return renderSlotComponents_2.SlotRenderer; } });
var withConsoleErrors_1 = require("./withConsoleErrors");
Object.defineProperty(exports, "withConsoleErrors", { enumerable: true, get: function () { return withConsoleErrors_1.withConsoleErrors; } });
var withThrowOnError_1 = require("./withThrowOnError");
Object.defineProperty(exports, "withThrowOnError", { enumerable: true, get: function () { return withThrowOnError_1.withThrowOnError; } });
__exportStar(require("./mockPackage"), exports);
var createAppHost = function (packages, options) {
    if (options === void 0) { options = emptyLoggerOptions_1.emptyLoggerOptions; }
    return index_1.createAppHost(packages, options);
};
exports.createAppHost = createAppHost;
function forEachDeclaredAPI(allPackages, iteration) {
    lodash_1.default.forEach(lodash_1.default.flatten(allPackages), function (entryPoint) {
        lodash_1.default.forEach(entryPoint.declareAPIs ? entryPoint.declareAPIs() : [], function (dependency) {
            iteration(dependency, entryPoint);
        });
    });
}
var getPackagesDependencies = function (allPackages, requiredPackages) {
    var apiToEntryPoint = new Map();
    var loadedEntryPoints = new Set();
    forEachDeclaredAPI(allPackages, function (dependency, entryPoint) {
        apiToEntryPoint.set(dependency.name, entryPoint);
    });
    var packagesList = [];
    var entryPointsQueue = lodash_1.default.flatten(requiredPackages);
    while (entryPointsQueue.length) {
        var currEntryPoint = entryPointsQueue.shift();
        if (!currEntryPoint || loadedEntryPoints.has(currEntryPoint.name)) {
            continue;
        }
        loadedEntryPoints.add(currEntryPoint.name);
        packagesList.push(currEntryPoint);
        var dependencies = currEntryPoint.getDependencyAPIs ? currEntryPoint.getDependencyAPIs() : [];
        var dependencyEntryPoints = dependencies.map(function (API) { return apiToEntryPoint.get(API.name); });
        entryPointsQueue.push.apply(entryPointsQueue, __spreadArray([], __read(lodash_1.default.compact(dependencyEntryPoints))));
    }
    return lodash_1.default.uniq(packagesList);
};
exports.getPackagesDependencies = getPackagesDependencies;
function createAppHostWithPacts(packages, pacts) {
    var pactsEntryPoint = {
        name: 'PACTS_ENTRY_POINT',
        declareAPIs: function () {
            return pacts.map(function (pact) { return pact.getAPIKey(); });
        },
        attach: function (shell) {
            lodash_1.default.each(pacts, function (pact) {
                shell.contributeAPI(pact.getAPIKey(), function () { return pact; });
            });
        }
    };
    return exports.createAppHost(__spreadArray(__spreadArray([], __read(packages)), [pactsEntryPoint]), __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { disableLayersValidation: true }));
}
exports.createAppHostWithPacts = createAppHostWithPacts;
var renderHost = function (host) {
    var root = enzyme_1.mount(react_1.default.createElement(index_1.AppMainView, { host: host }));
    return { root: root, DOMNode: root && root.getDOMNode() };
};
exports.renderHost = renderHost;
var renderInHost = function (reactElement, host, customShell) {
    if (host === void 0) { host = exports.createAppHost([]); }
    var shell = customShell || createShell(host);
    var root = enzyme_1.mount(react_1.default.createElement(renderSlotComponents_1.ShellRenderer, { host: host, shell: shell, component: react_1.default.createElement("div", { "data-shell-in-host": "true" }, reactElement), key: "" }));
    var parentWrapper = root.find('[data-shell-in-host="true"]');
    return {
        root: root,
        DOMNode: parentWrapper.children().first().getDOMNode(),
        parentWrapper: parentWrapper,
        host: host
    };
};
exports.renderInHost = renderInHost;
// this function assumes that addShells completes synchronously
var addMockShell = function (host, entryPointOverrides) {
    if (entryPointOverrides === void 0) { entryPointOverrides = {}; }
    var shell = null;
    host.addShells([
        __assign(__assign({ name: lodash_1.default.uniqueId('__MOCK_SHELL_') }, entryPointOverrides), { attach: function (_shell) {
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
exports.addMockShell = addMockShell;
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
        }, setLifecycleState: lodash_1.default.noop, setDependencyAPIs: lodash_1.default.noop, canUseAPIs: function () {
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
        }, contributeState: lodash_1.default.noop, contributeObservableState: function () { return mockObservable(undefined); }, contributeMainView: lodash_1.default.noop, flushMemoizedForState: lodash_1.default.noop, memoizeForState: lodash_1.default.identity, memoize: lodash_1.default.identity, clearCache: lodash_1.default.noop, getHostOptions: function () { return host.options; }, log: loggers_1.createShellLogger(host, entryPoint) });
}
function mockObservable(value) {
    return {
        subscribe: function () {
            return function () { };
        },
        current: function () {
            return value;
        }
    };
}
exports.mockObservable = mockObservable;
//# sourceMappingURL=index.js.map