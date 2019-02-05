import * as React from 'react';
import * as Redux from 'redux';

export type HostConnectorCallback = (host: AppHost) => void;
export type ReactComponentContributor = () => React.ReactNode;
export type SoloReactComponentContributor = () => JsxWithContainerCss;
export type ReduxStateContributor = () => AppStateBlock;
export type FeatureActivationPredicate = (name: string) => boolean;
export type ContributionPredicate = () => boolean;
export type LazyFeatureFactory = () => Promise<FeatureLifecycle>;
export type LazyFeatureDescriptor = {
    readonly name: string;
    readonly factory: LazyFeatureFactory;
}

export interface AnySlotKey {
    readonly name: string;
}

export interface SlotKey<T> extends AnySlotKey {
    readonly empty?: T; // holds no value, only triggers type-checking of T
}

export interface FeatureLifecycle {
    readonly name: string;
    getDependencyApis?(): AnySlotKey[];
    install(host: FeatureHost): void;
    extend?(host: FeatureHost): void;
}

export interface ExtensionSlot<T> {
    readonly name: string;
    readonly host: AppHost;
    contribute(item: T, condition?: ContributionPredicate, feature?: FeatureLifecycle): void;
    getItems(forceAll?: boolean): ExtensionItem<T>[];
    getSingleItem(): ExtensionItem<T>;
    getItemByName(name: string): ExtensionItem<T>;
}

export interface ExtensionItem<T> {
    readonly name?: string;
    readonly feature: FeatureLifecycle;
    readonly contribution: T;
    readonly condition: ContributionPredicate;
}

export type JsxWithContainerCss = {
    jsx: React.ReactNode;
    containerCss: string | Object;
};

export interface AppStateBlock {
    readonly name: string;
    readonly reducer: Redux.Reducer;
}

export interface AppHost {
    getStore(): Redux.Store;
    getApi<TApi>(key: SlotKey<TApi>): TApi;
    getSlot<TItem>(key: SlotKey<TItem>): ExtensionSlot<TItem>;
    getAllSlotKeys(): AnySlotKey[];
    getAllFeatures(): FeatureInfo[];
    isFeatureActive(name: string): boolean;
    isFeatureInstalled(name: string): boolean;
    isLazyFeature(name: string): boolean;
    installFeatures(features: (FeatureLifecycle | LazyFeatureDescriptor)[], activation?: FeatureActivationPredicate): void;
    activateFeatures(names: string[]): Promise<any>;
    deactivateFeatures(names: string[]): void;
    //readonly log: HostLogger; //TODO: define logging abstraction
}

export interface FeatureHost extends AppHost {
    canUseApis(): boolean;
    canUseStore(): boolean;
    declareSlot<TItem>(key: SlotKey<TItem>): ExtensionSlot<TItem>;
    contributeApi<TApi>(key: SlotKey<TApi>, factory: (host: AppHost) => TApi): TApi;
    contributeState(contributor: ReduxStateContributor): void;
    contributeMainView(contributor: ReactComponentContributor): void;
    contributeLazyFeature(name: string, factory: LazyFeatureFactory): void;
    //readonly log: FeatureLogger; //TODO: define logging abstraction
}

export interface FeatureInfo {
    readonly name: string;
    readonly lazy: boolean;
    readonly installed: boolean;
    readonly active: boolean;
}

//TODO: define logging abstraction
/*
export type LogSeverity = 'debug' | 'info' | 'warning' | 'error';
export type LogSpanFlag = 'open' | 'close';

export interface HostLogger {
    event(
        severity: LogSeverity, 
        source: string, 
        id: string, 
        keyValuePairs?: Object, 
        spanFlag?: LogSpanFlag): void;
}

export interface FeatureLogger {
    debug(messageId: string, keyValuePairs?: Object): void;
    info(messageId: string, keyValuePairs?: Object): void;
    warning(messageId: string, keyValuePairs?: Object): void;
    error(messageId: string, keyValuePairs?: Object): void;
    span(messageId: string, keyValuePairs: Object, action: () => void): void;
    asyncSpan(messageId: string, keyValuePairs: Object, action: () => Promise<any>): void;
}
*/
