import {createApp} from 'vue'
import App from './App.vue'
import _ from 'lodash';
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
app.config.globalProperties.$_ = _
import router from './router/index.js';
app.use(router)

import GridLayout from 'vue3-drr-grid-layout'
import 'vue3-drr-grid-layout/dist/style.css'
app.use(GridLayout)

import './style/ripple.min.css';
import './style/style.css';

// mock 方式，正式发布时，注释掉该处即可
import "@/mock";


import {PieChart, LinesChart, LineChart, BarChart} from "echarts/charts";
import VueEcharts from 'vue-echarts'
import {CanvasRenderer} from 'echarts/renderers';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
    DatasetComponent,
} from 'echarts/components';
import {use} from 'echarts/core';

use([
    BarChart,
    CanvasRenderer,
    DatasetComponent,
    PieChart,
    LinesChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);
app.component('v-chart', VueEcharts)
app.mount('#app')
