<template>
  <div class="container-fluid mt-4 px-5">
    <div class="row">
      <div class="col-12">
        <h2 class="text-light my-shadow">My Upcoming Events:</h2>
      </div>
      <div v-for="ticket in myTickets" class="col-8 offset-2 mt-4">
        <div v-if="ticket.event" class="row">
          <div class="col-3 g-0">
            <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.event?.id } }">
              <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="eventCoverImg">
            </router-link>
          </div>
          <div class="col-8 g-0">
            <div class="h-100 w-60 bg-dark bg-gradient d-flex flex-column justify-content-between">
              <div class="row ps-4 pt-3">
                <div class="col-12">
                  <span class="fs-5"><b>{{ ticket.event.name }}</b></span>
                </div>
                <div class="col-12 d-flex flex-column pt-3">
                  <span>{{ ticket.event.location }}</span>
                  <span>{{ new Date(ticket.event.startDate).toLocaleDateString() }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-end pe-5 pb-3">
                  <button @click="deleteTicket(ticket.id)" class="btn btn-danger" type="button">Not Going</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
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

    watchEffect(() => {
      getMyTickets()
    })

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      async deleteTicket(ticketId) {
        try {
          if (await Pop.confirm('Are you sure you no longer want to attend this event?')) {
            await attendeesService.deleteTicket(ticketId)
          }
        } catch (error) {
          Pop.error(error.message, 'Deleting Ticket')
        }
      }
    }
  }
}
</script>

<style scoped>
.my-shadow {
  text-shadow: 1px 1px 0 black;
}

.eventCoverImg {
  height: 200px;
  width: 100%;
}
</style>
