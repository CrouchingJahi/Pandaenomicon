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
      const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return this.$store.state.chores.reduce((list, day, ind) => {
        if (!day.mornClean || day.mornClean == 'N/A') {
          list.push(`${days[ind]} Morning Cleaning`)
        }
        if (!day.bfastPrep || day.bfastPrep == 'N/A') {
          list.push(`${days[ind]} Breakfast Prep`)
        }
        if (!day.bfastClean || day.bfastClean == 'N/A') {
          list.push(`${days[ind]} Post-Breakfast Cleaning`)
        }
        if (!day.dinnerClean || day.dinnerClean == 'N/A') {
          list.push(`${days[ind]} Pre-Dinner Cleaning`)
        }
        if (!day.dinnerPrep || day.dinnerPrep == 'N/A') {
          list.push(`${days[ind]} Dinner Prep`)
        }
        if (!day.pdinnerClean || day.pdinnerClean == 'N/A') {
          list.push(`${days[ind]} Post-Dinner Cleaning`)
        }
        return list
      }, [])
    },
    choreCounts () {
      const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return this.$store.state.chores.reduce((summary, day, ind) => {
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
