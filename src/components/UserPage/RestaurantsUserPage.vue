<template>
  <div class="col">
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <div class="card-body d-inline">
          <h4 class="d-inline">{{ restaurantId }}</h4>
          <button type="button" class=" float-right w-10 btn btn-lg btn-outline-primary">
            More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'restaurantUserPage',
  props: ['restaurant-id']
}
</script>

<style></style>
