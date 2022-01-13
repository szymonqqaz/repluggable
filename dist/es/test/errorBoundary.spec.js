import React from 'react';
import { createAppHost, addMockShell, renderInHost, withConsoleErrors } from '../testKit';
import { ErrorBoundary } from '../src';
describe('ErrorBoundary', function () {
    var renderShouldThrow;
    var TestComponent = function () {
        if (renderShouldThrow) {
            throw new Error('Test error');
        }
        return React.createElement("div", { className: "test-comp" }, "test comp");
    };
    it('should render enclosed UI when no errors', function () {
        var host = createAppHost([]);
        var shell = addMockShell(host);
        renderShouldThrow = false;
        var root = renderInHost(React.createElement(ErrorBoundary, { shell: shell },
            React.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(true);
    });
    it('should render empty on error', function () {
        var host = createAppHost([]);
        var shell = addMockShell(host);
        renderShouldThrow = true;
        var root = renderInHost(React.createElement(ErrorBoundary, { shell: shell },
            React.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        expect(root === null || root === void 0 ? void 0 : root.isEmptyRender()).toBe(true);
    });
    it('should recover by change in store', function () {
        var host = createAppHost([]);
        var shell = addMockShell(host);
        renderShouldThrow = true;
        var root = renderInHost(React.createElement(ErrorBoundary, { shell: shell },
            React.createElement(TestComponent, null)), host, shell).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        renderShouldThrow = false;
        host.getStore().dispatch({ type: 'TEST' });
        host.getStore().flush();
        root === null || root === void 0 ? void 0 : root.update();
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(true);
    });
    it('should show sticky error', function () {
        var host = createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = addMockShell(host);
        renderShouldThrow = true;
        var root = withConsoleErrors(function () {
            return renderInHost(React.createElement(ErrorBoundary, { shell: shell, componentName: "test_comp" },
                React.createElement(TestComponent, null)), host, shell);
        }).root;
        expect(root === null || root === void 0 ? void 0 : root.exists('.test-comp')).toBe(false);
        expect(root === null || root === void 0 ? void 0 : root.exists('.component-error')).toBe(true);
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').text()).toContain("error in " + shell.name + " / test_comp");
        expect(root === null || root === void 0 ? void 0 : root.find('.component-error').find('button').text()).toBe('reset');
    });
    it('should keep sticky error after change in store', function () {
        var host = createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = addMockShell(host);
        renderShouldThrow = true;
        var root = withConsoleErrors(function () {
            return renderInHost(React.createElement(ErrorBoundary, { shell: shell, componentName: "test_comp" },
                React.createElement(TestComponent, null)), host, shell);
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
        var host = createAppHost([], { monitoring: {}, enableStickyErrorBoundaries: true });
        var shell = addMockShell(host);
        renderShouldThrow = true;
        var root = withConsoleErrors(function () {
            return renderInHost(React.createElement(ErrorBoundary, { shell: shell, componentName: "test_comp" },
                React.createElement(TestComponent, null)), host, shell);
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