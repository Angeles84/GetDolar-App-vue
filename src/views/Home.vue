<template>
  <v-row class="mt-8"> 
    <v-col cols="12">
      <v-card>
        <v-date-picker 
          v-model="fecha"
          full-width
          locale="es-cl"
          :min="minimo"
          :max="maximo"
          @change="getDolar(fecha)"
        >
        </v-date-picker>
      </v-card>

      <v-card 
      color="pink darken-2"
      dark>
        <v-card-text 
        class="title"
        align="center">
          <h1>$ {{valor}}</h1>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
 // import HelloWorld from '../components/HelloWorld'
 import axios from 'axios'
 import {mapMutations} from 'vuex'

 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  export default {
    name: 'Home',
    components: { 
    },
    data () {
      return {
        fecha: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        minimo: '1984',
        maximo: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        valor: null
      }
    },
    methods: {
      ...mapMutations(['SHOW_LOADING', 'HIDE_LOADING']),
      async getDolar(dia) {
        let arrayFecha = dia.split(['-']);
        let ddmmyy = arrayFecha[2]+'-'+arrayFecha[1]+'-'+arrayFecha[0];

        try {
          this.SHOW_LOADING({titulo: 'Accediendo a información'})
          await delay(1500);
          let datos = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`);
          console.log(datos.data.serie[0].valor);
          this.valor = await datos.data.serie[0].valor

        } catch (error){
          console.log(error)
        }
        finally {
          this.HIDE_LOADING()
        }
      }
    },
    created() {
      this.getDolar(this.fecha)
    }
  }
</script>

<style scoped>
.theme--dark.v-card > .v-card__text, .theme--dark.v-card > .v-card__subtitle {
  color: rgba(255, 255, 255, 0.95);
}

</style>
