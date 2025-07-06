import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import App from './App.vue';
import { NInput } from 'dnhyxc-ui-plus-beta';
import 'dnhyxc-ui-plus-beta/es/index.css';
// import 'dnhyxc-ui/dist/style/theme-chalk.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(NInput);
app.mount('#app');
