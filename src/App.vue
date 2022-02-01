<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    
    <notifications></notifications>
    <router-view></router-view>

  </div>
</template>

<script>

  import {AUTH_SET_USER } from 'src/store/actions/auth'
  import { parseJwt } from "./utils/jwt.js";
  
  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
        user: this.$store.state.auth,
      }
    },
    mounted() {
      
      
    },
    methods: {
    }
  }
</script>

<style src="vue-material/dist/vue-material.css"></style>

<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
