<template>
  <div class="bannerWrapper">
      <v-btn class="goBackButton" v-on:click="goBack()" color="#12B0DE"><v-icon>arrow_back</v-icon> Volver</v-btn>
    <div class="textoExplicacion">
        <h2>{{explicationTitle}}</h2>
        <p>{{explicationText}}</p>
    </div>

    <div class="divConFotos">
      <img class="fotoAudias" src="../assets/fotos/fotoaudias.jpg" alt />
      <img class="fotoUam" src="../assets/fotos/fotoUam.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      explicationTitle: "",
      explicationText: ""
    }
  },
  methods:{
    goBack(){
      let cameFrom = this.$store.getters.sesion
      if (cameFrom == "Sesión 1")
        this.$router.push('/sesion1') 
      else
       this.$router.push('/sesion2')
      
    }
  },
 mounted(){
   if (this.$store.getters.sesion == "Sesión 1"){
        this.explicationTitle = "Explicación para el usuario Sesion1"
        this.explicationText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque auctor odio, vel placerat purus tristique ut. Duis ultrices dapibus erat, sed venenatis velit tincidunt in. Donec volutpat sodales lorem, eu iaculis nulla iaculis ac. Nam volutpat lobortis risus sed porta. Proin at tortor vestibulum velit ultricies suscipit rutrum et mi. Phasellus tempor ligula nibh, cursus malesuada urna porttitor eget. Curabitur feugiat in ipsum quis pulvinar. Nunc tincidunt dui nec dignissim ullamcorper. Curabitur sapien libero, volutpat quis sapien sed, rutrum porta dolor. Vivamus id nulla pretium, malesuada lorem nec, hendrerit ante. Nunc rutrum rutrum eros a auctor. Donec elementum metus in lacus molestie cursus. Etiam hendrerit massa sit amet mollis finibus."
        }
      else{
        this.explicationTitle = "Explicación para el usuario Sesion2"
        this.explicationText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque auctor odio, vel placerat purus tristique ut. Duis ultrices dapibus erat, sed venenatis velit tincidunt in. Donec volutpat sodales lorem, eu iaculis nulla iaculis ac. Nam volutpat lobortis risus sed porta. Proin at tortor vestibulum velit ultricies suscipit rutrum et mi. Phasellus tempor ligula nibh, cursus malesuada urna porttitor eget. Curabitur feugiat in ipsum quis pulvinar. Nunc tincidunt dui nec dignissim ullamcorper. Curabitur sapien libero, volutpat quis sapien sed, rutrum porta dolor. Vivamus id nulla pretium, malesuada lorem nec, hendrerit ante. Nunc rutrum rutrum eros a auctor. Donec elementum metus in lacus molestie cursus. Etiam hendrerit massa sit amet mollis finibus."

      }
 }
};
</script>

<style scoped>
.bannerWrapper {
  margin: 15vh 5vw;
  display: grid;
  grid-gap: 3rem;
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

.textoExplicacion{
    margin: 5vh 20vw;
}

.textoExplicacion h2{
    text-align: center;
    margin-bottom: 2rem;
}

.goBackButton{
    width: 10vw;
}


</style>