<template>
  <h1>这是儿子: {{ param.key1 }}</h1>
</template>
<script>
import {httpGet} from "@/request/strategy/No0Handler.ts";

export default {

  props: {
    param: null
  },

  methods: {},

  async created() {
    console.log("son created...")
    let res = await httpGet('getTableData')
    console.info(res)


    this.param.key1 = "333"
    this.$emit('update:modelValue', this.param)
    this.$emit("initSonFinish")

  },


  mounted() {
    console.log("son mounted...")
  }
}


</script>


<style scoped>

</style>