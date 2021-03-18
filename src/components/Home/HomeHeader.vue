<template>
  <div>
    <h1>Welcome to UFood!</h1>

    <div class="mb-4">
      <div class="form-row">
        <div class="col">
          <label for="price">Price range:</label>
          <select id="price" class="form-control" v-model="selectedPrice">
            <option value="">All prices</option>
            <option v-for="price in allPriceRanges" :value="price" v-bind:key="price">
              {{ price }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="genre">Genres:</label>
          <select id="genre" class="form-control" v-model="selectedGenre">
            <option value="">All genres</option>
            <option v-for="genre in allGenres" :value="genre" v-bind:key="genre">
              {{ genre }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="search">Search:</label>
          <input
            id="search"
            class="form-control mr-sm-2"
            type="text"
            v-model="searchValue"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader',
  props: ['allGenres', 'allPriceRanges'],
  data() {
    return {
      selectedGenre: '',
      selectedPrice: '',
      searchValue: ''
    }
  },
  computed: {
    filters() {
      return { genre: this.selectedGenre, price: this.selectedPrice, search: this.searchValue }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler(value) {
        this.$emit('filters-changed', value)
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
</style>
