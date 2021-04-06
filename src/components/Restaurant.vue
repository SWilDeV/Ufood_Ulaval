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
        <p>
          <span v-t="'restaurant.phone'"></span>
          <span>{{ restaurant.tel }}</span>
        </p>
        <b-button variant="warning" v-b-modal.favorite class="m-1" :disabled="!user">
          <font-awesome-icon icon="star" />
          {{ $t('restaurant.favorite') }}
        </b-button>
        <favorite-modal id="favorite" :restaurant-id="restaurant.id" />
        <b-button variant="info" v-b-modal.visit class="m-1" :disabled="!user">
          <font-awesome-icon icon="edit" />
          {{ $t('restaurant.visit') }}
        </b-button>
        <visit-modal id="visit" :restaurant-id="restaurant.id" />
      </div>
      <br />
      <div class="row">
        <span class="col-sm-3">
          <span v-t="'restaurant.foodType'" />
          <span>{{ restaurant.genres.join(', ') }}</span>
        </span>
        <span class="col-sm-3">
          <span v-t="'restaurant.priceRange'" />
          <span>{{ restaurant.price_range }}/5</span>
        </span>
        <span class="col-sm-3 font-weight-bold">
          <span v-t="'restaurant.rating'" />
          <span>{{ restaurantRating }}/5</span>
        </span>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-8">
          <iframe
            width="100%"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            :src="googleMapAddress"
          >
          </iframe>
        </div>
        <div class="col-sm-12 col-lg-4">
          <h4 v-t="'restaurant.openingHours'" />
          <b-table striped :items="openingHours" :fields="fields" />
        </div>
        <div class="directions"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get } from '@/api'
import FavoriteModal from '@/components/Restaurant/FavoriteModal.vue'
import VisitModal from '@/components/shared/VisitModal.vue'

const googleApiKey = process.env.VUE_APP_GOOGLE_API_KEY

export default {
  components: {
    FavoriteModal,
    VisitModal
  },
  data() {
    return {
      id: '5f31fc6155d7790550c08afe',
      restaurant: null,
      fields: ['day', 'hours'],
      currentImage: 0,
      timer: null,
      latitude: 0,
      longitude: 0
    }
  },
  computed: {
    ...mapState(['user']),
    googleMapAddress() {
      return `https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}
        &origin=${this.latitude},${this.longitude}
        &destination=${this.restaurant.location.coordinates[1]},${this.restaurant.location.coordinates[0]}
        &language=en `
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
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    async getPosition() {
      try {
        const {
          coords: { latitude, longitude }
        } = await this.getCurrentPosition()
        this.latitude = latitude
        this.longitude = longitude
      } catch (e) {
        console.error(e)
      }
    }
  },
  async created() {
    try {
      this.restaurant = await get(`/unsecure/restaurants/${this.$route.params.id}`)
      this.startRotation()
      this.getPosition()
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
