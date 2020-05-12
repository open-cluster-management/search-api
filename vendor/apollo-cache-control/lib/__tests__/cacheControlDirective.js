"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var _1 = require("../");
var helpers_1 = require("./test-utils/helpers");
describe('@cacheControl directives', function () {
    it('should set maxAge: 0 and no scope for a field without cache hints', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid\n      }\n\n      type Droid {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ")];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 0 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should set maxAge to the default and no scope for a field without cache hints', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid\n      }\n\n      type Droid {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 10 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should set the specified maxAge from a cache hint on the field', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid @cacheControl(maxAge: 60)\n      }\n\n      type Droid {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 60 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should set the specified maxAge for a field from a cache hint on the target type', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid\n      }\n\n      type Droid @cacheControl(maxAge: 60) {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 60 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should overwrite the default maxAge when maxAge=0 is specified on the type', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid\n      }\n\n      type Droid @cacheControl(maxAge: 0) {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 0 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should override the maxAge from the target type with that specified on a field', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid @cacheControl(maxAge: 120)\n      }\n\n      type Droid @cacheControl(maxAge: 60) {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 120 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should override the maxAge from the target type with that specified on a field, keeping the scope', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid @cacheControl(maxAge: 120)\n      }\n\n      type Droid @cacheControl(maxAge: 60, scope: PRIVATE) {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 120, scope: _1.CacheScope.Private });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should override the scope from the target type with that specified on a field', function () { return __awaiter(_this, void 0, void 0, function () {
        var schema, hints;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schema = graphql_1.buildSchema("\n      type Query {\n        droid(id: ID!): Droid @cacheControl(scope: PRIVATE)\n      }\n\n      type Droid @cacheControl(maxAge: 60, scope: PUBLIC) {\n        id: ID!\n        name: String!\n      }\n    ");
                    return [4 /*yield*/, helpers_1.collectCacheControlHints(schema, "\n        query {\n          droid(id: 2001) {\n            name\n          }\n        }\n      ", { defaultMaxAge: 10 })];
                case 1:
                    hints = _a.sent();
                    expect(hints).toContainEqual({ path: ['droid'], maxAge: 60, scope: _1.CacheScope.Private });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=cacheControlDirective.js.map