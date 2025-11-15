<template>
  <div class="navbar bg-palette-blue p-5 rounded-2xl shadow-xl">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost text-3xl hover:bg-palette-black rounded-xl p-8">GameFridge</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <router-link to="/games" class="btn btn-ghost text-xl mx-3 hover:bg-palette-black">Games</router-link>
        </li>
        <li>
          <router-link to="/about" class="btn btn-ghost text-xl mx-3 hover:bg-palette-black">About</router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="pt-10">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
