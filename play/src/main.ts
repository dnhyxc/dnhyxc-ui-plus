import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import 'dnhyxc-ui-plus/es/index.css';
import App from './App.vue';
import { NInput } from 'dnhyxc-ui-plus';
import 'dnhyxc-ui-plus/dist/index.css';
// import 'dnhyxc-ui/dist/style/theme-chalk.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(NInput);
app.mount('#app');
