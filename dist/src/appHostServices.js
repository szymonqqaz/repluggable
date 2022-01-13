"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppHostServicesEntryPoint = exports.AppHostAPI = exports.AppHostServicesEntryPointName = void 0;
exports.AppHostServicesEntryPointName = 'APP-HOST-SERVICES';
exports.AppHostAPI = {
    name: 'AppHost API',
    public: true
};
function createAppHostServicesEntryPoint(apiFactory) {
    var cachedShell = null;
    return {
        name: exports.AppHostServicesEntryPointName,
        declareAPIs: function () {
            return [exports.AppHostAPI];
        },
        attach: function (shell) {
            cachedShell = shell;
            shell.contributeAPI(exports.AppHostAPI, apiFactory);
        },
        getAppHostServicesShell: function () {
            if (cachedShell) {
                return cachedShell;
            }
            throw new Error('Shell for AppHostServices entry point was not yet created');
        }
    };
}
exports.createAppHostServicesEntryPoint = createAppHostServicesEntryPoint;
//# sourceMappingURL=appHostServices.js.map