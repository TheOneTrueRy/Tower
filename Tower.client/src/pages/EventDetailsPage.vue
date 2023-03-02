<template>
  <div v-if="event" class="container-fluid mt-1">
    <div class="row">
      <div class="col-12 px-4">
        <div class="row px-1 py-4 eventDetailsCard text-light my-shadow elevation-1"
          :style="{ backgroundImage: `url(${event.coverImg})` }">
          <div class="col-4 d-flex align-items-center justify-content-center">
            <img :src="event.coverImg" alt="" height="300" width="300" class="elevation-2">
          </div>
          <div class="col-8 d-flex flex-column justify-content-between">
            <div class="row">
              <div class="col-6 d-flex flex-column">
                <span class="fs-5 fw-bold"><b>{{ event.name }}</b></span>
                <span>{{ event.location }}</span>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <span>{{ new Date(event.startDate).toLocaleDateString() }}</span>
              </div>
              <div class="col-12 mt-4">
                <span>{{ event.description }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-between">
                <span v-if="event.capacity > 0"><span class="green">{{ event.capacity }}</span> spots left.</span>
                <span v-else><span class="red">{{ event.capacity }}</span> spots left.</span>
                <button v-if="event.capacity > 0 && attending == false" class="btn btn-warning" type="button"
                  @click="attendEvent()">Attend
                  Event</button>
                <button v-else-if="event.capacity == 0" class="btn btn-danger" disabled>No Spots Left!</button>
                <button v-else class="btn btn-grey" disabled>Already Attending</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">

      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()
    const eventId = route.params.eventId

    async function getEventById() {
      try {
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error.message, 'Getting Event By Id')
      }
    }

    async function getEventTickets() {
      try {
        await attendeesService.getEventTickets(eventId)
      } catch (error) {
        Pop.error(error.message, 'Getting Event Tickets')
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
        getEventTickets()
      }
    })

    onUnmounted(() => {
      AppState.event = null
    })

    return {
      attending: computed(() => {
        if (AppState.eventTickets.find(t => t.profile.id == AppState.account.id)) {
          return true
        } else {
          return false
        }
      }),
      event: computed(() => AppState.event),
      account: computed(() => AppState.account),
      eventTickets: computed(() => AppState.eventTickets),
      async attendEvent() {
        try {
          await attendeesService.attendEvent({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error(error.message, 'Attending Event')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.eventDetailsCard {
  height: 50vh;
  width: 100%;
  background-color: rgb(47, 57, 57);
  background-size: cover;
}

.my-shadow {
  text-shadow: 1px 1px 0 black;
}

.green {
  color: rgb(32, 255, 32);
}


.red {
  color: red;
}
</style>