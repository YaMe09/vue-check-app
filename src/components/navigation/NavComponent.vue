<template>
  <v-container class="nav" :style="{ backgroundColor: '#E9E5E5', padding: '0', margin:'0' }">
    <br />
    <v-toolbar app :style="{ backgroundColor: '#E9E5E5' }">
      <v-col class="d-flex align-center">
        <router-link to="/frontPage">
          <img class="right" src="@/images/heroicons_home-20-solid.svg" />
        </router-link>

        <router-link to="/info">
          <img class="righ" src="@/images/info.svg" />
        </router-link>
      </v-col>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-row>
          <v-col class="d-flex align-center">
            <!-- Tom kolonne for at centrere titlen -->
          </v-col>
        </v-row>
      </v-toolbar-title>
      <v-col class="d-flex align-center">
        <LevelDisplay />
      </v-col>
    </v-toolbar>

    <br />
    <v-container class="anden-nav">
      <router-link to="/transportComponent" @click="setActive('transportComponent')">
        <img :class="{ active: activeImage === 'transportComponent' }" src="@/images/transport.svg" />
      </router-link>

      <router-link to="/elUse" @click="setActive('elUse')">
        <img :class="{ active: activeImage === 'elUse' }" src="@/images/El-forbruge.svg" />
      </router-link>

      <router-link to="/genbrugeComponent" @click="setActive('genbrugeComponent')">
        <img :class="{ active: activeImage === 'genbrugeComponent' }" src="@/images/Genbruge.svg" />
      </router-link>

      <router-link to="/foodWaste" @click="setActive('foodWaste')">
        <img :class="{ active: activeImage === 'foodWaste' }" src="@/images/Madspile.svg" />
      </router-link>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import LevelDisplay from '../features/LevelDisplay.vue';

export default defineComponent({
  name: 'NavComponent',
  components: {
    LevelDisplay,
  },
  setup() {
    const activeImage = ref('');

    const setActive = (image) => {
      activeImage.value = image;
    };

    return {
      activeImage,
      setActive,
    };
  },
});
</script>

<style scoped>
.v-container {
  padding: 0;
}
.left,
.lef {
  width: 35px;
  margin-left: 15px;
}
.lef {
  width: 55px;
}
.right,
.righ {
  width: 45px; /* Juster størrelserne som ønsket */
  padding-top: 5px;
  margin-left: 15px;
}
.anden-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  height: 92px;
  border-radius: 18px;
  border: solid 1px #e4e5e4;
  box-shadow: #fff 2px 2px 2px;
  opacity: 0.9;
}

.anden-nav img {
  width: 50px;
  padding-top: 5px;
  transition: all 0.3s ease;
}

.active {
  transform: scale(1.2);
  border: 5px solid #D3BE03;
  box-shadow: 0 0 10px rgba(189, 185, 185, 0.5);
}
</style>
