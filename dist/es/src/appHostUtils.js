import _ from 'lodash';
export var dependentAPIs = function (entryPoint) {
    return _.chain(entryPoint).invoke('getDependencyAPIs').defaultTo([]).value();
};
export var declaredAPIs = function (entryPoint) {
    return _.chain(entryPoint).invoke('declareAPIs').defaultTo([]).value();
};
//# sourceMappingURL=appHostUtils.js.map