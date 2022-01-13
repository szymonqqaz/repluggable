import _ from 'lodash';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { mainViewSlotKey } from './appHost';
import { InstalledShellsSelectors } from './installedShellsState';
import { SlotRenderer } from './renderSlotComponents';
import { ShellContext } from './shellContext';
import { StoreContext } from './storeContext';
var sfc = function (props) {
    var appHostServicesShell = props.host.getAppHostServicesShell();
    return (React.createElement(ShellContext.Provider, { value: appHostServicesShell },
        React.createElement(SlotRenderer, { slot: props.host.getSlot(mainViewSlotKey), mapFunc: _.identity })));
};
var mapStateToProps = function (state, ownProps) { return ({
    installedShells: InstalledShellsSelectors.getInstalledShellsSet(state),
    host: ownProps.host
}); };
var ConnectedSfc = connect(mapStateToProps, undefined, undefined, { context: StoreContext })(sfc);
export var AppMainView = function (props) { return (React.createElement(Provider, { store: props.host.getStore(), context: StoreContext },
    React.createElement(ConnectedSfc, { host: props.host }))); };
//# sourceMappingURL=appMainView.js.map