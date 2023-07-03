<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">VeriFlix</b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- Agrega aquí los enlaces de navegación -->
        <nuxt-link to="/" class="mr-2">Inicio</nuxt-link>
        <nuxt-link to="/login" class="mr-2">Ingresar</nuxt-link>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
/* Agrega estilos personalizados aquí si es necesario */
</style>
