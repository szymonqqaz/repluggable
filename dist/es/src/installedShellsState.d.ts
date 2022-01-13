import { Action, AnyAction, ReducersMapObject } from 'redux';
export interface ShellToggleSet {
    [name: string]: boolean;
}
export interface InstalledShellsState {
    readonly installedShells: ShellToggleSet;
}
export interface UpdateInstalledShellsAction extends Action {
    readonly updates: ShellToggleSet;
}
export declare const contributeInstalledShellsState: () => ReducersMapObject;
export declare const InstalledShellsSelectors: {
    getInstalledShellsSet(state: any): ShellToggleSet;
};
export declare const InstalledShellsActions: {
    updateInstalledShells: (updates: ShellToggleSet) => UpdateInstalledShellsAction;
};
export declare const installedShellsReducer: (state: InstalledShellsState | undefined, action: AnyAction) => InstalledShellsState;
//# sourceMappingURL=installedShellsState.d.ts.map