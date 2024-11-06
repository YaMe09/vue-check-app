import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TransportComponent from '@/components/TransportComponent.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import GenbrugeComponent from '@/components/GenbrugeComponent.vue';
import CalculatePoints from '@/components/CalculatePoints.vue';
import PointDisplay from '@/components/PointDisplay.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const vuetifyInstance = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: App },
    { path: '/transportComponent', name: 'TransportComponent', component: TransportComponent },
    { path: '/calculatePoints', name: 'CalculatePoints', component: CalculatePoints },
    { path: '/pointDisplay', name: 'PointDisplay', component: PointDisplay },
    { path: '/genbrugeComponent', name: 'GenbrugeComponent', component: GenbrugeComponent },
    { path: '/info', name: 'Info', component: InfoComponent },
  ],
});

const app = createApp(App);

app.use(router);
app.use(vuetifyInstance);
app.mount('#app');
