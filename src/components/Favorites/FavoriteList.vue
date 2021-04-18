<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div id="title">
          <div class="form-inline">
            <h4 class="my-0 fw-normal d-inline p-3">{{ favoriteListName }}</h4>

            <div class="col form-inline">
              <b-input-group>
                <b-form-select v-model="selectedRestaurant" :options="options">
                  <template #first>
                    <b-form-select-option value="" v-t="'favorites.selectRestaurant'" disabled />
                  </template>
                </b-form-select>
                <template #append>
                  <icon-button
                    icon="star"
                    text="buttons.add"
                    variant="success"
                    :disabled="!selectedRestaurant"
                    @click="onClickAddResto"
                  />
                </template>
              </b-input-group>
              <b-button-group class="ml-auto">
                <icon-button
                  icon="edit"
                  text="buttons.edit"
                  variant="outline-primary"
                  @click="edit = !edit"
                />
                <icon-button
                  icon="minus"
                  text="buttons.delete"
                  variant="outline-danger"
                  @click="deleteFavorite(favoriteId)"
                />
              </b-button-group>
            </div>
          </div>

          <div class="form-inline" v-show="edit">
            <b-input-group>
              <input
                type="text"
                v-model="name"
                :placeholder="$t('favorites.changeName')"
                class="form-control"
              />
              <template #append>
                <icon-button
                  icon="check"
                  text="buttons.ok"
                  variant="outline-success"
                  :disabled="!name"
                  @click="editFavoriteListName(favoriteId)"
                />
              </template>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="card-body">
        <favorite-item
          v-for="restaurant in favoriteRestaurants"
          :key="restaurant.id"
          :restaurant-id="restaurant.id"
          :restaurant-name="restaurant.name"
          :list-id="favoriteId"
          @resto-deleted="$emit('resto-deleted', $event)"
          @resto-added="$emit('resto-added', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FavoriteItem from './FavoriteItem'
import IconButton from '@/components/shared/IconButton.vue'

export default {
  name: 'FavoriteList',
  components: {
    FavoriteItem,
    IconButton
  },
  props: {
    favoriteListName: String,
    favoriteId: String,
    favoriteRestaurants: Array,
    allRestaurants: Array
  },
  data() {
    return {
      edit: false,
      name: '',
      selectedRestaurant: ''
    }
  },
  computed: {
    ...mapState(['user']),
    options() {
      return this.allRestaurants
        .filter(item => this.favoriteRestaurants.every(res => res.id !== item.id))
        .map(restaurant => ({
          text: restaurant.name,
          value: restaurant.id
        }))
        .sort((a, b) => (a.text >= b.text ? 1 : -1))
    }
  },
  methods: {
    async deleteFavorite(id) {
      this.$emit('favorite-deleted', id)
    },
    async editFavoriteListName(id) {
      const name = this.name
      this.$emit('favorite-edited', { id, name })
      this.name = ''
    },
    onClickAddResto() {
      const favoriteId = this.favoriteId
      const restaurantId = this.selectedRestaurant
      this.$emit('add-resto-to-list', { restaurantId, favoriteId })
      this.selectedRestaurant = ''
    }
  }
}
</script>

<style scoped></style>
