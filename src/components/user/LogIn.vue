<template>
  <v-container class="forside" fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h1 :style="{ fontWeight: '700' }">Login</h1>
        <br />
        <v-col>
          <v-text-field
            v-model="name"
            placeholder="Indtast dit navn"
            label=""
            variant="outlined"
            persistent-hint
            :style="{ color: 'green', marginRight: '10px', marginLeft: '10px' }"
            id="name"
            name="name"
            autocomplete="name"
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="Indtast dit password"
            label=""
            variant="outlined"
            persistent-hint
            :style="{ color: 'green', marginRight: '10px', marginLeft: '10px' }"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
          ></v-text-field>
        </v-col>
        <br /><br />
        <v-btn @click="loginUser" class="login-button">Login</v-btn>
        <v-btn @click="navigateBack" class="back-button">Tilbage</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'LogIn',
  setup() {
    const name = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const loginUser = async () => {
      if (!name.value || !password.value) {
        alert('Navn og password skal udfyldes!');
        return;
      }

      try {
        const payload = {
          name: name.value,
          password: password.value
        };
        console.log('Sending login payload to backend:', payload); // Debug-udskrift

        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Response from backend:', data);

        if (data.auth) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userLevel', data.user.level); // Gem brugerens niveau
          localStorage.setItem('totalPoints', data.user.points); // Gem brugerens point
          store.commit('setToken', data.token);
          store.commit('setUserInfo', data.user);
          alert('Login successful!');
          router.push('/frontPage'); // Naviger til frontPage efter vellykket login
        } else {
          alert('Login failed!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Der opstod en fejl ved login.');
      }
    };

    const navigateBack = () => {
      router.push('/app');
    };

    return {
      name,
      password,
      loginUser,
      navigateBack
    };
  },
};
</script>

<style scoped>
.forside {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  background-image: url('./images/forside.svg');
  background-size: cover;
  background-position: center;
  margin-top: 60px;
}

.login-button, .back-button {
  font-size: 1em;
  color: #fff;
  background-color: #4caf50;
  border-radius: 5px;
  padding: 0.5em 1em;
  width: 100%;
  margin: 20px;
}
</style>
