<template>
  <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', width: '100%', padding: '25px' }">
    <v-col cols="12" md="8" lg="6" class="text-center">
      <h2 class="question">Liste af brugere med point</h2>
    </v-col>

    <v-col cols="12" md="8" lg="6" align="center">
      <v-list>
        <v-list-item v-for="(user, index) in users" :key="user.user_id" class="user-card">
          <v-card :class="{ 'highest-points': index === 0 }">
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-subtitle>Level: {{ user.level }} | Points: {{ user.points }}</v-card-subtitle>
          </v-card>
        </v-list-item>
      </v-list>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        // Sorter brugerne efter point i faldende rækkefølge
        this.users = data.sort((a, b) => b.points - a.points);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
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

.users-list {
  width: 100%;
  padding: 0;
}

.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
  color: black;
}

.user-card {
  margin-bottom: 10px;
}

.v-card {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.highest-points {
  background-color: rgb(123, 214, 123); /* Guld farve for brugeren med de højeste point */
}
</style>
