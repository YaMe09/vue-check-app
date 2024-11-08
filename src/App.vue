<template>
  <v-app class="app">
    <v-container v-if="showWelcome" class="forside" fill-height>
      <v-row align="center" justify="center">
        <v-col>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <h1 :style="{ fontWeight: '700' }">Velkommen</h1>
          <br />
          <br /><br /><br /><br />
          <p :style="{ fontWeight: '700' }">Gør noget for at passe på fremtiden</p>
          <br /><br /><br /><br /><br /><br /><br />
          <AppknappComponent @navigate="hideWelcome" />
        </v-col>
      </v-row>
    </v-container>
    <router-view v-if="!showWelcome"></router-view>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AppknappComponent from './components/AppknappComponent.vue';

export default defineComponent({
  components: { AppknappComponent },
  name: 'App',
  setup() {
    const showWelcome = ref(true);

    const hideWelcome = () => {
      showWelcome.value = false;
    };

    return {
      showWelcome,
      hideWelcome,
    };
  },
});
</script>

<style scoped>
.v-container {
  padding: 0;
}
.forside {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  background-image: url('./images/forside.svg');
  background-size: cover;
  background-position: center;
  margin-top: 60px;
}

h1, p {
  color: black;
}

</style>
