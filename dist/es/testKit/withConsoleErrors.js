var noopConsoleError = function () { };
export function withConsoleErrors(action, mock) {
    var savedConsoleError = console.error;
    console.error = mock || noopConsoleError;
    try {
        return action();
    }
    finally {
        console.error = savedConsoleError;
    }
}
//# sourceMappingURL=withConsoleErrors.js.map