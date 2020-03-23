<template>
  <div>
    <div>getterNearesFeatures {{ getterNearesFeatures }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'
// import SampleGeolocationMixin from './SampleGeolocationMixin'

export default {
  // mixins: [
  //   SampleGeolocationMixin
  // ],
  data () {
    return {}
  },
  computed: {
    // position () {
    //   return this.coords && [this.coords.longitude, this.coords.latitude]
    // },
    // ...mapGeolocationGetters([
    //   'coords'
    // ])
    // ...mapState('coronaGis', ['features']),
    ...mapGetters('coronaGis', [
      'getterNearesFeatures'
    ])
  },
  created () {
    this.actionReadRadar()
  },
  methods: {
    ...mapActions('coronaGis', [
      'actionReadRadar'
    ])
  }
}
</script>
