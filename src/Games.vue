<script setup>
import fireballLogo from "./games/fireball/fireball_logo.jpg"
import speechClockLogo from "./games/speech_clock/speech_clock_logo.png"

const games = [
  {
    "name": "Fireball",
    "url": "/games/fireball",
    "logo": fireballLogo,
    "description": "A fast-paced 1v1 duel against the computer. Do you have what it takes to win?"
  },
  {
    "name": "Speech Clock",
    "url": "/games/speech-clock",
    "logo": speechClockLogo,
    "description": "The undoubtedly best timer for speech. Has time signals and everything."
  }
]
</script>

<template>
  <div class="grid grid-cols-3 gap-5">
    <div
    v-for="game in games"
    class="card bg-palette-white shadow-lg rounded-2xl hover:ring-4 hover:ring-palette-blue hover:shadow-2xl transition-all drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)]">
      <figure>
        <img :src="game.logo" class="w-[10vw] h-[20vh]">
      </figure>
      <div class="card-body">
        <h1 class="card-title text-palette-black text-3xl">{{ game.name }}</h1>
        <p class="text-palette-black text-lg mt-3">{{ game.description }}</p>
        <router-link :to="game.url"
        class="mt-5 btn hover:bg-palette-white hover:text-palette-black hover:border-palette-black border-3
        shadow-none bg-palette-black text-white text-2xl py-6 hover:italic hover:shadow-2xl">
          Play
        </router-link>
      </div>
    </div>
  </div>
</template>
