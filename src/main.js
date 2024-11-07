import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TransportComponent from '@/components/TransportComponent.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import GenbrugeComponent from '@/components/GenbrugeComponent.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import ScoreComponent from './components/ScoreComponent.vue';


const vuetifyInstance = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: App },
    { path: '/transportComponent', name: 'TransportComponent', component: TransportComponent },
    { path: '/genbrugeComponent', name: 'GenbrugeComponent', component: GenbrugeComponent },
    { path: '/info', name: 'Info', component: InfoComponent },
    {path: '/scoreComponent', name: 'scoreComponent', component: ScoreComponent,}
  ],
});

const app = createApp(App);

app.use(router);
app.use(vuetifyInstance);
app.mount('#app');
