<template>
  <div>
    <h1>Welcome to UFood!</h1>
    <ul>
      <li>
        <router-link to="/restaurant">Restaurant</router-link>
      </li>
      <li>
        <router-link to="/user">UserPage</router-link>
      </li>
    </ul>

    <div class="acceuil-restaurants">
      <h2>Available restaurants:</h2>

      <div class="filers-restaurant-section">
        <h3>Filter restaurants by:</h3>
        <select class="restaurants-dropdown">
          <option value="me" selected="selected">For me</option>
          <option value="popularity">Popularity</option>
          <option value="price">Price</option>
          <option value="offers">Special offer</option>
          <option value="delevery">Delevery time</option>
        </select>
      </div>
      <div class="types-restaurant-section">
        <h3>Special types of restaurants:</h3>
        <select class="restaurants-dropdown">
          <option value="all" selected="selected">All types</option>
          <option value="fast-food">Fast-food</option>
          <option value="asian">Asia</option>
          <option value="italan">Italy</option>
          <option value="quebec">Quebec</option>
          <option value="mexico">Mexico</option>
          <option value="mediterranean">Mediterranean</option>
        </select>
      </div>

      <ul class="liste-restaurants">
        <li>
          <h4>Normandin (20-30$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://emplois.isarta.com/images-members2/normandin/normandin_image3.gif"
              alt="Normandin"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <button class="order-restaurant">Order here</button>
        </li>
        <li>
          <h4>McDonald (10-20$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://www.shlr.org/wp/wp-content/uploads/2016/02/McDonald.png"
              alt="McDonald"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <button class="order-restaurant">Order here</button>
        </li>
        <li>
          <h4>Harveys (12-22$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://restozone.ca/uploads/harveys/gatineau/logo_mobile.png"
              alt="Harveys"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <button class="order-restaurant">Order here</button>
        </li>
        <li>
          <h4>Subway (10-20$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://cdn.1min30.com/wp-content/uploads/2017/04/Subway-logo-1.jpg"
              alt="Subway"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <button class="order-restaurant">Order here</button>
        </li>
        <li>
          <h4>La belle province (10-20$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://img.circulaire-en-ligne.ca/wp-content/uploads/La-Belle-Province.jpg"
              alt="Belle Province"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <button class="order-restaurant">Order here</button>
        </li>
        <li>
          <h4>Mikes (20-35$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://cdn.worldvectorlogo.com/logos/mikes-pizza.svg"
              alt="Mikes"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <div>
            <button class="order-restaurant">Order here</button>
          </div>
        </li>
        <li>
          <h4>Mucho Burrito (10-25$)</h4>
          <div>
            <img
              class="logo-restaurants"
              src="https://pbs.twimg.com/profile_images/1146038033948577793/MgJzJHPA_400x400.png"
              alt="Mucho Burrito"
            />
          </div>
          <div class="restautant-information-container">
            Adress: <br />
            Price range: <br />
            Delevery time: <br />
            Food types:
          </div>
          <div>
            <button class="order-restaurant">Order here</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.liste-restaurants {
  color: black;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px 16px;
  padding: 20px;
}

.liste-restaurants li {
  border: solid;
}

.liste-restaurants img {
  max-width: 35%;
  max-height: 25%;
  float: left;
  margin-right: 10px;
}

.restautant-information-container {
  font-size: 20px;
  text-align: center;
  max-height: 75%;
  margin-left: 35%;
  margin-right: 10px;
  border: 2px solid black;
}

.clear {
  clear: both;
}

.order-restaurant {
  background-color: transparent;
  border: 2px solid black;
  font-size: 24px;
  padding: 24px;
  color: black;
  text-transform: uppercase;
  margin: 2%;
  text-decoration: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* The container must be positioned relative: */
.restaurants-dropdown {
  display: block;
  font-size: 16px;
  font-family: 'Arial';
  font-weight: 700;
  color: black;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 20%;
  max-width: 20%;
  border: 3px solid black;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;
  background-color: white;
}

h1 {
  color: #111;
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
  color: #111;
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
