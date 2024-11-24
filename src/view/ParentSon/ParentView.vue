<template>

  <SonView v-model:param="param" v-on:initSonFinish="initSonFinish"></SonView>


  <h1>这是父亲</h1>

</template>


<script>
import SonView from "@/view/ParentSon/SonView.vue";

export default {
  methods: {
    initSonFinish() {
      console.info(this.param)
      console.info("initSonFinish")
    }
  },



  data() {
    return {
      param: {
        "key1": 1,
        "key2": 2
      }
    }

  },

  components: {
    SonView
  },

  created() {
    console.log("parent created...")
  },

  mounted() {
    console.log("parent mounted...")
  }


}

</script>


<style scoped>

</style>