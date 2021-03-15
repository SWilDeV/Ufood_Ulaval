<template>
  <div class="container">
    <template v-if="restaurant">
      <div class="text-center mt-4">
        <div class="imageCell">
          <img class="rounded img-fluid slider" :src="images[currentImage]" />
        </div>
        <h1 class="text-center">{{ restaurant.name }}</h1>
        <h5>
          {{ restaurant.address }}
        </h5>
        <div>Phone: {{ restaurant.tel }}</div>
      </div>
      <br />
      <div class="row">
        <span class="col-sm-3">Food types: {{ restaurant.genres.join(', ') }} </span>
        <span class="col-sm-3">Price range: {{ restaurant.price_range }}/5</span>
        <span class="col-sm-3 font-weight-bold">Rating: {{ restaurantRating }}/5</span>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-8">
          <iframe
            width="100%"
            height="400px"
            src="http://www.google.com/maps/place/@46.8179222,-71.2202176,17z"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          />
          <button type="button" class="btn btn-secondary">Directions</button>
        </div>
        <div class="col-sm-12 col-lg-4">
          <h4>Opening Hours</h4>
          <div>
            <b-table striped :items="openingHours" :fields="fields" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { get } from '@/api'
export default {
  data() {
    return {
      id: '5f31fc6155d7790550c08afe',
      restaurant: null,
      fields: [
        'day',
        'hours',
        {
          key: 'actions',
          label: ''
        }
      ],
      currentImage: 0,
      timer: null
    }
  },

  computed: {
    googleMapAddress() {
      return (
        'https://www.google.com/maps/embed/v1/view?key=' +
        '&center=' +
        this.restaurant.location.coordinates[0] +
        ',' +
        this.restaurant.location.coordinates[1] +
        '&zoom=14'
      )
    },

    images() {
      return this.restaurant.pictures || []
    },

    openingHours() {
      return Object.entries(this.restaurant.opening_hours).map(row => ({
        day: this.$i18n.t(`weekDays.${row[0]}`),
        hours: row[1] || 'Closed'
      }))
    },

    //   let hoursList = []
    //   hoursList = this.restaurant.opening_hours

    //   let items = [
    //     { day: 'Sunday', hours: `${hoursList.sunday}` },
    //     { day: 'Monday', hours: `${hoursList.monday}` },
    //     { day: 'Tuesday', hours: `${hoursList.tuesday}` },
    //     { day: 'Wednesday', hours: `${hoursList.wednesday}` },
    //     { day: 'Thursday', hours: `${hoursList.thursday}` },
    //     { day: 'Friday', hours: `${hoursList.friday}` },
    //     { day: 'Saturday', hours: `${hoursList.saturday}` }
    //   ]

    //   for (let item in items) {
    //     if (items[item].hours === 'null') {
    //       items[item].hours = 'Closed'
    //     }
    //   }
    //   return items
    // },

    restaurantRating() {
      return this.restaurant.rating.toFixed(1)
    }
  },

  methods: {
    startRotation() {
      this.timer = setInterval(this.next, 3000)
    },

    next() {
      this.currentImage = this.currentImage === this.images.length - 1 ? 0 : this.currentImage + 1
    }
  },

  async created() {
    try {
      const response = await get(`/unsecure/restaurants/${this.$route.params.id}`)
      this.restaurant = await response.json()
      this.startRotation()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
<style scoped>
.row {
  margin-top: 16px;
  margin-bottom: 16px;
}

.imageCell {
  width: auto;
  height: 300px;
  justify-content: center;
}

.slider {
  max-width: auto;
  height: 300px;
}
</style>
