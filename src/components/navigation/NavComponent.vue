<template>
  <v-app>
    <v-app-bar app color="#E9E5E5" flat>
      <v-btn icon @click.stop="drawer = !drawer">
        <img src="@/images/hamburger-button.svg" alt="Menu" class="burger-icon" />
      </v-btn>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <LevelDisplay />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item @click="$router.push('/frontPage')">
          <v-list-item-title>Min side</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/userPage')">
          <v-list-item-title>Min tre</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/info')">
          <v-list-item-title>Info</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push('/logIn')">
          <v-list-item-title>Log ud</v-list-item-title>
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



.anden-nav {
  width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.v-navigation-drawer {
  max-width: 100%;
  overflow-x: hidden;
}

</style>
