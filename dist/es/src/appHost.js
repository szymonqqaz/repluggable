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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import _ from 'lodash';
import { createAppHostServicesEntryPoint } from './appHostServices';
import { createExtensionSlot, createCustomExtensionSlot } from './extensionSlot';
import { InstalledShellsActions, InstalledShellsSelectors } from './installedShellsState';
import { dependentAPIs, declaredAPIs } from './appHostUtils';
import { createObservable, createThrottledStore, updateThrottledStore } from './throttledStore';
import { ConsoleHostLogger, createShellLogger } from './loggers';
import { monitorAPI } from './monitorAPI';
import { Graph, Tarjan } from './tarjanGraph';
import { setupDebugInfo } from './repluggableAppDebug';
var isMultiArray = function (v) { return _.every(v, _.isArray); };
var castMultiArray = function (v) {
    return isMultiArray(v) ? v : [v];
};
export var makeLazyEntryPoint = function (name, factory) {
    return {
        name: name,
        factory: factory
    };
};
export var mainViewSlotKey = {
    name: 'mainView'
};
export var stateSlotKey = {
    name: 'state'
};
var toShellToggleSet = function (names, isInstalled) {
    return names.reduce(function (result, name) {
        result[name] = isInstalled;
        return result;
    }, {});
};
var createUnreadyEntryPointsStore = function () {
    var entryPoints = [];
    return {
        get: function () {
            return entryPoints;
        },
        set: function (newEntryPoints) {
            entryPoints = newEntryPoints;
        }
    };
};
var verifyLayersUniqueness = function (layers) {
    if (!layers) {
        return;
    }
    var flatLayers = _.flatten(layers);
    var nonUnique = _(flatLayers)
        .countBy(function (_a) {
        var name = _a.name;
        return name;
    })
        .pickBy(function (v) { return v > 1; })
        .keys()
        .value();
    if (nonUnique.length > 0) {
        throw new Error("Cannot initialize host with non unique layers: " + nonUnique);
    }
};
export function createAppHost(initialEntryPointsOrPackages, options) {
    if (options === void 0) { options = { monitoring: {} }; }
    var store = null;
    var canInstallReadyEntryPoints = true;
    verifyLayersUniqueness(options.layers);
    var unReadyEntryPointsStore = createUnreadyEntryPointsStore();
    var layers = _.map(options.layers ? castMultiArray(options.layers) : [], function (singleDimension, i) {
        return _.map(singleDimension, function (layer) { return (__assign(__assign({}, layer), { dimension: i })); });
    });
    var trace = [];
    var memoizedArr = [];
    var readyAPIs = new Set();
    var uniqueShellNames = new Set();
    var extensionSlots = new Map();
    var slotKeysByName = new Map();
    var addedShells = new Map();
    var shellInstallers = new WeakMap();
    var lazyShells = new Map();
    var shellsChangedCallbacks = new Map();
    var APILayers = new WeakMap();
    var memoizedFunctions = [];
    var hostAPI = {
        getAllEntryPoints: function () { return __spreadArray([], __read(addedShells.entries())).map(function (_a) {
            var _b = __read(_a, 2), entryPoint = _b[1].entryPoint;
            return entryPoint;
        }); },
        getAppHostOptions: function () { return options; }
    };
    var appHostServicesEntryPoint = createAppHostServicesEntryPoint(function () { return hostAPI; });
    var host = {
        getStore: getStore,
        getAPI: getAPI,
        getSlot: getSlot,
        getAllSlotKeys: getAllSlotKeys,
        getAllEntryPoints: getAllEntryPoints,
        hasShell: hasShell,
        isLazyEntryPoint: isLazyEntryPoint,
        addShells: addShells,
        removeShells: removeShells,
        onShellsChanged: onShellsChanged,
        removeShellsChangedCallback: removeShellsChangedCallback,
        getAppHostServicesShell: appHostServicesEntryPoint.getAppHostServicesShell,
        log: options.logger ? options.logger : ConsoleHostLogger,
        options: options
    };
    setupDebugInfo({
        host: host,
        readyAPIs: readyAPIs,
        uniqueShellNames: uniqueShellNames,
        extensionSlots: extensionSlots,
        addedShells: addedShells,
        shellInstallers: shellInstallers,
        lazyShells: lazyShells,
        performance: {
            options: options,
            trace: trace,
            memoizedArr: memoizedArr
        },
        getUnreadyEntryPoints: unReadyEntryPointsStore.get,
        getOwnSlotKey: getOwnSlotKey,
        getAPI: getAPI
    });
    declareSlot(mainViewSlotKey);
    declareSlot(stateSlotKey);
    addShells([appHostServicesEntryPoint]);
    var memoize = function (func, resolver) {
        if (options.monitoring.disableMemoization) {
            return func;
        }
        var memoized = _.memoize(func, resolver);
        if (options.monitoring.disableMonitoring) {
            return memoized;
        }
        var enrichedMemoization = enrichMemoization(memoized);
        if (options.monitoring.debugMemoization) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var memRes = enrichedMemoization.apply(void 0, __spreadArray([], __read(args)));
                var res = func.apply(void 0, __spreadArray([], __read(args)));
                if (!_.isEqual(memRes, res)) {
                    console.log("Memoization Error");
                    console.log("Memoization returns:", memRes);
                    console.log("Original Func returns:", res);
                    console.log("Original Func:", func);
                }
                return memRes;
            };
        }
        return enrichedMemoization;
    };
    // we know that addShells completes synchronously
    addShells(initialEntryPointsOrPackages);
    return host;
    //TODO: get rid of LazyEntryPointDescriptor
    function isLazyEntryPointDescriptor(value) {
        return typeof value.factory === 'function';
    }
    function enrichMemoization(memoized) {
        var memoizedWithMissHit = _.assign(memoized, {
            miss: 0,
            calls: 0,
            hit: 0,
            printHitMiss: function () {
                return console.log("calls: " + memoizedWithMissHit.calls + "\nhit: " + memoizedWithMissHit.hit + "\nmiss: " + memoizedWithMissHit.miss + "\n");
            }
        });
        var getter = memoizedWithMissHit.cache.get.bind(memoized.cache);
        memoizedWithMissHit.cache.get = function (key) {
            memoizedWithMissHit.calls++;
            memoizedWithMissHit.hit++;
            return getter(key);
        };
        var setter = memoizedWithMissHit.cache.set.bind(memoizedWithMissHit.cache);
        memoizedWithMissHit.cache.set = function (key, value) {
            memoizedWithMissHit.calls++;
            memoizedWithMissHit.miss++;
            return setter(key, value);
        };
        return memoizedWithMissHit;
    }
    function getLayerByName(layerName) {
        var layer = _(layers).flatten().find({ name: layerName });
        if (!layer) {
            throw new Error("Cannot find layer " + layerName);
        }
        return layer;
    }
    function validateEntryPointLayer(entryPoint) {
        if (!entryPoint.getDependencyAPIs || !entryPoint.layer || _.isEmpty(layers)) {
            return;
        }
        var highestLevelDependencies = _.chain(entryPoint.getDependencyAPIs())
            .flatMap(function (apiKey) {
            return apiKey.layer
                ? _(apiKey.layer)
                    .castArray()
                    .map(function (l) { return ({
                    layer: getLayerByName(l),
                    apiKey: apiKey
                }); })
                    .value()
                : { apiKey: apiKey };
        })
            .groupBy(function (dependency) { var _a; return (_a = dependency === null || dependency === void 0 ? void 0 : dependency.layer) === null || _a === void 0 ? void 0 : _a.dimension; })
            .map(function (dimension) { return _.maxBy(dimension, function (dependency) { return ((dependency === null || dependency === void 0 ? void 0 : dependency.layer) ? dependency.layer.level : -Infinity); }); })
            .value();
        var currentLayers = _(entryPoint.layer)
            .castArray()
            .map(function (l) { return getLayerByName(l); })
            .value();
        var getCurrentLayerOfSameDimension = function (layer) {
            return currentLayers.find(function (entryPointLayer) { return entryPointLayer.dimension === layer.dimension; });
        };
        highestLevelDependencies.forEach(function (highestLevelDependency) {
            var currentLayer = (highestLevelDependency === null || highestLevelDependency === void 0 ? void 0 : highestLevelDependency.layer) && getCurrentLayerOfSameDimension(highestLevelDependency.layer);
            if ((highestLevelDependency === null || highestLevelDependency === void 0 ? void 0 : highestLevelDependency.layer) && currentLayer && currentLayer.level < highestLevelDependency.layer.level) {
                throw new Error("Entry point " + entryPoint.name + " of layer " + currentLayer.name + " cannot depend on API " + slotKeyToName(highestLevelDependency.apiKey) + " of layer " + highestLevelDependency.layer.name);
            }
        });
    }
    function validateLayers(entryPoints) {
        _.forEach(entryPoints, function (ep) { return validateEntryPointLayer(ep); });
    }
    function addShells(entryPointsOrPackages) {
        host.log.log('debug', "Adding " + entryPointsOrPackages.length + " packages.");
        var entryPoints = _.flatten(entryPointsOrPackages);
        var existingEntryPoints = Object.values(addedShells).map(function (shell) { return shell.entryPoint; });
        var allEntryPoints = existingEntryPoints.concat(unReadyEntryPointsStore.get(), entryPoints);
        if (!options.disableLayersValidation) {
            validateLayers(entryPoints);
        }
        validateUniqueShellNames(entryPoints);
        !options.disableCheckCircularDependencies && !options.experimentalCyclicMode && validateCircularDependency(allEntryPoints);
        var _a = __read(_.partition(entryPoints, isLazyEntryPointDescriptor), 2), lazyEntryPointsList = _a[0], readyEntryPointsList = _a[1];
        executeInstallShell(readyEntryPointsList);
        lazyEntryPointsList.forEach(registerLazyEntryPoint);
        setInstalledShellNames(getInstalledShellNames().concat(_.map(lazyEntryPointsList, 'name')));
        return Promise.resolve();
    }
    function isAllAPIDependenciesAreReadyOrPending(checkedKey, pendingEntryPoints, passed) {
        if (passed === void 0) { passed = []; }
        // TODO: Avoid iterating N (cycle length) times for the same cycle
        var declarers = pendingEntryPoints.flatMap(function (ep) { var _a; return (((_a = ep.declareAPIs) === null || _a === void 0 ? void 0 : _a.call(ep)) || []).map(function (k) { return [k, ep]; }); });
        var _a = __read(declarers.find(function (_a) {
            var _b = __read(_a, 2), k = _b[0], ep = _b[1];
            return _.isEqual(k, checkedKey);
        }) || [], 2), keyDeclarerEntryPoint = _a[1];
        if (!keyDeclarerEntryPoint) {
            return false;
        }
        var dependencies = keyDeclarerEntryPoint.getDependencyAPIs && keyDeclarerEntryPoint.getDependencyAPIs();
        var uncheckDependencies = _.differenceWith(dependencies, passed, _.isEqual);
        var everyDependenciesReadyOrPending = _.every(uncheckDependencies, function (k) { return readyAPIs.has(getOwnSlotKey(k)) || isAllAPIDependenciesAreReadyOrPending(k, pendingEntryPoints, passed.concat(checkedKey)); });
        return everyDependenciesReadyOrPending;
    }
    function executeInstallShell(entryPoints) {
        var _a = __read(_.partition(entryPoints, function (entryPoint) {
            var dependencies = entryPoint.getDependencyAPIs && entryPoint.getDependencyAPIs();
            return _.every(dependencies, function (k) {
                return readyAPIs.has(getOwnSlotKey(k)) ||
                    (options.experimentalCyclicMode && isAllAPIDependenciesAreReadyOrPending(k, entryPoints));
            });
        }), 2), readyEntryPoints = _a[0], currentUnReadyEntryPoints = _a[1];
        unReadyEntryPointsStore.set(_.union(_.difference(unReadyEntryPointsStore.get(), readyEntryPoints), currentUnReadyEntryPoints));
        if (store && _.isEmpty(readyEntryPoints)) {
            return;
        }
        var shells = readyEntryPoints.map(createShell);
        executeReadyEntryPoints(shells);
    }
    function executeReadyEntryPoints(shells) {
        canInstallReadyEntryPoints = false;
        try {
            invokeEntryPointPhase('getDependencyAPIs', shells, function (f) { return f.entryPoint.getDependencyAPIs && f.setDependencyAPIs(f.entryPoint.getDependencyAPIs()); }, function (f) { return !!f.entryPoint.getDependencyAPIs; });
            invokeEntryPointPhase('attach', shells, function (f) { return f.entryPoint.attach && f.entryPoint.attach(f); }, function (f) { return !!f.entryPoint.attach; });
            buildStore();
            shells.forEach(function (f) { return f.setLifecycleState(true, true, false); });
            invokeEntryPointPhase('extend', shells, function (f) { return f.entryPoint.extend && f.entryPoint.extend(f); }, function (f) { return !!f.entryPoint.extend; });
            shells.forEach(function (f) {
                addedShells.set(f.entryPoint.name, f);
                f.setLifecycleState(true, true, true);
            });
        }
        finally {
            canInstallReadyEntryPoints = true;
        }
        executeInstallShell(unReadyEntryPointsStore.get());
    }
    function executeShellsChangedCallbacks() {
        shellsChangedCallbacks.forEach(function (f) { return f(_.keys(InstalledShellsSelectors.getInstalledShellsSet(getStore().getState()))); });
    }
    function setInstalledShellNames(names) {
        var updates = toShellToggleSet(names, true);
        getStore().dispatch(InstalledShellsActions.updateInstalledShells(updates));
        executeShellsChangedCallbacks();
    }
    function setUninstalledShellNames(names) {
        var updates = toShellToggleSet(names, false);
        getStore().dispatch(InstalledShellsActions.updateInstalledShells(updates));
        executeShellsChangedCallbacks();
    }
    function onShellsChanged(callback) {
        var callbackId = _.uniqueId('shells-changed-callback-');
        shellsChangedCallbacks.set(callbackId, callback);
        return callbackId;
    }
    function removeShellsChangedCallback(callbackId) {
        shellsChangedCallbacks.delete(callbackId);
    }
    function declareSlot(key, declaringShell) {
        var newSlot = registerSlotOrThrow(key, function () { return createExtensionSlot(key, host, declaringShell); });
        return newSlot;
    }
    function declareCustomSlot(key, handler, declaringShell) {
        var newSlot = registerSlotOrThrow(key, function () { return createCustomExtensionSlot(key, handler, host, declaringShell); });
        return newSlot;
    }
    function slotKeyToName(key) {
        return key.version === undefined ? key.name : key.name + "(v" + key.version + ")";
    }
    function registerSlotOrThrow(key, factory) {
        var slotName = slotKeyToName(key);
        if (!extensionSlots.has(key) && !slotKeysByName.has(slotName)) {
            var newSlot = factory();
            extensionSlots.set(key, newSlot);
            slotKeysByName.set(slotName, key);
            return newSlot;
        }
        throw new Error("Extension slot with key '" + slotName + "' already exists.");
    }
    function getSlot(key) {
        var ownKey = getOwnSlotKey(key);
        var anySlot = extensionSlots.get(ownKey);
        if (anySlot) {
            return anySlot;
        }
        throw new Error("Extension slot with key '" + slotKeyToName(key) + "' doesn't exist.");
    }
    function getAPI(key) {
        var APISlot = getSlot(key);
        var item = APISlot.getSingleItem();
        if (item) {
            return item.contribution;
        }
        throw new Error("API '" + slotKeyToName(key) + "' doesn't exist.");
    }
    function getStore() {
        if (store) {
            return store;
        }
        throw new Error('Store was not yet created');
    }
    function getAllSlotKeys() {
        return Array.from(extensionSlots.keys());
    }
    function getAllEntryPoints() {
        throw new Error('not implemented');
    }
    function hasShell(name) {
        var installedShellsSet = InstalledShellsSelectors.getInstalledShellsSet(getStore().getState());
        return installedShellsSet[name] === true;
    }
    function isLazyEntryPoint(name) {
        return lazyShells.has(name);
    }
    function registerLazyEntryPoint(descriptor) {
        lazyShells.set(descriptor.name, descriptor.factory);
    }
    function getOwnSlotKey(key) {
        if (key.public === true) {
            var ownKey = slotKeysByName.get(slotKeyToName(key));
            if (ownKey && ownKey.public) {
                return ownKey;
            }
        }
        return key;
    }
    function validateUniqueShellNames(entryPoints) {
        entryPoints.forEach(function (f) { return validateUniqueShellName(f.name); });
    }
    function validateUniqueShellName(name) {
        if (!uniqueShellNames.has(name)) {
            uniqueShellNames.add(name);
        }
        else {
            throw new Error("Shell named '" + name + "' already exists");
        }
    }
    function validateCircularDependency(entryPoints) {
        var e_1, _a;
        var graph = new Graph();
        entryPoints.forEach(function (x) {
            var declaredApis = declaredAPIs(x);
            var dependencies = dependentAPIs(x).map(function (child) { return slotKeyToName(child); });
            declaredApis.forEach(function (d) { return dependencies.forEach(function (y) { return graph.addConnection(slotKeyToName(d), y); }); });
        });
        var tarjan = new Tarjan(graph);
        var sccs = tarjan.run();
        try {
            for (var sccs_1 = __values(sccs), sccs_1_1 = sccs_1.next(); !sccs_1_1.done; sccs_1_1 = sccs_1.next()) {
                var scc = sccs_1_1.value;
                if (scc.length > 1) {
                    host.log.log('debug', "Circular API dependency found: " + scc.map(function (x) { return slotKeyToName(x); }).join(' -> '));
                    throw new Error("Circular API dependency found");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sccs_1_1 && !sccs_1_1.done && (_a = sccs_1.return)) _a.call(sccs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    function buildStore() {
        var contributedState = getSlot(stateSlotKey);
        if (store) {
            updateThrottledStore(store, contributedState);
        }
        else {
            store = createThrottledStore(host, contributedState, window.requestAnimationFrame, window.cancelAnimationFrame);
            store.subscribe(function () {
                flushMemoizedForState();
            });
        }
        return store;
    }
    function flushMemoizedForState() {
        memoizedFunctions.forEach(function (_a) {
            var f = _a.f, shouldClear = _a.shouldClear;
            if ((shouldClear || _.stubTrue)()) {
                clearCache(f);
            }
        });
    }
    function clearCache(memoizedFunction) {
        if (memoizedFunction.cache && memoizedFunction.cache.clear) {
            memoizedFunction.cache.clear();
        }
    }
    function invokeEntryPointPhase(phase, // TODO: Exclude 'name'
    shell, action, predicate) {
        host.log.log('debug', "--- " + phase + " phase ---");
        try {
            shell.filter(function (f) { return !predicate || predicate(f); }).forEach(function (f) { return invokeShell(f, action, phase); });
        }
        catch (err) {
            console.error(phase + " phase FAILED", err);
            throw err;
        }
        host.log.log('debug', "--- End of " + phase + " phase ---");
    }
    function invokeShell(shell, action, phase) {
        host.log.log('debug', phase + " : " + shell.entryPoint.name);
        try {
            action(shell);
        }
        catch (err) {
            host.log.log('error', 'AppHost.shellFailed', err, {
                shell: shell.name,
                phase: phase,
                message: "Shell '" + shell.name + "' FAILED " + phase + " phase",
                error: err
            });
            throw err;
        }
    }
    function getAPIContributor(key) {
        var ownKey = getOwnSlotKey(key);
        return extensionSlots.has(ownKey) ? _.get(getSlot(ownKey).getSingleItem(), 'shell') : undefined;
    }
    function doesExtensionItemBelongToShells(extensionItem, shellNames) {
        return (_.includes(shellNames, extensionItem.shell.name) ||
            _.some(_.invoke(extensionItem.shell.entryPoint, 'getDependencyAPIs'), function (APIKey) {
                return _.includes(shellNames, _.get(getAPIContributor(APIKey), 'name'));
            }));
    }
    function discardSlotKey(key) {
        var ownKey = getOwnSlotKey(key);
        readyAPIs.delete(ownKey);
        extensionSlots.delete(ownKey);
        slotKeysByName.delete(slotKeyToName(ownKey));
        host.log.log('debug', "-- Removed slot keys: " + slotKeyToName(ownKey) + " --");
    }
    function findDependantShells(entryShell) {
        var cache = new Map();
        var _findDependantShells = function (declaringShell) {
            return _(__spreadArray([], __read(addedShells.entries())))
                .flatMap(function (_a) {
                var _b, _c;
                var _d = __read(_a, 2), name = _d[0], shell = _d[1];
                var cachedValue = cache.get(name);
                if (cachedValue) {
                    return cachedValue;
                }
                var dependencyAPIs = ((_c = (_b = shell.entryPoint) === null || _b === void 0 ? void 0 : _b.getDependencyAPIs) === null || _c === void 0 ? void 0 : _c.call(_b)) || [];
                var isDependant = dependencyAPIs.some(function (key) { var _a; return ((_a = getAPIContributor(key)) === null || _a === void 0 ? void 0 : _a.name) === declaringShell.name; });
                if (!isDependant) {
                    return [];
                }
                var dependencies = __spreadArray([shell], __read(_findDependantShells(shell)));
                cache.set(name, dependencies);
                return dependencies;
            })
                .uniqBy('name')
                .value();
        };
        return _findDependantShells(entryShell);
    }
    function isShellBeingDependantOnInGroup(declaringShell, shells) {
        return !!shells.find(function (dependantShell) {
            var _a, _b;
            var dependencyAPIs = ((_b = (_a = dependantShell.entryPoint) === null || _a === void 0 ? void 0 : _a.getDependencyAPIs) === null || _b === void 0 ? void 0 : _b.call(_a)) || [];
            return dependencyAPIs.find(function (key) { var _a; return ((_a = getAPIContributor(key)) === null || _a === void 0 ? void 0 : _a.name) === declaringShell.name; });
        });
    }
    function executeDetachOnShellReadyForRemoval(shellsToBeDetached, originalRequestedRemovalNames) {
        invokeEntryPointPhase('detach', shellsToBeDetached, function (f) { return _.invoke(f.entryPoint, 'detach', f); });
        var detachedShellsNames = shellsToBeDetached.map(function (_a) {
            var name = _a.name;
            return name;
        });
        var slotKeysToDiscard = findContributedAPIs(detachedShellsNames).concat(findDeclaredSlotKeys(detachedShellsNames));
        extensionSlots.forEach(function (extensionSlot) {
            return extensionSlot.discardBy(function (extensionItem) {
                return doesExtensionItemBelongToShells(extensionItem, detachedShellsNames);
            });
        });
        detachedShellsNames.forEach(function (name) {
            var _a;
            var isResultOfMissingDependency = !originalRequestedRemovalNames.includes(name);
            if (isResultOfMissingDependency) {
                var entryPoint = (_a = addedShells.get(name)) === null || _a === void 0 ? void 0 : _a.entryPoint;
                entryPoint && unReadyEntryPointsStore.get().push(entryPoint);
            }
            addedShells.delete(name);
            uniqueShellNames.delete(name);
        });
        slotKeysToDiscard.forEach(discardSlotKey);
        host.log.log('debug', "Done uninstalling " + detachedShellsNames);
    }
    function executeUninstallShells(names) {
        host.log.log('debug', "-- Uninstalling " + names + " --");
        var shellsCandidatesToBeDetached = _(names)
            .map(function (name) { return addedShells.get(name); })
            .compact()
            .flatMap(function (shell) { return __spreadArray([shell], __read(findDependantShells(shell))); })
            .uniqBy('name')
            .value();
        var queue = shellsCandidatesToBeDetached;
        while (!_.isEmpty(queue)) {
            var shellsToBeDetached = queue.filter(function (ep) { return !isShellBeingDependantOnInGroup(ep, queue); });
            if (_.isEmpty(shellsToBeDetached)) {
                throw new Error("Some shells could not detach: " + queue.map(function (_a) {
                    var name = _a.name;
                    return name;
                }).join());
            }
            executeDetachOnShellReadyForRemoval(shellsToBeDetached, names);
            queue = _.differenceBy(queue, shellsToBeDetached, 'name');
        }
    }
    function findContributedAPIs(shellNames) {
        return __spreadArray([], __read(readyAPIs)).filter(function (APIKey) { return _.includes(shellNames, _.get(getAPIContributor(APIKey), 'name')); });
    }
    function findDeclaredSlotKeys(shellNames) {
        var e_2, _a;
        var shellNameSet = new Set(shellNames);
        var result = [];
        try {
            for (var _b = __values(extensionSlots.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                var declaringShell = entry[1].declaringShell;
                if (declaringShell && shellNameSet.has(declaringShell.name)) {
                    result.push(entry[0]);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    }
    function getInstalledShellNames() {
        return __spreadArray([], __read(addedShells)).map(function (_a) {
            var _b = __read(_a, 1), v = _b[0];
            return v;
        });
    }
    function removeShells(names) {
        var shellNames = getInstalledShellNames();
        executeUninstallShells(names);
        setUninstalledShellNames(_.difference(shellNames, getInstalledShellNames()));
        return Promise.resolve();
    }
    function createShell(entryPoint) {
        var storeEnabled = false;
        var APIsEnabled = false;
        var wasInitCompleted = false;
        var dependencyAPIs = [];
        var nextObservableId = 1;
        var boundaryAspects = [];
        var isOwnContributedAPI = function (key) { return getAPIContributor(key) === shell; };
        var shell = {
            name: entryPoint.name,
            entryPoint: entryPoint,
            getSlot: function (key) {
                var slot = host.getSlot(key);
                var declaringShell = slot.declaringShell;
                if (!declaringShell || declaringShell !== shell) {
                    throw new Error("Shell '" + shell.name + "' is trying to get slot '" + slotKeyToName(key) + "' that is owned by '" + (declaringShell ? declaringShell.name : 'Host') + "'");
                }
                return slot;
            },
            getAllSlotKeys: host.getAllSlotKeys,
            getAllEntryPoints: host.getAllEntryPoints,
            hasShell: host.hasShell,
            isLazyEntryPoint: host.isLazyEntryPoint,
            onShellsChanged: host.onShellsChanged,
            removeShellsChangedCallback: host.removeShellsChangedCallback,
            declareSlot: function (key) {
                return declareSlot(key, shell);
            },
            declareCustomSlot: function (key, handler) {
                return declareCustomSlot(key, handler, shell);
            },
            setLifecycleState: function (enableStore, enableAPIs, initCompleted) {
                storeEnabled = enableStore;
                APIsEnabled = enableAPIs;
                wasInitCompleted = initCompleted;
            },
            setDependencyAPIs: function (APIs) {
                dependencyAPIs = APIs;
            },
            canUseAPIs: function () {
                return APIsEnabled;
            },
            canUseStore: function () {
                return storeEnabled;
            },
            wasInitializationCompleted: function () {
                return wasInitCompleted;
            },
            runLateInitializer: function (initializer) {
                var saveWasInitCompleted = wasInitCompleted;
                try {
                    wasInitCompleted = false;
                    return initializer();
                }
                finally {
                    wasInitCompleted = saveWasInitCompleted;
                }
            },
            addShells: function (entryPointsOrPackages) {
                var shellNamesToBeinstalled = _.flatten(entryPointsOrPackages).map(function (x) { return x.name; });
                var shellNamesInstalledByCurrentEntryPoint = shellInstallers.get(shell) || [];
                shellInstallers.set(shell, __spreadArray(__spreadArray([], __read(shellNamesInstalledByCurrentEntryPoint)), __read(shellNamesToBeinstalled)));
                return host.addShells(entryPointsOrPackages);
            },
            removeShells: function (names) {
                var namesInstalledByCurrentEntryPoint = shellInstallers.get(shell) || [];
                var namesNotInstalledByCurrentEntryPoint = _.difference(names, namesInstalledByCurrentEntryPoint);
                // TODO: Allow entry point to uninstall its own shell ?
                if (!_.isEmpty(namesNotInstalledByCurrentEntryPoint)) {
                    throw new Error("Shell " + entryPoint.name + " is trying to uninstall shells: " + names + " which is are not installed by entry point " + entryPoint.name + " - This is not allowed");
                }
                shellInstallers.set(shell, _.without.apply(_, __spreadArray([namesInstalledByCurrentEntryPoint], __read(names))));
                return host.removeShells(names);
            },
            getAPI: function (key) {
                if (dependencyAPIs.indexOf(key) >= 0 || isOwnContributedAPI(key)) {
                    return host.getAPI(key);
                }
                throw new Error("API '" + slotKeyToName(key) + "' is not declared as dependency by entry point '" + entryPoint.name + "' (forgot to return it from getDependencyAPIs?)");
            },
            contributeAPI: function (key, factory, apiOptions) {
                host.log.log('debug', "Contributing API " + slotKeyToName(key) + ".");
                if (!_.includes(_.invoke(entryPoint, 'declareAPIs') || [], key)) {
                    throw new Error("Entry point '" + entryPoint.name + "' is trying to contribute API '" + slotKeyToName(key) + "' which it didn't declare");
                }
                var areSameLayers = function (l1, l2) {
                    return _.isEqual(_(l1).castArray().sort().value(), _(l2).castArray().sort().value());
                };
                if (!options.disableLayersValidation && (entryPoint.layer || key.layer) && !areSameLayers(entryPoint.layer, key.layer)) {
                    throw new Error("Cannot contribute API " + slotKeyToName(key) + " of layer " + (key.layer || '<BLANK>') + " from entry point " + entryPoint.name + " of layer " + (entryPoint.layer || '<BLANK>'));
                }
                var api = factory();
                var monitoredAPI = monitorAPI(shell, options, normalizeApiName(slotKeyToName(key)), api /*, trace, memoizedArr*/, apiOptions);
                var apiSlot = declareSlot(key);
                APILayers.set(key, !options.disableLayersValidation && entryPoint.layer
                    ? _(entryPoint.layer)
                        .castArray()
                        .map(function (l) { return getLayerByName(l); })
                        .value()
                    : undefined);
                apiSlot.contribute(shell, monitoredAPI);
                readyAPIs.add(key);
                if (canInstallReadyEntryPoints) {
                    var shellNames = _.map(unReadyEntryPointsStore.get(), 'name');
                    executeInstallShell(unReadyEntryPointsStore.get());
                    setInstalledShellNames(_.difference(shellNames, _.map(unReadyEntryPointsStore.get(), 'name')));
                }
                return monitoredAPI;
            },
            contributeState: function (contributor) {
                var contribution = {
                    notificationScope: 'broadcasting',
                    reducerFactory: contributor
                };
                getSlot(stateSlotKey).contribute(shell, contribution);
            },
            contributeObservableState: function (contributor, mapStateToSelectors) {
                var observableUniqueName = entryPoint.name + "/observable_" + nextObservableId++;
                var observable = createObservable(shell, observableUniqueName, mapStateToSelectors);
                var contribution = {
                    notificationScope: 'observable',
                    reducerFactory: contributor,
                    observable: observable
                };
                getSlot(stateSlotKey).contribute(shell, contribution);
                return observable;
            },
            getStore: function () {
                return {
                    dispatch: host.getStore().dispatch,
                    subscribe: host.getStore().subscribe,
                    getState: function () {
                        var entireStoreState = host.getStore().getState();
                        return entireStoreState[shell.name];
                    },
                    flush: host.getStore().flush
                };
            },
            contributeMainView: function (fromShell, contributor) {
                getSlot(mainViewSlotKey).contribute(fromShell, contributor);
            },
            contributeBoundaryAspect: function (component) {
                boundaryAspects.push(component);
            },
            memoizeForState: function (func, resolver, shouldClear) {
                var memoized = memoize(func, resolver);
                memoizedFunctions.push(shouldClear ? { f: memoized, shouldClear: shouldClear } : { f: memoized });
                return memoized;
            },
            flushMemoizedForState: flushMemoizedForState,
            memoize: function (func, resolver) {
                return memoize(func, resolver);
            },
            clearCache: clearCache,
            getBoundaryAspects: function () {
                return boundaryAspects;
            },
            getHostOptions: function () { return host.options; },
            log: createShellLogger(host, entryPoint)
        };
        return shell;
    }
    function normalizeApiName(name) {
        return name.charAt(0).toLowerCase() + name.substring(1).replace(new RegExp(' ', 'g'), '');
    }
}
//# sourceMappingURL=appHost.js.map