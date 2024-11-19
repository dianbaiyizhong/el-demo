import {createRouter, createWebHistory} from 'vue-router';


import App from '@/App.vue';
import EchartDemo from '@/view/EchartDemo.vue';
import TableDemo from '@/view/TableDemo.vue';
import CardDemo from '@/view/CardDemo.vue';
import TinymceDemo from '@/view/tinymce/demo.vue';
import Mask from '@/view/mask.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: App},
        {path: '/echart', component: EchartDemo},
        {path: '/table', component: TableDemo},
        {path: '/card', component: CardDemo},
        {path: '/tinymce', component: TinymceDemo},
        {path: '/mask', component: Mask},


    ],
})

export default router;