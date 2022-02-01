<template>
  <ul class="nav nav-mobile-menu">
    <li class="nav-item">
      <a class="nav-link">
        <div v-show="owner != ''">
          <b-button variant="danger" @click="logout">Logout</b-button>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>

  import DropDown from 'src/components/UIComponents/Dropdown.vue'
  import {AUTH_LOGOUT} from 'src/store/actions/auth'

  export default {
    components: {
      DropDown
    },
    methods: {
      logout() {
        this.$store.dispatch(AUTH_LOGOUT).then(() => {
          //console.log('Removed access token from Vue App session')
          window.location = window.env.VUE_APP_KEYCLOAK_ENDPOINT + "auth/realms/" + window.env.VUE_APP_ADMIN_REALM + "/protocol/openid-connect/logout?redirect_uri=" + window.env.VUE_APP_PORTAL_ENDPOINT
        });
      }
    }
  }
</script>
<style>
</style>
