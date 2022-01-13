import _ from 'lodash';
export function interceptEntryPoints(entryPoints, interceptor) {
    return _.flatten([entryPoints]).map(function (ep) { return applyInterceptor(ep, interceptor); });
}
export function interceptEntryPointsMap(entryPointsMap, interceptor) {
    return _.mapValues(entryPointsMap, function (ep) { return interceptEntryPoints(ep, interceptor); });
}
function applyInterceptor(inner, interceptor) {
    return {
        name: interceptor.interceptName ? interceptor.interceptName(inner.name) : inner.name,
        layer: inner.layer,
        tags: interceptor.interceptTags ? interceptor.interceptTags(inner.tags) : inner.tags,
        getDependencyAPIs: interceptor.interceptGetDependencyAPIs
            ? interceptor.interceptGetDependencyAPIs(inner.getDependencyAPIs)
            : inner.getDependencyAPIs,
        declareAPIs: interceptor.interceptDeclareAPIs ? interceptor.interceptDeclareAPIs(inner.declareAPIs) : inner.declareAPIs,
        attach: interceptor.interceptAttach ? interceptor.interceptAttach(inner.attach) : inner.attach,
        detach: interceptor.interceptDetach ? interceptor.interceptDetach(inner.detach) : inner.detach,
        extend: interceptor.interceptExtend ? interceptor.interceptExtend(inner.extend) : inner.extend
    };
}
//# sourceMappingURL=interceptEntryPoints.js.map