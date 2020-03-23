<template>
  <q-page class="flex flex-center">
    <corona-radar />
  </q-page>
</template>

<script>
import CoronaRadar from '../components/CoronaRadar'
export default {
  name: 'PageIndex',
  components: {
    CoronaRadar
  }
}
</script>
