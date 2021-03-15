<template>
  <div class="container">
    <button
      class="w-10 btn btn-xs btn-success float-right"
      type="button"
      v-on:click="onCreate(favorite.id)"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  name: 'panel-v',
  props: ['username']
}
</script>

<style></style>
