<template>
  <div class="cover">
    <div class="formWrapper">
      <form>
        <v-text-field v-model="name" label="Nombre" required></v-text-field>
        <v-select v-model="selected" :items="items" label="Sesión" required></v-select>

        <div class="elboton">
          <v-btn class="botontontonton" color="orange" @click="submit()">submit</v-btn>
        </div>
      </form>
    </div>
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ text }}
      <v-btn
        color="orange"
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["Sesión 1", "Sesión 2"],
      name: "",
      selected: "nothing",
      snackbar: false,
      text: "Rellene todos los campos"
    };
  },
  methods: {
    submit() {
      this.$store.commit("changeNombre", this.name);
      this.$store.commit("changeSesion", this.selected);
      if (this.name.length <= 0) {
        this.snackbar= true;
      } else if (this.selected == "nothing"){
        this.snackbar= true;
      }else {
        if (this.selected == "Sesión 1")
          this.$router.push("/sesion1")
        else
          this.$router.push("/sesion2")
      }
    }
  }
};
</script>

<style scoped>

.elboton{
  display: grid;
}

.botontontonton{
  margin: auto;
}
.cover {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/fotos/waterdrop.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .formWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    padding: 1rem;
    background-color: rgba(218, 218, 218, 0);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(65, 64, 64);
  }
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  .formWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    padding: 1rem;
    background-color: rgba(218, 218, 218, 0);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(65, 64, 64);
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .formWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    padding: 1rem;
    background-color: rgba(218, 218, 218, 0);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(65, 64, 64);
  }
}

@media only screen and (min-device-width: 1000px) and (max-device-width: 2024px) {
  .formWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    padding: 1rem;
    background-color: rgba(241, 241, 241, 0.24);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(65, 64, 64);
  }
}
</style>
