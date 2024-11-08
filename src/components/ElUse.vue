<template>
  <NavComponent />
  <v-app class="energy-consumption" id="energy-consumption">
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', padding:'24', /* width: 100%; */}"><br/>
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dit El-forbrug været?</h2>
      </v-col>

      <v-col
        cols="12"
        md="8"
        lg="4"
        align="center"
        :style="{ backgroundColor: '#E9E5E5', borderRadius: '25px', padding: '20px', width: '485px'}"
      >
        <CheckList
          :checklistItems="checklistItems"
          :selectedItems="selectedItems"
          @update:selectedItems="updateSelectedItems"

        />
      </v-col>

      <ArrowComponent nextRoute="/GenbrugeComponent" previousRoute="/TransportComponent" />

      <PointDisplay :points="totalPoints" :style="{background: '#1E7F85', borderRadius:'20px'}" />
    </v-container>
  </v-app>
</template>

<script>
import CheckList from './CheckList.vue';
import PointDisplay from './PointDisplay.vue';
import NavComponent from './NavComponent.vue';
import ArrowComponent from './ArrowComponent.vue';

export default {
  components: {
    PointDisplay,
    CheckList,
    NavComponent,
    ArrowComponent,
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
    };
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedItems; // Get selected items from Vuex state
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
    },
  },
  methods: {
    updateSelectedItems(newSelectedItems) {
      this.$store.dispatch('updateSelectedItems', newSelectedItems); // Update selected items in Vuex
      this.$store.dispatch('updateTotalPoints'); // Recalculate total points after updating selected items
    },
  },
};
</script>

<style scoped>
.award-badge{
background:#1E7F85;
border-radius: 25px;
}

.energy-consumption {
  background-color: #E9E5E5;
  width: 100%;
  padding: 0;
  height: 90vh;
}

.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
  color: black;
}

.checklist-card {
  margin: 3px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.checklist-card.selected {
  background-color: #4caf50;
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


div[data-v-617dcb71]{
 background: #1E7F85;

}

.v-list.v-theme--light.v-list--density-default.v-list--one-line{
    background: #1E7F85;
    padding: 0;
    overflow: none;
}



</style>
