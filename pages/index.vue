<template>
  <div class="home">
    <Header :firstResult="firstResult" />
    <div class="container">
      <other-results :other-results="otherResults" />
      <div class="text-center mt-4 mb-4">
        <b-button class="loadMore" @click="loadMoreResults">Cargar más</b-button>
      </div>
    </div>
    <b-button class="scroll-top" variant="primary" @click="toTop()">
      <i class="fas fa-arrow-up"></i>
    </b-button>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";

import { Component, Vue } from "nuxt-property-decorator";
import { random } from "lodash"; // Importa la función "random" de lodash

interface RootObject {
  Search: Search[];
  totalResults: string;
  Response: string;
}

interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Component
export default class Login extends Vue {
  firstResult: Search | null = null;
  otherResults: Search[] = [];
  currentPage: number = 1;

  mounted() {
    this.fetchMovies();
  }

  toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  fetchMovies(): void {
    axios
      .get<RootObject>(
        `http://www.omdbapi.com/?apikey=da32a883&s=movie&page=${this.currentPage}`
      )
      .then((response: AxiosResponse<RootObject>) => {
        const { Search, totalResults, Response } = response.data;
        // Aquí puedes utilizar los resultados obtenidos
        console.log(Search);
        console.log(totalResults);
        console.log(Response);
        if (Search.length > 0) {
          if (this.currentPage === 1) {
            const randomIndex = random(0, Search.length - 1); // Obtén un índice aleatorio
            this.firstResult = Search[randomIndex]; // Utiliza el resultado aleatorio
            this.otherResults = Search.slice(1);
          } else {
            this.otherResults = [...this.otherResults, ...Search];
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadMoreResults(): void {
    this.currentPage++;
    this.fetchMovies();
  }
}
</script>

<style scoped>
.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
