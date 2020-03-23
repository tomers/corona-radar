<template>
  <div>My component</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  created () {
    this.actionReadFeatures()
  },
  methods: {
    ...mapActions('coronaGis', [
      'actionReadFeatures'
    ])
  }
}
</script>
