<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="row">
          <div class="col-12">
            <form class="mt-3 text-light" @submit.prevent="createEvent()">
              <label for="name" class="mb-1 my-shadow">Event Name</label>
              <input v-model="editable.name" required type="text" class="form-control mb-3" maxlength="200" id="name">
              <label for="description" class="mb-1 my-shadow">Event Description</label>
              <input v-model="editable.description" required type="text" class="form-control mb-3" maxlength="5000"
                id="description">
              <label for="location" class="mb-1 my-shadow">Location</label>
              <input v-model="editable.location" required type="text" class="form-control mb-3" maxlength="300"
                id="location">
              <label for="capacity" class="mb-1 my-shadow">Capacity</label>
              <input v-model="editable.capacity" required type="number" id="capacity" class="form-control mb-3">
              <label for="date" class="mb-1">Start Date</label>
              <input v-model="editable.startDate" required type="date" id="date" class="form-control mb-3"
                :min="new Date().toLocaleDateString('fr-CA')">
              <label for="coverImg" class="mb-1">Event Thumbnail IMG</label>
              <input v-model="editable.coverImg" required type="url" class="form-control mb-3">
              <label for="type">Event Type</label>
              <select v-model="editable.type" id="type" class="form-control">
                <option selected value="other">Other</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sports</option>
                <option value="digital">Digital</option>
              </select>
              <button class="btn btn-outline-light mt-4" type="submit">Post An Event!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "vue";
import { router } from "../router.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({ type: 'other' })

    return {
      editable,
      async createEvent() {
        try {
          const eventData = editable.value
          let newEvent = await eventsService.createEvent(eventData)
          editable.value = { type: 'other' }
          router.push({ name: 'EventDetails', params: { eventId: newEvent.id } })
        } catch (error) {
          Pop.error(error.message, 'Creating Event')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.my-shadow {
  text-shadow: 0 0 2px black;
}
</style>