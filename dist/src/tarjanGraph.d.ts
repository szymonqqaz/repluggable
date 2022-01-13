export declare class Graph {
    private readonly map;
    private addOrGetVertex;
    getVertices(): IterableIterator<Vertex>;
    addConnection(source: string, target: string): void;
}
declare class Vertex {
    name: string;
    connections: Vertex[];
    index: number;
    lowLink: number;
    constructor(name: string);
}
export declare class Tarjan {
    private readonly graph;
    private index;
    private readonly stack;
    private readonly scc;
    constructor(graph: Graph);
    run(): Vertex[][];
    private strongConnect;
}
export {};
//# sourceMappingURL=tarjanGraph.d.ts.map