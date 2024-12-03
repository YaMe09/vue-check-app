<template>
  <v-app class="login" id="login">
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', width: '100%', padding: '25px' }">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Login</h2>
        <v-form @submit.prevent="login">
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setUserInfo']),
    async login() {
      try {
        console.log('Attempting to log in with:', { name: this.name, password: this.password });
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            password: this.password
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response from backend:', data);
        if (data.user_id) {
          this.setUserInfo({ id: data.user_id, name: data.name });
          this.$router.push('/userPage');
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in.');
      }
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  }
};
</script>

<style scoped>
.v-container {
  justify-content: center;
  margin: 10px;
  background-color: #1E7F85;
  padding: 20px;
  border-radius: 10px;
}

.login {
  background-color: #E9E5E5;
  width: 100%;
  padding: 0;
}

.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
  color: black;
}
</style>
