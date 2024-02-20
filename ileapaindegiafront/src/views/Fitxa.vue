<script>
import { ref } from "vue";
import taula from '../components/Taula.vue'
export default {
  components: {
    taula
  },
  data() {
    return {
      zutabeak: ["Diluc", "Jean", "Mona", "Keqing", "Zhongli"],
      lerroak:  [["Pyro", "Claymore"],["Anemo", "Espada"],["Hydro", "Catalizador"],["Electro", "Espada"],["Geo", "Polearm"]]
    };
  },
  // Otro código de la vista
}
</script>
<template>
    <a>Funtziona</a>
    <div class="containerPage">
        <taula :zutabeak="zutabeak" :lerroak="lerroak"></taula>
    </div>
    
</template>