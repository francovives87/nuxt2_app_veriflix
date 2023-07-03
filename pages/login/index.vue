<template>
  <div class="login-page">
    <b-container class="h-100 d-flex justify-content-center align-items-center">
      <b-card class="login-card" shadow="hover">
        <h3 class="login-title">Iniciar sesión</h3>
        <b-form @submit.prevent="login()">
          <b-form-group label="Correo electrónico" label-for="email">
            <b-form-input id="email" v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Contraseña" label-for="password">
            <b-form-input
              id="password"
              type="password"
              v-model="password"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="danger" class="login-button"
            >Ingresar</b-button
          >
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "nuxt-property-decorator";

interface RootObject {
  email: string;
  username: string;
  tokens: Tokens;
  credentials: Credentials;
  visitor_id: number;
}

interface Credentials {
  cod_ref: string;
}

interface Tokens {
  refresh: string;
  access: string;
}
@Component
export default class Login extends Vue {
  password: string = "";
  email: string = "";

  login(): void {
    const formData = {
      email: this.email,
      password: this.password,
    };
    axios
      .post(process.env.server + "/api/v1/login/", formData)
      .then((response) => {
        console.log("LOGIN");
        const data: RootObject = response.data;
        // Puedes acceder a las propiedades de la respuesta usando la interfaz
        console.log("Email:", data.email);
        console.log("Username:", data.username);
        console.log("Refresh Token:", data.tokens.refresh);
        console.log("Access Token:", data.tokens.access);
        console.log("Cod Ref:", data.credentials.cod_ref);
        console.log("Visitor ID:", data.visitor_id);

        // Verificar si el token de acceso está presente en la respuesta
        if (data.tokens && data.tokens.access) {
          // Guardar el contenido de la variable cod_ref en localStorage
          localStorage.setItem("cod_ref", data.credentials.cod_ref);
          // Cambiar a la vista principal del proyecto
          this.$router.push({ path: "/" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style scoped>
.login-page {
  background-color: #000;
  height: 100vh;
}

.login-card {
  background-color: #333;
  color: #fff;
  max-width: 400px;
  padding: 30px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
}

.login-button {
  width: 100%;
}

@media (max-width: 576px) {
  .login-card {
    max-width: 100%;
  }
}
</style>

