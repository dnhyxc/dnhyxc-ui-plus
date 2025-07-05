import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import 'dnhyxc-ui-plus/dist/es/dnhyxc-ui-plus.css';
import App from './App.vue';
// import 'dnhyxc-ui/dist/style/theme-chalk.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
