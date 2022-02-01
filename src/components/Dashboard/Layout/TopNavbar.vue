<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!--<a class="navbar-brand" href="#">Dashboard</a>-->
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <!--
      <div class="collapse navbar-collapse justify-content-left">
        <h4 class="card-title text-primary">Utente: <b>{{ formatPartner(user.profile && user.profile.username ? user.profile.username : user.owner) }}</b></h4>
      </div>
      <div class="collapse navbar-collapse justify-content-center">
        <h4 class="card-title text-primary">Azienda: <b>{{ companyName }}</b></h4>
      </div>
      <div  class="collapse navbar-collapse justify-content-end">
        <button v-show="owner != ''" @click="logout" class="btn btn-danger btn-square btn-icon justify-content-end"><i class="nc-icon nc-key-25"></i>&nbsp;&nbsp; Logout</button>
      </div>
      -->
      <div id="app" v-cloak>
        <div v-if="errorStr">
          Sorry, but the following error
          occurred: {{errorStr}}
        </div>
        
        <div v-if="gettingLocation">
          <i>Getting your location...</i>
        </div>
        
        <div v-if="location">
          Your location is {{ location.coords.latitude }}, {{ location.coords.longitude}}
        </div>
        
      </div>
    </div>
  </nav>
</template>
<script>


  import {AUTH_LOGOUT} from 'src/store/actions/auth'

  export default {

    computed: {
      routeName() {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },

    data() {
      return {
        user: this.$store.state.auth,
        companyName: localStorage.getItem('companyName'),
        owner: this.$store.state.auth.owner,
        location: null,
        gettingLocation: false,
        errorStr: null
      }
    },

    mounted() {
      //console.log(localStorage.getItem('partner'))
    },

    created() {
      if(!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },


    methods: {
   
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      
    }
  }

</script>
<style>

</style>
