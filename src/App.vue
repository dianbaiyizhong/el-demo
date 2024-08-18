<template>
  <div v-loading.fullscreen.lock="loading.loading">
    <router-view></router-view>
  </div>
</template>

<script>
import {useServerLoadingStore} from "@/store/index.js";


export default {
  name: 'App',
  data() {
    return {
      loading: false,
    }
  },
  mounted() {

    this.loading = useServerLoadingStore();

  }
};
</script>