/*
    Based on:
    https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
    https://gist.github.com/chadhutchins/1440602
*/
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Graph = /** @class */ (function () {
    function Graph() {
        this.map = new Map();
    }
    Graph.prototype.addOrGetVertex = function (value) {
        var vertex = this.map.get(value);
        if (!vertex) {
            vertex = new Vertex(value);
            this.map.set(value, vertex);
        }
        return vertex;
    };
    Graph.prototype.getVertices = function () {
        return this.map.values();
    };
    Graph.prototype.addConnection = function (source, target) {
        this.addOrGetVertex(source).connections.push(this.addOrGetVertex(target));
    };
    return Graph;
}());
export { Graph };
var Vertex = /** @class */ (function () {
    function Vertex(name) {
        this.name = name;
        this.connections = [];
        this.index = -1;
        this.lowLink = -1;
    }
    return Vertex;
}());
var Tarjan = /** @class */ (function () {
    function Tarjan(graph) {
        this.graph = graph;
        this.index = 0;
        this.stack = [];
        this.scc = [];
    }
    Tarjan.prototype.run = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.graph.getVertices()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                if (v.index < 0) {
                    this.strongConnect(v);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.scc;
    };
    Tarjan.prototype.strongConnect = function (vertex) {
        var e_2, _a;
        vertex.index = this.index;
        vertex.lowLink = this.index;
        this.index = this.index + 1;
        this.stack.push(vertex);
        var _loop_1 = function (w) {
            var v = vertex;
            if (w.index < 0) {
                this_1.strongConnect(w);
                v.lowLink = Math.min(v.lowLink, w.lowLink);
            }
            else if (this_1.stack.some(function (x) { return x.name === w.name; })) {
                v.lowLink = Math.min(v.lowLink, w.index);
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(vertex.connections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var w = _c.value;
                _loop_1(w);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (vertex.lowLink === vertex.index) {
            var vertices = [];
            var w = null;
            if (this.stack.length > 0) {
                do {
                    w = this.stack.pop();
                    w && vertices.push(w);
                } while (vertex.name !== (w === null || w === void 0 ? void 0 : w.name));
            }
            if (vertices.length > 0) {
                this.scc.push(vertices);
            }
        }
    };
    return Tarjan;
}());
export { Tarjan };
//# sourceMappingURL=tarjanGraph.js.map