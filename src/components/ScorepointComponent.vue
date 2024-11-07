<template>
  <v-container>
  <h1 class="score-title">Dagens score</h1>

    <div class="score-value">400</div>

    <v-card-text>
      Du har sparet miljøet
    </v-card-text>
    <p class="co2-amount">1000 gram CO₂ i dag</p>

    <p>Vand dit træ og få dagens point</p>
    <v-img
    :width="300"
    aspect-ratio="16/9"
    cover
    src="images/fa-solid_award.svg">
    </v-img>

    <div class="carbon-reduction">
      <strong>REDUCERE 600KG CARBON</strong> per uge
    </div>
    <div class="button-group">
      <v-btn @click="goBack" class="back-button">Tilbage</v-btn>
      <v-btn @click="goHome" class="home-button">Startside</v-btn>
    </div>


  </v-container>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ScoreComponent',
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push('#');
    };

    const goHome = () => {
      router.push('#');
    };

    return {
      goBack,
      goHome
    };
  }
};
</script>
