<template>
  <div>{{ deepClonedData }}</div>
</template>

<script>
export default {
  data() {
    return {
      originalData: {
        nested: {
          value: 'hello'
        }
      },
      deepClonedData: null
    };
  },
  mounted() {
    // 使用全局Lodash实例进行深拷贝
    this.deepClonedData = this.$_.cloneDeep(this.originalData);
  }
};
</script>