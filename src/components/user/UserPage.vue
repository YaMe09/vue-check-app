<template>
  <NavComponent/>
  <v-container :style="{ backgroundColor: '#000' }">
    <br/>
    <br/><br/><br/><br/>
    <h1 class="score-title">Dagens score</h1>
    <br/>
    <v-container fluid fill-height :style="{ backgroundColor: '', width: '100%', padding: '25px' }">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Godt Klaret </h2>
        <p class="description-text"> {{ userName }}</p>

        <LevelDisplay />
      </v-col>
    </v-container>

    <v-container class="carbon-reduction">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <v-btn rounded="xl" size="x-large" @click="saveUserData" class="home-button" block :style="{background:'#3E7A00'}">Gem data</v-btn><br/>
          <v-btn rounded="xl" size="x-large" @click="showUserList" class="back-button" block outlined :style="{border:'5px solid #3E7A00'}">Show users</v-btn><br/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import LevelDisplay from '../features/LevelDisplay.vue'; // Importer UserLevelDisplay
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import NavComponent from '../navigation/NavComponent.vue';

export default {
  components: {
    LevelDisplay,
    NavComponent, // Registrer UserLevelDisplay
  },
  setup() {
    const name = inject('name');
    const password = inject('password');
    const router = useRouter();
    return { name, password, router };
  },
  data() {
    return {
      requiredPoints: 500, // Krav til point for at gå videre til næste niveau
      token: localStorage.getItem('token') || '', // Hent token fra localStorage
      userName: localStorage.getItem('userName') || '', // Hent brugerens navn fra localStorage
      levelUpdated: false // Tilføj denne linje for at spore om niveauet er opdateret
    };
  },
  computed: {
    totalPoints() {
      return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
    },
    userId() {
      return this.$store.getters.getUserInfo.id; // Get user ID from Vuex store
    },
    userLevel() {
      return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
    }
  },
  methods: {
    async saveUserData() {
      try {
        const payload = {
          points: this.totalPoints,
          level: this.userLevel
        };
        console.log('Sending payload to backend:', payload); // Debug-udskrift

        const response = await fetch('http://localhost:3000/api/user/points', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.token
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Response from backend:', data);
        alert('Brugerdata og point gemt succesfuldt!');
        this.checkAndUpdateLevel(); // Tjek og opdater niveau efter at have gemt brugerdata og point
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Der opstod en fejl ved gemning af brugerdata og point.');
      }
    },
    async checkAndUpdateLevel() {
      if (this.totalPoints >= this.requiredPoints && !this.levelUpdated && this.userLevel < 3) {
        try {
          // Opdater brugerens niveau
          this.$store.commit('incrementUserLevel');
          this.levelUpdated = true; // Marker niveauet som opdateret
          alert('Du har nået det nødvendige antal point og er nu på næste niveau!');
        } catch (error) {
          console.error('Error updating level:', error);
          alert('Der opstod en fejl ved opdatering af niveau.');
        }
      } else if (this.totalPoints < this.requiredPoints) {
        this.levelUpdated = false; // Nulstil markeringen, hvis pointene falder under kravet
        alert(`Du skal have mindst ${this.requiredPoints} point for at gå videre til næste niveau.`);
      }
    },
    showUserList() {
      this.$router.push('/userList');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.$router.push('/app');
    }
  },
};
</script>

<style>
.score-title {
  text-align: center;
  font-weight: 700;
  color: aliceblue;
}
.description-text{
  color: #3E7A00;
  font-size: 30px;
}
.score-value {
  text-align: center;
  font-weight: 700;
  justify-content: center;
}

.carbon-reduction {
  background-image: url('@/Images/Vector 1.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1em;
}


</style>
