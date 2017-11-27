<template>
  <div>
    <ul>
      <li v-for="link in links">
        <router-link :to="link.href">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      links: [
        {
          name: 'Attendance',
          href: '/attendance'
        },
        {
          name: 'Chores',
          href: '/chorechart'
        },
        {
          name: 'Events',
          href: '/events'
        },
        {
          name: 'Volunteer Shifts',
          href: '/volunteers'
        },
        {
          name: 'Meal Plan',
          href: '/mealplan'
        }
      ]
    }
  }
}
</script>
