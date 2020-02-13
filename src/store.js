import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      nombre:"",
      sesion: "",
      results: {}

  },
  mutations: {
    changeNombre (state, nombre) {
      state.nombre = nombre;
    },
    changeSesion (state, sesion) {
      state.sesion = sesion;
    },
    saveResults (state, results) {
      state.results = results;
    },
    clearResults (state) {
      state.results = {};
    },
  },
  getters: {
    nombre: state => state.nombre,
    sesion: state => state.sesion,
    results: state => state.results,
  }
})
