import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import App from './App.vue';
import Layout from './Components/Layout.vue';
import TaskList from './Components/TaskList.vue';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6200ea',
          secondary: '#03dac6',
          accent: '#82b1ff',
          error: '#b00020',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).mount('#app');
createApp(App)
  .component('Layout', Layout)
  .component('TaskList', TaskList)
  .use(vuetify)
  .mount('#app');
