<template>
  <div class="container">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <form class="form-inline" @submit.prevent="addFavoriteList">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Create new list" v-model="name" />
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-success"
                v-t="'user.addList'"
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
import { mapState } from 'vuex'
export default {
  name: 'panel-v',
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
// comment for LF
</script>
