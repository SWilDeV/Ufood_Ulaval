<template>
  <b-modal :id="id" :title="$t('visitModal.title')">
    <div class="form-group">
      <label for="date">
        {{ $t('visitModal.date') }}
        <span class="text-danger">*</span>
      </label>
      <input type="datetime-local" id="date" class="form-control" v-model="date" />
    </div>
    <div class="form-group">
      <label for="rating">
        {{ $t('visitModal.rating') }}
        <span class="text-danger">*</span>
      </label>
      <input
        type="number"
        id="rating"
        class="form-control"
        :min="min"
        :max="max"
        v-model="rating"
      />
    </div>
    <div class="form-group">
      <label for="comment">
        {{ $t('visitModal.comment') }}
        <span class="text-danger">*</span>
      </label>
      <textarea
        id="comment"
        class="form-control"
        rows="5"
        v-model="comment"
        :placeholder="$t('visitModal.commentPlaceholder')"
      />
    </div>
    <template #modal-footer="{ cancel, ok }">
      <button type="button" class="btn btn-secondary" @click="clear(cancel)">
        <font-awesome-icon icon="ban" />
        {{ $t('visitModal.cancel') }}
      </button>
      <button type="button" class="btn btn-primary" :disabled="!isValid" @click="send(ok)">
        <font-awesome-icon icon="paper-plane" />
        {{ $t('visitModal.send') }}
      </button>
    </template>
  </b-modal>
</template>

<script>
import { createVisit } from '@/api/visits'

export default {
  name: 'VisitModal',
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
      comment: '',
      date: null,
      max: 5,
      min: 0,
      rating: 0
    }
  },
  computed: {
    isValid() {
      return this.date && this.rating >= 0 && this.rating <= 5 && this.comment
    }
  },
  methods: {
    clear(callback) {
      this.date = null
      this.rating = 0
      this.comment = ''
      if (callback) {
        callback()
      }
    },
    async send(callback) {
      await createVisit({
        comment: this.comment,
        date: this.date,
        rating: this.rating,
        restaurantId: this.restaurantId
      })
      this.clear(callback)
    }
  }
}
</script>
