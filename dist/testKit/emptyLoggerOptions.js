"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyLoggerOptions = void 0;
exports.emptyLoggerOptions = {
    logger: {
        log: jest.fn(),
        spanChild: jest.fn().mockImplementation(function () { return ({
            end: function () { }
        }); }),
        spanRoot: jest.fn().mockImplementation(function () { return ({
            end: function () { }
        }); })
    },
    monitoring: {
        disableMonitoring: true
    }
};
//# sourceMappingURL=emptyLoggerOptions.js.map