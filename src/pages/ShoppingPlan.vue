<template>
  <div>
    <h2>Shopping Plan</h2>
    <div v-for="day in days">
      <h2>{{ day.day }} - {{ day.meal }}</h2>
      <p>Stomachs Filled: {{ day.count }}</p>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount Needed</th>
            <th>Approx. Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingr in day.ingredients">
            <td>{{ ingr.name }}</td>
            <td>{{ ingr.totalAmount }}</td>
            <td>{{ ingr.totalPrice }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th></th>
            <th>{{ mealTotal(day) | currency }}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingPlan',
  methods: {
    mealTotal (day) {
      let getPrice = ingr => parseFloat((ingr.totalPrice || '0').replace('$', '', ' ', ''))
      return day.ingredients.reduce((sum, ingr) => sum + getPrice(ingr), 0.0)
    }
  },
  computed: {
    days () {
      return this.$store.getters.mealList
    }
  },
  filters: {
    currency (amount) {
      return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    }
  }
}
</script>
