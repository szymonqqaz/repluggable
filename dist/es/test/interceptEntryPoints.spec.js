var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import _ from 'lodash';
import { interceptEntryPoints, interceptEntryPointsMap } from '../src/interceptEntryPoints';
import { createAppHost } from '../testKit';
function takeLog(spy) {
    return _.flatten(spy.mock.calls);
}
function takeAndClearLog(spy) {
    var result = takeLog(spy);
    spy.mockClear();
    return result;
}
describe('interceptEntryPoints', function () {
    it('should intercept name', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(2, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', { interceptName: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        expect(intercepted[0].name).toBe('INTR1!EP-0');
        expect(intercepted[1].name).toBe('INTR1!EP-1');
    });
    it('should intercept tags', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(2, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', { interceptTags: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        expect(intercepted[0].tags).toMatchObject({ test_ep_index: '0', intercepted_by: 'INTR1' });
        expect(intercepted[1].tags).toMatchObject({ test_ep_index: '1', intercepted_by: 'INTR1' });
    });
    it('should intercept attach', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', { interceptAttach: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        intercepted[0].attach && intercepted[0].attach({});
        expect(takeLog(spy)).toEqual(['INTR1:attach', 'EP-0:attach']);
    });
    it('should intercept extend', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', { interceptExtend: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        intercepted[0].extend && intercepted[0].extend({});
        expect(takeLog(spy)).toEqual(['INTR1:extend', 'EP-0:extend']);
    });
    it('should intercept detach', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', { interceptDetach: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        intercepted[0].detach && intercepted[0].detach({});
        expect(takeLog(spy)).toEqual(['INTR1:detach', 'EP-0:detach']);
    });
    it('should intercept declareAPIs', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'I1', { interceptDeclareAPIs: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        intercepted[0].declareAPIs && intercepted[0].declareAPIs();
        expect(takeLog(spy)).toEqual(['I1:declareAPIs', 'EP-0:declareAPIs']);
    });
    it('should intercept getDependencyAPIs', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'I1', { interceptGetDependencyAPIs: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        intercepted[0].getDependencyAPIs && intercepted[0].getDependencyAPIs();
        expect(takeLog(spy)).toEqual(['I1:getDependencyAPIs', 'EP-0:getDependencyAPIs']);
    });
    it('should invoke original if not intercepted', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'INTR1', {}); // flags are all false
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        var interceptedName = intercepted[0].name;
        intercepted[0].attach && intercepted[0].attach({});
        intercepted[0].extend && intercepted[0].extend({});
        intercepted[0].detach && intercepted[0].detach({});
        intercepted[0].getDependencyAPIs && intercepted[0].getDependencyAPIs();
        intercepted[0].declareAPIs && intercepted[0].declareAPIs();
        expect(interceptedName).toBe('EP-0');
        expect(takeLog(spy)).toEqual(['EP-0:attach', 'EP-0:extend', 'EP-0:detach', 'EP-0:getDependencyAPIs', 'EP-0:declareAPIs']);
    });
    it('should allow multiple interceptors', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(3, spy);
        var interceptor1 = createTestInterceptor(spy, 'I1', { interceptAttach: true });
        var interceptor2 = createTestInterceptor(spy, 'I2', { interceptAttach: true });
        var intercepted1 = interceptEntryPoints(entryPoints[0], interceptor1);
        var intercepted2 = interceptEntryPoints(intercepted1, interceptor2);
        intercepted2[0].attach && intercepted2[0].attach({});
        expect(takeLog(spy)).toEqual(['I2:attach', 'I1:attach', 'EP-0:attach']);
    });
    it('should apply single interceptor to map of entry points', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(3, spy);
        var packagesMap = {
            one: entryPoints[0],
            two: [entryPoints[1], entryPoints[2]]
        };
        var interceptor = createTestInterceptor(spy, 'I1', { interceptAttach: true });
        var interceptedMap = interceptEntryPointsMap(packagesMap, interceptor);
        var intercepted = [
            interceptedMap.one[0],
            interceptedMap.two[0],
            interceptedMap.two[1]
        ];
        intercepted[0].attach && intercepted[0].attach({});
        var logOne0 = takeAndClearLog(spy);
        intercepted[1].attach && intercepted[1].attach({});
        var logTwo0 = takeAndClearLog(spy);
        intercepted[2].attach && intercepted[2].attach({});
        var logTwo1 = takeAndClearLog(spy);
        expect(typeof interceptedMap).toBe('object');
        expect(logOne0).toEqual(['I1:attach', 'EP-0:attach']);
        expect(logTwo0).toEqual(['I1:attach', 'EP-1:attach']);
        expect(logTwo1).toEqual(['I1:attach', 'EP-2:attach']);
    });
    it('should apply multiple interceptors to map of entry points', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(3, spy);
        var packagesMap = {
            one: entryPoints[0],
            two: [entryPoints[1], entryPoints[2]]
        };
        var interceptor1 = createTestInterceptor(spy, 'I1', { interceptAttach: true });
        var interceptor2 = createTestInterceptor(spy, 'I2', { interceptAttach: true });
        var interceptedMap1 = interceptEntryPointsMap(packagesMap, interceptor1);
        var interceptedMap2 = interceptEntryPointsMap(interceptedMap1, interceptor2);
        var intercepted = [
            interceptedMap2.one[0],
            interceptedMap2.two[0],
            interceptedMap2.two[1]
        ];
        intercepted[0].attach && intercepted[0].attach({});
        var logOne0 = takeAndClearLog(spy);
        intercepted[1].attach && intercepted[1].attach({});
        var logTwo0 = takeAndClearLog(spy);
        intercepted[2].attach && intercepted[2].attach({});
        var logTwo1 = takeAndClearLog(spy);
        expect(typeof interceptedMap1).toBe('object');
        expect(logOne0).toEqual(['I2:attach', 'I1:attach', 'EP-0:attach']);
        expect(logTwo0).toEqual(['I2:attach', 'I1:attach', 'EP-1:attach']);
        expect(logTwo1).toEqual(['I2:attach', 'I1:attach', 'EP-2:attach']);
    });
    it('should be able to add intercepted entry point to AppHost', function () {
        var spy = jest.fn();
        var entryPoints = createTestEntryPoints(1, spy);
        var interceptor = createTestInterceptor(spy, 'I1', { interceptAttach: true, interceptExtend: true });
        var intercepted = interceptEntryPoints(entryPoints, interceptor);
        createAppHost(intercepted, {
            monitoring: {}
        });
        // getDependencyAPIs appears to be called multiple times
        expect(_.uniq(takeLog(spy))).toEqual([
            'EP-0:declareAPIs',
            'EP-0:getDependencyAPIs',
            'I1:attach',
            'EP-0:attach',
            'I1:extend',
            'EP-0:extend'
        ]);
    });
});
function createTestEntryPoints(count, spy) {
    return _.times(count).map(function (index) { return ({
        name: "EP-" + index,
        tags: { test_ep_index: "" + index },
        getDependencyAPIs: function () {
            spy("EP-" + index + ":getDependencyAPIs");
            return [];
        },
        declareAPIs: function () {
            spy("EP-" + index + ":declareAPIs");
            return [];
        },
        attach: function () {
            spy("EP-" + index + ":attach");
            return [];
        },
        extend: function () {
            spy("EP-" + index + ":extend");
            return [];
        },
        detach: function () {
            spy("EP-" + index + ":detach");
            return [];
        }
    }); });
}
function createTestInterceptor(spy, interceptorName, flags) {
    return {
        interceptName: flags.interceptName
            ? function (name) {
                return interceptorName + "!" + name;
            }
            : undefined,
        interceptTags: flags.interceptTags
            ? function (tags) {
                return __assign({ intercepted_by: interceptorName }, tags);
            }
            : undefined,
        interceptDeclareAPIs: flags.interceptDeclareAPIs
            ? function (innerDeclareAPIs) {
                return function () {
                    spy(interceptorName + ":declareAPIs");
                    return (innerDeclareAPIs && innerDeclareAPIs()) || [];
                };
            }
            : undefined,
        interceptGetDependencyAPIs: flags.interceptGetDependencyAPIs
            ? function (innerGetDependencyAPIs) {
                return function () {
                    spy(interceptorName + ":getDependencyAPIs");
                    return (innerGetDependencyAPIs && innerGetDependencyAPIs()) || [];
                };
            }
            : undefined,
        interceptAttach: flags.interceptAttach
            ? function (innerAttach) {
                return function (shell) {
                    spy(interceptorName + ":attach");
                    innerAttach && innerAttach(shell);
                };
            }
            : undefined,
        interceptExtend: flags.interceptExtend
            ? function (innerExtend) {
                return function (shell) {
                    spy(interceptorName + ":extend");
                    innerExtend && innerExtend(shell);
                };
            }
            : undefined,
        interceptDetach: flags.interceptDetach
            ? function (innerDetach) {
                return function (shell) {
                    spy(interceptorName + ":detach");
                    innerDetach && innerDetach(shell);
                };
            }
            : undefined
    };
}
//# sourceMappingURL=interceptEntryPoints.spec.js.map