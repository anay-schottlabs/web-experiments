<script setup>
import fireballLogo from "./games/fireball/fireball_logo.jpg"

const games = [
  {
    "name": "Fireball",
    "url": "/games/fireball",
    "logo": fireballLogo,
    "description": "A fast-paced 1v1 duel against the computer. Do you have what it takes to win?"
  }
]

const imageDim = 250
</script>

<template>
  <div v-for="game in games">
    <div class="card w-50 p-3 rounded-5">
      <img class="card-image-top d-block mx-auto" :src="game.logo" :width="imageDim" :height="imageDim">
      <div class="card-body d-grid">
        <h5 class="card-title fs-2 title">{{ game.name }}</h5>
        <p class="card-text text-white fs-4">{{ game.description }}</p>
        <router-link :to="game.url" class="btn btn-primary fs-3 fw-bold title btn-lg">Play</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #090040;
  border: 0.5em solid #FFCC00;
}
.card-title {
  color: #FFCC00;
}
</style>
