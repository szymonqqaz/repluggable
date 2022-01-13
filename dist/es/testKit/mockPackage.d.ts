import { EntryPoint, SlotKey } from '../src/API';
export interface MockAPI {
    stubTrue(): boolean;
    getNewObject(): object;
}
export interface MockPublicAPI {
    stubTrue(): boolean;
}
export declare const MockAPI: SlotKey<MockAPI>;
export declare const MockPublicAPI: SlotKey<MockPublicAPI>;
export interface MockState {
    mockValue: boolean;
}
export declare const mockShellInitialState: MockState;
export declare const mockShellStateKey = "mockEntryPoint";
export declare const mockPackage: EntryPoint;
export declare const mockPackageWithPublicAPI: EntryPoint;
//# sourceMappingURL=mockPackage.d.ts.map