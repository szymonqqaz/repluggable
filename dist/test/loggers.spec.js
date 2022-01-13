"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var appHost_1 = require("../src/appHost");
var loggers_1 = require("../src/loggers");
describe('ShellLogger', function () {
    function setup(tags) {
        var logSpy = jest.fn();
        var spanSpy = jest.fn().mockImplementation(function () { return ({}); });
        var entryPoint = {
            name: 'ep-1',
            tags: tags
        };
        var hostLogger = {
            log: logSpy,
            spanChild: spanSpy,
            spanRoot: spanSpy
        };
        var host = appHost_1.createAppHost([], { logger: hostLogger, monitoring: {} });
        var shellLogger = loggers_1.createShellLogger(host, entryPoint);
        logSpy.mockClear();
        return {
            entryPoint: entryPoint,
            hostLogger: hostLogger,
            host: host,
            shellLogger: shellLogger
        };
    }
    function delay(milliseconds) {
        return new Promise(function (resolve) {
            setTimeout(resolve, milliseconds);
        });
    }
    it('should log simple message', function () {
        var _a = setup(), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        shellLogger.debug('M1');
        shellLogger.info('M2');
        shellLogger.warning('M3');
        shellLogger.error('M4');
        expect(hostLogger.log).toHaveBeenCalledTimes(4);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'debug', 'M1', undefined, { $ep: 'ep-1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'info', 'M2', undefined, { $ep: 'ep-1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'warning', 'M3', undefined, { $ep: 'ep-1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(4, 'error', 'M4', undefined, { $ep: 'ep-1' });
    });
    it('should log simple message with key-value pairs', function () {
        var _a = setup(), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        shellLogger.debug('M1', { k1: 'v1' });
        shellLogger.info('M2', { k2: 'v2' });
        shellLogger.warning('M3', { k3: 'v3' });
        shellLogger.error('M4', undefined, { k4: 'v4' });
        expect(hostLogger.log).toHaveBeenCalledTimes(4);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'debug', 'M1', undefined, { $ep: 'ep-1', k1: 'v1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'info', 'M2', undefined, { $ep: 'ep-1', k2: 'v2' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'warning', 'M3', undefined, { $ep: 'ep-1', k3: 'v3' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(4, 'error', 'M4', undefined, { $ep: 'ep-1', k4: 'v4' });
    });
    it('should include entry point tags in key-value pairs', function () {
        var _a = setup({ t1: 'T1', t2: 'T2' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        shellLogger.debug('M1', { k1: 'v1' });
        shellLogger.info('M2', { k2: 'v2' });
        shellLogger.warning('M3', { k3: 'v3' });
        shellLogger.error('M4', undefined, { k4: 'v4' });
        expect(hostLogger.log).toHaveBeenCalledTimes(4);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'debug', 'M1', undefined, { $ep: 'ep-1', k1: 'v1', t1: 'T1', t2: 'T2' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'info', 'M2', undefined, { $ep: 'ep-1', k2: 'v2', t1: 'T1', t2: 'T2' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'warning', 'M3', undefined, { $ep: 'ep-1', k3: 'v3', t1: 'T1', t2: 'T2' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(4, 'error', 'M4', undefined, { $ep: 'ep-1', k4: 'v4', t1: 'T1', t2: 'T2' });
    });
    it('should begin span', function () {
        var _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        var span = shellLogger.spanChild('M1', { k1: 'v1' });
        expect(span).toBeDefined();
        expect(hostLogger.spanChild).toHaveBeenCalledTimes(1);
        expect(hostLogger.spanChild).toHaveBeenNthCalledWith(1, 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' });
    });
    it.skip('should monitor synchronous void function success', function () {
        var _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        shellLogger.monitor('M1', { k1: 'v1' }, function () {
            shellLogger.debug('this-is-monitored-code');
        });
        expect(hostLogger.log).toHaveBeenCalledTimes(3);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', undefined, { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'debug', 'this-is-monitored-code', undefined, { $ep: 'ep-1', t1: 'T1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'span', 'M1', {
            $ep: 'ep-1',
            k1: 'v1',
            t1: 'T1',
            success: true,
            returnValue: undefined,
            error: undefined
        }, 'end');
    });
    it.skip('should monitor synchronous non-void function success', function () {
        var _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        var returnValue = shellLogger.monitor('M1', { k1: 'v1' }, function () {
            shellLogger.debug('this-is-monitored-code');
            return 123;
        });
        expect(returnValue).toBe(123);
        expect(hostLogger.log).toHaveBeenCalledTimes(3);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', undefined, { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'debug', 'this-is-monitored-code', undefined, { $ep: 'ep-1', t1: 'T1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'span', 'M1', {
            $ep: 'ep-1',
            k1: 'v1',
            t1: 'T1',
            success: true,
            returnValue: 123,
            error: undefined
        }, 'end');
    });
    it.skip('should monitor synchronous function that returns null', function () {
        var _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        var returnValue = shellLogger.monitor('M1', { k1: 'v1' }, function () {
            shellLogger.debug('this-is-monitored-code');
            return null;
        });
        expect(returnValue).toBeNull();
        expect(hostLogger.log).toHaveBeenCalledTimes(3);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'debug', 'this-is-monitored-code', { $ep: 'ep-1', t1: 'T1' });
        expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'span', 'M1', {
            $ep: 'ep-1',
            k1: 'v1',
            t1: 'T1',
            success: true,
            returnValue: null,
            error: undefined
        }, 'end');
    });
    it.skip('should monitor synchronous function failure', function () {
        var _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
        expect(function () {
            shellLogger.monitor('M1', { k1: 'v1' }, function () {
                throw new Error('ERR1');
            });
        }).toThrowError('ERR1');
        expect(hostLogger.log).toHaveBeenCalledTimes(2);
        expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
        expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'span', 'M1', {
            $ep: 'ep-1',
            k1: 'v1',
            t1: 'T1',
            success: false,
            returnValue: undefined,
            error: new Error('ERR1')
        }, 'end');
    });
    it.skip('should monitor async void function success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, shellLogger, hostLogger;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
                    return [4 /*yield*/, shellLogger.monitor('M1', { k1: 'v1' }, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, delay(10)];
                                    case 1:
                                        _a.sent();
                                        shellLogger.debug('this-is-monitored-code');
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    expect(hostLogger.log).toHaveBeenCalledTimes(3);
                    expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
                    expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'debug', 'this-is-monitored-code', { $ep: 'ep-1', t1: 'T1' });
                    expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'span', 'M1', {
                        $ep: 'ep-1',
                        k1: 'v1',
                        t1: 'T1',
                        success: true,
                        returnValue: undefined,
                        error: undefined
                    }, 'end');
                    return [2 /*return*/];
            }
        });
    }); });
    it.skip('should monitor async non-void function success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, shellLogger, hostLogger, returnValue;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
                    return [4 /*yield*/, shellLogger.monitor('M1', { k1: 'v1' }, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        shellLogger.debug('this-is-monitored-code');
                                        return [4 /*yield*/, delay(10)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, 123];
                                }
                            });
                        }); })];
                case 1:
                    returnValue = _b.sent();
                    expect(returnValue).toBe(123);
                    expect(hostLogger.log).toHaveBeenCalledTimes(3);
                    expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
                    expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'debug', 'this-is-monitored-code', { $ep: 'ep-1', t1: 'T1' });
                    expect(hostLogger.log).toHaveBeenNthCalledWith(3, 'span', 'M1', {
                        $ep: 'ep-1',
                        k1: 'v1',
                        t1: 'T1',
                        success: true,
                        returnValue: 123,
                        error: undefined
                    }, 'end');
                    return [2 /*return*/];
            }
        });
    }); });
    it.skip('should monitor async function failure', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, shellLogger, hostLogger, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setup({ t1: 'T1' }), shellLogger = _a.shellLogger, hostLogger = _a.hostLogger;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, shellLogger.monitor('M1', { k1: 'v1' }, function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, delay(10)];
                                    case 1:
                                        _a.sent();
                                        throw new Error('ERR1');
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    fail('expected to throw, but did not');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    expect(err_1.message).toBe('ERR1');
                    return [3 /*break*/, 4];
                case 4:
                    expect(hostLogger.log).toHaveBeenCalledTimes(2);
                    expect(hostLogger.log).toHaveBeenNthCalledWith(1, 'span', 'M1', { $ep: 'ep-1', k1: 'v1', t1: 'T1' }, 'begin');
                    expect(hostLogger.log).toHaveBeenNthCalledWith(2, 'span', 'M1', {
                        $ep: 'ep-1',
                        k1: 'v1',
                        t1: 'T1',
                        success: false,
                        returnValue: undefined,
                        error: new Error('ERR1')
                    }, 'end');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=loggers.spec.js.map