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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import _ from 'lodash';
import React from 'react';
import { createAppHost, mockPackage, mockShellStateKey, renderInHost, connectWithShell, connectWithShellAndObserve, withThrowOnError } from '../testKit';
var getMockShellState = function (host) { return _.get(host.getStore().getState(), [mockPackage.name], null); };
var getValueFromState = function (state) { return "" + state[mockShellStateKey].mockValue; };
var createMocks = function (entryPoint, moreEntryPoints) {
    if (moreEntryPoints === void 0) { moreEntryPoints = []; }
    var cachedShell = null;
    var wrappedPackage = __assign(__assign({}, entryPoint), { attach: function (shell) {
            _.invoke(entryPoint, 'attach', shell);
            cachedShell = shell;
        } });
    var host = createAppHost(__spreadArray([wrappedPackage], __read(moreEntryPoints)), withThrowOnError());
    var getShell = function () { return cachedShell; };
    return {
        host: host,
        shell: getShell(),
        renderInShellContext: function (reactElement) { return renderInHost(reactElement, host, getShell()); }
    };
};
describe('connectWithShell', function () {
    it('should pass exact shell to mapStateToProps', function () {
        var _a = createMocks(mockPackage), shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var PureComp = function (_a) {
            var shellName = _a.shellName;
            return React.createElement("div", null, shellName);
        };
        var mapStateToProps = function (s) { return ({ shellName: s.name }); };
        var ConnectedComp = connectWithShell(mapStateToProps, undefined, shell)(PureComp);
        var comp = renderInShellContext(React.createElement(ConnectedComp, null)).parentWrapper;
        expect(comp && comp.text()).toBe(mockPackage.name);
    });
    it('should pass exact shell to mapDispatchToProps', function () {
        var _a = createMocks(mockPackage), shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var PureComp = function (_a) {
            var shellName = _a.shellName;
            return React.createElement("div", null, shellName);
        };
        var mapDispatchToProps = function (s) { return ({ shellName: s.name }); };
        var ConnectedComp = connectWithShell(undefined, mapDispatchToProps, shell)(PureComp);
        var comp = renderInShellContext(React.createElement(ConnectedComp, null)).parentWrapper;
        expect(comp && comp.text()).toBe(mockPackage.name);
    });
    it('should optimize props comparison', function () {
        var _a = createMocks(mockPackage), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var func1 = jest.fn();
        var func2 = jest.fn();
        var renderSpy = jest.fn();
        var props = { obj: { a: 1 }, func: func1 };
        var mapStateToProps = function () { return props; };
        var counter = 0;
        host.getStore().replaceReducer(function () { return ({
            counter: ++counter
        }); });
        var update = function (ref, newProps) {
            if (newProps) {
                props = newProps;
            }
            host.getStore().dispatch({ type: '' });
            host.getStore().flush();
            ref.update();
        };
        var PureComp = function (_a) {
            var obj = _a.obj, func = _a.func;
            renderSpy();
            return React.createElement("div", { onClick: func }, JSON.stringify(obj));
        };
        var ConnectedComp = connectWithShell(mapStateToProps, undefined, shell)(PureComp);
        var root = renderInShellContext(React.createElement(ConnectedComp, null)).root;
        if (!root) {
            throw new Error('Connected component fail to render');
        }
        expect(root.find(ConnectedComp).text()).toBe('{"a":1}');
        expect(renderSpy).toHaveBeenCalledTimes(1);
        update(root, _.cloneDeep(props));
        expect(renderSpy).toHaveBeenCalledTimes(1);
        update(root, __assign(__assign({}, props), { obj: { a: 2 } }));
        expect(root.find(ConnectedComp).text()).toBe('{"a":2}');
        expect(renderSpy).toHaveBeenCalledTimes(2);
        update(root, __assign(__assign({}, props), { func: func2 }));
        root.find(PureComp).simulate('click');
        expect(renderSpy).toHaveBeenCalledTimes(2);
        expect(func1).toHaveBeenCalled();
        expect(func2).not.toHaveBeenCalled();
    });
    it('should avoid mapping state with should update', function () {
        var _a = createMocks(mockPackage), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var func1 = jest.fn();
        var func2 = jest.fn();
        var renderSpy = jest.fn();
        var mapStateSpy = jest.fn();
        var props = { obj: { a: 1 }, func: func1 };
        var mapStateToProps = function () {
            mapStateSpy();
            return props;
        };
        var counter = 0;
        host.getStore().replaceReducer(function () { return ({
            counter: ++counter
        }); });
        var update = function (ref, newProps) {
            if (newProps) {
                props = newProps;
            }
            host.getStore().dispatch({ type: '' });
            host.getStore().flush();
            ref.update();
        };
        var PureComp = function (_a) {
            var obj = _a.obj, func = _a.func;
            renderSpy();
            return React.createElement("div", { onClick: func }, JSON.stringify(obj));
        };
        var ConnectedComp = connectWithShell(mapStateToProps, undefined, shell, { shouldComponentUpdate: function () { return false; } })(PureComp);
        var root = renderInShellContext(React.createElement(ConnectedComp, null)).root;
        if (!root) {
            throw new Error('Connected component fail to render');
        }
        expect(root.find(ConnectedComp).text()).toBe('{"a":1}');
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(mapStateSpy).toHaveBeenCalledTimes(1);
        update(root, _.cloneDeep(props));
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(mapStateSpy).toHaveBeenCalledTimes(1);
        update(root, __assign(__assign({}, props), { obj: { a: 2 } }));
        expect(root.find(ConnectedComp).text()).toBe('{"a":1}');
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(mapStateSpy).toHaveBeenCalledTimes(1);
        update(root, __assign(__assign({}, props), { func: func2 }));
        root.find(PureComp).simulate('click');
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(mapStateSpy).toHaveBeenCalledTimes(1);
        expect(func1).toHaveBeenCalled();
        expect(func2).not.toHaveBeenCalled();
    });
    it('should pass scoped state to mapStateToProps', function () {
        var _a = createMocks(mockPackage), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var PureCompNeedsState = function (_a) {
            var valueFromState = _a.valueFromState;
            return React.createElement("div", null, valueFromState);
        };
        var mapStateToProps = function (s, state) { return ({
            valueFromState: getValueFromState(state)
        }); };
        var ConnectedWithState = connectWithShell(mapStateToProps, undefined, shell)(PureCompNeedsState);
        var withConnectedState = renderInShellContext(React.createElement(ConnectedWithState, null)).parentWrapper;
        expect(withConnectedState && withConnectedState.text()).toBe(getValueFromState(getMockShellState(host)));
    });
    it('should bind shell context', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, host, renderInShellContext, cachedBoundShell, boundShellState, otherEntryPoint, getBoundShell, PureComp, mapStateToProps, ConnectedWithState, withConnectedState;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createMocks(mockPackage), host = _a.host, renderInShellContext = _a.renderInShellContext;
                    cachedBoundShell = null;
                    boundShellState = { mockValue: 'bound-value' };
                    otherEntryPoint = {
                        name: 'bound',
                        attach: function (shell) {
                            shell.contributeState(function () {
                                var _a;
                                return (_a = {},
                                    _a[mockShellStateKey] = function () { return boundShellState; },
                                    _a);
                            });
                            cachedBoundShell = shell;
                        }
                    };
                    getBoundShell = function () { return cachedBoundShell; };
                    return [4 /*yield*/, host.addShells([otherEntryPoint])];
                case 1:
                    _b.sent();
                    PureComp = function (_a) {
                        var value = _a.value;
                        return React.createElement("div", null, value);
                    };
                    mapStateToProps = function (shell, state) { return ({
                        value: getValueFromState(state)
                    }); };
                    ConnectedWithState = connectWithShell(mapStateToProps, undefined, getBoundShell())(PureComp);
                    withConnectedState = renderInShellContext(React.createElement(ConnectedWithState, null)).parentWrapper;
                    expect(withConnectedState && withConnectedState.text()).toBe(boundShellState.mockValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should re-provide shell context for children of bound component', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, host, shell, renderInShellContext, cachedBoundShell, boundShellState, otherEntryPoint, getBoundShell, PureComp, PureCompWithChildren, mapStateToProps, ConnectedUnboundComp, ConnectedUnboundCompWithChildren, ConnectedBoundCompWithChildren, withConnectedState;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = createMocks(mockPackage), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
                    cachedBoundShell = null;
                    boundShellState = { mockValue: 'bound-value' };
                    otherEntryPoint = {
                        name: 'bound',
                        attach: function (s) {
                            s.contributeState(function () {
                                var _a;
                                return (_a = {},
                                    _a[mockShellStateKey] = function () { return boundShellState; },
                                    _a);
                            });
                            cachedBoundShell = s;
                        }
                    };
                    getBoundShell = function () { return cachedBoundShell; };
                    return [4 /*yield*/, host.addShells([otherEntryPoint])];
                case 1:
                    _b.sent();
                    PureComp = function (_a) {
                        var value = _a.value;
                        return React.createElement("div", null, value);
                    };
                    PureCompWithChildren = function (_a) {
                        var children = _a.children, value = _a.value, id = _a.id;
                        return (React.createElement("div", { id: id, "data-value": value }, children));
                    };
                    mapStateToProps = function (s, state) { return ({
                        value: getValueFromState(state)
                    }); };
                    ConnectedUnboundComp = connectWithShell(mapStateToProps, undefined, shell)(PureComp);
                    ConnectedUnboundCompWithChildren = connectWithShell(mapStateToProps, undefined, shell)(PureCompWithChildren);
                    ConnectedBoundCompWithChildren = connectWithShell(mapStateToProps, undefined, getBoundShell())(PureCompWithChildren);
                    withConnectedState = renderInShellContext(React.createElement(ConnectedUnboundCompWithChildren, { id: "A" },
                        React.createElement(ConnectedBoundCompWithChildren, { id: "B" },
                            React.createElement(ConnectedUnboundComp, null)))).parentWrapper;
                    expect(withConnectedState && withConnectedState.find('div#A').prop('data-value')).toBe(getValueFromState(getMockShellState(host)));
                    expect(withConnectedState && withConnectedState.find('div#B').prop('data-value')).toBe(boundShellState.mockValue);
                    expect(withConnectedState && withConnectedState.text()).toBe(getValueFromState(getMockShellState(host)));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render contributed boundary aspect', function () {
        // arrange
        var _a = createMocks({
            name: 'ASPECT-TEST-EP',
            attach: function (myShell) {
                myShell.contributeBoundaryAspect(function (props) { return React.createElement("div", { className: "TEST-ASPECT" }, props.children); });
            }
        }), host = _a.host, shell = _a.shell;
        var PureComp = function () { return React.createElement("div", { className: "TEST-PURE-COMP" }, "TEST"); };
        var ConnectedComp = connectWithShell(undefined, undefined, shell)(PureComp);
        // act
        var result = renderInHost(React.createElement(ConnectedComp, null), host, shell);
        // assert
        var rootWrapper = result.root;
        expect(rootWrapper.find('div.TEST-ASPECT').length).toBe(1);
        expect(rootWrapper.find('div.TEST-PURE-COMP').length).toBe(1);
        expect(rootWrapper.exists('div.TEST-ASPECT div.TEST-PURE-COMP')).toBe(true);
    });
    it('should render multiple contributed boundary aspects', function () {
        // arrange
        var _a = createMocks({
            name: 'ASPECT-TEST-EP',
            attach: function (myShell) {
                myShell.contributeBoundaryAspect(function (props) { return React.createElement("div", { className: "TEST-ASPECT-A" }, props.children); });
                myShell.contributeBoundaryAspect(function (props) { return React.createElement("div", { className: "TEST-ASPECT-B" }, props.children); });
            }
        }), host = _a.host, shell = _a.shell;
        var PureComp = function () { return React.createElement("div", { className: "TEST-PURE-COMP" }, "TEST"); };
        var ConnectedComp = connectWithShell(undefined, undefined, shell)(PureComp);
        // act
        var result = renderInHost(React.createElement(ConnectedComp, null), host, shell);
        // assert
        var rootWrapper = result.root;
        expect(rootWrapper.find('div.TEST-ASPECT-A').length).toBe(1);
        expect(rootWrapper.find('div.TEST-ASPECT-B').length).toBe(1);
        expect(rootWrapper.find('div.TEST-PURE-COMP').length).toBe(1);
        expect(rootWrapper.exists('div.TEST-ASPECT-A div.TEST-ASPECT-B div.TEST-PURE-COMP')).toBe(true);
    });
    it('should handle boundary aspect contexts', function () {
        // arrange
        var TestAspectContext = React.createContext({ theNumber: 0 });
        var _a = createMocks({
            name: 'ASPECT-TEST-EP',
            attach: function (myShell) {
                myShell.contributeBoundaryAspect(function (props) { return (React.createElement("div", { className: "TEST-ASPECT" },
                    React.createElement(TestAspectContext.Provider, { value: { theNumber: 123 } }, props.children))); });
            }
        }), host = _a.host, shell = _a.shell;
        var PureComp = function () { return (React.createElement(TestAspectContext.Consumer, null, function (aspect) { return React.createElement("div", { className: "TEST-PURE-COMP" }, aspect.theNumber); })); };
        var ConnectedComp = connectWithShell(undefined, undefined, shell)(PureComp);
        // act
        var result = renderInHost(React.createElement(ConnectedComp, null), host, shell);
        // assert
        var rootWrapper = result.root;
        var pureCompQuery = rootWrapper.find('div.TEST-ASPECT div.TEST-PURE-COMP');
        expect(pureCompQuery.length).toBe(1);
        expect(pureCompQuery.first().text()).toBe('123');
    });
});
describe('connectWithShell-useCases', function () {
    var TwoAPI = { name: 'TWO_API', public: true };
    var ThreeAPI = { name: 'THREE_API', public: true };
    var entryPointOne = {
        name: 'ONE',
        getDependencyAPIs: function () { return [TwoAPI]; },
        attach: function (shell) {
            shell.contributeState(function () { return ({
                one: function (state, action) {
                    if (state === void 0) { state = { valueOne: 'init1' }; }
                    return action.type === 'SET_ONE' ? { valueOne: action.value } : state;
                }
            }); });
        }
    };
    var entryPointTwo = {
        name: 'TWO',
        declareAPIs: function () { return [TwoAPI]; },
        attach: function (shell) {
            shell.contributeState(function () { return ({
                two: function (state, action) {
                    if (state === void 0) { state = { valueTwo: 'init2' }; }
                    return action.type === 'SET_TWO' ? { valueTwo: action.value } : state;
                }
            }); });
            shell.contributeAPI(TwoAPI, function () { return ({
                getValueTwo: function () {
                    return shell.getStore().getState().two.valueTwo;
                }
            }); });
        }
    };
    var entryPointThree = {
        name: 'THREE',
        declareAPIs: function () { return [ThreeAPI]; },
        attach: function (shell) {
            var observableThree = shell.contributeObservableState(function () { return ({
                three: function (state, action) {
                    if (state === void 0) { state = { valueThree: 'init3' }; }
                    return action.type === 'SET_THREE' ? { valueThree: action.value } : state;
                }
            }); }, function (state) {
                return {
                    getValueThree: function () { return state.three.valueThree; }
                };
            });
            shell.contributeAPI(ThreeAPI, function () { return ({
                observables: {
                    three: observableThree
                }
            }); });
        }
    };
    var withDependencyAPIs = function (ep, deps) {
        return __assign(__assign({}, ep), { getDependencyAPIs: function () { return (ep.getDependencyAPIs ? __spreadArray(__spreadArray([], __read(ep.getDependencyAPIs())), __read(deps)) : deps); } });
    };
    var renderSpy = jest.fn();
    var mapStateToPropsSpy = jest.fn();
    var PureComp = function (_a) {
        var valueOne = _a.valueOne, valueTwo = _a.valueTwo, valueThree = _a.valueThree;
        renderSpy();
        return (React.createElement("div", null,
            React.createElement("div", { id: "ONE" }, valueOne),
            React.createElement("div", { id: "TWO" }, valueTwo),
            React.createElement("div", { id: "THREE" }, valueThree)));
    };
    var mapStateToProps = function (shell, state) {
        mapStateToPropsSpy();
        return {
            valueOne: state.one.valueOne,
            valueTwo: shell.getAPI(TwoAPI).getValueTwo(),
            valueThree: ''
        };
    };
    beforeEach(function () {
        renderSpy.mockClear();
        mapStateToPropsSpy.mockClear();
    });
    var handleAction = function (action, dom, _a) {
        var getStore = _a.getStore;
        getStore().dispatch(action);
        getStore().flush();
        //dom.update()
    };
    it('should include observable state in store', function () {
        var shell = createMocks(entryPointThree).shell;
        var state = shell.getStore().getState();
        expect(state).toBeDefined();
        expect(state.three.valueThree).toBe('init3');
    });
    it('should dispatch actions to observable reducers', function () {
        var shell = createMocks(entryPointThree).shell;
        shell.getStore().dispatch({ type: 'SET_THREE', value: 'updated_by_test' });
        var state = shell.getStore().getState();
        expect(state.three.valueThree).toEqual('updated_by_test');
    });
    it('should invoke subscribed callback when observed state changes', function () {
        var shell = createMocks(entryPointThree).shell;
        var receivedSelectors = [];
        shell.getAPI(ThreeAPI).observables.three.subscribe(shell, function (next) {
            receivedSelectors.push(next);
        });
        var _a = shell.getStore(), dispatch = _a.dispatch, flush = _a.flush;
        dispatch({ type: 'SET_THREE', value: 'updated_by_test' });
        flush();
        expect(receivedSelectors.length).toBe(1);
        expect(receivedSelectors[0].getValueThree()).toBe('updated_by_test');
    });
    it('should update component on change in regular state', function () {
        var _a = createMocks(entryPointOne, [entryPointTwo]), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var ConnectedComp = connectWithShell(mapStateToProps, undefined, shell)(PureComp);
        var root = renderInShellContext(React.createElement(ConnectedComp, null)).root;
        if (!root) {
            throw new Error('Connected component failed to render');
        }
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('init1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        handleAction({ type: 'SET_ONE', value: 'update1' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        handleAction({ type: 'SET_TWO', value: 'update2' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('update2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(3);
        expect(renderSpy).toHaveBeenCalledTimes(3);
        handleAction({ type: 'SOME_OTHER_ACTION' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('update2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(3);
        expect(renderSpy).toHaveBeenCalledTimes(3);
    });
    it('should not update uninterested component on change in observable state', function () {
        var _a = createMocks(entryPointOne, [entryPointTwo, entryPointThree]), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var ConnectedComp = connectWithShell(mapStateToProps, undefined, shell)(PureComp);
        var root = renderInShellContext(React.createElement(ConnectedComp, null)).root;
        if (!root) {
            throw new Error('Connected component failed to render');
        }
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('init1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        handleAction({ type: 'SET_ONE', value: 'update1' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        // this should not notify the uninterested component
        handleAction({ type: 'SET_THREE', value: 'update3' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
    });
    it('should update component through observer', function () {
        var _a = createMocks(withDependencyAPIs(entryPointOne, [ThreeAPI]), [
            entryPointTwo,
            entryPointThree
        ]), host = _a.host, shell = _a.shell, renderInShellContext = _a.renderInShellContext;
        var ConnectedComp = connectWithShellAndObserve({
            observedThree: host.getAPI(ThreeAPI).observables.three
        }, function (_shell, state, ownProps) {
            mapStateToPropsSpy();
            return {
                valueOne: state.one.valueOne,
                valueTwo: _shell.getAPI(TwoAPI).getValueTwo(),
                valueThree: (ownProps === null || ownProps === void 0 ? void 0 : ownProps.observedThree.getValueThree()) || 'N/A'
            };
        }, undefined, shell)(PureComp);
        var root = renderInShellContext(React.createElement(ConnectedComp, null)).root;
        if (!root) {
            throw new Error('Connected component failed to render');
        }
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('init1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(root.find(ConnectedComp).find('#THREE').text()).toBe('init3');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        handleAction({ type: 'SET_ONE', value: 'update1' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(root.find(ConnectedComp).find('#THREE').text()).toBe('init3');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        handleAction({ type: 'SET_THREE', value: 'update3' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(root.find(ConnectedComp).find('#THREE').text()).toBe('update3');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(3);
        expect(renderSpy).toHaveBeenCalledTimes(3);
        handleAction({ type: 'SOME_OTHER_ACTION' }, root, host);
        expect(root.find(ConnectedComp).find('#ONE').text()).toBe('update1');
        expect(root.find(ConnectedComp).find('#TWO').text()).toBe('init2');
        expect(root.find(ConnectedComp).find('#THREE').text()).toBe('update3');
        expect(mapStateToPropsSpy).toHaveBeenCalledTimes(3);
        expect(renderSpy).toHaveBeenCalledTimes(3);
    });
});
//# sourceMappingURL=connectWithShell.spec.js.map