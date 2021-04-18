<template>
  <b-alert
    dismissible
    variant="danger"
    :show="errorCounter"
    @dismissed="hideError"
    @dismiss-count-down="updateError"
  >
    <p v-t="'genericError'" />
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
