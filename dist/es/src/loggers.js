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
var consoleLoggerSpan = {
    end: function (success, error, keyValuePairs) {
        if (error) {
            console.error(error, keyValuePairs);
        }
    }
};
export var ConsoleHostLogger = {
    spanRoot: function (messageId, error, keyValuePairs) {
        return consoleLoggerSpan;
    },
    spanChild: function (messageId, error, keyValuePairs) {
        return consoleLoggerSpan;
    },
    log: function (severity, id, error, keyValuePairs) {
        var consoleFunc = getConsoleOutputFunc(severity);
        consoleFunc(id, keyValuePairs);
    }
};
export function createShellLogger(host, entryPoint) {
    var entryPointTags = buildEntryPointTags();
    var spanChild = function (messageId, keyValuePairs) {
        return host.log.spanChild(messageId, withEntryPointTags(keyValuePairs));
    };
    var spanRoot = function (messageId, keyValuePairs) {
        return host.log.spanRoot(messageId, withEntryPointTags(keyValuePairs));
    };
    return {
        log: function (severity, id, keyValuePairs) {
            host.log.log(severity, id, undefined, withEntryPointTags(keyValuePairs));
        },
        debug: function (messageId, keyValuePairs) {
            host.log.log('debug', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        info: function (messageId, keyValuePairs) {
            host.log.log('info', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        warning: function (messageId, keyValuePairs) {
            host.log.log('warning', messageId, undefined, withEntryPointTags(keyValuePairs));
        },
        error: function (messageId, error, keyValuePairs) {
            host.log.log('error', messageId, error, withEntryPointTags(keyValuePairs));
        },
        critical: function (messageId, error, keyValuePairs) {
            host.log.log('critical', messageId, error, withEntryPointTags(keyValuePairs));
        },
        spanChild: spanChild,
        spanRoot: spanRoot,
        monitor: monitor
    };
    function monitor(messageId, keyValuePairs, monitoredCode) {
        var allTags = withEntryPointTags(keyValuePairs);
        var span = spanChild(messageId, allTags);
        try {
            var returnValue = monitoredCode();
            if (isPromise(returnValue)) {
                return returnValue
                    .then(function (retVal) {
                    span.end(true, undefined, __assign(__assign({}, allTags), { returnValue: retVal }));
                    return retVal;
                })
                    .catch(function (error) {
                    span.end(false, error, allTags);
                    throw error;
                });
            }
            span.end(true, undefined, __assign(__assign({}, allTags), { returnValue: returnValue }));
            return returnValue;
        }
        catch (error) {
            span.end(false, error, allTags);
            throw error;
        }
    }
    function buildEntryPointTags() {
        return entryPoint.tags ? __assign(__assign({}, entryPoint.tags), { $ep: entryPoint.name }) : { $ep: entryPoint.name };
    }
    function withEntryPointTags(keyValuePairs) {
        return keyValuePairs ? __assign(__assign({}, keyValuePairs), entryPointTags) : entryPointTags;
    }
    function isPromise(obj) {
        return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
    }
}
function getConsoleOutputFunc(severity) {
    switch (severity) {
        case 'debug':
            return console.debug;
        case 'event':
            return console.info;
        case 'warning':
            return console.warn;
        case 'error':
        case 'critical':
            return console.error;
        default:
            return console.log;
    }
}
//# sourceMappingURL=loggers.js.map