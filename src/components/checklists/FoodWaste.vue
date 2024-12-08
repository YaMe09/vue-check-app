<template>
  <NavComponent />
  <MenuComponent />
  <v-app class="foodwaste" id="foodwaste">
    <v-container fluid fill-height align="center" justify="center" :style="{ backgroundColor: '#E9E5E5', padding: '24px'}">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dit madspild været?</h2>
      </v-col>

      <CheckList  :style="{ backgroundColor: '#E59182', width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />

      <ArrowComponent nextRoute="/userPage" previousRoute="/genbrugeComponent" />

    </v-container>
  </v-app>
</template>

<script>
import CheckList from '../features/CheckList.vue';
import NavComponent from '../navigation/NavComponent.vue';
import ArrowComponent from '../navigation/ArrowComponent.vue';
import MenuComponent from '../navigation/MenuComponent.vue';

export default {
  name: 'FoodWaste',
  components: {
    MenuComponent,
    CheckList,
    NavComponent,
    ArrowComponent,
  },
  data() {
    return {
      checklistItems: [],
    };
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedItems; // Get selected items from Vuex state
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints; // Get total points from Vuex getter
    },
    userLevel() {
      return this.$store.getters.getUserInfo.level; // Get user level from Vuex store
    },
  },
  created() {
    this.fetchChecklistItems();
  },
  methods: {
    async fetchChecklistItems() {
      try {
        // Antag at category_id for 'foodwaste' er 3
        const categoryId = 3;
        const response = await fetch(`http://localhost:3000/api/checklists/${categoryId}/${this.userLevel}`);
        const data = await response.json();
        this.checklistItems = data;
      } catch (error) {
        console.error('Error fetching checklist items:', error);
      }
    },
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
.v-col-12{
  background: #E59182;
  border-radius: 25px;
}
</style>
