import Vue from 'vue'
import App from './Chart.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
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
Vue.component('v-chart', VueEcharts)

new Vue({
    render: h => h(App),
}).$mount('#app')
