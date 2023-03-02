<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

      </div>
      <div class="col-12 px-3 mt-5">
        <div class="row bg-dark text-center">
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('')">All</div>
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('concert')">Concerts</div>
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('convention')">Conventions</div>
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('sport')">Sports</div>
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('digital')">Digital</div>
          <div class="col-2 selectable py-2 fs-5" @click="changeFilterType('other')">Other</div>
        </div>
      </div>
      <div v-for="e in events" class="col-3 p-2 mt-3 event">
        <div :style="{ backgroundImage: `url(${e.coverImg})` }" class="h-100 w-100 event-bg selectable">
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
      account: computed(() => AppState.account),
      changeFilterType(type) {
        filterType.value = type
      }
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
  backdrop-filter: blur(5px);
}

.my-shadow {
  text-shadow: 0 0 4px black;
}
</style>
