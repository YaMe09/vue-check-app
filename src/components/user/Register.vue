<template>
   <form class="register" @submit.prevent="register">
     <br /><br />
     <h2>Register</h2>
     <input
       type="text"
       placeholder="Name"
       v-model="register_form.name"
       :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
       required
     />
     <input
       type="email"
       placeholder="Email address"
       v-model="register_form.email"
       :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
       required
     />
     <input
       type="tel"
       placeholder="Phone"
       v-model="register_form.phone"
       :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
     />
     <input
       type="password"
       placeholder="Password"
       v-model="register_form.password"
       :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
       required
     />
     <input
       type="password"
       placeholder="Confirm Password"
       v-model="register_form.confirm_password"
       :style="{ color: 'rgb(62, 122, 0)', borderBottom: '1px solid rgb(62, 122, 0)' }"
       required
     />
     &nbsp;&nbsp;
     <v-btn
       rounded="xl"
       size="x-large"
       variant="flat"
       :style="{ backgroundColor: 'rgb(62, 122, 0)', width: '100%', color:'#fff', maxWidth:'400px' }"
       type="submit"
     >
       Register
     </v-btn>
   </form>

</template>


<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const register_form = ref({
      name: '',
     email: '',
     phone: '',
     password: '',
     confirm_password: '',
    });

    // In RegisterView, check the strength of the password before submitting
const isPasswordStrong = (password) => {
  return password.length >= 8; // Add more complex checks as needed
};

const register = async () => {
  if (!isPasswordStrong(register_form.value.password)) {
    alert('Password must be at least 8 characters long.');
    return;
  }
  if (register_form.value.password !== register_form.value.confirm_password) {
    alert('Passwords do not match.');
    return;
  }

  try {
    await store.dispatch('register', register_form.value);
    router.push('/login');
  } catch (error) {
    alert(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};


    return {
      register_form,
      register,
    };
  },
};
</script>


<style>
.register {
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


input:not([type='submit']) {
 opacity: 0.8;
 transition: 0.4s;
}


input:focus:not([type='submit']) {
 opacity: 1;
}
input::placeholder {
color: rgb(62, 122, 0);
}






form.register input[type='submit'] {
 background-color: #3e7a00;
 font-weight: 700;
 padding: 1rem 2rem;
 border-radius: 18px;
 cursor: pointer;
 text-transform: uppercase;
}


.error-message {
 color: red;
 font-size: 1rem;
 text-align: center;
 margin-bottom: 1rem;
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
