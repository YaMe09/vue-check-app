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
          <br /><br /><br />
          <v-col>
            <v-text-field
              v-model="name"
              placeholder="Indtast dit navn"
              label="Navn"
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
              label="Password"
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
          <v-btn @click="registerUser" class="register-button">Registrer</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <router-view v-if="!showWelcome"></router-view>
  </v-app>
</template>

<script>
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const showWelcome = ref(true);
    const name = ref('');
    const password = ref('');
    const router = useRouter();
    provide('name', name);
    provide('password', password);

    const hideWelcome = () => {
      showWelcome.value = false;
    };

    const loginUser = async () => {
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
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userLevel', data.level); // Gem brugerens niveau
          localStorage.setItem('totalPoints', data.points); // Gem brugerens point
          alert('Login successful!');
          hideWelcome();
          router.push('/frontPage'); // Naviger til TransportComponent.vue efter vellykket login
        } else {
          alert('Login failed!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Der opstod en fejl ved login.');
      }
    };

    const registerUser = async () => {
      try {
        const payload = {
          name: name.value,
          password: password.value
        };
        console.log('Sending register payload to backend:', payload); // Debug-udskrift

        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Response from backend:', data);

        if (data.message) {
          alert('Registrering successfuld!');
          hideWelcome();
          router.push('/transportComponent'); // Naviger til TransportComponent.vue efter vellykket login
        } else {
          alert('Registrering mislykkedes!');
        }
      } catch (error) {
        console.error('Error registering:', error);
        alert('Der opstod en fejl ved registrering.');
      }
    };

    return {
      showWelcome,
      hideWelcome,
      name,
      password,
      loginUser,
      registerUser
    };
  },
};
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

.login-button, .register-button {
  font-size: 1em;
  color: #fff;
  background-color: #4caf50;
  border-radius: 5px;
  padding: 0.5em 1em;
  width: 100%;
  margin: 20px;
}
</style>
