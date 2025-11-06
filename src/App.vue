<template>
  <nav class="navbar navbar-expand-lg p-4 flex align-items-baseline">
    <router-link class="navbar-brand fw-bold fst-italic fs-1 ps-2 pe-3" to="/">Bad Bytes</router-link>
    <router-link class="nav-link px-3 fs-3" to="/games">Games</router-link>
    <router-link class="nav-link px-3 fs-3" to="/about">About</router-link>
  </nav>
  <div class="ps-4">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #090040;
}
.navbar-brand {
  color: #FFCC00;
}
.nav-link {
  color: white;
}
a:hover {
  opacity: 0.75;
}
</style>
