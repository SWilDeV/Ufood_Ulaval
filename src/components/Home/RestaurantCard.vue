<template>
  <div class="card cell-restaurant col-sm-12 col-md-6 col-lg-4">
    <img
      v-if="restaurant.pictures.length"
      v-bind:src="restaurant.pictures[0]"
      class="rounded mx-auto d-block"
      height="250"
      width="85%"
    />
    <div class="card-body">
      <h4 class="card-title">{{ restaurant.name }}</h4>
      <p class="card-text">
        Address: {{ restaurant.address }}<br />
        Price range: {{ restaurant.price_range }}<br />
        Genres: {{ restaurant.genres.join(', ') }}<br />
        Rating: {{ restaurant.rating.toFixed(1) }}
      </p>
      <b-button-group class="w-100">
        <view-button v-bind:restaurant-id="restaurant.id" />
        <template v-if="user">
          <icon-button icon="edit" text="restaurantCard.visit" variant="info" v-b-modal="visitId" />
          <visit-modal
            :id="visitId"
            :restaurant-id="restaurant.id"
            :title="$t('visitModal.newVisit')"
          />
        </template>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconButton from '@/components/shared/IconButton.vue'
import ViewButton from '@/components/shared/ViewButton.vue'
import VisitModal from '@/components/shared/VisitModal.vue'

export default {
  name: 'restaurantCard',
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
.cell-restaurant {
  padding-top: 2%;
  margin-bottom: 2em;
  box-shadow: 5px 10px #888888;
  border: 1px solid black;
}

p {
  color: #333333;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5625;
  margin-bottom: 15px;
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
