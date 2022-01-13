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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var testKit_1 = require("../testKit");
var APIs = {
    A: { name: 'A' },
    B: { name: 'B' },
    C: { name: 'C' },
    D: { name: 'D' },
    E: { name: 'E' },
    F: { name: 'F' }
};
var allPackages = {
    A: {
        name: 'A'
    },
    B: {
        name: 'B',
        declareAPIs: function () {
            return [APIs.B];
        }
    },
    C: {
        name: 'C',
        getDependencyAPIs: function () {
            return [APIs.B];
        },
        declareAPIs: function () {
            return [APIs.C];
        }
    },
    D: [
        {
            name: 'D',
            getDependencyAPIs: function () {
                return [APIs.C];
            },
            declareAPIs: function () {
                return [APIs.E];
            }
        },
        {
            name: 'E'
        }
    ],
    F: {
        name: 'F',
        getDependencyAPIs: function () {
            return [APIs.E];
        }
    }
};
describe('App Host TestKit', function () {
    it('should get packages dependencies', function () {
        var toResult = function (packages) { return lodash_1.default(packages).flatten().sortBy('name').value(); };
        var getDependencies = function (packages) { return toResult(testKit_1.getPackagesDependencies(lodash_1.default.values(allPackages), packages)); };
        var A = allPackages.A, B = allPackages.B, C = allPackages.C, D = allPackages.D, F = allPackages.F;
        expect(getDependencies([])).toEqual(toResult([]));
        expect(getDependencies([A])).toEqual(toResult([A]));
        expect(getDependencies([C])).toEqual(toResult([B, C]));
        expect(getDependencies([D])).toEqual(toResult([B, C, D]));
        expect(getDependencies([D, B])).toEqual(toResult([B, C, D]));
        expect(getDependencies([D, B, A])).toEqual(toResult([B, C, D, A]));
        // TODO: Should 'E' be included ?
        expect(getDependencies([F])).toEqual(toResult([B, C, D[0], F]));
    });
    it('should add mock shell', function () { return __awaiter(void 0, void 0, void 0, function () {
        var host, shell;
        return __generator(this, function (_a) {
            host = testKit_1.createAppHost([testKit_1.mockPackage]);
            shell = testKit_1.addMockShell(host, {
                name: 'MOCK',
                getDependencyAPIs: function () {
                    return [testKit_1.MockAPI];
                }
            });
            //await new Promise(resolve => host.onShellsChanged(resolve))
            expect(host.hasShell('MOCK')).toBe(true);
            expect(function () { return shell.getAPI(testKit_1.MockAPI); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
    it('should throw if could not add mock shell', function () { return __awaiter(void 0, void 0, void 0, function () {
        var host, APIKey, add;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    host = testKit_1.createAppHost([testKit_1.mockPackage]);
                    APIKey = 'API that would never exist';
                    add = function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            testKit_1.addMockShell(host, {
                                name: 'MOCK',
                                getDependencyAPIs: function () {
                                    return [testKit_1.MockAPI, { name: APIKey }];
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); };
                    return [4 /*yield*/, expect(add()).rejects.toThrow(new RegExp(APIKey))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create app host with provided pacts', function () {
        var key = { name: 'MOCK-API', layer: 'MOCK_LAYER' };
        var pactAPI = {
            getAPIKey: function () { return key; },
            f: function () { return 1; }
        };
        var host = testKit_1.createAppHostWithPacts([], [pactAPI]);
        expect(host.getAPI(key).f()).toBe(1);
    });
});
//# sourceMappingURL=testKit.spec.js.map