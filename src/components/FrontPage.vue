<template>
  <v-container :style="{ backgroundColor: '#E9E5E5' }" class="front-page" align="center">
  <br />
    <!-- Logo træ -->
    <v-container class="logo-container">
      <img src="../Images/træ.svg" alt="Logo billede" class="logo" />
    </v-container>

    <!-- Centered welcome text -->
    <h1 class="welcome-text">Velkommen til</h1>

    <!-- Centered secondary logo -->
    <img src="../Images/EcoVaner.svg" alt="Secondary Logo" class="secondary-logo" />

    <!-- Subtitle text -->
    <h3 class="subtitle-text">Gør bæredygtige vaner let som en leg</h3>

    <!-- New section with question text and button -->
    <v-container class="check-habits-section">
      <p class="check-habits-text">Har du tjekket dine vaner i dag?</p>
      <button class="check-habits-button" @click="goToMainSite">TJEK VANER</button>
    </v-container>

    <!-- Wrapper for Day Streak and Total Points to remove extra spacing -->
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col class="text-center">
           <vTypography class="points-value" variant="h1">5Dage i træk</vTypography><br />
           <vTypography class="points-text" variant="subtitle1">Gram CO2 sparet</vTypography>
        </v-col>
      </v-row>
    </v-container>
    <br />

    <!-- New "Din score" section with image underneath -->
    <div class="score-section">
      <h2 class="score-text">Din score</h2>
      <br />
      <p class="description-text">{{ name }}</p>
      <br />
    </div>
    <PointDisplay :points="totalPoints" :name="name" :style="{ backgroundColor: 'rgb(62, 122, 0)', borderRadius: '25px', width:'400px' }" />
    <br />
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import PointDisplay from './PointDisplay.vue';
import { ref, inject } from 'vue';
export default {
  name: 'FrontPage',
  components: {
    PointDisplay,
  },
  setup() {
    const router = useRouter();
    const name = inject('name');
    const totalPoints = ref(0);
    

    const goToMainSite = () => {
      router.push('/TransportComponent');
    };

    return { goToMainSite, name,};
  },
};
</script>

<style scoped>
.v-col-12{
  flex: none;
}
.front-page {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.logo {
  max-width: 200px;
}

.secondary-logo {
  max-width: 150px;
  margin-top: 15px;
}

.welcome-text {
  font-size: 40px;
  margin-top: 10px;
}

.subtitle-text {
  font-size: 16px;
  margin-top: 10px;
}

.points-value, .points-text{
  font-size: 24px;
  font-weight: bold;
  color: #3E7A00;
}
.points-text{
  font-size: 16px;
  font-weight: bold;
  color: #3E7A00;
}


.check-habits-text {
  margin-top: 40px;
  font-size: 18px;
  margin-bottom: 10px;
}

.check-habits-button {
  padding: 15px 25px;
  background-color: #3E7A00;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.check-habits-button:hover {
  background-color: #356500;
}

.streak-points-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px; /* Gap between streak and points */
/* Margin above the streak-points-wrapper */
}

.score-section {
 /* Margin above score section */
  text-align: center;

}

.description-text{
  font-size: 24px;
  font-weight: 600;
}
.score-text{
  font-size: 28px;
  font-weight: bold;
}
ul {
  list-style-type: none;
}
.habits-title{
  font-size: 24px;
  font-weight: bold;
}
.habits-list{
  background: #fff;
  width: 330px;
  }
</style>
