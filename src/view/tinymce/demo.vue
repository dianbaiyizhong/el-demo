<template>
  <div class="home">
    <tinymce ref="editor" v-model="msg" :disabled="disabled" @onClick="onClick"></tinymce>
    <!--<el-button @click="clear">清空表格</el-button>-->
    <!--<el-button @click="disabled = true">禁用</el-button>-->
  </div>
</template>

<script>

import Tinymce from "./Tinymce.vue";
export default {
  name: "RichText",
  components: { Tinymce },
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false
    }
  },
  // 实例创建完成
  created() {
  },
  // 组件挂载完毕
  mounted() {
  },
  methods: {
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    }

  }

}
</script>

<style scoped>

</style>