import { EntryPoint, EntryPointOrPackage, EntryPointInterceptor, EntryPointOrPackagesMap } from './API';
export declare function interceptEntryPoints(entryPoints: EntryPointOrPackage, interceptor: EntryPointInterceptor): EntryPoint[];
export declare function interceptEntryPointsMap(entryPointsMap: EntryPointOrPackagesMap, interceptor: EntryPointInterceptor): {
    [x: string]: EntryPoint[];
};
//# sourceMappingURL=interceptEntryPoints.d.ts.map