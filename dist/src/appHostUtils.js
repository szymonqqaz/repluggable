"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.declaredAPIs = exports.dependentAPIs = void 0;
var lodash_1 = __importDefault(require("lodash"));
var dependentAPIs = function (entryPoint) {
    return lodash_1.default.chain(entryPoint).invoke('getDependencyAPIs').defaultTo([]).value();
};
exports.dependentAPIs = dependentAPIs;
var declaredAPIs = function (entryPoint) {
    return lodash_1.default.chain(entryPoint).invoke('declareAPIs').defaultTo([]).value();
};
exports.declaredAPIs = declaredAPIs;
//# sourceMappingURL=appHostUtils.js.map