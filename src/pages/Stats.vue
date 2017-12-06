<template>
  <div>
    <h2>Stats</h2>
    <h3>Chores</h3>
    <h4>Unaccounted Chores</h4>
    <ul>
      <li v-for="c in unaccountedChores">{{ c }}</li>
    </ul>
    <h4>Chore Counts</h4>
    <table>
      <tbody>
        <tr v-for="(count, person) in choreCounts">
          <td>{{ person }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StatsPage',
  computed: {
    unaccountedChores () {
      return this.$store.state.chores.reduce((list, day) => {
        if (!day.mornClean && day != 'Saturday') {
          list.push(`${day.day} Morning Cleaning`)
        }
        if (!day.bfastPrep && day != 'Saturday') {
          list.push(`${day.day} Breakfast Prep`)
        }
        if (!day.bfastClean && day != 'Saturday') {
          list.push(`${day.day} Post-Breakfast Cleaning`)
        }
        if (!day.dinnerClean) {
          list.push(`${day.day} Pre-Dinner Cleaning`)
        }
        if (!day.dinnerPrep) {
          list.push(`${day.day} Dinner Prep`)
        }
        if (!day.pdinnerClean) {
          list.push(`${day.day} Post-Dinner Cleaning`)
        }
        return list
      }, [])
    },
    choreCounts () {
      return this.$store.state.chores.reduce((summary, day) => {
        let tasks = Object.keys(day)
        for (let no in tasks) {
          day[tasks[no]].split(', ').forEach(dude => {
            if (!!dude && dude != 'N/A') {
              summary[dude] = summary[dude] ? summary[dude] + 1 : 1
            }
          })
        }
        return summary
      }, {})
    }
  }
}
</script>
