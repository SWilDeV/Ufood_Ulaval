<template>
  <div class="card cell-restaurant">
    <img
      class="img-fluid rounded mx-auto d-block"
      src="https://emplois.isarta.com/images-members2/normandin/normandin_image3.gif"
      alt="Normandin"
    />
    <div class="card-body">
      <h4 class="card-title">Normandin</h4>
      <p class="card-text">
        Adress: <br />
        Price range: <br />
        Delevery time: <br />
        Food genres:
      </p>
      <orderButton></orderButton>
    </div>
  </div>
</template>

<script>
import OrderButton from './OrderButton'

export default {
  name: 'restaurantCard',
  components: { OrderButton }
}
</script>

<style></style>
