<script setup>
import logo from "./assets/gamefridge_logo.png"
</script>

<template>
  <div class="navbar bg-palette-blue p-5 shadow-xl sticky z-1 top-0">
    <div class="navbar-start flex-1">
      <img :src="logo" class="w-[5vw] h-[8vh] -mr-5">
      <router-link to="/" class="btn btn-ghost text-4xl hover:bg-palette-black rounded-xl py-8">
        <p class="text-4xl text-white">GameFridge</p>
      </router-link>
    </div>
    <div class="navbar-center content-center">
      <ul class="menu menu-horizontal">
        <li>
          <router-link to="/games" class="btn btn-ghost text-2xl mx-3 p-5 py-6 rounded-xl hover:bg-palette-black text-white">Games</router-link>
        </li>
        <li>
          <router-link to="/about" class="btn btn-ghost text-2xl mx-3 p-5 py-6 rounded-xl hover:bg-palette-black text-white">About</router-link>
        </li>
      </ul>
    </div>
    <div class="flex-1 navbar-end">
      <div class="btn bg-palette-black text-white text-3xl p-7 hover:bg-palette-white
      hover:text-palette-black border-3 shadow-none hover:italic">
        1.0.0
      </div>
    </div>
  </div>
  <div class="p-6">
    <router-view></router-view>
  </div>
</template>
