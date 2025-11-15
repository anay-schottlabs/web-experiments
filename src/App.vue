<script setup></script>

<template>
  <div class="navbar bg-palette-blue p-5 shadow-xl sticky z-1 top-0">
    <div class="navbar-start flex-1">
      <router-link to="/" class="btn btn-ghost text-4xl hover:bg-palette-black rounded-xl p-8">GameFridge</router-link>
    </div>
    <div class="navbar-center content-center">
      <ul class="menu menu-horizontal">
        <li>
          <router-link to="/games" class="btn btn-ghost text-2xl mx-3 p-5 py-6 rounded-xl hover:bg-palette-black">Games</router-link>
        </li>
        <li>
          <router-link to="/about" class="btn btn-ghost text-2xl mx-3 p-5 py-6 rounded-xl hover:bg-palette-black">About</router-link>
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
