<template>
  <div>
    <div class="container">
      <div class="row mt-4" v-if="movieData">
        <div class="col-md-6">
          <img :src="movieData.Poster" alt="movieData Poster" />
        </div>
        <div class="col-md-6">
          <b-card class="details-card">
            <h1 class="card-title">{{ movieData.Title }}</h1>
            <p class="card-text">{{ movieData.Year }}</p>
            <!-- Otras propiedades de la película -->
            <p class="card-text"><strong>Director:</strong> {{ movieData.Director }}</p>
            <p class="card-text"><strong>Actores:</strong> {{ movieData.Actors }}</p>
            <p class="card-text"><strong>Género:</strong> {{ movieData.Genre }}</p>
            <p class="card-text"><strong>País:</strong> {{ movieData.Country }}</p>
          </b-card>
        </div>
      </div>

      <div class="row" v-if="movieData">
        <div class="col-md-12">
          <b-card class="description-card">
            <h2>Resumen</h2>
            <p>{{ movieData.Plot }}</p>
            <h2>Ratings</h2>
            <ul>
              <li v-for="rating in movieData.Ratings" :key="rating.Source">
                <strong>{{ rating.Source }}:</strong> {{ rating.Value }}
              </li>
            </ul>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import axios from "axios";

interface RootObject {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}

@Component
export default class MovieDetails extends Vue {
  movieData: RootObject | null = null;

  async mounted() {
    const imdbID = this.$route.params.imdbID;
    if (imdbID) {
      try {
        const response = await axios.get<RootObject>(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=da32a883`
        );
        this.movieData = response.data;
        console.log(this.movieData);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 20px;
}

.details-card {
  background-color: #343a40;
  color: #fff;
  padding: 20px;
}

.description-card {
  background-color: #343a40;
  color: #fff;
  padding: 20px;
}
</style>
