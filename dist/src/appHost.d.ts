import { AppHost, EntryPointOrPackage, LazyEntryPointDescriptor, LazyEntryPointFactory, ReactComponentContributor, SlotKey, AppHostOptions } from './API';
import { StateContribution } from './throttledStore';
export declare const makeLazyEntryPoint: (name: string, factory: LazyEntryPointFactory) => LazyEntryPointDescriptor;
export declare const mainViewSlotKey: SlotKey<ReactComponentContributor>;
export declare const stateSlotKey: SlotKey<StateContribution>;
export declare function createAppHost(initialEntryPointsOrPackages: EntryPointOrPackage[], options?: AppHostOptions): AppHost;
//# sourceMappingURL=appHost.d.ts.map