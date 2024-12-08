<template>
  <NavComponent/>
  <MenuComponent/>
  <v-app class="genbruge" id="genbruge">
    <v-container fluid fill-height :style="{ backgroundColor: '#E9E5E5', borderRadius: '25px', padding: '24px', width: '395px', marginBottom: '24px'}">
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har din genbrug været?</h2>
      </v-col>

      <CheckList :style="{ backgroundColor: '#8FCACA', width: '100%' }"
        :checklistItems="checklistItems"
        :selectedItems="selectedItems"
        @update:selectedItems="updateSelectedItems"
      />

      <ArrowComponent nextRoute="/foodWaste" previousRoute="/elUse" />
    </v-container>
  </v-app>
</template>

<script>
import CheckList from '../features/CheckList.vue';
import NavComponent from '../navigation/NavComponent.vue';
import ArrowComponent from '../navigation/ArrowComponent.vue';
import MenuComponent from '../navigation/MenuComponent.vue';

export default {
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
        // Antag at category_id for 'usedthing' er 4
        const categoryId = 4;
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
 padding: 0;
}


.question {
 font-weight: bold;
 margin-top: 10px;
 margin-bottom: 24px;
}
.selected {
 background-color: #4CAF50 !important;
 color: white;
}
.disabled {
 opacity: 0.6;
 pointer-events: none;
}
.award-badge {
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 20px auto;
 border-radius: 18px;
 opacity: 0.9px;
}
.award-badge .v-btn {
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%; /* Gør knappen fuld bredde */
}
.v-list-item-subtitle {
 font-size: 16px;
 color: red;
}
.v-list-item-title {
 font-size: 20px;
 color: black;
 margin-top: 5px;
}
.v-list-item-action {
 width: 0;
 height: 0;
}
.v-list-item--density-default.v-list-item--one-line {
 padding: 15px;
 margin-top: 8px;
 margin-bottom: 12px;
 justify-content: center;
}
.award-badge[data-v-db81f2f0]{
 margin: 0;
}
.award-badge{
 background-color: #8FCACA;
 border-radius: 25px;
}


</style>


