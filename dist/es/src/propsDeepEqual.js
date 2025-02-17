import _ from 'lodash';
import { isValidElement } from 'react';
export var propsDeepEqual = function (propsA, propsB) {
    var customizer = function (a, b, key, objectA) {
        if (isValidElement(a)) {
            if (!isValidElement(b)) {
                return false;
            }
            if (a === b) {
                return true;
            }
            return a.key === b.key && a.type === b.type && propsDeepEqual(a.props, b.props);
        }
        if (key === 'children' && objectA === propsA) {
            if (typeof a === 'function' && typeof b === 'function') {
                return false;
            }
            return;
        }
        if (typeof a === 'function' && typeof b === 'function') {
            return true;
        }
        return;
    };
    return _.isEqualWith(propsA, propsB, customizer);
};
//# sourceMappingURL=propsDeepEqual.js.map