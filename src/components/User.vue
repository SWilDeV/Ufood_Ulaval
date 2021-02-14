<template>
  <div class="container">
    <div class="row">
      <div class="profile-nav col-md-12">
        <div class="panel">
          <div class="user-heading round">
            <h1>Justin Trudeau</h1>
            <p>User score: 4.5 / 5</p>
          </div>
        </div>
      </div>
    </div>

    <!-- list of visited restaurants -->
    <div class="row">
      <div class="profile-nav col-md-12">
        <div class="panel">
          <div class="recently-visited">
            <h4>Restaurants recently visted</h4>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4>Restaurant Normandin Neufchatel</h4>
              <h6>Visited 93432 times</h6>
              <router-link :to="{ name: 'Restaurant' }">View</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4>London Jack</h4>
              <h6>Visited 3 times</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4>Le Ciel</h4>
              <h6>Visited 5 times</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4>McDonald's</h4>
              <h6>Visited 398 times</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button type="button" class="btn btn-light">
        <router-link :to="{ name: 'Home' }">HOME PAGE</router-link>
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.profile-nav {
  margin-top: 30px;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.btn {
  width: 150px;
}

.recently-visited {
  background: #fbc02d;
  color: #fff;
  border-radius: 7px;
  -webkit-border-radius: 7px;
  padding: 15px;
  text-align: left;
}

.user-heading {
  background: #fbc02d;
  color: #fff;
  border-radius: 7px;
  -webkit-border-radius: 7px;
  padding: 30px;
  text-align: center;
}

.user-heading h1 {
  font-size: 50px;
  font-weight: 300;
  margin-bottom: 5px;
  color: white;
}

.user-heading p {
  font-size: 20px;
}

.bio-desk {
  float: left;
  background-color: grey;
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  border-radius: 7px;
}

.bio-desk h4 {
  font-size: 20px;
  font-weight: 400;
  color: white;
}

.bio-desk h6 {
  font-size: 16px;
  font-weight: 400;
  color: white;
}
</style>
