<template>
  <v-app>
    <v-app-bar app color="#E9E5E5" flat>
      <v-btn icon @click.stop="drawer = !drawer">
        <img src="@/images/hamburger-button.svg" alt="Menu" class="burger-icon" />
      </v-btn>
      <v-toolbar-title>App Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <LevelDisplay />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item @click="$router.push('/frontPage')">
          <v-list-item-title>Front Page</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/info')">
          <v-list-item-title>Info</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/transportComponent')">
          <v-list-item-title>Transport</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/elUse')">
          <v-list-item-title>El Use</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/genbrugeComponent')">
          <v-list-item-title>Genbruge</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/foodWaste')">
          <v-list-item-title>Food Waste</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    
  </v-app>
</template>

<script>
import { ref } from 'vue';
import LevelDisplay from '../features/LevelDisplay.vue';

export default {
  name: 'NavComponent',
  components: {
    LevelDisplay,
  },
  setup() {
    const drawer = ref(false);

    return {
      drawer,
    };
  },
};
</script>

<style scoped>
.v-container {
  padding: 0;
}

.burger-icon {
  width: 24px;
  height: 24px;
}

.v-application--wrap {
  margin: 0 !important;
  padding: 0 !important;
}

.v-application__wrap {
  min-height: 100vh !important; /* Sørg for, at applikationen fylder hele højden */
}

.v-navigation-drawer {
  height: 100vh !important; /* Sørg for, at navigationen fylder hele højden */
}

.anden-nav {
  display: flex;
  justify-content: space-around;
}
</style>
