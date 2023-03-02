<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

      </div>
      <div class="col-12">
        <div class="row">

        </div>
      </div>
      <div v-for="e in events" class="col-3 p-2 mt-3 event">
        <div :style="{ backgroundImage: `url(${e.coverImg})` }" class="h-100 w-100 event-bg">
          <div class="event-top"></div>
          <div class="event-bottom p-1 text-light d-flex flex-column justify-content-end my-shadow">
            <span><b>{{ e.name }}</b></span>
            <span>{{ e.location }}</span>
            <span>{{ e.date }}</span>
            <span class="text-end"><b>{{ e.capacity }}</b> Spots Left</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const filterType = ref('')
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error.message, 'Getting Events')
      }
    }

    onMounted(() => {
      getAllEvents()
    })

    return {
      events: computed(() => {
        if (!filterType.value) {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterType.value)
        }
      }),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.event {
  height: 300px;
}

.event-bg {
  background-size: cover;
}

.event-top {
  height: 65%;
}

.event-bottom {
  height: 35%;
  background-color: rgba(255, 255, 255, 0.203);
}

.my-shadow {
  text-shadow: 0 0 4px black;
}
</style>
