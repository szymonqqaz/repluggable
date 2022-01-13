import React from 'react';
import { propsDeepEqual } from '../src/propsDeepEqual';
var MyComponent = function (_a) {
    var value = _a.value, comp = _a.comp;
    return (React.createElement("div", null,
        value,
        " - ",
        comp));
};
describe('propsDeepEqual', function () {
    it('should compare two equal components', function () {
        var comp101 = React.createElement(MyComponent, { value: 10, comp: React.createElement(MyComponent, { value: 10, comp: React.createElement("div", null) }) });
        var comp102 = React.createElement(MyComponent, { value: 10, comp: React.createElement(MyComponent, { value: 10, comp: React.createElement("div", null) }) });
        var comp20 = React.createElement(MyComponent, { value: 10, comp: React.createElement(MyComponent, { value: 20, comp: React.createElement("div", null) }) });
        expect(propsDeepEqual(comp101.props, comp102.props)).toBeTruthy();
        expect(propsDeepEqual(comp101.props, comp20.props)).toBeFalsy();
    });
    it('should avoid circular references', function () { });
});
//# sourceMappingURL=propsDeepEqual.spec.js.map