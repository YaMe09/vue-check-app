<template>
  <NavComponent />
  <MenuComponent />
  <v-app class="energy-consumption" id="energy-consumption">
    <v-container  align="center" justify="center" :style="{ backgroundColor: '#E9E5E5', width: '100%', marginBottom: '24px'}">
      <br/>
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dit El-forbrug været?</h2>
      </v-col>

      <CheckList :style="{ backgroundColor: '#32898F', width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />

      <ArrowComponent nextRoute="/genbrugeComponent" previousRoute="/transportComponent" />


    </v-container>
  </v-app>
</template>

<script>
import CheckList from '../features/CheckList.vue';
import NavComponent from '../navigation/NavComponent.vue';
import ArrowComponent from '../navigation/ArrowComponent.vue';
import MenuComponent from '../navigation/MenuComponent.vue';

export default {
  name: 'ElUse',
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
    }
  },
  created() {
    this.fetchChecklistItems();
  },
  methods: {
    async fetchChecklistItems() {
      try {
        // Antag at category_id for 'eluse' er 1
        const categoryId = 1;
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
    }
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
    /*overflow: none;
    padding: 8px 0; }
    background: rgba(var(--v-theme-surface));
    height:550px; */
}


/* Media queries for responsiveness */
@media (max-width: 600px) {
  .question {
    font-size: 1.5rem; /* Smaller font size for mobile */
  }

  .checklist-card {
    padding: 8px; /* Adjust padding for mobile */
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .question {
    font-size: 2rem; /* Medium font size for tablets */
  }

  .checklist-card {
    padding: 10 px; /* Maintain padding for tablets */
  }
}

</style>
