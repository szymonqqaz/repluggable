"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptEntryPointsMap = exports.interceptEntryPoints = void 0;
var lodash_1 = __importDefault(require("lodash"));
function interceptEntryPoints(entryPoints, interceptor) {
    return lodash_1.default.flatten([entryPoints]).map(function (ep) { return applyInterceptor(ep, interceptor); });
}
exports.interceptEntryPoints = interceptEntryPoints;
function interceptEntryPointsMap(entryPointsMap, interceptor) {
    return lodash_1.default.mapValues(entryPointsMap, function (ep) { return interceptEntryPoints(ep, interceptor); });
}
exports.interceptEntryPointsMap = interceptEntryPointsMap;
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