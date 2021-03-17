<template>
  <div class="card cell-restaurant">
    <img v-bind:src="restaurantPicture" class="img-fluid rounded mx-auto d-block" />
    <div class="card-body">
      <h4 class="card-title">{{ restaurant.name }}</h4>
      <p class="card-text">
        Adress: {{ restaurant.address }}<br />
        Price range: {{ restaurant.price_range }}<br />
        Food genres: {{ restaurantGenres }}<br />
        Rating: {{ restaurant.rating.toFixed(2) }}
      </p>
      <orderButton></orderButton>
    </div>
  </div>
</template>

<script>
import OrderButton from './OrderButton'

export default {
  name: 'restaurantCard',
  components: { OrderButton },
  props: ['restaurant'],

  computed: {
    restaurantPicture: function() {
      return this.restaurant.pictures[0]
    },

    restaurantGenres: function() {
      return this.restaurant.genres.join(' | ')
    }
  }
}
</script>

<style>
.cell-restaurant {
  padding-top: 2%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2em;
  box-shadow: 5px 10px #888888;
}

p {
  color: #333333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5625;
  margin-bottom: 15px;
}

img {
  width: 300px;
  height: 250px;
}

h4 {
  color: #111;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0 0 24px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
}
</style>
