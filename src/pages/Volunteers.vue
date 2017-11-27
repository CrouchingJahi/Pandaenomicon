<template>
  <div>
    <h2>Volunteer Shifts</h2>
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
          <th>Morning</th>
          <td v-for="day in shifts">
            {{ day.morning }}
          </td>
        </tr>
        <tr>
          <th>Afternoon</th>
          <td v-for="day in shifts">
            {{ day.afternoon }}
          </td>
        </tr>
        <tr>
          <th>Evening</th>
          <td v-for="day in shifts">
            {{ day.evening }}
          </td>
        </tr>
        <tr>
          <th>Night</th>
          <td v-for="day in shifts">
            {{ day.night }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VolunteersPage',
  computed: {
    shifts () {
      return this.$store.state.volunteers
    }
  }
}
</script>
