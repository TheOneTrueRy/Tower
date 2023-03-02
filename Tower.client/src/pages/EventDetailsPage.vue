<template>
  <div class="container-fluid">

  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute()
    const eventId = route.params.eventId

    async function getEventById() {
      try {

      } catch (error) {

      }
    }

    return {
      event: computed(() => AppState.event),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped></style>