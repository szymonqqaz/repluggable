import _ from 'lodash';
import { interceptAnyObject } from '../src/interceptAnyObject';
function takeLog(spy) {
    return _.flatten(spy.mock.calls);
}
function dictToString(dict) {
    return Object.keys(dict)
        .map(function (key) { return ({
        key: key,
        value: dict[key]
    }); })
        .filter(function (kvp) { return typeof kvp.value === 'string'; })
        .map(function (kvp) { return kvp.key + ":" + kvp.value; })
        .join(';');
}
function argToString(arg) {
    switch (typeof arg) {
        case 'number':
        case 'string':
            return "" + arg;
        case 'object':
            return dictToString(arg);
        case 'undefined':
            return 'undefined';
        default:
            return '???';
    }
}
function createTestTarget(spy) {
    return {
        voidFunc: function () {
            spy('voidFunc');
        },
        voidFuncWithArgs: function (str, num, dict) {
            spy("voidFuncWithArgs(str=" + str + ",num=" + num + ",dict=" + dictToString(dict) + ")");
        },
        nonVoidFunc: function () {
            spy('nonVoidFunc');
            return {
                aaa: '111'
            };
        },
        nonVoidFuncWithArgs: function (str, num) {
            spy("nonVoidFuncWithArgs(str=" + str + ",num=" + num + ")");
            return {
                bbb: '222'
            };
        },
        scalarProp: 'original-scalar',
        objectProp: {
            nestedProp: 'original-nested',
            nestedFunc: function () {
                spy('objectProp.nestedFunc');
            },
            nestedObject: {
                nestedFuncLevelTwo: function () {
                    spy('objectProp.nestedObject.nestedFuncLevelTwo');
                    return 12345;
                }
            }
        }
    };
}
describe('interceptAnyObject', function () {
    function createFuncInterceptor(spy) {
        return function (name, func) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                spy("BEFORE:" + name + "(" + args.map(argToString).join(';') + ")");
                var retVal = func.apply(null, args);
                spy("AFTER:" + name + "(" + argToString(retVal) + ")");
                return retVal;
            };
        };
    }
    function createPropInterceptor(spy) {
        return function (name, value) {
            return typeof value === 'string' ? value.replace('original', "INTERCEPTED[" + name + "]") : value;
        };
    }
    it('should return same members if no interceptors passed', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real);
        expect(intercepted.voidFunc).toBe(real.voidFunc);
        expect(intercepted.scalarProp).toBe(real.scalarProp);
        expect(intercepted.objectProp.nestedFunc).toBe(real.objectProp.nestedFunc);
    });
    it('should intercept void functions', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real, createFuncInterceptor(spy));
        intercepted.voidFunc();
        var log = takeLog(spy);
        expect(log).toEqual(['BEFORE:voidFunc()', 'voidFunc', 'AFTER:voidFunc(undefined)']);
    });
    it('should intercept non-void functions with arguments', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real, createFuncInterceptor(spy));
        var retVal = intercepted.nonVoidFuncWithArgs('abc', 123);
        var log = takeLog(spy);
        expect(log).toEqual([
            'BEFORE:nonVoidFuncWithArgs(abc;123)',
            'nonVoidFuncWithArgs(str=abc,num=123)',
            'AFTER:nonVoidFuncWithArgs(bbb:222)'
        ]);
        expect(dictToString(retVal)).toBe('bbb:222');
    });
    it('should intercept scalar props', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real, createFuncInterceptor(spy), createPropInterceptor(spy));
        var propValue = intercepted.scalarProp;
        expect(propValue).toBe('INTERCEPTED[scalarProp]-scalar');
    });
    it('should intercept nested objects', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real, createFuncInterceptor(spy), createPropInterceptor(spy), 10);
        var nestedPropValue = intercepted.objectProp.nestedProp;
        intercepted.objectProp.nestedFunc();
        var log = takeLog(spy);
        expect(log).toEqual(['BEFORE:objectProp.nestedFunc()', 'objectProp.nestedFunc', 'AFTER:objectProp.nestedFunc(undefined)']);
        expect(nestedPropValue).toBe('INTERCEPTED[objectProp.nestedProp]-nested');
    });
    it('should intercept multiple levels of nested objects', function () {
        var spy = jest.fn();
        var real = createTestTarget(spy);
        var intercepted = interceptAnyObject(real, createFuncInterceptor(spy), createPropInterceptor(spy), 10);
        var nestedFuncLevelTwoRetVal = intercepted.objectProp.nestedObject.nestedFuncLevelTwo();
        var log = takeLog(spy);
        expect(log).toEqual([
            'BEFORE:objectProp.nestedObject.nestedFuncLevelTwo()',
            'objectProp.nestedObject.nestedFuncLevelTwo',
            'AFTER:objectProp.nestedObject.nestedFuncLevelTwo(12345)'
        ]);
        expect(nestedFuncLevelTwoRetVal).toBe(12345);
    });
});
//# sourceMappingURL=interceptAnyObject.spec.js.map