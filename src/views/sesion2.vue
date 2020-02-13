<template>
  <div>
    <nav-bar />
    <transition-group name="fade">
      <div key="uno" v-if="loading" class="lds-dual-ring palcentro"></div>
      <div key="2" v-else class="homeWrapper">
        <v-btn class="iconButton" v-on:click="infoButtonAction()" color="#12B0DE">
          <v-icon>info</v-icon>
        </v-btn>
        <div class="audio">
          <v-card style="text-align: center">
            <v-card-text>
              <p>Audio {{counter}} de {{totalDeAudios}}</p>
              <v-btn outline icon class="teal--text" @click.native="playing ? pause() : play()">
                <v-icon v-if="!playing || paused">play_arrow</v-icon>
                <v-icon v-else>pause</v-icon>
              </v-btn>
              <v-btn outline icon class="teal--text" @click.native="stop()">
                <v-icon>autorenew</v-icon>
              </v-btn>
              <v-slider v-if="showPercentage" @click.native="setPosition()" v-model="percentage"></v-slider>
              <v-slider v-else v-model="percentages"></v-slider>
            </v-card-text>
            <audio
              v-on:ended="finiquitao()"
              id="player"
              ref="player"
              :src="require(`../assets/audios/${selectedAudio}`)"
            ></audio>

            <v-card-text v-if="!this.alreadyVoted">
              <v-slider v-model="votacion" :tick-labels="escala" :max="4" step="1" tick-size="3"></v-slider>
            </v-card-text>
          </v-card>
          <div class="anteriorYSiguiente">
            <v-btn v-on:click="anterior()" class="botonSiguiente" color="orange">Anterior</v-btn>
            <v-btn
              v-if="aunSinTerminar"
              v-on:click="siguiente()"
              class="botonSiguiente"
              color="orange"
            >Siguiente</v-btn>
            <v-btn v-else v-on:click="finalizar()" class="botonSiguiente" color="green">Terminar</v-btn>
          </div>
        </div>
      </div>
    </transition-group>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template></template>
        <v-card>
          <v-card-title class="headline">Está seguro de que quiere terminar?</v-card-title>
          <v-card-text>En un lugar de la mancha de cuyo nombre no quiero acordarme blablabla y yes me caguen la puta, esto no me seas ruina y cámbialo xd</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-1" flat @click="dialog = false">Aún No</v-btn>
            <v-btn color="orange darken-1" flat @click="guardarDatos()">De Acuerdo</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <div class="divConFotos">
      <img class="fotoAudias" src="../assets/fotos/fotoaudias.jpg" alt />
      <img class="fotoUam" src="../assets/fotos/fotoUam.jpg" alt />
    </div>
  </div>
</template>

<script>
const formatTime = second =>
  new Date(second * 1000).toISOString().substr(11, 8);

