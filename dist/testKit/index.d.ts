import { ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';
import { EntryPoint, ObservableState } from '../src/API';
import { AnySlotKey, AppHost, createAppHost as _createAppHost, EntryPointOrPackage, Shell, SlotKey } from '../src/index';
export { AppHost } from '../src/index';
export { connectWithShell, connectWithShellAndObserve } from '../src/connectWithShell';
export { SlotRenderer } from '../src/renderSlotComponents';
export { withConsoleErrors } from './withConsoleErrors';
export { withThrowOnError } from './withThrowOnError';
export * from './mockPackage';
export declare const createAppHost: typeof _createAppHost;
interface PactAPIBase {
    getAPIKey(): AnySlotKey;
}
export interface PactAPI<T> extends PactAPIBase {
    getAPIKey(): SlotKey<T>;
}
export declare const getPackagesDependencies: (allPackages: EntryPointOrPackage[], requiredPackages: EntryPointOrPackage[]) => EntryPointOrPackage[];
export declare function createAppHostWithPacts(packages: EntryPointOrPackage[], pacts: PactAPIBase[]): AppHost;
export declare type RenderHostType = (host: AppHost) => {
    root: ReactWrapper | null;
    DOMNode: HTMLElement | null;
};
export declare const renderHost: RenderHostType;
export interface WrappedComponent {
    root: ReactWrapper | null;
    parentWrapper: ReactWrapper | null;
    DOMNode: HTMLElement | null;
    host: AppHost;
}
export declare const renderInHost: (reactElement: ReactElement<any>, host?: AppHost, customShell?: Shell | undefined) => WrappedComponent;
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface EntryPointOverrides extends Omit<EntryPoint, 'name'> {
    name?: EntryPoint['name'];
}
export declare const addMockShell: (host: AppHost, entryPointOverrides?: EntryPointOverrides) => Shell;
export declare function mockObservable<T>(value: T): ObservableState<T>;
//# sourceMappingURL=index.d.ts.map