<template>
  <span class="navbar-text d-flex justify-content-center mt-4">
    <button class="btn selectable bg-my-red text-light bg-gradient lighten-30 text-uppercase my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div class="" v-else>
      <div class="dropdown dropstart my-2 my-lg-0 d-flex justify-content-center">
        <div type="button" class="selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="60" width="60"
              class="rounded border-1 border-dark border" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Tickets
              </div>
            </router-link>
            <!-- FIXME Edit Profile Stretch Goal -->
            <!-- <router-link :to="{ name: 'Edit' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Edit Account
              </div>
            </router-link> -->
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
