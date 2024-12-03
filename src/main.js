import { createApp } from 'vue';
import store from './store'; // Import the store
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TransportComponent from './components/checklists/TransportComponent.vue';
import InfoComponent from './components/pages/InfoComponent.vue';
import GenbrugeComponent from './components/checklists/GenbrugeComponent.vue';
import PointDisplay from './components/features/PointDisplay.vue'; // Rettet sti
import FrontPage from './components/pages/FrontPage.vue';
import CheckList from './components/features/CheckList.vue';
import FoodWaste from './components/checklists/FoodWaste.vue';
import ElUse from './components/checklists/ElUse.vue';
import ArrowComponent from './components/navigation/ArrowComponent.vue';
import UserPage from './components/user/UserPage.vue';
import UserList from './components/user/UserList.vue';
import LogIn from './components/user/LogIn.vue';
import LevelDisplay from './components/features/LevelDisplay.vue';
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
    { path: '/', name: 'Home', component: FrontPage }, // Ændret til FrontPage
    { path: '/transportComponent', name: 'TransportComponent', component: TransportComponent },
    { path: '/pointDisplay', name: 'PointDisplay', component: PointDisplay },
    { path: '/genbrugeComponent', name: 'GenbrugeComponent', component: GenbrugeComponent },
    { path: '/info', name: 'Info', component: InfoComponent },
    { path: '/frontPage', name: 'FrontPage', component: FrontPage },
    { path: '/userPage', name: 'UserPage', component: UserPage },
    { path: '/userList', name: 'UserList', component: UserList },
    { path: '/logIn', name: 'LogIn', component: LogIn },
    { path: '/checkList', name: 'CheckList', component: CheckList},
    { path: '/foodWaste', name: 'FoodWaste', component: FoodWaste},
    { path: '/elUse', name: 'ElUse', component: ElUse},
    { path: '/levelDisplay', name: 'LevelDisplay', component: LevelDisplay},
    { path: '/arrowComponent', name: 'ArrowComponent', component: ArrowComponent},
  ],
});

const app = createApp(App);

app.use(router);
app.use(store);  // Use the store
app.use(vuetifyInstance);
app.mount('#app');
