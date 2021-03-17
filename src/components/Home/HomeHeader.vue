<template>
  <div class="container">
    <h1>Welcome to UFood!</h1>

    <div class="testFlex">
      <div class="search-area">
        <h3>Price range:</h3>
        <select class="restaurants-dropdown" v-model="selectedPrice">
          <option value="">All prices</option>
          <option v-for="price in allPriceRanges" :value="price" v-bind:key="price">
            {{ price }}
          </option>
        </select>
      </div>

      <div class="search-area">
        <h3>Genres:</h3>
        <select class="restaurants-dropdown" v-model="selectedGenre">
          <option value="">All genres</option>
          <option v-for="genre in allGenres" :value="genre" v-bind:key="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <div class="search-area">
        <input
          class="form-control mr-sm-2 searchBar"
          type="text"
          v-model="searchValue"
          placeholder="Search ..."
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader',
  props: ['allGenres', 'allPriceRanges', 'refresh'],

  data() {
    return {
      selectedGenre: '',
      selectedPrice: '',
      searchValue: ''
    }
  },

  computed: {
    params() {
      return { genre: this.selectedGenre, price: this.selectedPrice, search: this.searchValue }
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler(value) {
        this.refresh(value)
      }
    }
  }
}
</script>

<style scoped>
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
