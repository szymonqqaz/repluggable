import { AppHost, ExtensionSlot, Shell, SlotKey, CustomExtensionSlot, CustomExtensionSlotHandler } from './API';
export interface AnyExtensionSlot {
    readonly name: string;
    readonly declaringShell?: Shell;
}
export declare function createExtensionSlot<T>(key: SlotKey<T>, host: AppHost, declaringShell?: Shell): ExtensionSlot<T> & AnyExtensionSlot;
export declare function createCustomExtensionSlot<T>(key: SlotKey<T>, handler: CustomExtensionSlotHandler<T>, host: AppHost, declaringShell?: Shell): CustomExtensionSlot<T> & AnyExtensionSlot;
//# sourceMappingURL=extensionSlot.d.ts.map