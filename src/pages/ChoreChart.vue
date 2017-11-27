<template>
  <div>
    <h2>Chore Chart</h2>
    <table class="two-axis">
      <thead>
        <tr>
          <th></th>
          <th>Saturday</th>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Morning Camp Cleanup</th>
          <td v-for="day in chores">
            {{ day.mornClean }}
          </td>
        </tr>
        <tr>
          <th>Breakfast Prep (Cooking)</th>
          <td v-for="day in chores">
            {{ day.bfastPrep }}
          </td>
        </tr>
        <tr>
          <th>Breakfast Cleanup</th>
          <td v-for="day in chores">
            {{ day.bfastClean }}
          </td>
        </tr>
        <tr>
          <th>Pre-Dinner Cleanup</th>
          <td v-for="day in chores">
            {{ day.pdinnerClean }}
          </td>
        </tr>
        <tr>
          <th>Dinner Prep (Cooking)</th>
          <td v-for="day in chores">
            {{ day.dinnerPrep }}
          </td>
        </tr>
        <tr>
          <th>Dinner Cleanup</th>
          <td v-for="day in chores">
            {{ day.dinnerClean }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ChoreChartPage',
  computed: {
    chores () {
      return this.$store.state.chores
    }
  }
}
</script>

<style>
</style>
