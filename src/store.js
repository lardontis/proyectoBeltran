import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      nombre:"",
      sesion: "",

  },
  mutations: {
    changeNombre (state, nombre) {
      state.nombre = nombre;
    },
    changeSesion (state, sesion) {
      state.sesion = sesion;
    }
  },
  getters: {
    nombre: state => state.nombre,
    sesion: state => state.sesion,
  }
})
