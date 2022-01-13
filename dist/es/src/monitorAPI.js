import { interceptAnyObject } from './interceptAnyObject';
function isEnrichedMemoizationFunction(func) {
    return func.hasOwnProperty('cache') && func.hasOwnProperty('hit');
}
function isMemberNamesArray(value) {
    return Array.isArray(value);
}
export function monitorAPI(shell, hostOptions, apiName, api, 
//trace: Trace[],
//memoized: StatisticsMemoization[]
apiOptions) {
    if (hostOptions.monitoring.disableMonitoring || (apiOptions && apiOptions.disableMonitoring === true)) {
        return api;
    }
    var shouldMonitor = apiOptions && isMemberNamesArray(apiOptions.disableMonitoring)
        ? function (funcName) {
            var disableMonitoring = apiOptions.disableMonitoring;
            if (isMemberNamesArray(disableMonitoring)) {
                return !disableMonitoring.find(function (memberName) {
                    var memberNameString = memberName;
                    return (funcName.indexOf(memberNameString) === 0 &&
                        (funcName.length === memberNameString.length || funcName.charAt(memberNameString.length) === '.'));
                });
            }
        }
        : function () { return true; };
    return interceptAnyObject(api, function (funcName, originalFunc) {
        if (!shouldMonitor(funcName)) {
            console.log('DISABLED MONITORING>', funcName);
            return originalFunc;
        }
        //let funcId = `${apiName}::${funcName}`
        var isMemoized = false;
        if (isEnrichedMemoizationFunction(originalFunc)) {
            isMemoized = true;
            //funcId += '(Memoized)'
            //memoized.push({ name: funcId, func: originalFunc })
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var tags = {
                $api: apiName,
                $apiFunc: funcName,
                $args: args,
                $memoized: isMemoized || undefined
            };
            return shell.log.monitor(apiName + "." + funcName, tags, function () {
                return originalFunc.apply(api, args);
                //wrapWithMeasure(options, originalFunc, api, args, funcId, trace)
            });
        };
    }, undefined, apiOptions && apiOptions.includesNamespaces ? 4 : 0);
}
//# sourceMappingURL=monitorAPI.js.map