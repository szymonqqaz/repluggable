import React from 'react';
import { Action, Dispatch } from 'redux';
import { Shell, ObservableState } from './API';
declare type Maybe<T> = T | undefined;
declare type MapStateToProps<S, OP, SP> = Maybe<(shell: Shell, state: S, ownProps?: OP) => SP>;
declare type MapDispatchToProps<OP, DP> = Maybe<(shell: Shell, dispatch: Dispatch<Action>, ownProps?: OP) => DP>;
declare type WithChildren<OP> = OP & {
    children?: React.ReactNode;
};
export interface ConnectWithShellOptions {
    readonly componentName?: string;
    readonly allowOutOfEntryPoint?: boolean;
    shouldComponentUpdate?(shell: Shell): boolean;
}
export declare type ConnectedComponentFactory<S = {}, OP = {}, SP = {}, DP = {}, OPPure = OP> = (component: React.ComponentType<OPPure & SP & DP>) => (props: WithChildren<OP>) => JSX.Element;
export declare function connectWithShell<S = {}, OP = {}, SP = {}, DP = {}>(mapStateToProps: MapStateToProps<S, OP, SP>, mapDispatchToProps: MapDispatchToProps<OP, DP>, boundShell: Shell, options?: ConnectWithShellOptions): ConnectedComponentFactory<S, OP, SP, DP>;
export interface ObservablesMap {
    [key: string]: ObservableState<any>;
}
export declare type ObservedSelectorsMap<M> = {
    [K in keyof M]: M[K] extends ObservableState<infer S> ? S : undefined;
};
export declare type OmitObservedSelectors<T, M> = Omit<T, keyof M>;
export declare function mapObservablesToSelectors<M extends ObservablesMap>(map: M): ObservedSelectorsMap<M>;
export declare function observeWithShell<OM extends ObservablesMap, OP extends ObservedSelectorsMap<OM>>(observables: OM, boundShell: Shell): <S, SP, DP>(innerFactory: ConnectedComponentFactory<S, OP, SP, DP>) => ConnectedComponentFactory<S, OmitObservedSelectors<OP, OM>, SP, DP, OP>;
export declare function connectWithShellAndObserve<OM extends ObservablesMap, OP extends ObservedSelectorsMap<OM>, S = {}, SP = {}, DP = {}>(observables: OM, mapStateToProps: MapStateToProps<S, OP, SP>, mapDispatchToProps: MapDispatchToProps<OP, DP>, boundShell: Shell, options?: ConnectWithShellOptions): ConnectedComponentFactory<S, OmitObservedSelectors<OP, OM>, SP, DP, OP>;
export {};
//# sourceMappingURL=connectWithShell.d.ts.map