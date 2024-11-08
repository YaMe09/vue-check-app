<template>
  <v-container :style="{ backgroundColor: '#E9E5E5' }" class="front-page" align="center">
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
    <div class="streak-points-wrapper">
      <DayStreak :streak="5" />
      <TotalPoints :totalPoints="dailyTotalPoints" />
    </div>

    <!-- New "Din score" section with image underneath -->
    <div class="score-section">
      <h2 class="score-text">Din score</h2>
      <img src="../Images/ScorePoint.svg" alt="Score Image" class="score-image"/>
    </div>

  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';
import DayStreak from '@/components/DayStreak.vue';
import TotalPoints from '@/components/TotalPoints.vue';

export default {
  name: 'FrontPage',
  components: {
    DayStreak,
    TotalPoints,
  },
  setup() {
    const router = useRouter();

    // Example daily total points; replace with actual calculated points
    const dailyTotalPoints = 150;

    const goToMainSite = () => {
      router.push('/TransportComponent');
    };

    return { goToMainSite, dailyTotalPoints };
  },
};
</script>

<style scoped>
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

.check-habits-section {
  margin-top: 20px;
}

.check-habits-text {
  margin-top: 40px;
  font-size: 18px;
  margin-bottom: 10px;
}

.check-habits-button {
  padding: 10px 20px;
  background-color: #3E7A00;
  color: white;
  border: none;
  border-radius: 5px;
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
  gap: 5px; /* Adjust the gap as needed */
  margin-top: 50px;
  padding: 0;
}

.day-streak-row,
.total-points-row {
  margin: 0;
  padding: 0;
}

.score-section {
  margin-top: 50px;
  text-align: center;
}

.score-text {
  font-size: 24px;
  font-weight: bold;
}

.score-image {
  margin-top: 10px;
  max-width: 500px; /* Increase max-width to make it larger */
  width: 100%; /* Ensures the image scales with max-width */
  height: auto; /* Maintains aspect ratio */
}
</style>

