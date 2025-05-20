<template>
  <!--
    By default, the editor completely fills its parent HTML element.
    If you directly use the editor in the <body> element, make sure to use
    a wrapper <div> with specified width and height properties:
          -->
  <div style="width: 100vw; height: 100vh">
    <baklava-editor :view-model="baklava"/>
    <el-button @click="open()"></el-button>
  </div>
</template>

<script>
import {
  EditorComponent,
  useBaklava,
  DependencyEngine,
  applyResult
} from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";

import {DisplayNode} from "./DisplayNode";
import {MathNode} from "./MathNode";

export default {
  components: {
    "baklava-editor": EditorComponent
  },

  data() {
    return {
      baklava: null
    }
  },

  created() {
    const that = this
    this.baklava = useBaklava();
    const engine = new DependencyEngine(this.baklava.editor);

    this.baklava.editor.registerNodeType(MathNode);
    this.baklava.editor.registerNodeType(DisplayNode);

    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, that.baklava.editor);
      engine.resume();
    });

    engine.start();


    // Add some nodes for demo purposes


    const node1 = that.addNodeWithCoordinates(MathNode, 300, 140);
    const node2 = that.addNodeWithCoordinates(DisplayNode, 550, 140);
    this.baklava.displayedGraph.addConnection(
        node1.outputs.result,
        node2.inputs.value
    );
  },

  methods: {
    addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      this.baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    },
    open() {
      console.info(this.baklava.editor.save())
    }
  }
}


</script>
