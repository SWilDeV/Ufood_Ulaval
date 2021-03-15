<template>
  <div class="container">
    <h1>Welcome to UFood!</h1>

    <div class="testFlex">
      <div class="search-area">
        <h3>Price range:</h3>
        <select class="restaurants-dropdown">
          <option value="all" selected="selected">All prices</option>
          <option value="10">0-10$</option>
          <option value="15">10-15$</option>
          <option value="20">15-20$</option>
          <option value="25">20-25$</option>
          <option value="30">25-30$</option>
          <option value="30">35-40$</option>
          <option value="30">40-45$</option>
        </select>
      </div>

      <div class="search-area">
        <h3>Genres:</h3>
        <select class="restaurants-dropdown">
          <option value="all" selected="selected">All genres</option>
          <option value="fast-food">Casual</option>
          <option value="desert">Desert</option>
          <option value="asian">Asian</option>
          <option value="italan">Italian</option>
          <option value="quebec">American</option>
          <option value="mexico">Mexican</option>
          <option value="mediterranean">Mediterranean</option>
        </select>
      </div>

      <div class="search-area">
        <input class="form-control mr-sm-2 searchBar" type="text" placeholder="Search ..." />
        <button class="btn btn-success search-button" type="submit">Search</button>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row restaurants-row">
        <div class="col-sm-12 col-md-6 col-lg-4">
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
                Food genrestretertre:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card cell-restaurant">
            <img
              class="img-fluid rounded mx-auto d-block"
              src="https://www.shlr.org/wp/wp-content/uploads/2016/02/McDonald.png"
              alt="McDonald"
            />
            <div class="card-body">
              <h4 class="card-title">McDonald</h4>
              <p class="card-text">
                Adress: <br />
                Price range: <br />
                Delevery time: <br />
                Food genres:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card cell-restaurant">
            <img
              class="img-fluid rounded mx-auto d-block"
              src="https://restozone.ca/uploads/harveys/gatineau/logo_mobile.png"
              alt="Harveys"
            />
            <div class="card-body">
              <h4 class="card-title">Harveys</h4>
              <p class="card-text">
                Adress: <br />
                Price range: <br />
                Delevery time: <br />
                Food genres:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card cell-restaurant">
            <img
              class="img-fluid rounded mx-auto d-block"
              src="https://cdn.1min30.com/wp-content/uploads/2017/04/Subway-logo-1.jpg"
              alt="Subway"
            />
            <div class="card-body">
              <h4 class="card-title">Subway</h4>
              <p class="card-text">
                Adress: <br />
                Price range: <br />
                Delevery time: <br />
                Food genres:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card cell-restaurant">
            <img
              class="img-fluid rounded mx-auto d-block"
              src="https://img.circulaire-en-ligne.ca/wp-content/uploads/La-Belle-Province.jpg"
              alt="Belle Province"
            />
            <div class="card-body">
              <h4 class="card-title">Belle Province</h4>
              <p class="card-text">
                Adress: <br />
                Price range: <br />
                Delevery time: <br />
                Food genres:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card cell-restaurant">
            <img
              class="img-fluid rounded mx-auto d-block"
              src="https://cdn.worldvectorlogo.com/logos/mikes-pizza.svg"
              alt="Mikes"
            />
            <div class="card-body">
              <h4 class="card-title">Mikes</h4>
              <p class="card-text">
                Adress: <br />
                Price range: <br />
                Delevery time: <br />
                Food genres:
              </p>
              <router-link to="/Restaurant" tag="button" class="order-Button"
                >Order Here</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card cell-restaurant">
          <img
            class="img-fluid rounded mx-auto d-block"
            src="https://pbs.twimg.com/profile_images/1146038033948577793/MgJzJHPA_400x400.png"
            alt="Mucho Burrito"
          />
          <div class="card-body">
            <h4 class="card-title">Mucho Burrito</h4>
            <p class="card-text">
              Adress: <br />
              Price range: <br />
              Delevery time: <br />
              Food genres:
            </p>
            <router-link to="/Restaurant" tag="button" class="order-Button">Order Here</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-area {
  display: flex;
}

.testFlex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.searchBar {
  margin: 0em 0.8em 0.8em 0.8em;
  width: 100%;
  font-size: 16px;
  color: black;
  line-height: 1.3;
  padding: 0.3em 0.7em 0.25em 0.4em;
  border: 2px solid black;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
}

.search-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0.3em 0.9em 0.25em 0.9em;
  margin: 0em 0.8em 0.8em 0.8em;
  border-radius: 2em;
  box-sizing: border-box;
  background-color: #05a856;
  text-align: center;
  transition: all 0.2s;
}

.restaurants-row {
  margin: 1px;
}
.cell-restaurant {
  border: 2px solid black;
  padding-top: 5%;
  margin-top: 1em;
  box-shadow: 5px 10px #888888;
}

.cell-Information {
  border: 2px solid black;
  margin: 1em 0.8em 0.8em 0.8em;
  padding: 5px;
}

img {
  width: 200px;
  height: 200px;
}

.order-Button {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0.3em 1.2em;
  margin: 1em 0.8em 0.8em 0.8em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: white;
  background-color: #2aa8f1;
  text-align: center;
  transition: all 0.2s;
}

.order-Button:hover {
  background-color: #4095c6;
}
@media all and (max-width: 30em) {
  a.order-Button {
    display: block;
    margin: 0.2em auto;
  }
}

/* The container must be positioned relative: */
.restaurants-dropdown {
  display: block;
  margin: 0 1.2em 0.8em 1.8em;
  font-size: 16px;
  font-weight: 700;
  color: black;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  max-width: 100%;
  border: 2px solid black;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  background-color: white;
}

h1 {
  color: black;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 64px;
  font-weight: 700;
  line-height: 64px;
  margin: 0 0 0;
  padding: 20px 30px;
  text-align: center;
  text-transform: uppercase;
}

h2 {
  color: #111;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 48px;
  margin: 0 0 24px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
}

h3 {
  color: black;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-transform: uppercase;
}

h4 {
  color: #111;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0 0 24px;
  padding: 0 30px;
  text-align: center;
  text-transform: uppercase;
}
</style>
