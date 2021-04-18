<template>
  <div class="container">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <form class="form-inline" @submit.prevent="addFavoriteList">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('favorites.newList')"
              v-model="name"
            />
            <div class="input-group-append">
              <icon-button
                type="submit"
                icon="plus"
                text="user.addList"
                variant="success"
                :disabled="!name"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'
import { mapState } from 'vuex'

export default {
  name: 'FavoriteForm',
  components: {
    IconButton
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async addFavoriteList() {
      const name = this.name
      this.$emit('favorite-added', name)
      this.name = ''
    }
  }
}
</script>
