<template>
    <NavComponent />
    <v-app class="energy-consumption" id="energy-consumption">
      <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', width: '100%', padding: '25px' }">
        <v-col cols="12" md="8" lg="4" class="text-center">
          <h2 class="question">Hvordan har dit El-forbrug været?</h2>
        </v-col>
  
        <CheckList
          :style="{ backgroundColor: '', flexDirection: 'column', alignItems: 'center' }"
          :checklistItems="checklistItems"
          :selectedItems="selectedItems"
          @update:selectedItems="updateSelectedItems"
        />

        <ArrowComponent nextRoute="/GenbrugeComponent" previousRoute="/TransportComponent" />
        <CalculatePoints
          :selectedItems="selectedItems"
          @update:points="emitUpdatePoints"
        />
        <PointDisplay :points="totalPoints" />
  
        <!-- Use NavigationButtons component here -->
        <NavigationButtons
          :previousRoute="'/TransportComponent'"
          :nextRoute="'/elUse'"
        />
      </v-container>
    </v-app>
  </template>
  
  <script>
  import CheckList from './CheckList.vue';
  import CalculatePoints from './CalculatePoints.vue';
  import PointDisplay from './PointDisplay.vue';
  import NavComponent from './NavComponent.vue';
  import ArrowComponent from './ArrowComponent.vue';
  
  export default {
    components: {
      PointDisplay,
      CheckList,
      CalculatePoints,
      NavComponent,
      ArrowComponent
    },
    data() {
      return {
        checklistItems: [
          { name: "Sluk for lys", score: 100 },
          { name: "Skift til LED-pærer", score: 200 },
          { name: "Vask i kold vand", score: 75 },
          { name: "Tør tøj naturligt", score: 50 },
          { name: "Brug energivenlige stik til apparater", score: 25 },
          { name: "Brug energibesparende apparater", score: 50 },
          { name: "Brug mindre varme", score: -100 },
        ],
        selectedItems: [], // User-selected list
        totalPoints: 0, // Total points
      };
    },
    methods: {
      updateSelectedItems(newSelectedItems) {
        this.selectedItems = newSelectedItems;
      },
      emitUpdatePoints(newPoints) {
        this.totalPoints = newPoints;
        this.$emit('update:points', newPoints);
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
.energy-consumption{
 background-color: #E9E5E5;
  width: 100%;
  padding: 0;
}
.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
}
.question {
  font-weight: bold;
  color: black;
  margin-top: 10px;
  margin-bottom: 24px;
}

.checklist-card {
  margin: 3px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.checklist-card.selected {
  background-color:  #4caf50;
  color: white;
}

.v-row {
  margin-top: 20px;
}

.custom-checkbox input:checked ~ .v-input__control .v-input__slot {
  background-color: #a6c9a8;
}
.v-label {
  color: black;
}
</style>

  