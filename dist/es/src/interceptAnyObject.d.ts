export interface AnyObject {
    [key: string]: any;
}
export declare type FunctionInterceptor = (name: string, original: Function) => Function;
export declare type PropertyInterceptor = (name: string, original: any) => any;
export declare function interceptAnyObject<T extends AnyObject>(inner: T, onFunction?: FunctionInterceptor, onProperty?: PropertyInterceptor, includeNestedLevels?: number): T;
//# sourceMappingURL=interceptAnyObject.d.ts.map