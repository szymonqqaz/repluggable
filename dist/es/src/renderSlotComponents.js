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
import _ from 'lodash';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { ErrorBoundary } from './errorBoundary';
import { ShellContext } from './shellContext';
import { propsDeepEqual } from './propsDeepEqual';
import { StoreContext } from './storeContext';
var connectOptions = {
    context: StoreContext,
    pure: true,
    areStatePropsEqual: propsDeepEqual,
    areOwnPropsEqual: propsDeepEqual
};
function renderWithAspects(shell, component, aspectIndex) {
    var aspects = shell.getBoundaryAspects();
    if (aspects && aspects.length > aspectIndex) {
        var Aspect = aspects[aspectIndex];
        return React.createElement(Aspect, null, renderWithAspects(shell, component, aspectIndex + 1));
    }
    return component;
}
var HostProvider = function (props) {
    return props.host ? (React.createElement(Provider, { store: props.host.getStore(), context: StoreContext }, props.children)) : (React.createElement(React.Fragment, null, props.children));
};
export var ShellRenderer = function (_a) {
    var shell = _a.shell, component = _a.component, name = _a.name, host = _a.host;
    return (React.createElement(ErrorBoundary, { shell: shell, componentName: name },
        React.createElement(HostProvider, { host: host },
            React.createElement(ShellContext.Provider, { value: shell }, renderWithAspects(shell, component, 0)))));
};
function createSlotItemToShellRendererMap(mapFunc) {
    return function (item, index) { return (React.createElement(ShellRenderer, { shell: item.shell, component: React.createElement(ConnectedPredicateHoc, { index: index, item: item, mapFunc: mapFunc }), key: item.uniqueId, name: item.name })); };
}
var SlotRendererPure = function (_a) {
    var items = _a.items, mapFunc = _a.mapFunc, filterFunc = _a.filterFunc, sortFunc = _a.sortFunc;
    return (React.createElement(React.Fragment, null, _.flow(_.compact([
        filterFunc && (function (slotItems) { return slotItems.filter(function (item, index) { return filterFunc(item.contribution, index); }); }),
        sortFunc && (function (slotItems) { return slotItems.sort(sortFunc); }),
        function (slotItems) { return slotItems.map(createSlotItemToShellRendererMap(mapFunc)); }
    ]))(items)));
};
var ConnectedSlot = connect(function (state, _a) {
    var slot = _a.slot;
    return ({
        items: slot.getItems()
    });
}, undefined, undefined, { context: StoreContext })(SlotRendererPure);
export function SlotRenderer(props) {
    return React.createElement(ConnectedSlot, __assign({}, props));
}
var PredicateHoc = function (props) { return (React.createElement(React.Fragment, null, props.predicateResult ? props.children || props.render() : null)); };
var mapPredicateHocStateToProps = function (state, ownProps) { return ({
    index: ownProps.index,
    render: ownProps.mapFunc ? ownProps.mapFunc(ownProps.item.contribution, ownProps.index) : ownProps.item.contribution,
    children: ownProps.children,
    predicateResult: ownProps.item.condition()
}); };
var ConnectedPredicateHoc = connect(mapPredicateHocStateToProps, undefined, undefined, connectOptions)(PredicateHoc);
//# sourceMappingURL=renderSlotComponents.js.map