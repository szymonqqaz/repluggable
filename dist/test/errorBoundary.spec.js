"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var testKit_1 = require("../testKit");
var src_1 = require("../src");
describe('ErrorBoundary', function () {
    var renderShouldThrow;
    var TestComponent = function () {
        if (renderShouldThrow) {
            throw new Error('Test error');
        }
        return react_1.default.createElement("div", { className: "test-comp" }, "test comp");
    };
    it('should render enclosed UI when no errors', function () {
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = false;
        var root = testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell },
            react_1.default.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(true);
    });
    it('should render empty on error', function () {
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = true;
        var root = testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell },
            react_1.default.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        expect(root === null || root === void 0 ? void 0 : root.isEmptyRender()).toBe(true);
    });
    it('should recover by change in store', function () {
        var host = testKit_1.createAppHost([]);
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = true;
        var root = testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell },
            react_1.default.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        renderShouldThrow = false;
        host.getStore().dispatch({ type: 'TEST' });
        host.getStore().flush();
        root === null || root === void 0 ? void 0 : root.update();
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(true);
    });
    it('should show sticky error', function () {
        var host = testKit_1.createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = true;
        var root = testKit_1.withConsoleErrors(function () {
            return testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell, componentName: "test_comp" },
                react_1.default.createElement(TestComponent, null)), host, shell);
        }).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        expect(root === null || root === void 0 ? void 0 : root.exists('.component-error')).toBe(true);
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').text()).toContain("error in " + shell.name + " / test_comp");
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').find('button').text()).toBe('reset');
    });
    it('should keep sticky error after change in store', function () {
        var host = testKit_1.createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = true;
        var root = testKit_1.withConsoleErrors(function () {
            return testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell, componentName: "test_comp" },
                react_1.default.createElement(TestComponent, null)), host, shell);
        }).root;
        renderShouldThrow = false;
        host.getStore().dispatch({ type: 'TEST' });
        host.getStore().flush();
        root === null || root === void 0 ? void 0 : root.update();
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        expect(root === null || root === void 0 ? void 0 : root.exists('.component-error')).toBe(true);
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').text()).toContain("error in " + shell.name + " / test_comp");
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').find('button').text()).toBe('reset');
    });
    it('should reset sticky error on reset button click', function () {
        var host = testKit_1.createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = testKit_1.addMockShell(host);
        renderShouldThrow = true;
        var root = testKit_1.withConsoleErrors(function () {
            return testKit_1.renderInHost(react_1.default.createElement(src_1.ErrorBoundary, { shell: shell, componentName: "test_comp" },
                react_1.default.createElement(TestComponent, null)), host, shell);
        }).root;
        var resetButton = root === null || root === void 0 ? void 0 : root.find('.component-error').find('button');
        expect(resetButton === null || resetButton === void 0 ? void 0 : resetButton.exists()).toBe(true);
        renderShouldThrow = false;
        resetButton === null || resetButton === void 0 ? void 0 : resetButton.simulate('click');
        root === null || root === void 0 ? void 0 : root.update();
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(true);
        expect(root === null || root === void 0 ? void 0 : root.exists('.component-error')).toBe(false);
    });
});
//# sourceMappingURL=errorBoundary.spec.js.map