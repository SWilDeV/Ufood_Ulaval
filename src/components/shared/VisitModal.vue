<template>
  <b-modal :id="id" :title="visit ? $t('visitModal.readTitle') : $t('visitModal.title')">
    <div class="form-group">
      <label for="date">
        {{ $t('visitModal.date') }}
        <span v-if="!visit" class="text-danger">*</span>
      </label>
      <input v-if="!visit" type="datetime-local" id="date" class="form-control" v-model="date" />
      <input v-else type="text" id="date" class="form-control" :value="date" disabled />
    </div>
    <div class="form-group">
      <label for="rating">
        {{ $t('visitModal.rating') }}
        <span v-if="!visit" class="text-danger">*</span>
      </label>
      <input
        type="number"
        id="rating"
        class="form-control"
        :min="min"
        :max="max"
        v-model="rating"
        :disabled="visit"
      />
    </div>
    <div class="form-group">
      <label for="comment">
        {{ $t('visitModal.comment') }}
        <span v-if="!visit" class="text-danger">*</span>
      </label>
      <textarea
        id="comment"
        class="form-control"
        rows="5"
        v-model="comment"
        :placeholder="$t('visitModal.commentPlaceholder')"
        :disabled="visit"
      />
    </div>
    <template v-if="!visit" #modal-footer="{ cancel, ok }">
      <button type="button" class="btn btn-secondary" @click="clear(cancel)">
        <font-awesome-icon icon="ban" />
        {{ $t('visitModal.cancel') }}
      </button>
      <button type="button" class="btn btn-primary" :disabled="!isValid" @click="send(ok)">
        <font-awesome-icon icon="paper-plane" />
        {{ $t('visitModal.send') }}
      </button>
    </template>
    <template v-else #modal-footer="{ cancel }">
      <button type="button" class="btn btn-secondary" @click="cancel()">
        <font-awesome-icon icon="ban" />
        {{ $t('visitModal.close') }}
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
    },
    visit: {
      type: Object,
      default: null
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
  },
  created() {
    if (this.visit) {
      this.comment = this.visit.comment
      this.date = new Date(this.visit.date)
      this.rating = this.visit.rating
    }
  }
}
</script>
