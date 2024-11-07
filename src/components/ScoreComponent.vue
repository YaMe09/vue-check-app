<template>
  <v-container>
  <h1 class="score-title">Dagens score</h2>
    
    <div class="score-value">400</div>

    <v-card-text>
      Du har sparet miljøet
    </v-card-text>
    <p class="co2-amount">1000 gram CO₂ i dag</p>

    <div class="tree-section">
      <p>Vand dit træ og få dagens point</p>
      <img src="images/fa-solid_award.svg" alt="træ" class="award-icon" />
    </div>

    <div class="carbon-reduction">
      <strong>REDUCERE 600KG CARBON</strong> per uge
    </div>
    <div class="button-group">
      <button @click="goBack" class="back-button">Tilbage</button>
      <button @click="goHome" class="home-button">Startside</button>
    </div>
  </div>






  </v-container>
</template>
