import {createApp} from 'vue'
import App from './App.vue'
import _ from 'lodash';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$_ = _


import router from './router/index.js';

app.use(router)


import {PieChart} from 'echarts/charts';
import VueEcharts from 'vue-echarts'
import {CanvasRenderer} from 'echarts/renderers';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import {use} from 'echarts/core';

use([
    CanvasRenderer,
    TitleComponent,
    PieChart,
    TooltipComponent,
    LegendComponent,
]);
app.component('v-chart', VueEcharts)
app.mount('#app')