import navBar from "../components/navigationBar.vue";
import audioJson from "../assets/audios.json";
import axios from "axios";
export default {
  name: "vuetify-audio",
  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    ended: {
      type: Function,
      default: () => {}
    },
    canPlay: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    duration: function() {
      return this.audio ? formatTime(this.totalDuration) : "";
    }
  },
  data() {
    return {
      totalDeAudios: 0,
      counter: 1,
      playing: false,
      paused: false,
      showPercentage: false,
      percentage: 0,
      percentages: 0,
      selectedAudio: "audio0.mp3",
      escala: ["1", "2", "3", "4", "5"],
      votacion: 0,
      pathDeAudios: new Object(),
      nombreDeAudios: new Object(),
      resultadoDeVotaciones: new Object(),
      aunSinTerminar: true,
      dialog: false,
      loading: false,
      alreadyVoted: false
    };
  },
  methods: {
    siguiente() {
      this.resultadoDeVotaciones[this.counter - 1] =
        this.votacion + 1 + " puntos para el Audio: " + this.selectedAudio;

      this.$store.commit("saveResults", this.resultadoDeVotaciones);
      if (this.counter == this.totalDeAudios) {
        this.aunSinTerminar = false;
        return;
      } else {
        this.counter += 1;
        this.selectedAudio = this.pathDeAudios[this.counter];
        this.audio.currentTime = 0;
        this.votacion = 0;
      }
      for (const singleAudio in this.resultadoDeVotaciones) {
        const element = this.resultadoDeVotaciones[singleAudio];
        if (element.includes(this.selectedAudio)) this.alreadyVoted = true;
        else this.alreadyVoted = false;
      }
      console.log(this.selectedAudio);
    },
    anterior() {
      this.resultadoDeVotaciones[this.counter - 1] =
        this.votacion + 1 + " puntos para el Audio: " + this.selectedAudio;
      this.$store.commit("saveResults", this.resultadoDeVotaciones);
      if (this.counter <= 1) {
        return;
      } else {
        this.counter -= 1;
        this.selectedAudio = this.pathDeAudios[this.counter];
        this.audio.currentTime = 0;
        this.votacion = 0;
        this.aunSinTerminar = true;
      }
      for (const singleAudio in this.resultadoDeVotaciones) {
        const element = this.resultadoDeVotaciones[singleAudio];
        if (element.includes(this.selectedAudio)) this.alreadyVoted = true;
        else this.alreadyVoted = false;
      }
      console.log(this.selectedAudio);
    },
    finalizar() {
      this.dialog = true;
    },
    guardarDatos() {
      let resultadoFinal = new Object();
      resultadoFinal.nombre = this.$store.getters.nombre;
      resultadoFinal.sesion = this.$store.getters.sesion;
      resultadoFinal.votacion = this.resultadoDeVotaciones;

      axios
        .post(
          "https://proyectobeltran-2d5ba.firebaseio.com/valoraciones.json",
          resultadoFinal
        )
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });

      console.log(resultadoFinal);
      this.$router.push("/");
    },
    cambioDePestaña(event) {
      let eventmenosuno = event - 1;

      this.resultadoDeVotaciones[event - 1] =
        this.votacion + 1 + " puntos para el Audio: " + eventmenosuno;
      this.counter = event;
      this.selectedAudio = this.pathDeAudios[this.counter];
      this.audio.currentTime = 0;
      this.votacion = 0;
      console.log(this.counter);
    },
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100) * this.percentage
      );
    },
    stop() {
      this.paused = this.playing = false;
      this.audio.pause();
      this.audio.currentTime = 0;
    },
    play() {
      if (this.playing) return;
      this.paused = false;
      this.audio.play().then(_ => (this.playing = true));
      this.showPercentage = true;
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    _handleLoaded: function() {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration);
          this.loaded = true;
        }
        if (this.autoPlay) this.audio.play();
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function(e) {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
    },
    _handlePlayPause: function(e) {
      if (e.type === "play" && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00:00";
      }
    },
    init: function() {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
    },
    finiquitao() {
      this.paused = this.playing = false;
      this.showPercentage = false;
    },
    infoButtonAction() {
      this.$store.commit("saveResults", this.resultadoDeVotaciones);
      this.$router.push("/banner");
    }
  },
  mounted() {
    this.audio = this.$refs.player;
    this.init();
    for (const a in audioJson) {
      if (audioJson.hasOwnProperty(a)) {
        this.pathDeAudios[a] = audioJson[a].path;
      }
    }
    for (const a in audioJson) {
      if (audioJson.hasOwnProperty(a)) {
        this.nombreDeAudios[a] = audioJson[a].nombre;
      }
    }
    this.totalDeAudios = Object.keys(this.pathDeAudios).length;
    this.selectedAudio = this.pathDeAudios[this.counter];
    this.resultadoDeVotaciones = this.$store.getters.results;
    console.log(this.resultadoDeVotaciones);
  },
  beforeDestroy() {
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  },
  components: {
    navBar
  }
};
</script>






<style scoped>
.anteriorYSiguiente {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.botonSiguiente {
  width: 10rem;
  margin: auto;
  margin-top: 2rem;
  text-align: center;
}

.nomuestronada {
  height: 70px;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .homeWrapper {
    display: grid;
    grid-gap: 3rem;
    margin-top: 8rem;
  }
  .audio {
    margin: auto;
    margin-top: -10rem;
    display: grid;
  }
  .divConFotos img {
    display: grid;
  }

  img {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  .homeWrapper {
    margin-top: 8rem;
    display: grid;
    grid-gap: 3rem;
  }
  .audio {
    margin: auto;
    margin-top: -10rem;
    display: grid;
  }

  .divConFotos img {
    display: grid;
  }

  img {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

@media only screen and (min-device-width: 600px) and (max-device-width: 1024px) {
  .homeWrapper {
    margin: 20vh 5vw;
    display: grid;
    grid-gap: 3rem;
  }
  .audio {
    width: 80vw;
    margin: auto;
    margin-top: -10rem;
    display: grid;
  }
  .divConFotos img {
    display: grid;
  }

  img {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

@media only screen and (min-device-width: 1000px) and (max-device-width: 2024px) {
  .iconButton {
    position: absolute;
    top: 10rem;
    right: 5rem;
  }

  .homeWrapper {
    margin: 17vh 5vw;
    display: grid;
    grid-gap: 3rem;
  }
  .audio {
    width: 40vw;
    margin: auto;
    display: grid;
  }

  .fotoAudias {
    height: 4rem;
    position: absolute;
    top: 73%;
    left: 7%;
  }

  .fotoUam {
    height: 5rem;
    position: absolute;
    top: 72%;
    right: 7%;
  }
}

.palcentro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid orange;
  border-color: orange transparent orange transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
