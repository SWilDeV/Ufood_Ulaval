<template>
  <div class="container">
    <template v-if="restaurant">
      <div class="text-center">
        <img
          class="rounded img-fluid"
          src="@/assets/restaurant-normandin.jpg"
          alt="Normandin Restaurant"
        />
        <h1 id="restaurantName" class="text-center">{{ restaurant.name }}</h1>
        <h5 id="restaurantAdress">
          {{ restaurant.address }}
        </h5>
        Phone : {{ restaurant.tel }}
      </div>
      <br />
      <div class="row">
        <span class="col-sm-3"
          >Food type :
          <span v-for="(type, index) in restaurant.genres" :key="index">{{ type }}, </span></span
        >
        <span class="col-sm-3">Price range : {{ restaurant.price_range }}/5</span>
        <span class="col-sm-3 font-weight-bold">Rating : {{ restaurantRating }}/5</span>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-8">
          <iframe
            width="100%"
            height="400px"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.452445647169!2d-71.34114555026918!3d46.8567226120164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s87RCVM46%2BV8!5e0!3m2!1sfr!2sca!4v1612643262694!5m2!1sfr!2sca"
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
            <b-table stripped hover :items="openingHours" :fields="fields" />
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

      opHours: [
        //{ day: 'Sunday', hours: '9.00am to 7.30pm' },
        //{ day: 'Monday', hours: '9.00am to 7.30pm' },
        //{ day: 'Tuesday', hours: '9.00am to 7.30pm' },
        //{ day: 'Wednesday', hours: '9.00am to 7.30pm' },
        //{ day: 'Thursday', hours: '9.00am to 7.30pm' },
        //{ day: 'Friday', hours: '9.00am to 7.30pm' },
        //{ day: 'Saturday', hours: '9.00am to 7.30pm' }
      ]
    }
  },

  computed: {
    restaurantRating() {
      return Math.round(this.restaurant.rating * 10, 2) / 10
    }
  },

  methods: {
    openingHours() {
      let hoursList = []
      hoursList = this.restaurant.opening_hours

      let items = [
        { day: 'Sunday', hours: `${hoursList.sunday}` },
        { day: 'Monday', hours: `${hoursList.monday}` },
        { day: 'Tuesday', hours: `${hoursList.tuesday}` },
        { day: 'Wednesday', hours: `${hoursList.wednesday}` },
        { day: 'Thursday', hours: `${hoursList.thursday}` },
        { day: 'Friday', hours: `${hoursList.friday}` },
        { day: 'Saturday', hours: `${hoursList.saturday}` }
      ]

      for (let item in items) {
        if (items[item].hours === 'null') {
          items[item].hours = 'Closed'
        }
      }
      return items
    }
  },

  async created() {
    const response = await get(`/unsecure/restaurants/${this.$route.params.id}`)
    this.restaurant = await response.json()
  }
}
</script>
<style scoped>
.row {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
