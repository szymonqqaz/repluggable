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
exports.createObservable = exports.createThrottledStore = exports.updateThrottledStore = void 0;
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var lodash_1 = __importDefault(require("lodash"));
var installedShellsState_1 = require("./installedShellsState");
var interceptAnyObject_1 = require("./interceptAnyObject");
var invokeSlotCallbacks_1 = require("./invokeSlotCallbacks");
var redux_observable_1 = require("redux-observable");
var curry = lodash_1.default.curry;
var animationFrameRenderer = curry(function (requestAnimationFrame, cancelAnimationFrame, render) {
    var requestId = null;
    return function () {
        if (!requestId) {
            requestId = requestAnimationFrame(function () {
                requestId = null;
                render();
            });
        }
        return function () {
            cancelAnimationFrame(requestId || -1);
            requestId = null;
        };
    };
});
var buildStoreReducer = function (contributedState, broadcastNotify, observableNotify) {
    function withNotifyAction(originalReducersMap, notifyAction) {
        var decorateReducer = function (originalReducer) {
            return function (state0, action) {
                var state1 = originalReducer(state0, action);
                if (state1 !== state0) {
                    notifyAction();
                }
                return state1;
            };
        };
        var wrapper = interceptAnyObject_1.interceptAnyObject(originalReducersMap, function (name, func) {
            var originalReducer = func;
            return decorateReducer(originalReducer);
        });
        return wrapper;
    }
    function withBroadcastOrObservableNotify(_a, shellName) {
        var notificationScope = _a.notificationScope, reducerFactory = _a.reducerFactory, observable = _a.observable;
        var originalReducersMap = reducerFactory();
        if (notificationScope === "broadcasting") {
            return withNotifyAction(originalReducersMap, broadcastNotify);
        }
        if (!observable) {
            // should never happen; would be an internal bug
            throw new Error("getPerShellReducersMapObject: notificationScope=observable but 'observable' is falsy, in shell '" + shellName + "'");
        }
        return withNotifyAction(originalReducersMap, function () {
            return observableNotify(observable);
        });
    }
    function getPerShellReducersMapObject() {
        return contributedState
            .getItems()
            .reduce(function (map, item) {
            var shellName = item.shell.name;
            map[shellName] = __assign(__assign({}, map[shellName]), withBroadcastOrObservableNotify(item.contribution, shellName));
            return map;
        }, {});
    }
    function getCombinedShellReducers() {
        var shellsReducerMaps = getPerShellReducersMapObject();
        var combinedReducersMap = lodash_1.default.mapValues(shellsReducerMaps, function (singleMap) {
            return redux_1.combineReducers(singleMap);
        });
        return combinedReducersMap;
    }
    function buildReducersMapObject() {
        // TODO: get rid of builtInReducersMaps
        var builtInReducersMaps = __assign({}, installedShellsState_1.contributeInstalledShellsState());
        return __assign(__assign({}, builtInReducersMaps), getCombinedShellReducers());
    }
    var reducersMap = buildReducersMapObject();
    var combinedReducer = redux_1.combineReducers(reducersMap);
    return combinedReducer;
};
var updateThrottledStore = function (store, contributedState) {
    var newReducer = buildStoreReducer(contributedState, store.broadcastNotify, store.observableNotify);
    store.replaceReducer(newReducer);
    store.resetPendingNotifications();
};
exports.updateThrottledStore = updateThrottledStore;
var createThrottledStore = function (host, contributedState, requestAnimationFrame, cancelAnimationFrame) {
    var pendingBroadcastNotification = false;
    var pendingObservableNotifications;
    var onBroadcastNotify = function () {
        pendingBroadcastNotification = true;
    };
    var onObservableNotify = function (observable) {
        if (!pendingObservableNotifications) {
            pendingObservableNotifications = new Set();
        }
        pendingObservableNotifications.add(observable);
    };
    var resetPendingNotifications = function () {
        pendingBroadcastNotification = false;
        pendingObservableNotifications = undefined;
    };
    console.log("console log from module!");
    var epicMiddleware = redux_observable_1.createEpicMiddleware();
    var reducer = buildStoreReducer(contributedState, onBroadcastNotify, onObservableNotify);
    var store = host.options.enableReduxDevtoolsExtension
        ? redux_1.createStore(reducer, redux_1.applyMiddleware(epicMiddleware), redux_devtools_extension_1.devToolsEnhancer({ name: "repluggable" }))
        : redux_1.createStore(reducer, redux_1.applyMiddleware(epicMiddleware));
    var invoke = function (f) { return f(); };
    var broadcastSubscribers = [];
    var subscribe = function (subscriber) {
        broadcastSubscribers = lodash_1.default.concat(broadcastSubscribers, subscriber);
        return function () {
            broadcastSubscribers = lodash_1.default.without(broadcastSubscribers, subscriber);
        };
    };
    var notifySubscribers = function () {
        if (pendingBroadcastNotification || !pendingObservableNotifications) {
            host
                .getAppHostServicesShell()
                .log.monitor("ThrottledStore.notifySubscribers", {}, function () {
                return lodash_1.default.forEach(broadcastSubscribers, invoke);
            });
        }
    };
    var notifyObservers = function () {
        if (pendingObservableNotifications) {
            pendingObservableNotifications.forEach(function (observable) {
                observable.notify();
            });
        }
    };
    var notifyAll = function () {
        try {
            notifySubscribers();
            notifyObservers();
        }
        finally {
            resetPendingNotifications();
        }
    };
    var notifyAllOnAnimationFrame = animationFrameRenderer(requestAnimationFrame, cancelAnimationFrame, notifyAll);
    var cancelRender = lodash_1.default.noop;
    store.subscribe(function () {
        cancelRender = notifyAllOnAnimationFrame();
    });
    var flush = function () {
        cancelRender();
        notifyAll();
    };
    var dispatch = function (action) {
        resetPendingNotifications();
        var dispatchResult = store.dispatch(action);
        return dispatchResult;
    };
    var result = __assign(__assign({}, store), { subscribe: subscribe,
        dispatch: dispatch,
        flush: flush, broadcastNotify: onBroadcastNotify, observableNotify: onObservableNotify, resetPendingNotifications: resetPendingNotifications });
    resetPendingNotifications();
    return result;
};
exports.createThrottledStore = createThrottledStore;
var createObservable = function (shell, uniqueName, selectorFactory) {
    var subscribersSlotKey = {
        name: uniqueName,
    };
    var observersSlot = shell.declareSlot(subscribersSlotKey);
    var cachedSelector;
    var getOrCreateCachedSelector = function () {
        if (cachedSelector) {
            return cachedSelector;
        }
        var newSelector = selectorFactory(shell.getStore().getState());
        cachedSelector = newSelector;
        return newSelector;
    };
    return {
        subscribe: function (fromShell, callback) {
            observersSlot.contribute(fromShell, callback);
            return function () {
                observersSlot.discardBy(function (item) { return item.contribution === callback; });
            };
        },
        notify: function () {
            cachedSelector = undefined;
            var newSelector = getOrCreateCachedSelector();
            invokeSlotCallbacks_1.invokeSlotCallbacks(observersSlot, newSelector);
        },
        current: getOrCreateCachedSelector,
    };
};
exports.createObservable = createObservable;
//# sourceMappingURL=throttledStore.js.map