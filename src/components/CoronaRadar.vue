<template>
  <div>
    <div
      v-for="(f, i) in getterNearesFeatures"
      :key="`feature_${i}`"
    >
      {{ f }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
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
