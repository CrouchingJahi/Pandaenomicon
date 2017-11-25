<template>
  <div>
    <h2>Attendants</h2>
    <p>We've got {{attendants.length}} heathens.</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tented?</th>
          <th>Prereg?</th>
          <th>Camp Fee Paid?</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Rag Vet?</th>
          <th>Meal Plan?</th>
          <th>Meal Plan Paid?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dude in attendants">
          <td>{{dude.name}}</td>
          <td>{{dude.tented}}</td>
          <td>{{dude.preReg}}</td>
          <td>{{dude.campFee}}</td>
          <td>{{dude.arrival}}</td>
          <td>{{dude.departure}}</td>
          <td>{{dude.ragVet}}</td>
          <td>{{dude.mealPlan}}</td>
          <td>{{dude.mealPlanPaid}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AttendancePage',
  computed: {
    attendants () {
      return this.$store.getters.goingAttendants
    }
  }
}
</script>
