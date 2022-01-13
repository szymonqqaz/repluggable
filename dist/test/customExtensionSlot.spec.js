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
var slotKey = { name: 'TEST_SLOT' };
describe('Custom Extension Slot', function () {
    var slotUnderTest;
    var slotHandler;
    var ownerShell;
    var testEntryPoint = {
        name: 'TEST',
        attach: function (shell) {
            ownerShell = shell;
            slotUnderTest = shell.declareCustomSlot(slotKey, slotHandler);
        },
        detach: function (shell) {
            ownerShell = undefined;
        }
    };
    beforeEach(function () {
        slotHandler = {
            contribute: jest.fn(),
            discardBy: jest.fn()
        };
        ownerShell = undefined;
    });
    it('can be declared', function () {
        testKit_1.createAppHost([testEntryPoint]);
        expect(slotUnderTest).toBeDefined();
    });
    it('can be retrieved by key', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            testKit_1.createAppHost([testEntryPoint]);
            expect(ownerShell).toBeDefined();
            expect(ownerShell && ownerShell.getSlot(slotKey)).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('invokes callback on contribute', function () {
        var host = testKit_1.createAppHost([testEntryPoint]);
        var contributorShell = testKit_1.addMockShell(host);
        var item = { value: 'abc' };
        slotUnderTest.contribute(contributorShell, item);
        expect(slotHandler.contribute).toBeCalledTimes(1);
        expect(slotHandler.contribute).toBeCalledWith(contributorShell, item);
        expect(slotHandler.discardBy).not.toHaveBeenCalled();
    });
    it('invokes callback on discard', function () {
        testKit_1.createAppHost([testEntryPoint]);
        var predicate = function (item) { return true; };
        slotUnderTest.discardBy(predicate);
        expect(slotHandler.contribute).not.toHaveBeenCalled();
        expect(slotHandler.discardBy).toBeCalledTimes(1);
        expect(slotHandler.discardBy).toBeCalledWith(predicate);
    });
    it('cannot create two slots with same key: custom and standard', function () {
        var beforeTestEntryPoint = {
            name: 'BEFORE_TEST',
            attach: function (shell) {
                shell.declareSlot(slotKey);
            }
        };
        expect(function () { return testKit_1.createAppHost([beforeTestEntryPoint, testEntryPoint]); }).toThrowError();
    });
    it('cannot create two slots with same key: custom and custom', function () {
        var beforeTestEntryPoint = {
            name: 'BEFORE_TEST',
            attach: function (shell) {
                shell.declareCustomSlot(slotKey, {
                    contribute: function () { },
                    discardBy: function () { }
                });
            }
        };
        expect(function () { return testKit_1.createAppHost([beforeTestEntryPoint, testEntryPoint]); }).toThrowError();
    });
    it('cannot create two slots with same name: custom and standard', function () {
        var beforeTestEntryPoint = {
            name: 'BEFORE_TEST',
            attach: function (shell) {
                shell.declareSlot({ name: slotKey.name });
            }
        };
        expect(function () { return testKit_1.createAppHost([beforeTestEntryPoint, testEntryPoint]); }).toThrowError();
    });
    it('cannot create two slots with same name: custom and custom', function () {
        var beforeTestEntryPoint = {
            name: 'BEFORE_TEST',
            attach: function (shell) {
                shell.declareCustomSlot({ name: slotKey.name }, {
                    contribute: function () { },
                    discardBy: function () { }
                });
            }
        };
        expect(function () { return testKit_1.createAppHost([beforeTestEntryPoint, testEntryPoint]); }).toThrowError();
    });
    it('can reload entry point that declares custom slots', function () { return __awaiter(void 0, void 0, void 0, function () {
        var host;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    host = testKit_1.createAppHost([testEntryPoint]);
                    expect(ownerShell).toBeDefined();
                    return [4 /*yield*/, host.removeShells([testEntryPoint.name])];
                case 1:
                    _a.sent();
                    expect(ownerShell).toBeUndefined();
                    return [4 /*yield*/, host.addShells([lodash_1.default.cloneDeep(testEntryPoint)])];
                case 2:
                    _a.sent();
                    expect(ownerShell).toBeDefined();
                    expect(ownerShell && ownerShell.getSlot(slotKey)).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=customExtensionSlot.spec.js.map