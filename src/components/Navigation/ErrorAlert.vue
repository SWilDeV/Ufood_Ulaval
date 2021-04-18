<template>
  <b-alert
    :show="errorCounter"
    dismissible
    variant="danger"
    @dismissed="hideError"
    @dismiss-count-down="updateError"
  >
    <p>This alert will dismiss after {{ errorCounter }} seconds...</p>
    <b-progress variant="danger" :max="10" :value="errorCounter" height="4px" />
  </b-alert>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ErrorAlert',
  computed: {
    ...mapState(['errorCounter'])
  },
  methods: {
    ...mapActions(['hideError', 'updateError'])
  }
}
</script>
