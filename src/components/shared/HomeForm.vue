<template>
  <div class="home-form">
    <homeHeader></homeHeader>
    <restaurantsList></restaurantsList>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import RestaurantsList from './RestaurantsList'

export default {
  name: 'homeForm',
  components: { HomeHeader, RestaurantsList }
}
</script>

<style></style>
