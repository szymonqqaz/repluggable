"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = __importDefault(require("react"));
var testKit_1 = require("../testKit");
var enzyme_1 = require("enzyme");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var CompA = function () { return react_1.default.createElement("div", { id: "A", className: "mock-comp" }); };
var CompB = function () { return react_1.default.createElement("div", { id: "B", className: "mock-comp" }); };
var CompC = /** @class */ (function (_super) {
    __extends(CompC, _super);
    function CompC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompC.prototype.componentDidMount = function () {
        this.props.onDidMount();
    };
    CompC.prototype.render = function () {
        return react_1.default.createElement("div", { id: "C", className: "mock-comp" });
    };
    return CompC;
}(react_1.default.Component));
var getCompId = function (wrapper, index) { return (wrapper ? wrapper.find('.mock-comp').at(index).prop('id') : ''); };
describe('SlotRenderer', function () {
    it('should render slot items', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, function () { return react_1.default.createElement(CompA, null); });
        slot.contribute(shell, function () { return react_1.default.createElement(CompB, null); });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot }), host, shell).root;
        expect(root && root.find(CompA).length).toBe(1);
        expect(root && root.find(CompB).length).toBe(1);
    });
    it('should map items by map function', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); } });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); } });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; } }), host, shell).root;
        expect(root && root.find(CompA).length).toBe(1);
        expect(root && root.find(CompB).length).toBe(1);
    });
    it('should not render filtered out slot items', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); }, shouldRender: false });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); }, shouldRender: true });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; }, filterFunc: function (item) { return item.shouldRender; } }), host, shell).root;
        expect(root && root.find(CompA).length).toBe(0);
        expect(root && root.find(CompB).length).toBe(1);
    });
    it('should not render non enabled slot items', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); } });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); } }, function () { return false; });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; } }), host, shell).root;
        expect(root && root.find(CompA).length).toBe(1);
        expect(root && root.find(CompB).length).toBe(0);
    });
    it('should sort slot items by sort function', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); }, order: 2 });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); }, order: 1 });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; }, sortFunc: function (itemA, itemB) { return itemA.contribution.order - itemB.contribution.order; } }), host, shell).root;
        expect(getCompId(root, 0)).toBe('B');
        expect(getCompId(root, 1)).toBe('A');
    });
    it('should not mutate slot item order by sort function', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); }, order: 2 });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); }, order: 1 });
        var getSlotItemsOrder = function () { return slot.getItems().map(function (item) { return getCompId(enzyme_1.mount(react_1.default.createElement(react_1.default.Fragment, null, item.contribution.comp())), 0); }); };
        var slotItemsOrder = getSlotItemsOrder();
        testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; }, sortFunc: function (itemA, itemB) { return itemA.contribution.order - itemB.contribution.order; } }), host, shell);
        slot.getItems().map(function (item) { return getCompId(enzyme_1.mount(react_1.default.createElement(react_1.default.Fragment, null, item.contribution.comp())), 0); });
        expect(getSlotItemsOrder()).toEqual(['A', 'B']);
        expect(getSlotItemsOrder()).toEqual(slotItemsOrder);
    });
    it('should not sort slot items if no sort function provided', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); }, order: 2 });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); }, order: 1 });
        var root = testKit_1.renderInHost(react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; } }), host, shell).root;
        expect(getCompId(root, 0)).toBe('A');
        expect(getCompId(root, 1)).toBe('B');
    });
    it('should not remount component when slot items changed', function () {
        var slotKey = {
            name: 'mock_key'
        };
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        var slot = shell.declareSlot(slotKey);
        var onDidMount = jest.fn();
        var isCompAEnabled = true;
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompA, null); }, order: 1 }, function () { return isCompAEnabled; });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompB, null); }, order: 2 });
        slot.contribute(shell, { comp: function () { return react_1.default.createElement(CompC, { onDidMount: onDidMount }); }, order: 3 });
        var Container = /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container(props) {
                var _this = _super.call(this, props) || this;
                _this.state = { counter: 1 };
                return _this;
            }
            Container.prototype.render = function () {
                return this.props.children();
            };
            return Container;
        }(react_1.default.Component));
        var root = testKit_1.renderInHost(react_1.default.createElement(Container, null, function () { return (react_1.default.createElement(testKit_1.SlotRenderer, { slot: slot, mapFunc: function (item) { return item.comp; }, sortFunc: function (itemA, itemB) { return itemA.contribution.order - itemB.contribution.order; } })); }), host, shell).root;
        if (!root) {
            fail('could not render extension slot');
        }
        isCompAEnabled = false;
        root.find(Container).setState({ counter: 2 });
        root.find(Container).update();
        expect(onDidMount).toHaveBeenCalledTimes(1);
    });
    describe('Bound Props', function () {
        var _this = this;
        var NATIVE_STORE_INITIAL_NUM = 1;
        var FOREIGN_STORE_INITIAL_NUM = 2;
        var NATIVE_STORE_NEW_NUM = 3;
        var FOREIGN_STORE_NEW_NUM = 4;
        it('should keep bound mapStateToProps', function () {
            var host = testKit_1.createAppHost([]);
            var mockShell = testKit_1.addMockShell(host, {
                attach: function (shell) {
                    shell.contributeState(function () { return ({ test: function () { return ({ num: NATIVE_STORE_INITIAL_NUM }); } }); });
                }
            });
            var ForeignComponent = function (props) { return (react_1.default.createElement(react_redux_1.Provider, { store: redux_1.createStore(function () { return ({ test: { num: FOREIGN_STORE_INITIAL_NUM } }); }) }, props.children)); };
            var nativeComponentPure = function (props) { return react_1.default.createElement("div", { className: "native-component" }, props.num); };
            var NativeComponent = testKit_1.connectWithShell(function (shell, state) { return ({
                num: state.test.num
            }); }, undefined, mockShell)(nativeComponentPure);
            var root = testKit_1.renderInHost(react_1.default.createElement(ForeignComponent, null,
                react_1.default.createElement(NativeComponent, null)), host).root;
            var rootWrapper = root;
            var hostComponent = rootWrapper.find('div.native-component');
            expect(hostComponent.text()).toBe("" + NATIVE_STORE_INITIAL_NUM);
        });
        it('should keep bound mapDispatchToProps', function () { return __awaiter(_this, void 0, void 0, function () {
            function nativeStoreReducer(state, action) {
                if (state === void 0) { state = { num: NATIVE_STORE_INITIAL_NUM }; }
                switch (action.type) {
                    case CHANGE_NUM:
                        return __assign(__assign({}, state), { num: action.num });
                    default:
                        return state;
                }
            }
            function foreignStoreReducer(state, action) {
                switch (action.type) {
                    case CHANGE_NUM:
                        throw new Error('The wrong store');
                    default:
                        return { num: FOREIGN_STORE_NEW_NUM };
                }
            }
            var CHANGE_NUM, host, mockShell, ForeignComponent, nativeComponentPure, NativeComponent, root, rootWrapper, component;
            return __generator(this, function (_a) {
                CHANGE_NUM = 'CHANGE_NUM';
                host = testKit_1.createAppHost([]);
                mockShell = testKit_1.addMockShell(host, {
                    attach: function (shell) {
                        shell.contributeState(function () { return ({ test: nativeStoreReducer }); });
                    }
                });
                ForeignComponent = function (props) { return (react_1.default.createElement(react_redux_1.Provider, { store: redux_1.createStore(foreignStoreReducer, { num: FOREIGN_STORE_INITIAL_NUM }) }, props.children)); };
                nativeComponentPure = function (props) {
                    return (react_1.default.createElement("div", { className: "native-component", onClick: function () { return props.changeState(); } }, props.num));
                };
                NativeComponent = testKit_1.connectWithShell(function (shell, state) {
                    return {
                        num: state.test.num
                    };
                }, function (shell, dispatch) {
                    return {
                        changeState: function () {
                            dispatch({ num: NATIVE_STORE_NEW_NUM, type: CHANGE_NUM });
                        }
                    };
                }, mockShell)(nativeComponentPure);
                root = testKit_1.renderInHost(react_1.default.createElement(ForeignComponent, null,
                    react_1.default.createElement(NativeComponent, null)), host).root;
                rootWrapper = root;
                component = rootWrapper.find('div.native-component');
                lodash_1.default.attempt(component.prop('onClick'));
                host.getStore().flush();
                component.update();
                expect(component.text()).toBe("" + NATIVE_STORE_NEW_NUM);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=renderSlotComponents.spec.js.map