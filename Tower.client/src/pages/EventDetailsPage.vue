<template>
  <div v-if="event" class="container-fluid mt-1">
    <div class="row">
      <div class="col-12 px-4">
        <div class="row eventDetailsCard text-light my-shadow elevation-1"
          :style="{ backgroundImage: `url(${event.coverImg})` }">
          <div class="col-12">
            <div class="icy row py-3 px-4 h-100">
              <div class="col-4 d-flex align-items-center justify-content-center g-0">
                <img :src="event.coverImg" :alt="event.name" id="eventThumbnail" class="elevation-2">
              </div>
              <div class="col-8 d-flex flex-column justify-content-between h-100">
                <div class="row">
                  <div class="col-6 d-flex flex-column">
                    <span class="fs-5 fw-bold"><b>{{ event.name }}</b></span>
                    <span>{{ event.location }}</span>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                    <span>{{ new Date(event.startDate).toLocaleDateString() }}</span>
                  </div>
                  <div class="col-12 mt-4" id="eventDescription">
                    <span>{{ event.description }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 d-flex justify-content-between align-items-center">
                    <div v-if="event.isCanceled == false">
                      <span v-if="event.capacity > 0"><span class="green">{{ event.capacity }}</span> spots left.</span>
                      <span v-else><span class="red">{{ event.capacity }}</span> spots left.</span>
                    </div>
                    <div v-else class="d-flex align-items-center">
                      <span class="fs-5 red fw-bold">EVENT CANCELLED</span>
                    </div>
                    <div v-if="event.isCanceled == false">
                      <span class="fw-bold">Event Host:</span>
                      <img :src="event.creator.picture" :alt="event.creator.name" :title="event.creator.name"
                        class="rounded-circle border border-dark border-2 ms-3" height="75" width="75">
                    </div>
                    <div v-if="event.creator.id != account?.id && event.isCanceled == false">
                      <button v-if="event.capacity > 0 && attending == false" class="btn btn-warning elevation-1"
                        type="button" @click="attendEvent()">Attend
                        Event</button>
                      <button v-else-if="event.capacity == 0" class="btn btn-danger" disabled>No Spots Left!</button>
                      <button v-else class="btn btn-grey" disabled>Already Attending</button>
                    </div>
                    <div v-else-if="event.creator.id == account?.id && event.isCanceled == false">
                      <button class="btn btn-danger" @click="cancelEvent()">Cancel Event</button>
                    </div>

                    <div v-else></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 px-3 mt-4">
        <div class="w-100 bg-dark bg-gradient py-2 px-1">
          <div>
            <span class="my-shadow">Attending This Event:</span>
          </div>
          <div>
            <img v-for="ticket in eventTickets" :src="ticket.profile.picture" :alt="ticket.profile.name"
              :title="ticket.profile.name" height="40" width="40" class="rounded-circle ms-1 border-black elevation-1">
          </div>
        </div>
      </div>
      <div class="col-8 offset-2 mt-5 py-3 bg-dark">
        <div class="row px-4">
          <div class="col-12">
            <form class="d-flex flex-column align-items-end" @submit.prevent="createComment()">
              <textarea v-model="editable.body" id="commentBody" placeholder="Tell the people..."></textarea>
              <button class="btn btn-success bg-gradient elevation-1 mt-2">post comment</button>
            </form>
          </div>
        </div>
        <div v-for="c in comments" class="row mt-3 px-4">

          <div class="col-2 text-center">
            <img class="rounded-circle elevation-1" :src="c.creator.picture" :alt="c.creator.name" height="80" width="80">
          </div>
          <div class="col-10 d-flex align-items-center">
            <div class="w-100 bg-grey rounded d-flex flex-column p-2">
              <span v-if="eventTickets.find(t => t.profile.id == c.creator.id)" class=""><b>{{ c.creator.name
              }}</b> - <i>Attending This Event</i></span>
              <span v-else class=""><b>{{ c.creator.name }}</b></span>
              <span class="mt-1">{{ c.body }}</span>
              <button type="button" @click="deleteComment(c.id)" class="btn btn-danger mt-2 w-25"
                v-if="c.creator.id == account?.id">Delete Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()
    const eventId = route.params.eventId
    const editable = ref({})

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

    async function getEventComments() {
      try {
        await attendeesService.getEventComments(eventId)
      } catch (error) {
        Pop.error(error.message, 'Getting Event Comments')
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
        getEventTickets()
        getEventComments()
      }
    })

    onUnmounted(() => {
      AppState.event = null
    })

    return {
      editable,
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
      comments: computed(() => AppState.comments),
      async attendEvent() {
        try {
          await attendeesService.attendEvent({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error(error.message, 'Attending Event')
        }
      },
      async createComment() {
        try {
          const commentData = editable.value
          commentData.eventId = eventId
          await commentsService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, 'Creating Comment')
        }
      },
      async cancelEvent() {
        try {
          if (await Pop.confirm('Are you sure you wish to cancel this event?', 'This action can not be reversed.', 'Yep!')) {
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          Pop.error(error.message, 'Cancelling Event')
        }
      },
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete your comment?')) {
            await commentsService.deleteComment(commentId)
          }
        } catch (error) {
          Pop.error(error.message, 'Deleting Comment')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.eventDetailsCard {
  height: 50vh;
  background-color: rgb(47, 57, 57);
  background-size: cover;

}

.icy {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.my-shadow {
  text-shadow: 0px 1px 5px black;
}

.green {
  color: rgb(32, 255, 32);
}


.red {
  color: red;
}

#commentBody {
  width: 100%;
  height: 15vh;
  resize: none;
}

.border-black {
  border: 2px solid black
}

#eventThumbnail {
  width: 95%;
  height: auto;
}

#eventDescription {
  height: 20vh;
  overflow-y: scroll;
}

#eventDescription::-webkit-scrollbar {
  display: none;
}
</style>