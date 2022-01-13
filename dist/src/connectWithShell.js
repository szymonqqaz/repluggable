"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectWithShellAndObserve = exports.observeWithShell = exports.mapObservablesToSelectors = exports.connectWithShell = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var errorBoundary_1 = require("./errorBoundary");
var shellContext_1 = require("./shellContext");
var storeContext_1 = require("./storeContext");
var propsDeepEqual_1 = require("./propsDeepEqual");
var reduxConnectOptions = {
    context: storeContext_1.StoreContext,
    pure: true,
    areStatePropsEqual: propsDeepEqual_1.propsDeepEqual,
    areOwnPropsEqual: propsDeepEqual_1.propsDeepEqual
};
function wrapWithShouldUpdate(shouldUpdate, func, shell) {
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (shouldUpdate && !shouldUpdate(shell) ? true : func.apply(void 0, __spreadArray([], __read(args))));
    });
}
function wrapWithShellContext(component, mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var ConnectedComponent = /** @class */ (function (_super) {
        __extends(ConnectedComponent, _super);
        function ConnectedComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.mapStateToProps = mapStateToProps
                ? function (__, ownProps) {
                    return _this.props.shell.log.monitor("connectWithShell.mapStateToProps " + _this.props.shell.name, {}, function () {
                        return mapStateToProps(_this.props.shell, _this.props.shell.getStore().getState(), ownProps);
                    });
                }
                : lodash_1.default.stubObject;
            _this.mapDispatchToProps = mapDispatchToProps
                ? function (dispatch, ownProps) {
                    return _this.props.shell.log.monitor("connectWithShell.mapDispatchToProps " + _this.props.shell.name, {}, function () {
                        return mapDispatchToProps(_this.props.shell, dispatch, ownProps);
                    });
                }
                : lodash_1.default.stubObject;
            var shouldComponentUpdate = options.shouldComponentUpdate && _this.props.shell.memoizeForState(options.shouldComponentUpdate, function () { return '*'; });
            var memoWithShouldUpdate = function (f) {
                var last = null;
                return (function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (last && shouldComponentUpdate && !shouldComponentUpdate(_this.props.shell)) {
                        return last;
                    }
                    last = f.apply(void 0, __spreadArray([], __read(args)));
                    return last;
                });
            };
            _this.connectedComponent = react_redux_1.connect(memoWithShouldUpdate(_this.mapStateToProps), _this.mapDispatchToProps, undefined, options.shouldComponentUpdate
                ? __assign(__assign({}, reduxConnectOptions), { areStatePropsEqual: wrapWithShouldUpdate(shouldComponentUpdate, reduxConnectOptions.areStatePropsEqual, boundShell), areOwnPropsEqual: wrapWithShouldUpdate(shouldComponentUpdate, reduxConnectOptions.areOwnPropsEqual, boundShell) }) : reduxConnectOptions)(component); // TODO: Fix 'as any'
            return _this;
        }
        ConnectedComponent.prototype.render = function () {
            var Component = this.connectedComponent;
            var props = lodash_1.default.omit(this.props, 'shell');
            return react_1.default.createElement(Component, __assign({}, props));
        };
        return ConnectedComponent;
    }(react_1.default.Component));
    var wrapChildrenIfNeeded = function (props, originalShell) {
        return props.children
            ? __assign(__assign({}, props), { children: react_1.default.createElement(shellContext_1.ShellContext.Provider, { value: originalShell }, props.children) }) : props;
    };
    return function (props) { return (react_1.default.createElement(shellContext_1.ShellContext.Consumer, null, function (shell) {
        return (react_1.default.createElement(errorBoundary_1.ErrorBoundary, { shell: boundShell, componentName: options.componentName }, react_1.default.createElement(ConnectedComponent, __assign({}, wrapChildrenIfNeeded(props, shell), { shell: boundShell }))));
    })); };
}
function connectWithShell(mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var validateLifecycle = function (component) {
        if (boundShell.wasInitializationCompleted() && !options.allowOutOfEntryPoint) {
            var componentText = component.displayName || component.name || component;
            var errorText = "connectWithShell(" + boundShell.name + ")(" + componentText + "): " +
                'attempt to create component type outside of Entry Point lifecycle. ' +
                'To fix this, call connectWithShell() from Entry Point attach() or extend(). ' +
                'If you really have to create this component type dynamically, ' +
                'either pass {allowOutOfEntryPoint:true} in options, or use shell.runLateInitializer().';
            //TODO: replace with throw after a grace period
            boundShell.log.warning(errorText);
        }
    };
    return function (component) {
        validateLifecycle(component);
        return wrapWithShellContext(component, mapStateToProps, mapDispatchToProps, boundShell, options);
    };
}
exports.connectWithShell = connectWithShell;
function mapObservablesToSelectors(map) {
    var result = lodash_1.default.mapValues(map, function (observable) {
        var selector = observable.current();
        return selector;
    });
    return result;
}
exports.mapObservablesToSelectors = mapObservablesToSelectors;
function observeWithShell(observables, boundShell) {
    return function (innerFactory) {
        var observableConnectedComponentFactory = function (pureComponent) {
            var ObservableWrapperComponent = /** @class */ (function (_super) {
                __extends(ObservableWrapperComponent, _super);
                function ObservableWrapperComponent(props) {
                    var _this = _super.call(this, props) || this;
                    _this.connectedComponent = innerFactory(pureComponent);
                    _this.unsubscribes = [];
                    _this.state = mapObservablesToSelectors(observables);
                    return _this;
                }
                ObservableWrapperComponent.prototype.componentDidMount = function () {
                    var _this = this;
                    for (var key in observables) {
                        var unsubscribe = observables[key].subscribe(boundShell, function () {
                            var newState = mapObservablesToSelectors(observables);
                            _this.setState(newState);
                        });
                        this.unsubscribes.push(unsubscribe);
                    }
                };
                ObservableWrapperComponent.prototype.componentWillUnmount = function () {
                    this.unsubscribes.forEach(function (unsubscribe) { return unsubscribe(); });
                    this.unsubscribes = [];
                };
                ObservableWrapperComponent.prototype.render = function () {
                    var ConnectedComponent = this.connectedComponent;
                    var connectedComponentProps = __assign(__assign({}, this.props), this.state // observed selectors
                    ); // TypeScript doesn't get it
                    return react_1.default.createElement(ConnectedComponent, __assign({}, connectedComponentProps));
                };
                return ObservableWrapperComponent;
            }(react_1.default.Component));
            var hoc = function (props) {
                return react_1.default.createElement(ObservableWrapperComponent, __assign({}, props, mapObservablesToSelectors(observables)));
            };
            return hoc;
        };
        return observableConnectedComponentFactory;
    };
}
exports.observeWithShell = observeWithShell;
function connectWithShellAndObserve(observables, mapStateToProps, mapDispatchToProps, boundShell, options) {
    if (options === void 0) { options = {}; }
    var innerFactory = connectWithShell(mapStateToProps, mapDispatchToProps, boundShell, options);
    var wrapperFactory = observeWithShell(observables, boundShell)(innerFactory);
    return wrapperFactory;
}
exports.connectWithShellAndObserve = connectWithShellAndObserve;
//# sourceMappingURL=connectWithShell.js.map