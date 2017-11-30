<template>
  <div>
    <h2>Meal Plan</h2>
    <div v-if="meals.sat">
      <ul>
        <span class="day-marker">Saturday</span>
        <li>Dinner - {{ meals.sat.dinner.meal }}</li>
        <span class="day-marker">Sunday</span>
        <li>Breakfast - {{ meals.sun.breakfast.meal }}</li>
        <li>Dinner - {{ meals.sun.dinner.meal }}</li>
        <span class="day-marker">Monday</span>
        <li>Breakfast - {{ meals.mon.breakfast.meal }}</li>
        <li>Dinner - {{ meals.mon.dinner.meal }}</li>
        <span class="day-marker">Tuesday</span>
        <li>Breakfast - {{ meals.tue.breakfast.meal }}</li>
        <li>Dinner - {{ meals.tue.dinner.meal }}</li>
        <span class="day-marker">Wednesday</span>
        <li>Breakfast - {{ meals.wed.breakfast.meal }}</li>
        <li>Dinner - {{ meals.wed.dinner.meal }}</li>
        <span class="day-marker">Thursday</span>
        <li>Breakfast - {{ meals.thur.breakfast.meal }}</li>
        <li>Dinner - {{ meals.thur.dinner.meal }}</li>
        <span class="day-marker">Friday</span>
        <li>Breakfast - {{ meals.fri.breakfast.meal }}</li>
        <li>Dinner - {{ meals.fri.dinner.meal }}</li>
        <span class="day-marker">Saturday 2</span>
        <li>Breakfast - {{ meals.sat2.breakfast.meal }}</li>
      </ul>
      <hr />
      <div v-for="meal in mealList">
        <h3>{{ meal.meal }}</h3>
        <span v-if="meal.chef">with Chef {{ meal.chef }}</span>
        <ul v-if="meal.ingredients.length">
          <li v-for="ingr in meal.ingredients">
            {{ ingr.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MealPlanPage',
  computed: {
    meals () {
      return this.$store.state.meals
    },
    mealList () {
      return [
        this.$store.state.meals.sat.dinner,
        this.$store.state.meals.sun.breakfast,
        this.$store.state.meals.sun.dinner,
        this.$store.state.meals.mon.breakfast,
        this.$store.state.meals.mon.dinner,
        this.$store.state.meals.tue.breakfast,
        this.$store.state.meals.tue.dinner,
        this.$store.state.meals.wed.breakfast,
        this.$store.state.meals.wed.dinner,
        this.$store.state.meals.thur.breakfast,
        this.$store.state.meals.thur.dinner,
        this.$store.state.meals.fri.breakfast,
        this.$store.state.meals.fri.dinner,
        this.$store.state.meals.sat2.breakfast
      ]
    }
  }
}
</script>
<style scoped>
.day-marker {
  color: var(--color-gold);
  font-weight: bold;
}
</style>
