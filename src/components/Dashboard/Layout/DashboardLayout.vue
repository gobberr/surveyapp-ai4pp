<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview">
        <i class="nc-icon nc-grid-45"></i>
        <p>Home</p>
      </sidebar-link>

      
      <sidebar-link to="/surveyList">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Lista sondaggi</p>
      </sidebar-link>

      <sidebar-link to="/createSurvey">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Creazione sondaggi</p>
      </sidebar-link>

      <!--
      <sidebar-link to="/compileSurvey/1">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Compila sondaggio</p>
      </sidebar-link>
      -->
      

      <!--
      <sidebar-link to="/profile">
        <i class="nc-icon nc-single-02"></i>
        <p>Profilo</p>
      </sidebar-link>
      -->      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <!--<content-footer></content-footer>-->
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    data() {
      return {
        activeUser: null,
        usertype: '',
        user: this.$store.state.auth
      }
    },
    beforeCreate: function () {
      if (this.$session.exists()) {
        this.activeUser = true;
      }

    },
    mounted() {
      this.usertype = this.$session.get("usertype");
      //console.log(this.user)
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
