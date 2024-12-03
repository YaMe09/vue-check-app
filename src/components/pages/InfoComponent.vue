<template>
  <div v-if="isVisible">
    <br/>
    <img src="../images/gg_close.svg" class="left" @click="closeInfo" />
    <v-container class="info">
      <br/><br/><br/><br/>
      <v-card-text>
        Selv små skridt mod elbesparing kan have stor betydning for en bæredygtig fremtid. Vælg energibesparende løsninger i din hverdag og vær med til at bekæmpe klimaforandringer!
      </v-card-text>
      <v-spacer></v-spacer>

      <v-card-text>
        Du sparer 800 kg CO2/år
      </v-card-text>
      <v-spacer></v-spacer>

      <v-card-text>
        Dit valg af bæredygtig transport gør en stor forskel! Hver lille handling tæller i beskyttelsen af vores planet og fremtiden.
      </v-card-text>
      <v-spacer></v-spacer>

      <v-card-text>
        Dine indkøb kan støtte bæredygtighed. Vælg lokale, genbrugte eller sæsonbestemte produkter. Hver handling tæller; lad os skabe en grønnere fremtid sammen!
      </v-card-text>

      <v-spacer></v-spacer>
      <v-card-text>
        Du sparer 0,5 til 1 ton CO2 om året
      </v-card-text>
      <v-spacer></v-spacer>

      <v-card-text>
        Lad os skabe en bæredygtig fremtid én skive brød ad gangen!
      </v-card-text>
      <v-spacer></v-spacer>

      <v-card-text>
        Du sparer 200-300 kg CO2 om året
      </v-card-text>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'InfoComponent',
  setup() {
    const router = useRouter();
    const isVisible = ref(true);

    const closeInfo = () => {
      isVisible.value = false;
      router.push('/transportComponent');
    };

    return {
      isVisible,
      closeInfo,
    };
  },
});
</script>

<style scoped>

.info {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #000000;
  background-image: url('../images/forside.svg');
  background-size: cover;
  background-position: center;
  margin-top: 100px;
}
.left {
  float: right;
  margin-right: 25px;
}
</style>
