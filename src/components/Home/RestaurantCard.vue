<template>
  <div class="d-flex card container col-sm-12 col-md-6 col-xl-4">
    <div class="row">
      <div class="img-top">
        <img
          v-if="restaurant.pictures.length"
          v-bind:src="restaurant.pictures[0]"
          class="rounded mx-auto d-block"
        />
        <div class="card-img-overlay text-white d-flex flex-column justify-content-center">
          <!-- <div class="card-body"> -->
          <h2 class="card-title">{{ restaurant.name }}</h2>
          <p class="card-text">
            <!-- <span v-t="'home.address'"></span>
        <span>{{ restaurant.address }} <br /></span> -->
            <!-- <span v-t="'home.priceRange'"></span>
        <span>{{ restaurant.price_range }} <br /></span>
        <span v-t="'home.genres'"></span>
        <span>{{ restaurant.genres.join(', ') }} <br /></span> -->
            <!-- <span v-t="'home.rating'"></span>
            <span>{{ formatRating(restaurant.rating) }} <br /></span> -->
          </p>
          <b-button-group class="w-100">
            <view-button v-bind:restaurant-id="restaurant.id" />
            <template v-if="user">
              <icon-button
                icon="edit"
                text="restaurantCard.visit"
                variant="info"
                v-b-modal="visitId"
              />
              <visit-modal
                :id="visitId"
                :restaurant-id="restaurant.id"
                :title="$t('visitModal.newVisit')"
              />
            </template>
          </b-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixins from '@/mixins'
import IconButton from '@/components/shared/IconButton.vue'
import ViewButton from '@/components/shared/ViewButton.vue'
import VisitModal from '@/components/shared/VisitModal.vue'

export default {
  name: 'RestaurantCard',
  mixins: [mixins],
  components: {
    IconButton,
    ViewButton,
    VisitModal
  },
  props: ['restaurant'],
  computed: {
    ...mapState(['user']),
    visitId() {
      return `visit-${this.restaurant.id}`
    }
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 2em;
  box-shadow: 5px 10px #888888;
  border: 3px solid white;
}

img{
  object-fit: cover;
  width: 100%;
  height: 30vw;
}

p {
  color: white;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5625;
  margin-bottom: 15px;
}

h2 {
  color: white;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 32px;
  margin: 0 0 24px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
}
</style>
