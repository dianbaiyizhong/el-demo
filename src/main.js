import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import _ from 'lodash';

const app = createApp(App);
app.config.globalProperties.$_ = _;

app.mount('#app')
