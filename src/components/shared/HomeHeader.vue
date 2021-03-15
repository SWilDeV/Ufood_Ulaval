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
  </div>
</template>

<script>
export default {
  name: 'homeHeader'
}
</script>

<style>
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

h3 {
  color: black;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-transform: uppercase;
}

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
</style>
