"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConsoleErrors = void 0;
var noopConsoleError = function () { };
function withConsoleErrors(action, mock) {
    var savedConsoleError = console.error;
    console.error = mock || noopConsoleError;
    try {
        return action();
    }
    finally {
        console.error = savedConsoleError;
    }
}
exports.withConsoleErrors = withConsoleErrors;
//# sourceMappingURL=withConsoleErrors.js.map