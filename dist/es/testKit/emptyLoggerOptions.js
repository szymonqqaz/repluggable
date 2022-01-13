export var emptyLoggerOptions = {
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