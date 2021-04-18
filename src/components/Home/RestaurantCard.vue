<template>
  <div class="container card col-xs-12 col-sm-6 col-xl-4">
    <div class="row">
      <div class="img-top">
        <img
          v-if="restaurant.pictures.length"
          v-bind:src="restaurant.pictures[0]"
          class="rounded mx-auto d-block"
        />
        <div class="card-img-overlay text-white d-flex flex-column justify-content-center">
          <h2 class="card-title">{{ restaurant.name }}</h2>
          <p class="card-text"></p>
          <b-button-group class="button">
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
  mixins: [mixins],
  name: 'RestaurantCard',
  components: {
    IconButton,
    ViewButton,
    VisitModal
  },
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
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
  border: 1px solid white;
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
  line-height: 32px;
  margin: 0 0 24px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: -2px 1px 0 #000, 2px 1px 0 #000, 2px -1px 0 #000, -2px -1px 0 #000;
}

@media (min-width: 1px) and (max-width: 432px) {
  img {
    object-fit: cover;
    width: 100%;
    height: 80vw;
  }
  .img-top {
    margin: 0;
    box-shadow: 5px 10px #888888;
  }
  h2 {
    font-size: 24px;
  }
  .button {
    position: absolute;
    bottom: 2vw;
    left: 2vw;
    width: 50vw;
  }
}
@media (min-width: 433px) and (max-width: 595px) {
  img {
    object-fit: cover;
    width: 100%;
    height: 50vw;
  }
  .img-top {
    margin: 10px;
    box-shadow: 5px 10px #888888;
  }
  h2 {
    font-size: 24px;
  }
  .button {
    position: absolute;
    bottom: 2vw;
    left: 2vw;
    width: 50vw;
  }
}
@media (min-width: 596px) and (max-width: 1023px) {
  img {
    object-fit: cover;
    width: 100%;
    height: 30vw;
  }
  .img-top {
    margin: 20px 20px 0 20px;
    box-shadow: 5px 10px #888888;
  }
  h2 {
    font-size: 26px;
  }
  .button {
    position: absolute;
    bottom: 1vw;
    left: 8vw;
    width: 30vw;
  }
}

@media (min-width: 1024px) {
  img {
    object-fit: cover;
    width: 100%;
    height: 30vw;
  }
  .img-top {
    margin: 20px 20px 0 20px;
    box-shadow: 5px 10px #888888;
  }
  h2 {
    font-size: 36px;
  }
  .button {
    position: absolute;
    bottom: 1vw;
    left: 2.3vw;
    width: 27vw;
  }
}
</style>
