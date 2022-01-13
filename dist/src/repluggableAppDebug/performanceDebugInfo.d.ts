import _ from 'lodash';
import { AppHostOptions, Trace, StatisticsMemoization } from '../API';
export declare function getPerformanceDebug(options: AppHostOptions, trace: Trace[], memoized: StatisticsMemoization[]): {
    getSortedMeasurments: () => Pick<Trace, "name" | "duration">[];
    start: () => void;
    stop: () => void;
    clean: () => void;
    getTrace: () => Trace[];
    getGroupedTrace: () => _.Dictionary<Trace[]>;
    getGroupedSumTrace: () => void;
    analyseAPI: (apiName: string) => void;
    getMemoized: () => StatisticsMemoization[];
    printMemoizeTable: () => void;
};
//# sourceMappingURL=performanceDebugInfo.d.ts.map