<template>
  <span>
    <font-awesome-icon icon="hamburger" />
    {{ $t('memberRating', { rating }) }}
  </span>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>
