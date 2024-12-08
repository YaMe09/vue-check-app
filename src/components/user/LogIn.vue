<template>
  <br/> <br/> <br/> <br/>
  <form @submit.prevent="login" class="forms">
    <br/> <br/> <br/> <br/>
    <h2 class="question">Login</h2>
    <br/> <br/>
    <input
     type="email"
     placeholder="Email address"
     v-model="login_form.email"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />


   <input
     type="password"
     placeholder="Password"
     v-model="login_form.password"
     :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     required
   />
    <br/>
   <v-btn
     rounded="xl"
     size="x-large"
     variant="flat"
     :style="{ backgroundColor: 'rgb(62, 122, 0)', color:'#fff', width:'100%', maxWidth:'300px' }"
     @click="login"
   >
     Login
   </v-btn>
    <br/> <br/>
   <v-btn rounded="xl"
     size="x-large"
     variant="flat"
     :style="{ border: '3px solid rgb(62, 122, 0)', width:'100%', maxWidth:'300px'}">
     <router-link to="/register" :style="{color:'#000', textDecoration:'none', alignItems:'center', }"> Register here</router-link>
   </v-btn>
   <br/><br/>

 </form>

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

<style>
.forms {
 display: flex;
 min-height: 100vh;
 background-image: url(../images/forside.svg);
 background-size: cover;
 background-position: center;
 justify-content: center;
 align-items: center;
}


form {
 display: flex;
 flex-direction: column; /* Stack inputs vertically */
 padding: 2rem; /* Adjust padding */
 background: rgba(255, 255, 255, 0.8); /* Optional: add a background for better readability */
 border-radius: 8px; /* Optional: add rounded corners */
 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: add shadow */
}


h2 {
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
.login-button,
.register-button {
 width: 100%; /* Full width */
 max-width: 400px; /* Limit max width */
 margin: 0 auto; /* Center button */
 background-color: rgb(62, 122, 0);
 color: #fff;
}
.register-link {
 color: #fff;
 text-decoration: none;
 display: flex;
 justify-content: center; /* Center the link */
 align-items: center; /* Center vertically */
}


@media (max-width: 600px) {
 form {
   padding: 1rem; /* Reduce padding on smaller screens */
 }


 .input-field {
   font-size: 1.2rem; /* Smaller font size for inputs */
 }


 .login-button,
 .register-button {
   font-size: 1.2rem; /* Smaller font size for buttons */
 }
}
</style>


