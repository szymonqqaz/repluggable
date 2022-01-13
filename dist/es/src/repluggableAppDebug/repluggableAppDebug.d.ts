import { AnySlotKey, AppHost, EntryPoint, LazyEntryPointFactory, PrivateShell, SlotKey, StatisticsMemoization, Trace } from '../API';
import { AppHostServicesProvider } from '../appHostServices';
import { AnyExtensionSlot } from '../extensionSlot';
interface PerformanceDebugParams {
    options: AppHost['options'];
    trace: Trace[];
    memoizedArr: StatisticsMemoization[];
}
interface SetupDebugInfoParams {
    readyAPIs: Set<AnySlotKey>;
    host: AppHost & AppHostServicesProvider;
    uniqueShellNames: Set<string>;
    extensionSlots: Map<AnySlotKey, AnyExtensionSlot>;
    addedShells: Map<string, PrivateShell>;
    shellInstallers: WeakMap<PrivateShell, string[]>;
    lazyShells: Map<string, LazyEntryPointFactory>;
    performance: PerformanceDebugParams;
    getUnreadyEntryPoints(): EntryPoint[];
    getOwnSlotKey(key: SlotKey<any>): SlotKey<any>;
    getAPI: AppHost['getAPI'];
}
export declare function setupDebugInfo({ host, uniqueShellNames, readyAPIs, getAPI, getOwnSlotKey, getUnreadyEntryPoints, extensionSlots, addedShells, lazyShells, shellInstallers, performance: { options, trace, memoizedArr } }: SetupDebugInfoParams): void;
export {};
//# sourceMappingURL=repluggableAppDebug.d.ts.map