<template>
  <div id="map">
    <button @click="test()">Show names</button>
  </div>
</template>

<script>
import { getRestaurants } from '@/api/restaurants'
import gmapsInit from '@/api/gmaps.js'
import mixins from '@/mixins'

export default {
  name: 'MapMode',
  mixins: [mixins],
  props: ['params'],
  data() {
    return {
      restaurants: []
    }
  },

  async mounted() {
    try {
      const google = await gmapsInit()

      const map = new google.maps.Map(this.$el)

      var Item_1 = new google.maps.LatLng(this.latitude + 1, this.longitude + 1)
      var myPlace = new google.maps.LatLng(this.latitude, this.longitude)
      var bounds = new google.maps.LatLngBounds()
      bounds.extend(myPlace)
      bounds.extend(Item_1)
      map.fitBounds(bounds)
      map.setCenter({ lat: this.latitude, lng: this.longitude })

      /*
      const myLatLng = { lat: -25.363, lng: 131.044 }
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
      })
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: 'Hello World!'
      })
      */
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    test() {
      const restaurantsNumber = this.restaurants.length
      for (let i = 0; i < restaurantsNumber; i++) {
        const namesForRestaurantArray = this.restaurants[i].name
        console.log(namesForRestaurantArray)
      }
    }
  },

  async created() {
    await this.getPosition()
  },

  watch: {
    params: {
      deep: true,
      immediate: true,
      async handler({ genre, price, search }) {
        try {
          const results = await getRestaurants({
            count: 20,
            genre,
            price,
            search,
            longitude: this.longitude,
            latitude: this.latitude
          })
          this.restaurants = results.items
          console.log(this.restaurants)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#map {
  width: 100vw;
  height: 100vh;
}
</style>
