<template>
  <div class="estadisticasWrapper">
    <div class="titulazo">
      <h1>Buenas Beltran</h1>
      <p>En esta Página puedes consultar las votaciones y participaciones de la gente</p>
    </div>

    <div class="superCardacian">
            <div v-for="(item, index) in contenido" :key="index" class="cardsWrapper">
      <v-layout>
        <v-flex>
          <v-card>
              <div class="nombreDeIndividuo">
                <h4 >{{item.nombre}}</h4>
                <h5>{{item.sesion}}</h5>
              </div>
            <div class="votaciones">
                <ul>
                    <li v-for="(votaciones, n) in item.votacion" :key="n">{{votaciones}}</li>
                </ul>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      text: {},
      contenido:{}
    };
  },
  methods: {},
  mounted() {
    axios
      .get("https://proyectobeltran-2d5ba.firebaseio.com/valoraciones.json")
      .then(result => {
        this.contenido = result.data;
      console.log(this.contenido);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.titulazo {
  text-align: center;
  margin-top: 3rem;
}


.superCardacian{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 2rem;
}

.nombreDeIndividuo{
    text-align: center;
    padding-bottom: 1rem;
}

.nombreDeIndividuo h4{
    padding-top: 1rem;
}

.votaciones{
    padding: 1rem;
}
</style>
