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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
function getQualifiedName(shellName, componentName) {
    return componentName ? shellName + " / " + componentName : shellName;
}
function getHostOptions(shell) {
    return shell.getHostOptions();
}
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.throttledResetError = lodash_1.default.throttle(function () {
            _this.resetError();
        }, 500, { leading: true });
        _this.state = {
            hasError: false,
            errorMessage: null
        };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return {
            hasError: true,
            errorMessage: error.message
        };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        var _a = this.props, shell = _a.shell, componentName = _a.componentName;
        var enableStickyErrorBoundaries = getHostOptions(shell).enableStickyErrorBoundaries;
        shell.log.error('ErrorBoundary.componentDidCatch', error, { componentName: componentName });
        if (!enableStickyErrorBoundaries) {
            this.attemptToRecoverOnNextState();
        }
    };
    ErrorBoundary.prototype.render = function () {
        var _this = this;
        if (this.state.hasError) {
            var shell = this.props.shell;
            var enableStickyErrorBoundaries = getHostOptions(shell).enableStickyErrorBoundaries;
            var qualifiedName = getQualifiedName(shell.name, this.props.componentName);
            if (enableStickyErrorBoundaries) {
                return (react_1.default.createElement("div", { className: "component-error " + (this.props.errorClassName || ''), style: { pointerEvents: 'all' }, title: this.state.errorMessage || '(unknown error)' },
                    "error in ",
                    react_1.default.createElement("b", null, qualifiedName),
                    react_1.default.createElement("button", { onClick: function () { return _this.resetError(); } }, "reset")));
            }
            return null;
        }
        return this.props.children || null;
    };
    ErrorBoundary.prototype.componentWillUnmount = function () {
        this.cancelAttemptToRecover();
    };
    ErrorBoundary.prototype.resetError = function () {
        this.cancelAttemptToRecover();
        this.setState({
            hasError: false,
            errorMessage: null,
            unsubscribe: undefined
        });
    };
    ErrorBoundary.prototype.attemptToRecoverOnNextState = function () {
        var _this = this;
        var shell = this.props.shell;
        if (!this.state || !this.state.unsubscribe) {
            var unsubscribe = shell.getStore().subscribe(function () {
                _this.throttledResetError();
            });
            this.setState({ unsubscribe: unsubscribe });
        }
    };
    ErrorBoundary.prototype.cancelAttemptToRecover = function () {
        if (this.state && this.state.unsubscribe) {
            this.state.unsubscribe();
        }
    };
    return ErrorBoundary;
}(react_1.default.Component));
exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=errorBoundary.js.map