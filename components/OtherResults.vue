<template>
  <div>
    <div class="row justify-content-center">
      <b-card
        v-for="(result, index) in otherResults"
        :key="index"
        :title="result.Title"
        :img-src="result.Poster"
        img-alt="Movie Poster"
        img-top
        class="mb-2 other-result-card"
      >
        <p>{{ result.Year }}</p>
        <p>{{ result.Type }}</p>
        <b-button variant="danger" @click="redirectToMovieDetails(result.imdbID)"
          >Ver ahora</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Component
export default class OtherResults extends Vue {
  @Prop({ required: true })
  otherResults!: Search[];

  redirectToMovieDetails(imdbID: string) {
    this.$router.push(`/movie-details/${imdbID}`);
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .other-result-card {
    width: 300px; /* Tamaño fijo del card */
    margin-right: 2px !important;
  }
}
@media (max-width: 768px) {
  .other-result-card {
    width: 94%; /* Tamaño fijo del card */
  }
}
</style>
