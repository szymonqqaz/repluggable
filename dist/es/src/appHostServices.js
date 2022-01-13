export var AppHostServicesEntryPointName = 'APP-HOST-SERVICES';
export var AppHostAPI = {
    name: 'AppHost API',
    public: true
};
export function createAppHostServicesEntryPoint(apiFactory) {
    var cachedShell = null;
    return {
        name: AppHostServicesEntryPointName,
        declareAPIs: function () {
            return [AppHostAPI];
        },
        attach: function (shell) {
            cachedShell = shell;
            shell.contributeAPI(AppHostAPI, apiFactory);
        },
        getAppHostServicesShell: function () {
            if (cachedShell) {
                return cachedShell;
            }
            throw new Error('Shell for AppHostServices entry point was not yet created');
        }
    };
}
//# sourceMappingURL=appHostServices.js.map