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
import _ from 'lodash';
export function getPerformanceDebug(options, trace, memoized) {
    var getMemoizedTable = function () {
        return _.map(memoized, function (memoize) {
            var _a = memoize.func, calls = _a.calls, hit = _a.hit, miss = _a.miss;
            var hitRate = ((hit / calls) * 100).toFixed(2) + "%";
            var name = memoize.name;
            return { name: name, hitRate: hitRate, calls: calls, hit: hit, miss: miss };
        });
    };
    var getGroups = function (apiName) {
        var api = _.groupBy(trace, 'name')[apiName];
        try {
            var groupedArgs = _.groupBy(api, function (a) { return JSON.stringify(a.args); });
            var groupedRes = _.groupBy(api, function (a) { return JSON.stringify(a.res); });
            var groupedArgsAndRes = _.groupBy(api, function (a) { return JSON.stringify(a.args) + JSON.stringify(a.res); });
            return { groupedArgs: groupedArgs, groupedRes: groupedRes, groupedArgsAndRes: groupedArgsAndRes };
        }
        catch (err) {
            return { groupedArgs: [], groupedRes: [], groupedArgsAndRes: [] };
        }
    };
    var printMemoizeTable = function () {
        console.table(getMemoizedTable());
    };
    return {
        getSortedMeasurments: function () {
            return _(trace)
                .map(function (measurement) { return _.pick(measurement, ['name', 'duration']); })
                .sortBy('duration')
                .reverse()
                .value();
        },
        start: function () {
            if (!options.monitoring.disableMonitoring) {
                options.monitoring.enablePerformance = true;
            }
            else {
                console.log('Remove "disableMonitoring" in order to use trace');
            }
        },
        stop: function () {
            options.monitoring.enablePerformance = false;
        },
        clean: function () {
            trace.length = 0;
        },
        getTrace: function () {
            return trace;
        },
        getGroupedTrace: function () {
            return _.groupBy(trace, 'name');
        },
        getGroupedSumTrace: function () {
            var traceData = _(trace)
                .groupBy('name')
                .mapValues(function (arr, name) {
                var totalDuration = Number(_.sumBy(arr, 'duration').toFixed(2));
                var times = arr.length;
                var avgDuration = Number((totalDuration / times).toFixed(2));
                var groups = _(getGroups(name))
                    .mapValues(function (obj, group) {
                    var keys = Object.keys(obj);
                    length = keys.length;
                    if (group !== 'groupedRes' || length === 0) {
                        return length;
                    }
                    var joined = keys.join(' ');
                    return joined.length < 15 ? length + ": " + joined : length;
                })
                    .value();
                return __assign({ name: name, times: times, totalDuration: totalDuration, avgDuration: avgDuration }, groups);
            })
                .orderBy(function (x) { return x.totalDuration; }, 'desc')
                .value();
            _.forEach(getMemoizedTable(), function (memoizeData) {
                _.assign(_.find(traceData, { name: memoizeData.name }), memoizeData);
            });
            console.table(traceData);
        },
        analyseAPI: function (apiName) {
            var groups = getGroups(apiName);
            if (groups) {
                var groupedArgs = groups.groupedArgs, groupedRes = groups.groupedRes, groupedArgsAndRes = groups.groupedArgsAndRes;
                console.log("groupedArgs: " + Object.keys(groupedArgs).length, groupedArgs);
                console.log("groupedRes: " + Object.keys(groupedRes).length, groupedRes);
                console.log("groupedArgsAndRes: " + Object.keys(groupedArgsAndRes).length, groupedArgsAndRes);
            }
        },
        getMemoized: function () { return memoized; },
        printMemoizeTable: printMemoizeTable
    };
}
//# sourceMappingURL=performanceDebugInfo.js.map