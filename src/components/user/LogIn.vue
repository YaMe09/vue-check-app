<template>
  <v-container class="log-in" fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h2 :style="{ fontWeight: '700' }">Login</h2>
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
        <v-btn rounded="xl"
           size="x-large"
           variant="flat"
           @click="loginUser" class="login-button"
           :style="{ backgroundColor: 'rgb(62, 122, 0)', width: '100%', color:'#fff', maxWidth:'400px', borderRadius: '1rem' }">Login
          </v-btn>
          <v-btn rounded="xl"
           size="x-large"
           variant="flat"
            @click="navigateBack" class="back-button"
           :style="{ backgroundColor: '#fff', border: '2px solid rgb(62, 122, 0)', color: 'rgb(62, 122, 0)', width: '100%', maxWidth:'400px', borderRadius: '1rem' }">Registrere
          </v-btn>

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
  components: {
   
  },
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
      router.push('/register');
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
.log-in{
  display: flex;
  min-height: 100vh;
  background: #000 url(@/images/forside.svg);
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
}
h2 {
  color:#fff;
  text-align: center; /* Center the heading */
  margin-bottom: 1.5rem; /* Space below the heading */
}

input {
  appearance: none;
  border: none;
  outline: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}

input::placeholder {
  color: rgb(62, 122, 0);
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
