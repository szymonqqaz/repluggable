"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var propsDeepEqual_1 = require("../src/propsDeepEqual");
var MyComponent = function (_a) {
    var value = _a.value, comp = _a.comp;
    return (react_1.default.createElement("div", null,
        value,
        " - ",
        comp));
};
describe('propsDeepEqual', function () {
    it('should compare two equal components', function () {
        var comp101 = react_1.default.createElement(MyComponent, { value: 10, comp: react_1.default.createElement(MyComponent, { value: 10, comp: react_1.default.createElement("div", null) }) });
        var comp102 = react_1.default.createElement(MyComponent, { value: 10, comp: react_1.default.createElement(MyComponent, { value: 10, comp: react_1.default.createElement("div", null) }) });
        var comp20 = react_1.default.createElement(MyComponent, { value: 10, comp: react_1.default.createElement(MyComponent, { value: 20, comp: react_1.default.createElement("div", null) }) });
        expect(propsDeepEqual_1.propsDeepEqual(comp101.props, comp102.props)).toBeTruthy();
        expect(propsDeepEqual_1.propsDeepEqual(comp101.props, comp20.props)).toBeFalsy();
    });
    it('should avoid circular references', function () { });
});
//# sourceMappingURL=propsDeepEqual.spec.js.map