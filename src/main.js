import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

const app = createApp(App);
app.use(router); // VERY IMPORTANT: Mount the router
app.mount('#app');