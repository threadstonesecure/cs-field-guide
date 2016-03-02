function onLoad() {
    var graph = Viva.Graph.graph(),
        nodePositions = [{x : -50, y: 0}, {x : 0, y: -50}, {x : 50, y: 0}], // predefined node positions
        layout = Viva.Graph.Layout.constant(graph),
        renderer = Viva.Graph.View.renderer(graph, {
                       layout     : layout, // use our custom 'constant' layout
                   }),
        i, nodesCount = nodePositions.length; // convinience variables.
    // Add nodes
    for(i = 0; i < nodesCount; ++i) {
        graph.addNode(i, nodePositions[i]);
    }
    // and make them connected in cycle:
    for (i = 0; i < nodesCount; ++i) {
        graph.addLink(i % nodesCount, (i + 1) % nodesCount);
    }
    // set custom node placement callback for layout.
    // if you don't do this, constant layout performs random positioning.
    layout.placeNode(function(node) {
        // node.id - points to its position but you can do your
        // random logic here. E.g. read from specific node.data
        // attributes. This callback is expected to return object {x : .. , y : .. }
        return nodePositions[node.id];
    });
    renderer.run();
}