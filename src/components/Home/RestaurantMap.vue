<template>
  <div id="map"></div>
</template>

<script>
import gmapsInit from '@/api/gmaps.js'

export default {
  name: 'MapMode',
  props: {
    coords: {},
    restaurants: {
      type: Array,
      required: true
    }
  },
  watch: {
    restaurants: {
      immediate: true,
      async handler(restaurants) {
        try {
          const google = await gmapsInit()

          const center = {
            lat: this.coords ? this.coords.latitude : 46.7811209,
            lng: this.coords ? this.coords.longitude : -71.2728986
          } // Université Laval
          const zoom = 12
          const map = new google.maps.Map(document.getElementById('map'), { center, zoom })

          for (const restaurant of restaurants) {
            const coordonnees = restaurant.location.coordinates
            const label = restaurant.name
            const longitude = coordonnees[0]
            const latitude = coordonnees[1]
            const position = new google.maps.LatLng(latitude, longitude)
            new google.maps.Marker({ label, map, position })
          }
        } catch (error) {
          console.error(error)
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
