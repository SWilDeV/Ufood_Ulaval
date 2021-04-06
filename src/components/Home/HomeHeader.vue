<template>
  <div>
    <h1 v-t="'home.welcome'"></h1>

    <div class="mb-4">
      <div class="form-row">
        <div class="col">
          <label for="price" v-t="'home.priceRange'"></label>
          <select id="price" class="form-control" v-model="selectedPrice">
            <option value="" v-t="'home.priceDropDownDefault'"></option>
            <option v-for="price in allPriceRanges" :value="price" v-bind:key="price">
              {{ price }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="genre" v-t="'home.genres'"></label>
          <select id="genre" class="form-control" v-model="selectedGenre">
            <option value="" v-t="'home.genreDropDownDefault'"></option>
            <option v-for="genre in allGenres" :value="genre" v-bind:key="genre">
              {{ genre }}
            </option>
          </select>
        </div>

        <div class="col">
          <label for="search" v-t="'home.search'"></label>
          <b-input-group>
            <b-form-input id="search" v-model="searchValue" placeholder="Search" />
            <b-input-group-append>
              <b-button variant="danger" :disabled="!Boolean(searchValue)" @click="clear">
                <font-awesome-icon icon="times" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
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
  methods: {
    clear() {
      this.searchValue = ''
    }
  },
  created() {
    this.searchValue = this.$route.query.search || ''
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
