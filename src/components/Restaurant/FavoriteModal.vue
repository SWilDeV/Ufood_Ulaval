<template>
  <b-modal :id="id" :title="$t('favoriteModal.title')">
    <b-form-group :label="$t('favoriteModal.createList')" label-for="name">
      <b-input-group>
        <b-form-input id="name" :placeholder="$t('favoriteModal.namePlaceholder')" v-model="name" />
        <b-input-group-append>
          <icon-button
            icon="plus"
            text="buttons.create"
            variant="success"
            :disabled="!name"
            @click="createList"
          />
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-form-group
      :label="$t('favoriteModal.list')"
      label-for="list"
      :invalid-feedback="errors.listId"
      :state="errors.listId ? false : null"
    >
      <b-form-select
        id="list"
        :options="lists"
        v-model="listId"
        :state="errors.listId ? false : null"
      >
        <template #first>
          <b-form-select-option value="" v-t="'favoriteModal.selectList'" disabled />
        </template>
      </b-form-select>
    </b-form-group>
    <template #modal-footer="{ cancel, ok }">
      <icon-button icon="ban" text="buttons.cancel" @click="clear(cancel)" />
      <icon-button icon="star" text="buttons.add" variant="primary" @click="addToList(ok)" />
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import IconButton from '@/components/shared/IconButton.vue'
import { mapState } from 'vuex'
import { addFavoriteToList, createList, getFavorites } from '@/api/favorites'

export default {
  name: 'FavoriteModal',
  components: {
    IconButton
  },
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
      errors: {},
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
      if (this.listId === '') {
        Vue.set(this.errors, 'listId', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'listId')
      }

      if (!Object.keys(this.errors).length) {
        try {
          await addFavoriteToList(this.listId, this.restaurantId)
          this.clear(callback)
        } catch (e) {
          console.error(e)
        }
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
  },
  watch: {
    listId() {
      Vue.delete(this.errors, 'listId')
    }
  }
}
</script>
