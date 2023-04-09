<template>
  <main class="bg-gradient">
    <div class="container-fluid">
      <div class="row">
        <div class="col-11 g-0 vh100">
          <div class="yeet">
            <Navbar />
          </div>
          <div class="my-overflow">
            <router-view />
          </div>
        </div>
        <div class="col-1 g-0 vh100 side-bar bg-gradient">
          <div>
            <Login />
          </div>
          <div class="mt-5 text-center">
            <router-link v-if="account.id" :to="{ name: 'CreateEvent' }">
              <button class="btn btn-outline-light p-1" type="button">Post an Event!</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from "./components/Login.vue"
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.vh100 {
  height: 100vh;
}

.yeet {
  height: 9%;
}

.my-overflow {
  height: 91%;
  overflow-y: scroll;
}

.my-overflow::-webkit-scrollbar {
  display: none;
}

.side-bar {
  background-color: rgb(48, 4, 4);
}
</style>
