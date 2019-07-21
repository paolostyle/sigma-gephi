import Graph from 'graphology';
import gexf from 'graphology-gexf/browser';
import WebGLRenderer from '../src/renderers/webgl';

import arctic from './resources/graph.gexf';

const graph = gexf.parse(Graph, arctic);

graph.nodes().forEach(node => {
  const attr = graph.getNodeAttributes(node);

  graph.mergeNodeAttributes(node, {
    size: attr.size / 10
  });
});

const container = document.getElementById('container');

const renderer = new WebGLRenderer(graph, container, {
  edgeColorMode: 'source'
});

window.renderer = renderer;
window.camera = renderer.getCamera();
