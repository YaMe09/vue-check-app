<template>
  <NavComponent />
  <v-app class="genbruge" id="genbruge">
    <v-container fluid fill-height :style="{backgroundColor:'#E9E5E5', width: '100%', padding: '24px'}">
      
      <!-- Heading -->
      <v-col cols="12" md="8" lg="4" class="text-center">
        <h2 class="question">Hvordan har dine indkøb været?</h2>
      </v-col>

      <!-- Transport Options -->
      <v-col
        cols="12"
        md="8"
        lg="4"
        align="center"
        :style="{ backgroundColor: '#8981A8', borderRadius: '25px', padding: '24px', width: '485px', marginBottom: '24px' }"
      >
        <v-list :style="{ backgroundColor: '#8981A8', flexDirection: 'column', alignItems: 'center' }">
          <v-list-item-group>
            <v-list-item
              v-for="option in transportSchedule"
              :key="option.id"
              @click="selectOption(option.id)"
              :class="{ 'selected': selectedOption === option.id, 'disabled': selectedOption && selectedOption !== option.id }"
              :style="optionStyle(option.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ option.name }}</v-list-item-title>
                <v-list-item-subtitle> Score: {{ option.score }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedOption"
                  :value="option.id"
                  :disabled="selectedOption && selectedOption !== option.id"
                  :aria-label="option.name"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <!-- Navigation Arrows -->
      <v-col cols="12">
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <img src="../images/Undo.svg" @click="previousStep" />
          </v-col>
          <v-spacer />
          <v-col cols="auto">
            <img src="../images/Forward Arrow.svg" @click="nextStep" />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <PointDisplay :points="totalPoints" />
    <CalculatePoints :selectedItems="selectedItems" @update:points="updatePoints" />
  </v-app>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import NavComponent from './NavComponent.vue';
import CalculatePoints from './CalculatePoints.vue';
import PointDisplay from './PointDisplay.vue';
import {
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VCheckbox,
  VBtn,
  VCol,
  VRow,
  VContainer,
  VApp,
  VSpacer,
} from 'vuetify/components';

export default defineComponent({
  name: 'GenbrugeComponent',
  components: {
    NavComponent,
    CalculatePoints,
    PointDisplay,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VCheckbox,
    VBtn,
    VCol,
    VRow,
    VContainer,
    VApp,
    VSpacer,
  },
  setup() {
    const router = useRouter();

    const transportSchedule = ref([
      { id: '1', name: 'Sælg uønskede ting og find nye skatte.', score: 100 },
      { id: '2', name: 'Spar ressourcer ved at købe brugte bøger.', score: 120 },
      { id: '3', name: 'Lær at reparere i stedet for at smide væk.', score: 150 },
      { id: '4', name: 'Skift til genanvendelige opbevaringsløsninger.', score: 200 },
      { id: '5', name: 'Giv ubrugte ting nyt liv og mindsk affald.', score: 200 },
      { id: '6', name: 'Find genbrugte tøj og møbler og spar ressourcer', score: 100 },
    ]);
    const selectedOption = ref(null);

    const selectOption = (optionId) => {
      selectedOption.value = selectedOption.value === optionId ? null : optionId;
    };

    const optionStyle = (optionId) => {
      return selectedOption.value === optionId
        ? { backgroundColor: '#56AA3F' }
        : { backgroundColor: '#D9D9D9' };
    };

    const selectedItems = computed(() => {
      return transportSchedule.value.filter(option => selectedOption.value === option.id);
    });

    const totalPoints = ref(0);

    const updatePoints = (points) => {
      totalPoints.value = points;
    };

    const nextStep = () => {
      alert('kommer snart');
    };

    const previousStep = () => {
      router.push('/transportComponent');
    };

    return {
      transportSchedule,
      selectedOption,
      selectOption,
      optionStyle,
      nextStep,
      previousStep,
      selectedItems,
      totalPoints,
      updatePoints,
    };
  },
});
</script>

<style scoped>
.v-container {
  padding: 0;
}
.genbruge {
  height: 80vh;
}
.question {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 24px;
}
.selected {
  background-color: #4caf50;
  color: white;
}
.disabled {
  opacity: 0.5;
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
  width: 100%;
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
</style>