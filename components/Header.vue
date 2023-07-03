<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="header-image">
            <div class="image-overlay"></div>
            <img :src="firstResult?.Poster" alt="Imagen de la película" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h1 class="card-title">{{ firstResult?.Title }}</h1>
              <p class="card-text">{{ firstResult?.Year }}</p>
              <p class="card-text">{{ firstResult?.Type }}</p>
              <!-- Agrega otros detalles de la película aquí si es necesario -->
              <b-button variant="danger" @click="redirectToMovieDetails()"
                >Ver ahora</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
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
export default class Header extends Vue {
  @Prop({ required: true })
  firstResult!: Search | null;

    redirectToMovieDetails() {
    if (this.firstResult) {
      const { imdbID } = this.firstResult;
      this.$router.push({ path: `/movie-details/${imdbID}` });
    }
  }
}
</script>

<style scoped>
.header {
  background-color: black;
  color: white;
  padding: 20px;
  position: relative;
}

.header-image {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%);
}

.header-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.header-details {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.header-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.header-description {
  font-size: 1rem;
  margin-bottom: 20px;
}

.header-button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 767px) {
  .col-md-6 {
    width: 100%;
  }

  .header-details {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    text-align: center;
  }

  .header-image {
    max-height: none;
  }

  .row {
    flex-direction: column;
  }

  .col-md-6 {
    order: 2;
  }
}
</style>
