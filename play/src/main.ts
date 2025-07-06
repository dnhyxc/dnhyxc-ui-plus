import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import App from './App.vue';
import { NInput, NButton } from 'dnhyxc-ui-plus-beta';
import 'dnhyxc-ui-plus-beta/es/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(NInput);
app.use(NButton);
app.mount('#app');
