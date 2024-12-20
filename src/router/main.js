import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Adjust the path based on your project structure
import vuetify from './plugins/vuetify'; // Ensure you have Vuetify properly installed
import 'vuetify/styles'; // Include Vuetify styles

const app = createApp(App);

app.use(router); // Use the router
app.use(vuetify); // Use Vuetify
app.mount('#app'); // Mount the app to the DOM
