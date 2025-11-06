<script setup>
const games = [
  {
    "name": "Fireball",
    "url": "/games/fireball",
    "logo": "/src/games/fireball/fireball_logo.jpg",
    "description": "A fast-paced 1v1 duel against the computer. Do you have what it takes to win?"
  }
]

const imageDim = 250
</script>

<template>
  <div v-for="game in games">
    <div class="card m-4 p-3 rounded-4">
      <img class="card-image-top" :src="game.logo" :width="imageDim" :height="imageDim">
      <div class="card-body">
        <h5 class="card-title">{{ game.name }}</h5>
        <p class="card-text">{{ game.description }}</p>
        <router-link :to="game.url" class="btn btn-primary">Play {{ game.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
