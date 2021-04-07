<template>
  <b-input-group class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
    <b-form-input
      id="search"
      :value="value"
      :placeholder="$t('members.search')"
      @input="$emit('input', $event)"
    />
    <b-input-group-append>
      <icon-button
        icon="times"
        variant="danger"
        :disabled="!Boolean(value)"
        @click="$emit('clear')"
      />
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  name: 'Search',
  components: {
    IconButton
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
