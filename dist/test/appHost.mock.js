"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectCircularEntryPoints = exports.createCircularEntryPoints = void 0;
var createCircularEntryPoints = function (usePublicAPIKeys) {
    if (usePublicAPIKeys === void 0) { usePublicAPIKeys = false; }
    var MockAPI1 = { name: 'Mock-API-1', public: usePublicAPIKeys };
    var MockAPI2 = { name: 'Mock-API-2', public: usePublicAPIKeys };
    var MockAPI3 = { name: 'Mock-API-3', public: usePublicAPIKeys };
    var MockAPI4 = { name: 'Mock-API-4', public: usePublicAPIKeys };
    var ep1Deps = usePublicAPIKeys
        ? [
            { name: 'Mock-API-2', public: true },
            { name: 'Mock-API-3', public: true }
        ]
        : [MockAPI2, MockAPI3];
    var ep2Deps = usePublicAPIKeys ? [{ name: 'Mock-API-4', public: true }] : [MockAPI4];
    var ep3Deps = usePublicAPIKeys ? [{ name: 'Mock-API-4', public: true }] : [MockAPI4];
    var ep4Deps = usePublicAPIKeys ? [{ name: 'Mock-API-1', public: true }] : [MockAPI1];
    return [
        {
            name: 'MOCK_ENTRY_POINT_1',
            getDependencyAPIs: function () { return ep1Deps; },
            declareAPIs: function () { return [MockAPI1]; }
        },
        {
            name: 'MOCK_ENTRY_POINT_2',
            getDependencyAPIs: function () { return ep2Deps; },
            declareAPIs: function () { return [MockAPI2]; }
        },
        {
            name: 'MOCK_ENTRY_POINT_3',
            getDependencyAPIs: function () { return ep3Deps; },
            declareAPIs: function () { return [MockAPI3]; }
        },
        {
            name: 'MOCK_ENTRY_POINT_4',
            getDependencyAPIs: function () { return ep4Deps; },
            declareAPIs: function () { return [MockAPI4]; }
        }
    ];
};
exports.createCircularEntryPoints = createCircularEntryPoints;
var createDirectCircularEntryPoints = function (usePublicAPIKeys) {
    if (usePublicAPIKeys === void 0) { usePublicAPIKeys = false; }
    var MockAPI1 = { name: 'Mock-API-1', public: usePublicAPIKeys };
    var MockAPI2 = { name: 'Mock-API-2', public: usePublicAPIKeys };
    return [
        {
            name: 'MOCK_ENTRY_POINT_1',
            getDependencyAPIs: function () { return [usePublicAPIKeys ? { name: 'Mock-API-2', public: true } : MockAPI2]; },
            declareAPIs: function () { return [MockAPI1]; }
        },
        {
            name: 'MOCK_ENTRY_POINT_2',
            getDependencyAPIs: function () { return [usePublicAPIKeys ? { name: 'Mock-API-1', public: true } : MockAPI1]; },
            declareAPIs: function () { return [MockAPI2]; }
        }
    ];
};
exports.createDirectCircularEntryPoints = createDirectCircularEntryPoints;
//# sourceMappingURL=appHost.mock.js.map