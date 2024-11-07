import { createApp } from 'vue';
import store from './store'; // Import the store
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TransportComponent from '@/components/TransportComponent.vue';
import InfoComponent from '@/components/InfoComponent.vue';
import GenbrugeComponent from '@/components/GenbrugeComponent.vue';
import PointDisplay from '@/components/PointDisplay.vue';
import CheckList from './components/CheckList.vue';
import FoodWaste from './components/FoodWaste.vue';
import ElUse from './components/ElUse.vue';
import ArrowComponent from './components/ArrowComponent.vue';
import ScorepointComponent from './components/ScorepointComponent.vue';

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
    { path: '/pointDisplay', name: 'PointDisplay', component: PointDisplay },
    { path: '/genbrugeComponent', name: 'GenbrugeComponent', component: GenbrugeComponent },
    { path: '/info', name: 'Info', component: InfoComponent },

    { path: '/scoreComponent', name: 'scoreComponent', component: ScoreComponent },

    { path: '/checkList', name: 'CheckList', component: CheckList},
    { path: '/foodWaste', name: 'FoodWaste', component: FoodWaste},
    { path: '/elUse', name: 'ElUse', component: ElUse},
    { path: '/arrowComponent', name: 'ArrowComponent', component: ArrowComponent},

    { path: '/scorepointComponent', name: 'ScorepointComponent', component: ScorepointComponent },

  ],
});


const app = createApp(App);

app.use(router);
app.use(store)  // Use the store
app.use(vuetifyInstance);
app.mount('#app');
