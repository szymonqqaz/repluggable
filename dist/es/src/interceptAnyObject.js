import _ from 'lodash';
export function interceptAnyObject(inner, onFunction, onProperty, includeNestedLevels) {
    var result = _.mapValues(inner, function (original, key) {
        if (typeof original === 'function' && typeof onFunction === 'function') {
            return onFunction(key, original);
        }
        if (includeNestedLevels && _.isObjectLike(original)) {
            return interceptAnyObject(original, onFunction ? function (name, func) { return onFunction(key + "." + name, func); } : undefined, onProperty ? function (name, value) { return onProperty(key + "." + name, value); } : undefined, includeNestedLevels - 1);
        }
        if (typeof onProperty === 'function') {
            return onProperty(key, original);
        }
        return original;
    });
    return result;
}
//# sourceMappingURL=interceptAnyObject.js.map