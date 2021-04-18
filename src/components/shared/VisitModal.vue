<template>
  <b-modal :id="id" :title="title">
    <b-form-group
      :label="$t('visitModal.date')"
      label-for="date"
      :invalid-feedback="errors.date"
      :state="errors.date ? false : null"
    >
      <b-form-input v-if="Boolean(visit)" id="date" :value="formatDate(date)" disabled />
      <b-form-input
        v-else
        type="datetime-local"
        id="date"
        v-model="date"
        :state="errors.date ? false : null"
      />
    </b-form-group>
    <b-form-group
      :label="$t('visitModal.rating')"
      label-for="rating"
      :invalid-feedback="errors.rating"
      :state="errors.rating ? false : null"
    >
      <b-form-input
        type="number"
        id="rating"
        min="0"
        max="5"
        v-model="rating"
        :disabled="Boolean(visit)"
        :state="errors.rating ? false : null"
      />
    </b-form-group>
    <b-form-group
      :label="$t('visitModal.comment.label')"
      label-for="comment"
      :invalid-feedback="errors.comment"
      :state="errors.comment ? false : null"
    >
      <b-form-textarea
        id="comment"
        rows="5"
        v-model="comment"
        :placeholder="$t('visitModal.comment.placeholder')"
        :disabled="Boolean(visit)"
        :state="errors.comment ? false : null"
      />
    </b-form-group>
    <template v-if="Boolean(visit)" #modal-footer="{ cancel }">
      <icon-button icon="times" text="buttons.close" @click="cancel()" />
    </template>
    <template v-else #modal-footer="{ cancel, ok }">
      <icon-button icon="ban" text="buttons.cancel" @click="clear(cancel)" />
      <icon-button icon="paper-plane" text="buttons.send" variant="primary" @click="send(ok)" />
    </template>
  </b-modal>
</template>

<script>
import Vue from 'vue'
import mixins from '@/mixins'
import IconButton from '@/components/shared/IconButton.vue'
import { createVisit } from '@/api/visits'

export default {
  mixins: [mixins],
  name: 'VisitModal',
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
    },
    title: {
      type: String,
      required: true
    },
    visit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      comment: '',
      errors: {},
      date: '',
      rating: 0
    }
  },
  methods: {
    clear(callback) {
      this.comment = ''
      this.date = ''
      this.errors = {}
      this.rating = 0

      if (callback) {
        callback()
      }
    },
    async send(callback) {
      if (this.date === '') {
        Vue.set(this.errors, 'date', this.$i18n.t('required'))
      } else if (new Date(this.date) > new Date()) {
        Vue.set(this.errors, 'date', this.$i18n.t('visitModal.futureDate'))
      } else {
        Vue.delete(this.errors, 'date')
      }

      if (this.rating === '') {
        Vue.set(this.errors, 'rating', this.$i18n.t('required'))
      } else if (isNaN(this.rating) || this.rating < 0 || this.rating > 5) {
        Vue.set(this.errors, 'rating', this.$i18n.t('visitModal.invalidRating'))
      } else {
        Vue.delete(this.errors, 'rating')
      }

      if (this.comment === '') {
        Vue.set(this.errors, 'comment', this.$i18n.t('required'))
      } else {
        Vue.delete(this.errors, 'comment')
      }

      if (!Object.keys(this.errors).length) {
        try {
          await createVisit({
            comment: this.comment,
            date: this.date,
            rating: this.rating,
            restaurantId: this.restaurantId
          })
          this.clear(callback)
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  created() {
    if (this.visit) {
      this.comment = this.visit.comment
      this.date = this.visit.date
      this.rating = this.visit.rating
    }
  },
  watch: {
    comment() {
      Vue.delete(this.errors, 'comment')
    },
    date() {
      Vue.delete(this.errors, 'date')
    },
    rating(value) {
      if (value !== '' && !isNaN(value) && value >= 0 && value <= 5) {
        Vue.delete(this.errors, 'rating')
      }
    }
  }
}
</script>
