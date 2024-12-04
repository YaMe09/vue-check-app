<template>
  <v-row align="center" justify="space-between">
    <v-col cols="auto" background color: >
      <v-btn @click="goToPrevious" class="navigation-button">forrige</v-btn>
    </v-col>
    <v-spacer />
    <v-col cols="auto">
      <v-btn @click="goToNext" class="navigation-button">Næste</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nextRoute: {
      type: String,
      required: true,
    },
    previousRoute: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToPrevious() {
      this.$router.push(this.previousRoute);
    },
    goToNext() {
      this.$router.push(this.nextRoute);
    },
  },
};
</script>

<style scoped>
.navigation-button {
  background-color: white; /* Baggrundsfarve */
  color: green; /* Tekstfarve */

  padding: 10px 20px;
  font-size: 16px;
}
</style>
