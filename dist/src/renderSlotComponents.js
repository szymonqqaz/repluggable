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
exports.SlotRenderer = exports.ShellRenderer = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var errorBoundary_1 = require("./errorBoundary");
var shellContext_1 = require("./shellContext");
var propsDeepEqual_1 = require("./propsDeepEqual");
var storeContext_1 = require("./storeContext");
var connectOptions = {
    context: storeContext_1.StoreContext,
    pure: true,
    areStatePropsEqual: propsDeepEqual_1.propsDeepEqual,
    areOwnPropsEqual: propsDeepEqual_1.propsDeepEqual
};
function renderWithAspects(shell, component, aspectIndex) {
    var aspects = shell.getBoundaryAspects();
    if (aspects && aspects.length > aspectIndex) {
        var Aspect = aspects[aspectIndex];
        return react_1.default.createElement(Aspect, null, renderWithAspects(shell, component, aspectIndex + 1));
    }
    return component;
}
var HostProvider = function (props) {
    return props.host ? (react_1.default.createElement(react_redux_1.Provider, { store: props.host.getStore(), context: storeContext_1.StoreContext }, props.children)) : (react_1.default.createElement(react_1.default.Fragment, null, props.children));
};
var ShellRenderer = function (_a) {
    var shell = _a.shell, component = _a.component, name = _a.name, host = _a.host;
    return (react_1.default.createElement(errorBoundary_1.ErrorBoundary, { shell: shell, componentName: name },
        react_1.default.createElement(HostProvider, { host: host },
            react_1.default.createElement(shellContext_1.ShellContext.Provider, { value: shell }, renderWithAspects(shell, component, 0)))));
};
exports.ShellRenderer = ShellRenderer;
function createSlotItemToShellRendererMap(mapFunc) {
    return function (item, index) { return (react_1.default.createElement(exports.ShellRenderer, { shell: item.shell, component: react_1.default.createElement(ConnectedPredicateHoc, { index: index, item: item, mapFunc: mapFunc }), key: item.uniqueId, name: item.name })); };
}
var SlotRendererPure = function (_a) {
    var items = _a.items, mapFunc = _a.mapFunc, filterFunc = _a.filterFunc, sortFunc = _a.sortFunc;
    return (react_1.default.createElement(react_1.default.Fragment, null, lodash_1.default.flow(lodash_1.default.compact([
        filterFunc && (function (slotItems) { return slotItems.filter(function (item, index) { return filterFunc(item.contribution, index); }); }),
        sortFunc && (function (slotItems) { return slotItems.sort(sortFunc); }),
        function (slotItems) { return slotItems.map(createSlotItemToShellRendererMap(mapFunc)); }
    ]))(items)));
};
var ConnectedSlot = react_redux_1.connect(function (state, _a) {
    var slot = _a.slot;
    return ({
        items: slot.getItems()
    });
}, undefined, undefined, { context: storeContext_1.StoreContext })(SlotRendererPure);
function SlotRenderer(props) {
    return react_1.default.createElement(ConnectedSlot, __assign({}, props));
}
exports.SlotRenderer = SlotRenderer;
var PredicateHoc = function (props) { return (react_1.default.createElement(react_1.default.Fragment, null, props.predicateResult ? props.children || props.render() : null)); };
var mapPredicateHocStateToProps = function (state, ownProps) { return ({
    index: ownProps.index,
    render: ownProps.mapFunc ? ownProps.mapFunc(ownProps.item.contribution, ownProps.index) : ownProps.item.contribution,
    children: ownProps.children,
    predicateResult: ownProps.item.condition()
}); };
var ConnectedPredicateHoc = react_redux_1.connect(mapPredicateHocStateToProps, undefined, undefined, connectOptions)(PredicateHoc);
//# sourceMappingURL=renderSlotComponents.js.map