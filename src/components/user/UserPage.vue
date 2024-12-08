<template>
  <v-container :style="{ backgroundColor: '#E9E5E5' }">
    <br/>
    <br/><br/><br/><br/>
    <h1 class="score-title">Dagens score</h1>
    <br/>
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', width: '100%', padding: '25px' }">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Opsummering af dine point</h2>
        <p class="description-text">Velkommen til din side {{ userName }}</p>
        <p class="total-points">Samlede droper: {{ totalPoints }}</p>

        <LevelDisplay /> <!-- Tilføj denne linje -->
      </v-col>
    </v-container>
    <v-row>
      <v-col cols="2" class="justify-center">
        <img
        v-if="points > 0"
          class="drop"
          src="../Images/drop.svg"
          alt="Drop Image"
          :style="{ width: '30px', marginLeft: 'auto', marginRight: 'auto',  border: '2px solid #3E7A00', borderRadius: '50%'}"
          @click="startWatering"
        />
      </v-col>
      <br />
      <v-col cols="2" class="træ">
        <img src="../Images/træ.svg" alt="Tree Image" :style="{ marginLeft: '-30px', height: treeHeight + 'px' }" />
      </v-col>
    </v-row>
    <v-container class="carbon-reduction">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <v-btn rounded="xl" size="x-large" @click="saveUserData" class="home-button" block :style="{background:'#3E7A00'}">Gem data</v-btn><br/>
          <v-btn rounded="xl" size="x-large" @click="showUserList" class="back-button" block outlined :style="{border:'5px solid #3E7A00'}">Show users</v-btn><br/>
          <v-btn v-if="totalPoints >= requiredPoints" rounded="xl" size="x-large" @click="navigateToTransport" class="next-button" block :style="{background:'#3E7A00'}">Spil videre</v-btn><br/>
          <v-btn rounded="xl" size="x-large" @click="logout" class="logout-button" block outlined :style="{border:'5px solid #3E7A00'}">Log ud</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import LevelDisplay from '../features/LevelDisplay.vue'; // Importer UserLevelDisplay
import { inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    LevelDisplay // Registrer UserLevelDisplay
  },
  setup() {
    const name = inject('name');
    const password = inject('password');
    const router = useRouter();
  const treeHeight = ref(70);

  // Vand træet med alle dråber
  const startWatering = async () => {
    if (points.value <= 0) {
      alert('Ingen dråber at bruge!');
      return;
    }

    const growth = points.value * 0.3; // Calculate growth
    treeHeight.value += growth; // Update tree height

    // Reset points in the store and backend
    await store.dispatch('updatePoints', 0); // Add method for API call to update points

    alert(`Du har brugt alle dine dråber! Træet er nu ${treeHeight.value}px højt.`);
  };

  return { name, password, router, treeHeight, startWatering };
},
  data() {
    return {
      requiredPoints: 100, // Krav til point for at gå videre til næste niveau
      token: localStorage.getItem('token') || '', // Hent token fra localStorage
      userName: localStorage.getItem('userName') || '', // Hent brugerens navn fra localStorage
      checklists: [], // Tilføj denne linje
      selectedCategory: '', // Standard kategori
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
  created() {
    this.fetchChecklists(); // Tilføj denne linje
  },
  methods: {
    async fetchChecklists() {
      try {
        const response = await fetch(`http://localhost:3000/api/checklists/${this.selectedCategory}/${this.userLevel}`, {
          method: 'GET',
          headers: {
            'x-access-token': this.token
          }
        });
        const data = await response.json();
        this.checklists = data;
      } catch (error) {
        console.error('Error fetching checklists:', error);
      }
    },
    async saveUserData() {
      try {
        const payload = {
          points: this.totalPoints,
          level: this.userLevel
        };
        console.log('Sending payload to backend:', payload); // Debug-udskrift

        const response = await fetch('http://localhost:3000/api/auth/user/points', {
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
          this.fetchChecklists(); // Hent nye tjeklister for næste niveau
        } catch (error) {
          console.error('Error updating level:', error);
          alert('Der opstod en fejl ved opdatering af niveau.');
        }
      } else if (this.totalPoints < this.requiredPoints) {
        this.levelUpdated = false; // Nulstil markeringen, hvis pointene falder under kravet
        alert(`Du skal have mindst ${this.requiredPoints} point for at gå videre til næste niveau.`);
      }
    },
    navigateToTransport() {
      this.$router.push('/transportComponent');
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
}

.score-value {
  text-align: center;
  font-weight: 700;
  justify-content: center;
}

.carbon-reduction {
  background-image: url('../Images/Vector 1.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.back-button,
.home-button,
.next-button,
.logout-button {
  font-size: 1em;
  color: #fff;
  background-color: #4caf50;
  border-radius: 5px;
  padding: 0.5em 1em;
  width: 100%;
}
</style>
