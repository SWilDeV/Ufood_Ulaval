<template>
  <b-nav-form @submit.prevent="submit">
    <!-- TODO: supporter la recherche d'usagers en mode connecté ref#61 -->
    <b-input-group>
      <b-form-input size="sm" v-model="search" :placeholder="$t('navigation.searchPlaceholder')" />
      <b-input-group-append>
        <icon-button
          icon="search"
          size="sm"
          type="submit"
          variant="success"
          :disabled="!Boolean(search)"
        />
      </b-input-group-append>
    </b-input-group>
  </b-nav-form>
</template>

<script>
import IconButton from '@/components/shared/IconButton.vue'

export default {
  name: 'Search',
  components: {
    IconButton
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    submit() {
      this.$router.push({ name: 'Home', query: { search: this.search } })
    }
  }
}
</script>
