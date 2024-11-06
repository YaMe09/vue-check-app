<template>
    <!-- Award Badge -->
    <v-col cols="12" md="4" sm="6" class="award-badge" justify="center">
        <!-- Vis point i knappen -->
        <v-btn size="x-large" :style="{ backgroundColor: '#8981A8', borderRadius: '18px', width: '100%' }">
          <img src="../images/fa-solid_award.svg" />
          &nbsp; Samlede point: {{ points }}
        </v-btn>
      </v-col>
  </template>
  
  <script>
  export default {
    props: {
      points: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    
  };
  </script>
  <style scoped>
  .award-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    opacity: 0.9px;
  }
  .award-badge .v-btn {
    display: flex;
    justify-content: center;
    align-items: center;
   
  }
  </style>
  