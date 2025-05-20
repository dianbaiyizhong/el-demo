import {createRouter, createWebHistory} from 'vue-router';


import App from '@/App.vue';
import EchartDemo from '@/view/EchartDemo.vue';
import TableDemo from '@/view/TableDemo.vue';
import CardDemo from '@/view/CardDemo.vue';
import TinymceDemo from '@/view/tinymce/demo.vue';
import Mask from '@/view/mask.vue';
import ParentView from "@/view/ParentSon/ParentView.vue";
import QueryBuilderView from "@/view/QueryBuilderView.vue";
import Ai from "@/view/Ai.vue";
import ComfyUI from "@/view/comfyui/ComfyUI.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: App},
        {path: '/echart', component: EchartDemo},
        {path: '/ai', component: Ai},
        {path: '/ComfyUI', component: ComfyUI},
        {path: '/table', component: TableDemo},
        {path: '/card', component: CardDemo},
        {path: '/tinymce', component: TinymceDemo},
        {path: '/mask', component: Mask},
        {path: '/parentSon', component: ParentView},
        {path: '/queryBuilder', component: QueryBuilderView},


    ],
})

export default router;