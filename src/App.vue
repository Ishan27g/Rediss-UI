<template>
  <div>
    <h1 id="Home">Rediss</h1>
    <router-view ></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  font-weight: bold;
  color: #1b1a1b;
  margin-left: 10%;
  margin-right: 10%;
}

#Home {
  padding: 25px;
  font-weight: bold;
  color: #15a857;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
