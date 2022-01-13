"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMainView = void 0;
var lodash_1 = __importDefault(require("lodash"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var appHost_1 = require("./appHost");
var installedShellsState_1 = require("./installedShellsState");
var renderSlotComponents_1 = require("./renderSlotComponents");
var shellContext_1 = require("./shellContext");
var storeContext_1 = require("./storeContext");
var sfc = function (props) {
    var appHostServicesShell = props.host.getAppHostServicesShell();
    return (react_1.default.createElement(shellContext_1.ShellContext.Provider, { value: appHostServicesShell },
        react_1.default.createElement(renderSlotComponents_1.SlotRenderer, { slot: props.host.getSlot(appHost_1.mainViewSlotKey), mapFunc: lodash_1.default.identity })));
};
var mapStateToProps = function (state, ownProps) { return ({
    installedShells: installedShellsState_1.InstalledShellsSelectors.getInstalledShellsSet(state),
    host: ownProps.host
}); };
var ConnectedSfc = react_redux_1.connect(mapStateToProps, undefined, undefined, { context: storeContext_1.StoreContext })(sfc);
var AppMainView = function (props) { return (react_1.default.createElement(react_redux_1.Provider, { store: props.host.getStore(), context: storeContext_1.StoreContext },
    react_1.default.createElement(ConnectedSfc, { host: props.host }))); };
exports.AppMainView = AppMainView;
//# sourceMappingURL=appMainView.js.map