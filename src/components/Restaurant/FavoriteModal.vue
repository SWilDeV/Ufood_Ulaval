<template>
  <b-modal :id="id" :title="$t('favoriteModal.title')">
    <div class="form-group">
      <label for="name" v-t="'favoriteModal.createList'" />
      <div class="input-group">
        <b-form-input id="name" :placeholder="$t('favoriteModal.namePlaceholder')" v-model="name" />
        <div class="input-group-append">
          <b-button variant="success" :disabled="!name" @click="createList">
            <font-awesome-icon icon="plus" />
            {{ $t('favoriteModal.create') }}
          </b-button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="list" v-t="'favoriteModal.list'" />
      <b-form-select id="list" :options="lists" v-model="listId">
        <template #first>
          <b-form-select-option value="" v-t="'favoriteModal.selectList'" disabled />
        </template>
      </b-form-select>
    </div>
    <template #modal-footer="{ cancel, ok }">
      <button type="button" class="btn btn-secondary" @click="clear(cancel)">
        <font-awesome-icon icon="ban" />
        {{ $t('favoriteModal.cancel') }}
      </button>
      <button type="button" class="btn btn-primary" :disabled="!isValid" @click="addToList(ok)">
        <font-awesome-icon icon="star" />
        {{ $t('favoriteModal.add') }}
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
import { addFavoriteToList, createList, getFavorites } from '@/api/favorites'

export default {
  name: 'FavoriteModal',
  props: {
    id: {
      type: String,
      required: true
    },
    restaurantId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lists: [],
      listId: '',
      name: ''
    }
  },
  computed: {
    ...mapState(['user']),
    isValid() {
      return Boolean(this.listId)
    }
  },
  methods: {
    async addToList(callback) {
      try {
        await addFavoriteToList(this.listId, this.restaurantId)
        this.clear(callback)
      } catch (e) {
        console.error(e)
      }
    },
    clear(callback) {
      this.listId = ''
      if (callback) {
        callback()
      }
    },
    async createList() {
      try {
        const list = await createList({
          name: this.name,
          owner: this.user.email
        })
        this.lists.push({ text: list.name, value: list.id })
        this.lists = this.lists.sort((a, b) => (a.text >= b.text ? 1 : -1))
        this.name = ''
      } catch (e) {
        console.error(e)
      }
    }
  },
  async created() {
    try {
      const favorites = await getFavorites(10000)
      this.lists = favorites.items
        .filter(list => list.owner.id === this.user.id)
        .map(list => ({
          text: list.name,
          value: list.id
        }))
        .sort((a, b) => (a.text >= b.text ? 1 : -1))
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
