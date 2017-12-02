<template>
  <div id="app">
    <header>
      <h1><router-link to="/">Pandaenomicon</router-link></h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function () {
    this.$store.dispatch('pullData')
  }
}
</script>

<style>
:root {
  --color-bg: #1B1213;
  --color-dgray: #363946;
  --color-mgray: #3D404F;
  --color-lgray: #B9CFD4;
  --color-text: #D7DEDC;
  --color-main: #D84EBC;
  --color-dark: #A51B89; /* 931f1d as alternative choice */
  --color-gold: #E9D758;
  --color-error: #B52F35;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  margin: 0;
  padding: 0;
}

header {
  margin: 0;
  height: 56px;
  padding: 10px 24px;
  box-sizing: border-box;
  background-color: var(--color-dgray);
  border-bottom: 2px solid var(--color-lgray);
}

main {
  padding: 1em;
}

h1 {
  font-size: 1.5em;
  font-weight: normal;
  margin: 0;
}

a {
  color: var(--color-main);
  text-decoration: none;
}
a:hover {
  color: var(--color-gold);
  text-decoration: underline;
}
header a:visited {
  color: var(--color-main);
}

table {
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid var(--color-lgray);
}
.two-axis thead th:first-child {
  border-bottom: 0;
}
tbody th {
  border-right: 2px solid var(--color-lgray);
}
th {
  background-color: var(--color-bg);
  padding: 8px;
  text-align: left;
}
tr {
  background-color: var(--color-dgray);
}
tr:nth-child(2n) {
  background-color: var(--color-mgray);
}
td {
  padding: 8px;
}
hr {
  border-color: var(--color-main);
}
</style>
