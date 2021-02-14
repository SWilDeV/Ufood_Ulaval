<template>
  <div class="container">
    <div class="text-center">
      <img
        class="rounded img-fluid"
        src="@/assets/restaurant-normandin.jpg"
        alt="Normandin Restaurant"
      />
      <h1 id="restaurantName" class="text-center">Restaurant Normandin Neufchatel</h1>
      <h5 id="restaurantAdress">
        2355 Boulevard Bastien, Quebec City, Qc, G2B 1B3
      </h5>
      telephone : <a href="tel:+14188426601">(418)842-6601</a>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12 col-lg-8">
        <iframe
          width="100%"
          height="400px"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.452445647169!2d-71.34114555026918!3d46.8567226120164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s87RCVM46%2BV8!5e0!3m2!1sfr!2sca!4v1612643262694!5m2!1sfr!2sca"
          frameborder="0"
          style="border:0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
        <button type="button" class="btn btn-secondary">Directions</button>
      </div>
      <div class="col-sm-12 col-lg-4">
        <h4>Opening Hours</h4>
        <div>
          <b-table stripped hover :items="opHours"></b-table>
        </div>
      </div>
    </div>

    <div class="typeRange">Food type : Family meal</div>

    <div class="typeRange">Price range : <i>$</i></div>

    <div>
      <div class="font-weight-bold">Rating : 3.5/5</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opHours: [
        { day: 'Sunday', hours: '9.00am to 7.30pm' },
        { day: 'Monday', hours: '9.00am to 7.30pm' },
        { day: 'Tuesday', hours: '9.00am to 7.30pm' },
        { day: 'Wednesday', hours: '9.00am to 7.30pm' },
        { day: 'Thursday', hours: '9.00am to 7.30pm' },
        { day: 'Friday', hours: '9.00am to 7.30pm' },
        { day: 'Saturday', hours: '9.00am to 7.30pm' }
      ]
    }
  }
}
</script>
<style scoped>
.row {
  margin-top: 16px;
  margin-bottom: 16px;
}

.typeRange {
  font-size: 16px;
  columns: red;
  text-decoration: aqua;
}
</style>