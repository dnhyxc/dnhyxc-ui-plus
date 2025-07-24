import { createApp } from 'vue';
import dnhyxcUI from '@dnhyxc-ui/components';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(dnhyxcUI);
app.mount('#app');
