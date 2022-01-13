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
import { createStore, combineReducers, applyMiddleware, } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import _ from "lodash";
import { contributeInstalledShellsState } from "./installedShellsState";
import { interceptAnyObject } from "./interceptAnyObject";
import { invokeSlotCallbacks } from "./invokeSlotCallbacks";
import { createEpicMiddleware } from "redux-observable";
var curry = _.curry;
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
        var wrapper = interceptAnyObject(originalReducersMap, function (name, func) {
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
        var combinedReducersMap = _.mapValues(shellsReducerMaps, function (singleMap) {
            return combineReducers(singleMap);
        });
        return combinedReducersMap;
    }
    function buildReducersMapObject() {
        // TODO: get rid of builtInReducersMaps
        var builtInReducersMaps = __assign({}, contributeInstalledShellsState());
        return __assign(__assign({}, builtInReducersMaps), getCombinedShellReducers());
    }
    var reducersMap = buildReducersMapObject();
    var combinedReducer = combineReducers(reducersMap);
    return combinedReducer;
};
export var updateThrottledStore = function (store, contributedState) {
    var newReducer = buildStoreReducer(contributedState, store.broadcastNotify, store.observableNotify);
    store.replaceReducer(newReducer);
    store.resetPendingNotifications();
};
export var createThrottledStore = function (host, contributedState, requestAnimationFrame, cancelAnimationFrame) {
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
    var epicMiddleware = createEpicMiddleware();
    var reducer = buildStoreReducer(contributedState, onBroadcastNotify, onObservableNotify);
    var store = host.options.enableReduxDevtoolsExtension
        ? createStore(reducer, applyMiddleware(epicMiddleware), devToolsEnhancer({ name: "repluggable" }))
        : createStore(reducer, applyMiddleware(epicMiddleware));
    var invoke = function (f) { return f(); };
    var broadcastSubscribers = [];
    var subscribe = function (subscriber) {
        broadcastSubscribers = _.concat(broadcastSubscribers, subscriber);
        return function () {
            broadcastSubscribers = _.without(broadcastSubscribers, subscriber);
        };
    };
    var notifySubscribers = function () {
        if (pendingBroadcastNotification || !pendingObservableNotifications) {
            host
                .getAppHostServicesShell()
                .log.monitor("ThrottledStore.notifySubscribers", {}, function () {
                return _.forEach(broadcastSubscribers, invoke);
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
    var cancelRender = _.noop;
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
export var createObservable = function (shell, uniqueName, selectorFactory) {
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
            invokeSlotCallbacks(observersSlot, newSelector);
        },
        current: getOrCreateCachedSelector,
    };
};
//# sourceMappingURL=throttledStore.js.map