<template>
  <nav class="navbar navbar-expand-lg p-4">
    <router-link class="navbar-brand fw-bold" to="/">Bad Bytes</router-link>
    <div class="px-3">
      <router-link class="nav-link" to="/games">Games</router-link>
    </div>
    <div class="px-3">
      <router-link class="nav-link" to="/about">About</router-link>
    </div>
  </nav>
  <router-view></router-view>
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
  color: lightgrey;
}
</style>
