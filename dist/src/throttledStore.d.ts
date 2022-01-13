import { Store, AnyAction } from "redux";
import { AppHostServicesProvider } from "./appHostServices";
import { AppHost, ExtensionSlot, ReducersMapObjectContributor, ObservableState, Shell } from "./API";
declare type ReducerNotificationScope = "broadcasting" | "observable";
export interface StateContribution<TState = {}, TAction extends AnyAction = AnyAction> {
    reducerFactory: ReducersMapObjectContributor<TState, TAction>;
    notificationScope: ReducerNotificationScope;
    observable?: AnyPrivateObservableState;
}
export interface ThrottledStore<T = any> extends Store<T> {
    flush(): void;
}
export interface PrivateThrottledStore<T = any> extends ThrottledStore<T> {
    broadcastNotify(): void;
    observableNotify(observer: AnyPrivateObservableState): void;
    resetPendingNotifications(): void;
}
export interface PrivateObservableState<TState, TSelector> extends ObservableState<TSelector> {
    notify(): void;
}
export declare type AnyPrivateObservableState = PrivateObservableState<any, any>;
export declare const updateThrottledStore: (store: PrivateThrottledStore, contributedState: ExtensionSlot<StateContribution>) => void;
export declare const createThrottledStore: (host: AppHost & AppHostServicesProvider, contributedState: ExtensionSlot<StateContribution>, requestAnimationFrame: Window["requestAnimationFrame"], cancelAnimationFrame: Window["cancelAnimationFrame"]) => PrivateThrottledStore;
export declare const createObservable: <TState, TSelector>(shell: Shell, uniqueName: string, selectorFactory: (state: TState) => TSelector) => PrivateObservableState<TState, TSelector>;
export {};
//# sourceMappingURL=throttledStore.d.ts.map