<template>
  <div>
    <v-toolbar >
      <v-toolbar-side-icon  class="hidden-md-and-up"  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-on:click="estadisticas()">Synthesis MOS Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <!--/////////////////C A M B I A R   M E N U S   D E L  T O P    B A R  ///////////////////////-->
        <v-btn flat  v-on:click="pacasa()" >Cerrar Sesión</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout  class="hidden-md-and-up"   wrap style="height: 200px;">
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list class="pa-1">
          <v-list-tile avatar v-on:click="estadisticas()">
            <v-list-tile-avatar>
              <img src="../assets/fotos/beltran.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Beltrán Labrador</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile v-on:click="pacasa()" v-for="item in items" :key="item.title">
            <v-list-tile-action >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [                                                        //
        { title: "Cerrar Sesión", icon: "supervised_user_circle" },   // => Cambiar Menús del Slider
      ],                                                              //
      right: null,
      drawer: false,
      counter: 0,
    };
  },
  methods: {
    pacasa(){
      this.$store.commit("clearResults");
      this.$router.push("/")

      console.log(this.$store.getters.result);
    },
    estadisticas(){
      this.counter ++;
      if (this.counter == 5) {
        console.log("Que no despegamos xd");
      this.$router.push("/estadisticas")
      }

    }
  },
};
</script>

<style>
</style>
