<template>
  <div>
    <ul>
      <li v-for="link in links">
        <router-link :to="link.path">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { routes } from '@/router'

export default {
  name: 'HomePage',
  data () {
    let links = routes.filter(route => route.homeLink)
    return {
      links
    }
  }
}
</script>
