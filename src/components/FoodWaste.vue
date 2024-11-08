<template>
  <NavComponent />
  <v-app class="foodwaste" id="foodwaste">
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', borderRadius: '25px', padding: '24px', width: '395px', marginBottom: '24px'}">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dit madspild været?</h2>
      </v-col>



        <CheckList
          :checklistItems="checklistItems"
          :selectedItems="selectedItems"
          @update:selectedItems="updateSelectedItems"
        />


      <ArrowComponent nextRoute="/scoreComponent" previousRoute="/genbrugeComponent" />

      <PointDisplay :points="totalPoints" />

    </v-container>
  </v-app>
</template>

<script>
import CheckList from './CheckList.vue';
import NavComponent from './NavComponent.vue';
import PointDisplay from './PointDisplay.vue';
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
        { id: 1, name: "Køb lokale råvarer", score: 100 },
        { id: 2, name: "Spis vegetarisk", score: 200 },
        { id: 3, name: "Undgå madspild", score: 150 },
        { id: 4, name: "Køb økologiske produkter", score: 75 },
        { id: 5, name: "Lav hjemmelavet mad frem for færdigretter", score: 50 },
        { id: 6, name: "Brug genanvendelige emballager", score: 100 },
        { id: 7, name: "Drik vand fra hanen i stedet for flaskevand", score: 50 },
        { id: 8, name: "Reducer kødindtag", score: 150 },
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
.v-container {
  justify-content: center;

  border-radius: 10px;

}
.award-badge{
background: #E59182;
border-radius: 25px;
}

.foodwaste {
  background-color: #E9E5E5;
  width: 100%;
  padding: 0;



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
.v-container[data-v-6c44f5ed] {
  background: #E59182;
 padding: 0;
}
div[data-v-617dcb71] {
  background: #E59182;
  padding: 0;
}
</style>
