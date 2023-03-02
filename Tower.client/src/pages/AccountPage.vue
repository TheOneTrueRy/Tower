<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { attendeesService } from "../services/AttendeesService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {

    async function getMyTickets() {
      try {
        await attendeesService.getMyTickets()
      } catch (error) {
        Pop.error(error.message, 'Getting My Tickets')
      }
    }

    onMounted(() => {
      getMyTickets()
    })

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
