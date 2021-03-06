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
        <div v-if="user">
          <icon-button
            class="m-1"
            icon="star"
            text="restaurant.favorite"
            variant="warning"
            v-b-modal.favorite
          />
          <favorite-modal id="favorite" :restaurant-id="restaurant.id" />
          <icon-button
            class="m-1"
            icon="edit"
            text="restaurant.visit"
            variant="info"
            v-b-modal.visit
          />
          <visit-modal
            id="visit"
            :restaurant-id="restaurant.id"
            :title="$t('visitModal.newVisit')"
          />
        </div>
      </div>
      <br />
      <div class="row mb-3">
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
          <span>{{ formatRating(restaurant.rating) }}/5</span>
        </span>
      </div>
      <div class="row mb-3">
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
import { getRestaurant } from '@/api/restaurants.js'
import mixins from '@/mixins'
import FavoriteModal from '@/components/Restaurant/FavoriteModal.vue'
import IconButton from '@/components/shared/IconButton.vue'
import VisitModal from '@/components/shared/VisitModal.vue'

const googleApiKey = process.env.VUE_APP_GOOGLE_API_KEY

export default {
  mixins: [mixins],
  name: 'Restaurant',
  components: {
    FavoriteModal,
    IconButton,
    VisitModal
  },
  data() {
    return {
      coords: null,
      currentImage: 0,
      fields: ['day', 'hours'],
      restaurant: null,
      timer: null
    }
  },
  computed: {
    ...mapState(['user']),
    googleMapAddress() {
      const params = {
        destination: `${this.restaurant.location.coordinates[1]},${this.restaurant.location.coordinates[0]}`,
        key: googleApiKey,
        language: this.$i18n.locale,
        origin: '46.7811209,-71.2728986' // Université Laval
      }
      if (this.coords) {
        params.origin = `${this.coords.latitude},${this.coords.longitude}`
      }
      const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      return `https://www.google.com/maps/embed/v1/directions?${query}`
    },
    images() {
      return this.restaurant.pictures || []
    },
    openingHours() {
      return Object.entries(this.restaurant.opening_hours).map(row => ({
        day: this.$i18n.t(`weekDays.${row[0]}`),
        hours: row[1] || 'Closed'
      }))
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
      this.restaurant = await getRestaurant(this.$route.params.id)
      this.startRotation()
      this.coords = await this.getPosition()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
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
