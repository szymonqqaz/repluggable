import React from 'react';
import { ExtensionItem, ExtensionSlot, ReactComponentContributor, Shell, AppHost } from './API';
interface ShellRendererProps {
    shell: Shell;
    component: React.ReactNode;
    name?: string;
    host?: AppHost;
}
export declare const ShellRenderer: React.FunctionComponent<ShellRendererProps>;
interface SlotRendererIterators<T> {
    mapFunc?(item: T, index: number): ReactComponentContributor;
    filterFunc?(item: T, index: number): boolean;
    sortFunc?(itemA: ExtensionItem<T>, itemB: ExtensionItem<T>): number;
}
interface SlotRendererConnectedProps<T> extends SlotRendererIterators<T> {
    slot: ExtensionSlot<T>;
}
export declare function SlotRenderer<T>(props: SlotRendererConnectedProps<T>): React.ReactElement<SlotRendererConnectedProps<T>>;
export {};
//# sourceMappingURL=renderSlotComponents.d.ts.map