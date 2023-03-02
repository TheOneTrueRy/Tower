<template>
  <div class="container">
    <div class="row">
      <div class="col-12 px-1 mt-3">
        <div
          class="rounded border border-dark border-3 headImg elevation-1 d-flex flex-column align-items-start ps-3 pt-5 text-light my-shadow fs-5">
          <span>Get ahead of the scalpers.</span>
          <span>Reserve your seats now with</span>
          <span>real events for real people.</span>
        </div>
      </div>
      <div class="col-12 px-3 mt-5 elevation-1">
        <div class="row bg-dark text-center">
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == '' ? 'typeFilter' : '']"
            @click="changeFilterType('')">
            All</div>
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == 'concert' ? 'typeFilter' : '']"
            @click="changeFilterType('concert')">Concerts</div>
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == 'convention' ? 'typeFilter' : '']"
            @click="changeFilterType('convention')">Conventions</div>
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == 'sport' ? 'typeFilter' : '']"
            @click="changeFilterType('sport')">Sports</div>
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == 'digital' ? 'typeFilter' : '']"
            @click="changeFilterType('digital')">Digital</div>
          <div class="col-2 selectable py-2 fs-5" :class="[filterType == 'other' ? 'typeFilter' : '']"
            @click="changeFilterType('other')">Other</div>
        </div>
      </div>
      <div v-for="e in events" class="col-3 p-2 mt-3 event">
        <router-link :to="{ name: 'EventDetails', params: { eventId: e.id } }">
          <div :style="{ backgroundImage: `url(${e.coverImg})` }" class="h-100 w-100 event-bg selectable elevation-1">
            <div class="event-top"></div>
            <div class="event-bottom p-1 text-light d-flex flex-column justify-content-end my-shadow">
              <span><b>{{ e.name }}</b></span>
              <span>{{ e.location }}</span>
              <span>{{ e.date }}</span>
              <span class="text-end"><b>{{ e.capacity }}</b> Spots Left</span>
            </div>
          </div>
        </router-link>
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
      },
      filterType,
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

.typeFilter {
  color: firebrick;
  border-bottom: 4px solid firebrick;
}

.headImg {
  height: 250px;
  background-size: cover;
  background-image: url(https://mir-s3-cdn-cf.behance.net/project_modules/fs/0125bc97676521.5ecafffcbb947.jpg);
  background-position: center;
}
</style>
