"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var appHost_1 = require("../src/appHost");
var mockPackage_1 = require("../testKit/mockPackage");
var appHostServices_1 = require("../src/appHostServices");
var appHost_mock_1 = require("./appHost.mock");
var loggers_1 = require("../src/loggers");
var emptyLoggerOptions_1 = require("../testKit/emptyLoggerOptions");
var testKit_1 = require("../testKit");
var testHostOptions = {
    monitoring: { disableMonitoring: true }
};
var createHostWithDependantPackages = function (DependencyAPI) {
    var MockAPI2 = { name: 'Mock-API-2' };
    var dependentPackage = [
        {
            name: 'DEPENDENT_MOCK_ENTRY_POINT_1',
            getDependencyAPIs: function () {
                return [DependencyAPI];
            }
        },
        {
            name: 'DEPENDENT_MOCK_ENTRY_POINT_2',
            getDependencyAPIs: function () {
                return [DependencyAPI];
            },
            declareAPIs: function () {
                return [MockAPI2];
            },
            attach: function (shell) {
                shell.contributeAPI(MockAPI2, function () { return ({}); });
            }
        }
    ];
    var deeplyDependentPackage = [
        {
            name: 'DEPENDENT_MOCK_ENTRY_POINT_3',
            getDependencyAPIs: function () {
                return [MockAPI2];
            }
        }
    ];
    var getHelperShell = function () {
        throw new Error();
    };
    var helperEntryPoint = {
        name: 'TEST_HELPER',
        declareAPIs: function () {
            return [DependencyAPI];
        },
        attach: function (shell) {
            getHelperShell = function () { return shell; };
        }
    };
    return {
        host: appHost_1.createAppHost([dependentPackage, deeplyDependentPackage, helperEntryPoint], testHostOptions),
        dependentPackage: dependentPackage,
        deeplyDependentPackage: deeplyDependentPackage,
        helperShell: getHelperShell()
    };
};
describe('App Host', function () {
    beforeEach(function () {
        spyOn(loggers_1.ConsoleHostLogger, 'log');
    });
    it('should create an app host', function () {
        var host = appHost_1.createAppHost([], testHostOptions);
        expect(host).toBeInstanceOf(Object);
    });
    describe('AppHost Options', function () {
        it('should use ConsoleHostLogger by default', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            expect(host.log).toBe(loggers_1.ConsoleHostLogger);
        });
        it('should use custom host logger if specified', function () {
            var logger = {
                log: function () { },
                spanRoot: function () {
                    return {
                        end: function () { }
                    };
                },
                spanChild: function () {
                    return {
                        end: function () { }
                    };
                }
            };
            var options = {
                logger: logger,
                monitoring: {}
            };
            var host = appHost_1.createAppHost([], options);
            expect(host.log).toBe(logger);
        });
    });
    describe('Packages Installation', function () {
        it('should NOT throw on circular dependency if check is disabled in host options', function () {
            var circularPackages = appHost_mock_1.createDirectCircularEntryPoints();
            var hostOptionsWithDisabledCircularCheck = {
                monitoring: {},
                disableCheckCircularDependencies: true
            };
            expect(function () { return appHost_1.createAppHost(circularPackages, hostOptionsWithDisabledCircularCheck); }).not.toThrow();
        });
        it('should throw on direct circular API dependency (private keys)', function () {
            var circularPackages = appHost_mock_1.createDirectCircularEntryPoints();
            expect(function () { return appHost_1.createAppHost(circularPackages, testHostOptions); }).toThrowError();
        });
        it('should throw on direct circular API dependency (public keys)', function () {
            var circularPackages = appHost_mock_1.createDirectCircularEntryPoints(true);
            expect(function () { return appHost_1.createAppHost(circularPackages, testHostOptions); }).toThrowError();
        });
        it('should throw on circular API dependency (private keys)', function () {
            var circularPackages = appHost_mock_1.createCircularEntryPoints();
            expect(function () { return appHost_1.createAppHost(circularPackages, testHostOptions); }).toThrowError();
        });
        it('should throw on circular API dependency (public keys)', function () {
            var circularPackages = appHost_mock_1.createCircularEntryPoints(true);
            expect(function () { return appHost_1.createAppHost(circularPackages, testHostOptions); }).toThrowError();
        });
        it('should throw when dynamically adding a shell with circular dependency', function () {
            var circularPackages = appHost_mock_1.createCircularEntryPoints(true);
            var nonCircular = circularPackages.slice(0, 3);
            var circularEP = lodash_1.default.last(circularPackages);
            var host = appHost_1.createAppHost(nonCircular, testHostOptions);
            expect(function () { return host.addShells([circularEP]); }).toThrow();
        });
        it('should install initial packages', function () {
            var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            expect(host.hasShell(mockPackage_1.mockPackage.name)).toBe(true);
        });
        it('should install packages after initial installations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([], testHostOptions);
                        expect(host.hasShell(mockPackage_1.mockPackage.name)).toBe(false);
                        return [4 /*yield*/, host.addShells([mockPackage_1.mockPackage])];
                    case 1:
                        _a.sent();
                        expect(host.hasShell(mockPackage_1.mockPackage.name)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should uninstall shell', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
                        return [4 /*yield*/, host.removeShells([mockPackage_1.mockPackage.name])];
                    case 1:
                        _a.sent();
                        expect(host.hasShell(mockPackage_1.mockPackage.name)).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not install multiple shells with the same name', function () {
            expect(function () { return appHost_1.createAppHost([mockPackage_1.mockPackage, lodash_1.default.pick(mockPackage_1.mockPackage, 'name')], testHostOptions); }).toThrow();
        });
        it('should install lazy shells', function () {
            var lazyEntryPoint = appHost_1.makeLazyEntryPoint(mockPackage_1.mockPackage.name, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, mockPackage_1.mockPackage];
            }); }); });
            var host = appHost_1.createAppHost([lazyEntryPoint], testHostOptions);
            expect(host.hasShell(lazyEntryPoint.name)).toBe(true);
        });
    });
    describe('EntryPoint lifecycle state', function () {
        var takeEntryPointStateSnapshot = function (shell) {
            return {
                canUseStore: shell.canUseStore(),
                canUseAPIs: shell.canUseAPIs(),
                wasInitializationCompleted: shell.wasInitializationCompleted()
            };
        };
        it('should be incomplete during appHost initialization', function () {
            var stateInAttach;
            var stateInExtend;
            var entryPoint = {
                name: 'TEST_EP',
                attach: function (shell) {
                    stateInAttach = takeEntryPointStateSnapshot(shell);
                },
                extend: function (shell) {
                    stateInExtend = takeEntryPointStateSnapshot(shell);
                }
            };
            appHost_1.createAppHost([entryPoint], testHostOptions);
            expect(stateInAttach).toMatchObject({
                wasInitializationCompleted: false,
                canUseAPIs: false,
                canUseStore: false
            });
            expect(stateInExtend).toMatchObject({
                wasInitializationCompleted: false,
                canUseAPIs: true,
                canUseStore: true
            });
        });
        it('should be complete after appHost initialization', function () {
            var shell;
            var entryPoint = {
                name: 'TEST_EP',
                attach: function (_shell) {
                    shell = _shell;
                }
            };
            appHost_1.createAppHost([entryPoint], testHostOptions);
            var stateAfter = shell && takeEntryPointStateSnapshot(shell);
            expect(stateAfter).toMatchObject({
                wasInitializationCompleted: true,
                canUseAPIs: true,
                canUseStore: true
            });
        });
        it('should be incomplete during lifecycle of added entry point', function () {
            var stateInAttach;
            var stateInExtend;
            var host = appHost_1.createAppHost([], testHostOptions);
            testKit_1.addMockShell(host, {
                attach: function (shell) {
                    stateInAttach = takeEntryPointStateSnapshot(shell);
                },
                extend: function (shell) {
                    stateInExtend = takeEntryPointStateSnapshot(shell);
                }
            });
            expect(stateInAttach).toMatchObject({
                wasInitializationCompleted: false,
                canUseAPIs: false,
                canUseStore: false
            });
            expect(stateInExtend).toMatchObject({
                wasInitializationCompleted: false,
                canUseAPIs: true,
                canUseStore: true
            });
        });
        it('should be complete after lifecycle of added entry point', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            var shell = testKit_1.addMockShell(host);
            var stateAfter = takeEntryPointStateSnapshot(shell);
            expect(stateAfter).toMatchObject({
                wasInitializationCompleted: true,
                canUseAPIs: true,
                canUseStore: true
            });
        });
        it('should be incomplete during execution of late initializer', function () {
            var state;
            var host = appHost_1.createAppHost([], testHostOptions);
            var shell = testKit_1.addMockShell(host);
            expect(shell.wasInitializationCompleted()).toBe(true);
            shell.runLateInitializer(function () {
                state = takeEntryPointStateSnapshot(shell);
            });
            expect(state).toMatchObject({
                canUseStore: true,
                canUseAPIs: true,
                wasInitializationCompleted: false
            });
        });
        it('should be complete after execution of late initializer', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            var shell = testKit_1.addMockShell(host);
            expect(shell.wasInitializationCompleted()).toBe(true);
            shell.runLateInitializer(function () { });
            var stateAfter = takeEntryPointStateSnapshot(shell);
            expect(stateAfter).toMatchObject({
                canUseStore: true,
                canUseAPIs: true,
                wasInitializationCompleted: true
            });
        });
        it('should be complete after execution of late initializer that throws', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            var shell = testKit_1.addMockShell(host);
            expect(shell.wasInitializationCompleted()).toBe(true);
            expect(function () {
                shell.runLateInitializer(function () {
                    throw new Error('TEST-ERROR');
                });
            }).toThrow('TEST-ERROR');
            var stateAfter = takeEntryPointStateSnapshot(shell);
            expect(stateAfter).toMatchObject({
                canUseStore: true,
                canUseAPIs: true,
                wasInitializationCompleted: true
            });
        });
    });
    lodash_1.default.forEach([
        {
            testCase: 'private API keys',
            dependencyAPI: mockPackage_1.MockAPI,
            providerPackage: mockPackage_1.mockPackage
        },
        {
            testCase: 'public API keys',
            dependencyAPI: { name: mockPackage_1.MockPublicAPI.name, public: true },
            providerPackage: mockPackage_1.mockPackageWithPublicAPI
        }
    ], function (_a) {
        var testCase = _a.testCase, dependencyAPI = _a.dependencyAPI, providerPackage = _a.providerPackage;
        describe("Dependency entry point installation (" + testCase + ")", function () {
            it('should not install dependent entry point until dependency is installed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, host, dependentPackage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = createHostWithDependantPackages(dependencyAPI), host = _a.host, dependentPackage = _a.dependentPackage;
                            expect(host.hasShell(dependentPackage[0].name)).toBe(false);
                            return [4 /*yield*/, host.addShells([providerPackage])];
                        case 1:
                            _b.sent();
                            expect(host.hasShell(dependentPackage[0].name)).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should install all dependent entry points chain when dependencies are installed from entry point', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, host, dependentPackage, deeplyDependentPackage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = createHostWithDependantPackages(dependencyAPI), host = _a.host, dependentPackage = _a.dependentPackage, deeplyDependentPackage = _a.deeplyDependentPackage;
                            expect(host.hasShell(dependentPackage[0].name)).toBe(false);
                            expect(host.hasShell(dependentPackage[1].name)).toBe(false);
                            expect(host.hasShell(deeplyDependentPackage[0].name)).toBe(false);
                            return [4 /*yield*/, host.addShells([providerPackage])];
                        case 1:
                            _b.sent();
                            expect(host.hasShell(dependentPackage[0].name)).toBe(true);
                            expect(host.hasShell(dependentPackage[1].name)).toBe(true);
                            expect(host.hasShell(deeplyDependentPackage[0].name)).toBe(true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should install all dependent entry points chain when dependencies are installed outside of entry point', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, host, dependentPackage, deeplyDependentPackage, helperShell;
                return __generator(this, function (_b) {
                    _a = createHostWithDependantPackages(dependencyAPI), host = _a.host, dependentPackage = _a.dependentPackage, deeplyDependentPackage = _a.deeplyDependentPackage, helperShell = _a.helperShell;
                    expect(host.hasShell(dependentPackage[0].name)).toBe(false);
                    expect(host.hasShell(dependentPackage[1].name)).toBe(false);
                    expect(host.hasShell(deeplyDependentPackage[0].name)).toBe(false);
                    helperShell.contributeAPI(dependencyAPI, function () { return ({
                        stubTrue: function () { return true; },
                        getNewObject: function () { return ({}); }
                    }); });
                    expect(host.hasShell(dependentPackage[0].name)).toBe(true);
                    expect(host.hasShell(dependentPackage[1].name)).toBe(true);
                    expect(host.hasShell(deeplyDependentPackage[0].name)).toBe(true);
                    return [2 /*return*/];
                });
            }); });
            it('should uninstall all dependent entry points chain when dependencies are uninstalled', function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, host, dependentPackage, deeplyDependentPackage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = createHostWithDependantPackages(dependencyAPI), host = _a.host, dependentPackage = _a.dependentPackage, deeplyDependentPackage = _a.deeplyDependentPackage;
                            return [4 /*yield*/, host.addShells([providerPackage])];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, host.removeShells([providerPackage.name])];
                        case 2:
                            _b.sent();
                            expect(host.hasShell(dependentPackage[0].name)).toBe(false);
                            expect(host.hasShell(dependentPackage[1].name)).toBe(false);
                            expect(host.hasShell(deeplyDependentPackage[0].name)).toBe(false);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('Host extension slots', function () {
        it('should have a state extension slot', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            expect(host.getSlot(appHost_1.stateSlotKey)).toBeTruthy();
        });
        it('should have a main view extension slot', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            expect(host.getSlot(appHost_1.mainViewSlotKey)).toBeTruthy();
        });
        it('should retrieve all slot keys', function () {
            var sortSlotKeys = function (slotKeys) { return lodash_1.default.sortBy(slotKeys, 'name'); };
            var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            var actual = sortSlotKeys(host.getAllSlotKeys());
            var expected = sortSlotKeys([appHostServices_1.AppHostAPI, appHost_1.mainViewSlotKey, appHost_1.stateSlotKey, mockPackage_1.MockAPI]);
            expect(actual).toEqual(expected);
        });
        describe('private API slot key', function () {
            it('should equal itself', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
                var API = host.getAPI(mockPackage_1.MockAPI);
                expect(API).toBeTruthy();
            });
            it('should not equal another key with same name', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
                var fakeKey = { name: mockPackage_1.MockAPI.name };
                expect(function () {
                    host.getAPI(fakeKey);
                }).toThrowError(new RegExp(mockPackage_1.MockAPI.name));
            });
            it('should not equal another key with same name that claims it is public', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
                var fakeKey1 = {
                    name: mockPackage_1.MockAPI.name,
                    public: true
                };
                var fakeKey2 = {
                    name: mockPackage_1.MockAPI.name,
                    public: false
                };
                var fakeKey3 = {
                    name: mockPackage_1.MockAPI.name,
                    public: 'zzz'
                };
                expect(function () { return host.getAPI(fakeKey1); }).toThrowError(new RegExp(mockPackage_1.MockAPI.name));
                expect(function () { return host.getAPI(fakeKey2); }).toThrowError(new RegExp(mockPackage_1.MockAPI.name));
                expect(function () { return host.getAPI(fakeKey3); }).toThrowError(new RegExp(mockPackage_1.MockAPI.name));
            });
        });
        describe('public API slot key', function () {
            it('should equal itself', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackageWithPublicAPI], testHostOptions);
                var API = host.getAPI(mockPackage_1.MockPublicAPI);
                expect(API).toBeTruthy();
            });
            it('should equal another key with same name that claims it is public', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackageWithPublicAPI], testHostOptions);
                var anotherKey = {
                    name: mockPackage_1.MockPublicAPI.name,
                    public: true
                };
                var API = host.getAPI(anotherKey);
                expect(API).toBeTruthy();
            });
            it('should not equal another key with same name than does not claim it is public', function () {
                var host = appHost_1.createAppHost([mockPackage_1.mockPackageWithPublicAPI], testHostOptions);
                var anotherKey1 = {
                    name: mockPackage_1.MockPublicAPI.name
                };
                var anotherKey2 = {
                    name: mockPackage_1.MockPublicAPI.name,
                    public: false
                };
                var anotherKey3 = {
                    name: mockPackage_1.MockPublicAPI.name,
                    public: 'zzz'
                };
                expect(function () { return host.getAPI(anotherKey1); }).toThrowError(new RegExp(mockPackage_1.MockPublicAPI.name));
                expect(function () { return host.getAPI(anotherKey2); }).toThrowError(new RegExp(mockPackage_1.MockPublicAPI.name));
                expect(function () { return host.getAPI(anotherKey3); }).toThrowError(new RegExp(mockPackage_1.MockPublicAPI.name));
            });
        });
    });
    describe('Shell extension slots', function () {
        it('should allow contribution', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, slotKey, MockAPIA, contributedItemA, contributedItemB, entryPointA, entryPointB, getItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([], testHostOptions);
                        slotKey = {
                            name: 'MOCK_SLOT'
                        };
                        MockAPIA = {
                            name: 'MOCK_API_A'
                        };
                        contributedItemA = { value: 'A' };
                        contributedItemB = { value: 'B' };
                        entryPointA = {
                            name: 'MOCK_A',
                            declareAPIs: function () {
                                return [MockAPIA];
                            },
                            attach: function (shell) {
                                shell.declareSlot(slotKey);
                                shell.contributeAPI(MockAPIA, function () { return ({
                                    contributeItem: function (fromShell, item) {
                                        shell.getSlot(slotKey).contribute(fromShell, item);
                                    }
                                }); });
                            },
                            extend: function (shell) {
                                shell.getAPI(MockAPIA).contributeItem(shell, contributedItemA);
                            }
                        };
                        entryPointB = {
                            name: 'MOCK_B',
                            getDependencyAPIs: function () {
                                return [MockAPIA];
                            },
                            extend: function (shell) {
                                shell.getAPI(MockAPIA).contributeItem(shell, contributedItemB);
                            }
                        };
                        return [4 /*yield*/, host.addShells([entryPointA, entryPointB])];
                    case 1:
                        _a.sent();
                        getItems = function () {
                            return host
                                .getSlot(slotKey)
                                .getItems()
                                .map(function (_a) {
                                var contribution = _a.contribution;
                                return contribution;
                            });
                        };
                        expect(getItems()).toEqual([contributedItemA, contributedItemB]);
                        return [4 /*yield*/, host.removeShells(['MOCK_B'])];
                    case 2:
                        _a.sent();
                        expect(getItems()).toEqual([contributedItemA]);
                        return [4 /*yield*/, host.addShells([entryPointB])];
                    case 3:
                        _a.sent();
                        expect(getItems()).toEqual([contributedItemA, contributedItemB]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not allow direct access to slots from other shells', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, slotKey, MockAPIA, entryPointA, entryPointB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([], testHostOptions);
                        slotKey = {
                            name: 'MOCK_SLOT'
                        };
                        MockAPIA = {
                            name: 'MOCK_API_A'
                        };
                        entryPointA = {
                            name: 'MOCK_A',
                            declareAPIs: function () {
                                return [MockAPIA];
                            },
                            attach: function (shell) {
                                shell.declareSlot(slotKey);
                            }
                        };
                        entryPointB = {
                            name: 'MOCK_B',
                            extend: function (shell) {
                                var errorString = "Shell '" + entryPointB.name + "' is trying to get slot '" + slotKey.name + "' that is owned by '" + entryPointA.name + "'";
                                expect(function () { return shell.getSlot(slotKey); }).toThrowError(errorString);
                            }
                        };
                        return [4 /*yield*/, host.addShells([entryPointA])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Host State', function () {
        it('should have a store with initial state', function () {
            var _a;
            var host = appHost_1.createAppHost([], testHostOptions);
            expect(host.getStore().getState()).toEqual({
                $installedShells: {
                    installedShells: (_a = {},
                        _a[appHostServices_1.AppHostServicesEntryPointName] = true,
                        _a)
                }
            });
        });
    });
    describe('Entry Point Contributions', function () {
        it('should contribute API', function () {
            var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            expect(host.getAPI(mockPackage_1.MockAPI)).toBeTruthy();
        });
        it('should contribute API after initial installations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([], testHostOptions);
                        expect(function () { return host.getAPI(mockPackage_1.MockAPI); }).toThrow();
                        return [4 /*yield*/, host.addShells([mockPackage_1.mockPackage])];
                    case 1:
                        _a.sent();
                        expect(host.getAPI(mockPackage_1.MockAPI)).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should execute detach and attach sequence according to dependencies', function () { return __awaiter(void 0, void 0, void 0, function () {
            var MockAPI2, dependantEntryPoint, dependantEntryPoint2, host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MockAPI2 = { name: 'MOCK' };
                        dependantEntryPoint = {
                            name: 'EP1',
                            getDependencyAPIs: function () { return [mockPackage_1.MockAPI]; },
                            declareAPIs: function () { return [MockAPI2]; },
                            attach: function (shell) {
                                shell.contributeAPI(MockAPI2, function () { return shell.getAPI(mockPackage_1.MockAPI); });
                            },
                            detach: function (shell) {
                                shell.getAPI(mockPackage_1.MockAPI).stubTrue();
                            }
                        };
                        dependantEntryPoint2 = {
                            name: 'EP2',
                            getDependencyAPIs: function () { return [mockPackage_1.MockAPI, MockAPI2]; },
                            detach: function (shell) {
                                shell.getAPI(mockPackage_1.MockAPI).stubTrue();
                                shell.getAPI(MockAPI2).stubTrue();
                            }
                        };
                        host = appHost_1.createAppHost([dependantEntryPoint2, mockPackage_1.mockPackage, dependantEntryPoint], testHostOptions);
                        expect(function () { return host.removeShells([mockPackage_1.mockPackage.name]); }).not.toThrow();
                        expect(host.hasShell(mockPackage_1.mockPackage.name)).toBe(false);
                        expect(host.hasShell(dependantEntryPoint.name)).toBe(false);
                        expect(host.hasShell(dependantEntryPoint2.name)).toBe(false);
                        return [4 /*yield*/, host.addShells([mockPackage_1.mockPackage])];
                    case 1:
                        _a.sent();
                        expect(host.hasShell(dependantEntryPoint.name)).toBe(true);
                        expect(host.hasShell(dependantEntryPoint2.name)).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should contribute state', function () { return __awaiter(void 0, void 0, void 0, function () {
            var getMockShellState, appHost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getMockShellState = function (host) { return lodash_1.default.get(host.getStore().getState(), [mockPackage_1.mockPackage.name, mockPackage_1.mockShellStateKey], null); };
                        appHost = appHost_1.createAppHost([], testHostOptions);
                        expect(getMockShellState(appHost)).toBeNull();
                        return [4 /*yield*/, appHost.addShells([mockPackage_1.mockPackage])];
                    case 1:
                        _a.sent();
                        expect(getMockShellState(appHost)).toEqual(mockPackage_1.mockShellInitialState);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should memoize functions upon demand', function () {
            var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            var getObj = function () { return host.getAPI(mockPackage_1.MockAPI).getNewObject(); };
            expect(getObj()).not.toBe(getObj());
            var newAPI = { name: 'newAPI' };
            var createAPI = function (shell) { return ({ getNewObject: shell.memoizeForState(function () { return ({}); }, lodash_1.default.stubTrue) }); };
            testKit_1.addMockShell(host, {
                declareAPIs: function () { return [newAPI]; },
                attach: function (shell) {
                    shell.contributeAPI(newAPI, function () { return createAPI(shell); });
                }
            });
            var objForStateA = host.getAPI(newAPI).getNewObject();
            expect(objForStateA).toBe(host.getAPI(newAPI).getNewObject());
            host.getStore().dispatch({ type: 'MOCK_ACTION' });
            host.getStore().flush();
            expect(objForStateA).not.toBe(host.getAPI(newAPI).getNewObject());
        });
        it('should not clear memoized functions if not needed', function () {
            var host = appHost_1.createAppHost([], testHostOptions);
            var newAPI = { name: 'newAPI' };
            var createAPI = function (shell) { return ({ getNewObject: shell.memoizeForState(function () { return ({}); }, lodash_1.default.stubTrue, lodash_1.default.stubFalse) }); };
            testKit_1.addMockShell(host, {
                declareAPIs: function () { return [newAPI]; },
                attach: function (shell) {
                    shell.contributeAPI(newAPI, function () { return createAPI(shell); });
                }
            });
            var objForStateA = host.getAPI(newAPI).getNewObject();
            host.getStore().dispatch({ type: 'MOCK_ACTION' });
            host.getStore().flush();
            expect(objForStateA).toBe(host.getAPI(newAPI).getNewObject());
        });
    });
    describe('Entry Point Shell Scoping', function () {
        it('should be able to call an API declared in dependencies', function () {
            var entryPointThatCallsAPI = {
                name: 'ENTRY_POINT_WITH_API_CALL',
                getDependencyAPIs: function () {
                    return [mockPackage_1.MockAPI];
                },
                extend: function (shell) {
                    shell.getAPI(mockPackage_1.MockAPI).stubTrue();
                }
            };
            var appHost = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            expect(function () { return appHost.addShells([entryPointThatCallsAPI]); }).not.toThrow();
        });
        it('should not be able to call an API not declared in dependencies', function () {
            var entryPointThatCallsAPI = {
                name: 'ENTRY_POINT_WITH_API_CALL',
                extend: function (shell) {
                    shell.getAPI(mockPackage_1.MockAPI).stubTrue();
                }
            };
            var appHost = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            expect(function () { return appHost.addShells([entryPointThatCallsAPI]); }).toThrow();
        });
        it('should get scoped state', function (done) {
            var state = {};
            var MOCK_STATE_KEY = 'mockStateKey';
            var entryPointWithState = {
                name: 'ENTRY_POINT_WITH_STATE',
                attach: function (shell) {
                    shell.contributeState(function () {
                        var _a;
                        return (_a = {},
                            _a[MOCK_STATE_KEY] = function () { return state; },
                            _a);
                    });
                },
                extend: function (shell) {
                    expect(lodash_1.default.get(shell.getStore().getState(), MOCK_STATE_KEY)).toBe(state);
                    done();
                }
            };
            appHost_1.createAppHost([entryPointWithState], testHostOptions);
        });
        it('should be able to uninstall own installed packages', function () { return __awaiter(void 0, void 0, void 0, function () {
            var packageThatInstallsAPackage;
            return __generator(this, function (_a) {
                packageThatInstallsAPackage = {
                    name: 'ENTRY_POINT_THAT_INSTALLS_A_PACKAGE',
                    extend: function (shell) {
                        shell.addShells([mockPackage_1.mockPackage]);
                        shell.removeShells([mockPackage_1.mockPackage.name]);
                    }
                };
                appHost_1.createAppHost([packageThatInstallsAPackage], testHostOptions);
                expect(function () { return appHost_1.createAppHost([packageThatInstallsAPackage], testHostOptions); }).not.toThrow();
                return [2 /*return*/];
            });
        }); });
        it('should not be able to uninstall not own installed packages', function () {
            var packageThatTriesToUninstallAPackage = {
                name: 'ENTRY_POINT_THAT_TRYIES_TO_UNINSTALL_A_PACKAGE',
                extend: function (shell) {
                    shell.removeShells([mockPackage_1.mockPackage.name]);
                }
            };
            expect(function () { return appHost_1.createAppHost([mockPackage_1.mockPackage, packageThatTriesToUninstallAPackage], testHostOptions); }).toThrow();
        });
    });
    describe('Entry Point HMR support', function () {
        var LowLevelSlotKey = { name: 'LOW-LEVEL-SLOT' };
        var HighLevelSlotKey = { name: 'HIGH-LEVEL-SLOT' };
        var ConsumerSlotKey = { name: 'CONSUMER-SLOT' };
        var LowLevelAPI = { name: 'LOW-LEVEL-API' };
        var HighLevelAPI = { name: 'HIGH-LEVEL-API' };
        var hmrTestPackage = [
            {
                name: 'LOW_LEVEL_API_ENTRY_POINT',
                declareAPIs: function () {
                    return [LowLevelAPI];
                },
                attach: function (shell) {
                    shell.declareSlot(LowLevelSlotKey);
                    shell.contributeAPI(LowLevelAPI, function () { return ({
                        lowLevelFunc: jest.fn()
                    }); });
                }
            },
            {
                name: 'HIGH_LEVEL_API_ENTRY_POINT',
                getDependencyAPIs: function () {
                    return [LowLevelAPI];
                },
                declareAPIs: function () {
                    return [HighLevelAPI];
                },
                attach: function (shell) {
                    shell.declareSlot(HighLevelSlotKey);
                    shell.contributeAPI(HighLevelAPI, function () { return ({
                        highLevelFunc: jest.fn
                    }); });
                },
                extend: function (shell) {
                    shell.getAPI(LowLevelAPI).lowLevelFunc('HIGH');
                }
            },
            {
                name: 'CONSUMER_ENTRY_POINT',
                getDependencyAPIs: function () {
                    return [HighLevelAPI];
                },
                extend: function (shell) {
                    shell.declareSlot(ConsumerSlotKey);
                    shell.getAPI(HighLevelAPI).highLevelFunc('CONSUMER');
                }
            }
        ];
        it('should be able to reload entry points', function () { return __awaiter(void 0, void 0, void 0, function () {
            var appHost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appHost = appHost_1.createAppHost(hmrTestPackage, testHostOptions);
                        return [4 /*yield*/, appHost.removeShells(['LOW_LEVEL_API_ENTRY_POINT'])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, appHost.addShells([hmrTestPackage[0]])];
                    case 2:
                        _a.sent();
                        expect(appHost.getAPI(HighLevelAPI)).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('API layer', function () {
        it('should allow dependency from high to lower level API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var MockAPI1, layers, host, EntryPoint1, EntryPoint2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MockAPI1 = { name: 'Mock-API', layer: 'INFRA' };
                        layers = [
                            {
                                level: 0,
                                name: 'INFRA'
                            },
                            {
                                level: 1,
                                name: 'PRODUCT'
                            }
                        ];
                        host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: layers }));
                        EntryPoint1 = {
                            name: 'MOCK_ENTRY_POINT_1',
                            layer: 'PRODUCT',
                            getDependencyAPIs: function () { return [MockAPI1]; }
                        };
                        EntryPoint2 = {
                            name: 'MOCK_ENTRY_POINT_2',
                            layer: 'INFRA',
                            declareAPIs: function () { return [MockAPI1]; },
                            attach: function (shell) {
                                shell.contributeAPI(MockAPI1, function () { return ({}); });
                            }
                        };
                        return [4 /*yield*/, host.addShells([EntryPoint2])];
                    case 1:
                        _a.sent();
                        expect(function () { return host.addShells([EntryPoint1]); }).not.toThrow();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not allow dependency from low to higher level API', function () { return __awaiter(void 0, void 0, void 0, function () {
            var MockAPI1, layers, host, EntryPoint1, EntryPoint2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MockAPI1 = { name: 'Mock-API', layer: 'PRODUCT' };
                        layers = [
                            {
                                level: 0,
                                name: 'INFRA'
                            },
                            {
                                level: 1,
                                name: 'PRODUCT'
                            }
                        ];
                        host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: layers }));
                        EntryPoint1 = {
                            name: 'MOCK_ENTRY_POINT_1',
                            layer: 'INFRA',
                            getDependencyAPIs: function () { return [MockAPI1]; }
                        };
                        EntryPoint2 = {
                            name: 'MOCK_ENTRY_POINT_2',
                            layer: 'PRODUCT',
                            declareAPIs: function () { return [MockAPI1]; },
                            attach: function (shell) {
                                shell.contributeAPI(MockAPI1, function () { return ({}); });
                            }
                        };
                        return [4 /*yield*/, host.addShells([EntryPoint2])];
                    case 1:
                        _a.sent();
                        expect(function () { return host.addShells([EntryPoint1]); }).toThrowError("Entry point " + EntryPoint1.name + " of layer " + layers[0].name + " cannot depend on API " + MockAPI1.name + " of layer " + EntryPoint2.layer);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not allow adding shell of unknown layer', function () {
            var MockAPI1 = { name: 'Mock-API', layer: 'NON_EXIXTING_layer' };
            var layers = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'PRODUCT'
                }
            ];
            var host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: layers }));
            var EntryPoint1 = {
                name: 'MOCK_ENTRY_POINT_1',
                layer: 'NON_EXIXTING_layer',
                getDependencyAPIs: function () { return [MockAPI1]; }
            };
            expect(function () { return host.addShells([EntryPoint1]); }).toThrowError("Cannot find layer " + EntryPoint1.layer);
        });
        it('should not allow contribution of API with non-matching entry point layer', function () {
            var MockAPI1 = { name: 'Mock-API', layer: 'PRODUCT' };
            var layers = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'PRODUCT'
                }
            ];
            var host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: layers }));
            var EntryPoint1 = {
                name: 'MOCK_ENTRY_POINT_1',
                layer: 'INFRA',
                declareAPIs: function () { return [MockAPI1]; },
                attach: function (shell) {
                    shell.contributeAPI(MockAPI1, function () { return ({}); });
                }
            };
            expect(function () { return host.addShells([EntryPoint1]); }).toThrowError("Cannot contribute API " + MockAPI1.name + " of layer " + MockAPI1.layer + " from entry point " + EntryPoint1.name + " of layer " + EntryPoint1.layer);
        });
        it('should support multi dimensional layers definition', function () {
            var MockAPI1 = { name: 'Mock-API', layer: ['COMMON', 'INFRA'] };
            var layersDimension1 = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'PRODUCT'
                }
            ];
            var layersDimension2 = [
                {
                    level: 0,
                    name: 'COMMON'
                },
                {
                    level: 1,
                    name: 'SPECIFIC'
                }
            ];
            var host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: [layersDimension1, layersDimension2] }));
            var EntryPoint1 = {
                name: 'MOCK_ENTRY_POINT_1',
                layer: ['INFRA', 'COMMON'],
                declareAPIs: function () { return [MockAPI1]; },
                attach: function (shell) {
                    shell.contributeAPI(MockAPI1, function () { return ({}); });
                }
            };
            var EntryPoint2 = {
                name: 'MOCK_ENTRY_POINT_2',
                layer: ['PRODUCT', 'SPECIFIC'],
                getDependencyAPIs: function () { return [MockAPI1]; }
            };
            expect(function () { return host.addShells([EntryPoint1, EntryPoint2]); }).not.toThrow();
        });
        it('should throw for multi dimensional layers violation', function () {
            var MockAPI1 = { name: 'Mock-API', layer: ['INFRA', 'SPECIFIC'] };
            var layersDimension1 = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'PRODUCT'
                }
            ];
            var layersDimension2 = [
                {
                    level: 0,
                    name: 'COMMON'
                },
                {
                    level: 1,
                    name: 'SPECIFIC'
                }
            ];
            var host = appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: [layersDimension1, layersDimension2] }));
            var EntryPoint1 = {
                name: 'MOCK_ENTRY_POINT_1',
                layer: ['INFRA', 'SPECIFIC'],
                declareAPIs: function () { return [MockAPI1]; },
                attach: function (shell) {
                    shell.contributeAPI(MockAPI1, function () { return ({}); });
                }
            };
            var EntryPoint2 = {
                name: 'MOCK_ENTRY_POINT_2',
                layer: ['COMMON', 'PRODUCT'],
                getDependencyAPIs: function () { return [MockAPI1]; }
            };
            expect(function () { return host.addShells([EntryPoint1, EntryPoint2]); }).toThrowError("Entry point " + EntryPoint2.name + " of layer COMMON cannot depend on API " + MockAPI1.name + " of layer SPECIFIC");
        });
        it('should enforce cross-multi-dimensional-layers name uniqueness', function () {
            var layersDimension1 = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'NOT_UNIQUE'
                }
            ];
            var layersDimension2 = [
                {
                    level: 0,
                    name: 'COMMON'
                },
                {
                    level: 1,
                    name: 'NOT_UNIQUE'
                }
            ];
            expect(function () {
                return appHost_1.createAppHost([], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: [layersDimension1, layersDimension2] }));
            }).toThrowError("Cannot initialize host with non unique layers: NOT_UNIQUE");
        });
        it('should allow single layered API for multi dimensional layers host', function () {
            var MockAPI1 = { name: 'Mock-API', layer: 'INFRA' };
            var layersDimension1 = [
                {
                    level: 0,
                    name: 'INFRA'
                },
                {
                    level: 1,
                    name: 'PRODUCT'
                }
            ];
            var layersDimension2 = [
                {
                    level: 0,
                    name: 'COMMON'
                },
                {
                    level: 1,
                    name: 'SPECIFIC'
                }
            ];
            var EntryPoint1 = {
                name: 'MOCK_ENTRY_POINT_1',
                layer: 'PRODUCT',
                getDependencyAPIs: function () { return [MockAPI1]; }
            };
            var EntryPoint2 = {
                name: 'MOCK_ENTRY_POINT_2',
                layer: 'INFRA',
                declareAPIs: function () { return [MockAPI1]; },
                attach: function (shell) {
                    shell.contributeAPI(MockAPI1, function () { return ({}); });
                }
            };
            expect(function () {
                return appHost_1.createAppHost([EntryPoint1, EntryPoint2], __assign(__assign({}, emptyLoggerOptions_1.emptyLoggerOptions), { layers: [layersDimension1, layersDimension2] }));
            }).not.toThrow();
        });
    });
    describe('API version', function () {
        it('should provide API of matching version', function () { return __awaiter(void 0, void 0, void 0, function () {
            var MockAPIv0, MockAPIv2, host, entryPoint, SecondMockAPIv2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MockAPIv0 = { name: 'Mock-API' };
                        MockAPIv2 = { name: 'Mock-API', version: 2 };
                        host = appHost_1.createAppHost([]);
                        entryPoint = {
                            name: 'MOCK_ENTRY_POINT',
                            declareAPIs: function () { return [MockAPIv0, MockAPIv2]; },
                            attach: function (shell) {
                                shell.contributeAPI(MockAPIv0, function () { return ({ f1: function () { } }); });
                                shell.contributeAPI(MockAPIv2, function () { return ({ f2: function () { } }); });
                            }
                        };
                        return [4 /*yield*/, host.addShells([entryPoint])];
                    case 1:
                        _a.sent();
                        expect(host.getAPI(MockAPIv0).f1).toBeDefined();
                        expect(host.getAPI(MockAPIv0).f2).not.toBeDefined();
                        expect(host.getAPI(MockAPIv2).f2).toBeDefined();
                        expect(host.getAPI(MockAPIv2).f1).not.toBeDefined();
                        SecondMockAPIv2 = { name: 'Mock-API', version: 2 };
                        expect(function () {
                            testKit_1.addMockShell(host, {
                                declareAPIs: function () { return [SecondMockAPIv2]; },
                                attach: function (shell) {
                                    shell.contributeAPI(SecondMockAPIv2, function () { return ({ f2: function () { } }); });
                                }
                            });
                        }).toThrowError(new RegExp("Error: Extension slot with key '" + SecondMockAPIv2.name + "\\(v" + SecondMockAPIv2.version + "\\)' already exists"));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Host API', function () {
        it('should get all entry points', function () { return __awaiter(void 0, void 0, void 0, function () {
            var host, allEntryPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
                        return [4 /*yield*/, host.addShells([mockPackage_1.mockPackageWithPublicAPI])];
                    case 1:
                        _a.sent();
                        allEntryPoints = host.getAPI(appHostServices_1.AppHostAPI).getAllEntryPoints();
                        expect(lodash_1.default.sortBy(allEntryPoints, 'name')).toEqual(lodash_1.default.sortBy([mockPackage_1.mockPackage, mockPackage_1.mockPackageWithPublicAPI, host.getAppHostServicesShell().entryPoint], 'name'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get host options', function () {
            var host = appHost_1.createAppHost([mockPackage_1.mockPackage], testHostOptions);
            expect(host.getAPI(appHostServices_1.AppHostAPI).getAppHostOptions()).toEqual(testHostOptions);
        });
    });
    describe('Cyclic Mode', function () {
        it('should load cyclic dependencies groups if all other dependencies are ready', function () {
            var API1 = { name: 'API1' };
            var API2 = { name: 'API2' };
            var API3 = { name: 'API3' };
            var entryPoints = [
                {
                    name: 'Package1',
                    getDependencyAPIs: function () { return [API2]; },
                    declareAPIs: function () { return [API1]; },
                    attach: function (shell) {
                        shell.contributeAPI(API1, function () { return ({}); });
                    }
                },
                {
                    name: 'Package2',
                    getDependencyAPIs: function () { return [API3]; },
                    declareAPIs: function () { return [API2]; },
                    attach: function (shell) {
                        shell.contributeAPI(API2, function () { return ({}); });
                    }
                },
                {
                    name: 'Package3',
                    getDependencyAPIs: function () { return [API1]; },
                    declareAPIs: function () { return [API3]; },
                    attach: function (shell) {
                        shell.contributeAPI(API3, function () { return ({}); });
                    }
                }
            ];
            var host = appHost_1.createAppHost(entryPoints, __assign(__assign({}, testHostOptions), { experimentalCyclicMode: true }));
            expect(host.hasShell(entryPoints[0].name)).toBe(true);
            expect(host.hasShell(entryPoints[1].name)).toBe(true);
            expect(host.hasShell(entryPoints[2].name)).toBe(true);
        });
        it('should not load cyclic dependencies groups if some other dependencies are not ready', function () {
            var API1 = { name: 'API1' };
            var API2 = { name: 'API2' };
            var API3 = { name: 'API3' };
            var API4 = { name: 'API4' };
            var entryPoints = [
                {
                    name: 'Package1',
                    getDependencyAPIs: function () { return [API2]; },
                    declareAPIs: function () { return [API1]; },
                    attach: function (shell) {
                        shell.contributeAPI(API1, function () { return ({}); });
                    }
                },
                {
                    name: 'Package2',
                    getDependencyAPIs: function () { return [API3]; },
                    declareAPIs: function () { return [API2]; },
                    attach: function (shell) {
                        shell.contributeAPI(API2, function () { return ({}); });
                    }
                },
                {
                    name: 'Package3',
                    getDependencyAPIs: function () { return [API1, API4]; },
                    declareAPIs: function () { return [API3]; },
                    attach: function (shell) {
                        shell.contributeAPI(API3, function () { return ({}); });
                    }
                }
            ];
            var host = appHost_1.createAppHost(entryPoints, __assign(__assign({}, testHostOptions), { experimentalCyclicMode: true }));
            expect(host.hasShell(entryPoints[0].name)).toBe(false);
            expect(host.hasShell(entryPoints[1].name)).toBe(false);
            expect(host.hasShell(entryPoints[2].name)).toBe(false);
        });
    });
});
//# sourceMappingURL=appHost.spec.js.map