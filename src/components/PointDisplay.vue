<template>
  <!-- Award Badge -->
  <v-col cols="12" md="4" sm="6" class="award-badge" justify="center">
    <v-btn size="x-large" :style="{  borderRadius: '18px', width: '100%' }">
      <img src="../images/fa-solid_award.svg" />
      &nbsp; Samlede point: {{ points }}
    </v-btn>
  </v-col>
</template>

<script>
export default {
  computed: {
    points() {
      return this.$store.state.totalPoints;
    },
  },
};
</script>
