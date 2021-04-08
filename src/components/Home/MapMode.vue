<template>
  <div id="map"></div>
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

  methods: {
    async renderMap() {
      try {
        const google = await gmapsInit()
        let myMap = new google.maps.Map(document.getElementById('map'), {
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 12
        })

        //On rajoute les markers:

        const restaurantsNumber = this.restaurants.length
        for (let i = 0; i < restaurantsNumber; i++) {
          const coordonnees = this.restaurants[i].location.coordinates
          const longitude = coordonnees[0]
          const latitude = coordonnees[1]
          const latlng = new google.maps.LatLng(latitude, longitude)
          const myMarkerOptions = {
            position: latlng,
            map: myMap,
            label: this.restaurants[i].name
          }
          // eslint-disable-next-line no-unused-vars
          const myMarker = new google.maps.Marker(myMarkerOptions)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },

  async created() {
    await this.getPosition()
    this.renderMap()
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
          this.renderMap()
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
  width: 97.5vw;
  height: 97.5vh;
  margin-bottom: 1%;
}
</style>
