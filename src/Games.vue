<script setup>
import fireballLogo from "./games/fireball/fireball_logo.jpg"

const games = [
  {
    "name": "Fireball",
    "url": "/games/fireball",
    "logo": fireballLogo,
    "description": "A fast-paced 1v1 duel against the computer. Do you have what it takes to win?"
  },
  {
    "name": "Fireball",
    "url": "/games/fireball",
    "logo": fireballLogo,
    "description": "A fast-paced 1v1 duel against the computer. Do you have what it takes to win?"
  }
]
</script>

<!-- <template>
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
</template> -->

<template>
  <div class="grid grid-cols-2 gap-5">
    <div
    v-for="game in games"
    class="card bg-palette-white shadow-lg rounded-2xl hover:ring-4 hover:ring-palette-blue hover:shadow-2xl transition-all">
      <figure>
        <img :src="game.logo">
      </figure>
      <div class="card-body">
        <h1 class="card-title text-palette-black">{{ game.name }}</h1>
      </div>
    </div>
  </div>
</template>
