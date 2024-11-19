<template>
  <div ref="panzoomElement">
    <div class="timberwolves ripple">

    </div>
  </div>

</template>

<script>
import panzoom from "panzoom";

export default {
  mounted() {
    // 初始化panzoom
    // panzoom(this.$refs.panzoomElement, {
    //   // 可以在这里设置panzoom选项
    // });
  },
  beforeDestroy() {
    // 销毁panzoom实例
    // panzoom(this.$refs.panzoomElement).dispose();
  }
};
</script>

<style scoped>

.timberwolves {
  width: 360px;
  height: 225px;
  background-image: url('timberwolves.jpg');
  background-position: center;
  background-size: 150%;
  clip-path: path('./timberwolves_mask.svg#svgPath');

}


.ripple {
  --ripple-color: rgba(0, 50, 0, 1);
}
</style>