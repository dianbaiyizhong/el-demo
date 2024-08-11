import {createRouter, createWebHistory} from 'vue-router';


import App from '@/App.vue';
import EchartDemo from '@/view/EchartDemo.vue';
import TableDemo from '@/view/TableDemo.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: App},
        {path: '/echart', component: EchartDemo},
        {path: '/table', component: TableDemo},
    ],
})

export default router;