import {defineStore} from "pinia";

export const useServerLoadingStore = defineStore("loading", {
    state() {
        return {
            loading: false,
        };
    },
    actions: {
        isLoading(val) {
            this.loading = val;
        },
    },
});

