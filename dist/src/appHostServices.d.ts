import { AppHostOptions, EntryPoint, Shell, SlotKey } from './API';
export interface AppHostAPI {
    getAllEntryPoints(): EntryPoint[];
    getAppHostOptions(): AppHostOptions;
}
export declare const AppHostServicesEntryPointName = "APP-HOST-SERVICES";
export declare const AppHostAPI: SlotKey<AppHostAPI>;
export interface AppHostServicesProvider {
    getAppHostServicesShell(): Shell;
}
export declare function createAppHostServicesEntryPoint(apiFactory: () => AppHostAPI): EntryPoint & AppHostServicesProvider;
//# sourceMappingURL=appHostServices.d.ts.map