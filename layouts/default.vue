<template>
  <div>
    <Navbar v-if="showNavbar" />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  created() {
    setInterval(() => {
      console.log("Verifiacion por tiempo de token para backend django-rest-framework");
      this.getTokenAndRefresh();
    }, 840000);
  },
  computed: {
    showNavbar() {
      // Obtén la ruta actual utilizando $route.path
      const currentRoute = this.$route.path;

      // Verifica si estás en la vista /login/index.vue
      return currentRoute !== "/login";
    },
  },
  methods: {
    getTokenAndRefresh() {
      // Lógica para obtener y refrescar el token
      console.log("getTokenAndRefresh")
    },
  },
};
</script>
