<template>
  <div class="contact-us full-screen">
    <div class="wrapper wrapper-full-page section content bgimg">
      <div class="container ">

        <!--
        <br><br><br>

        <div class="row">
          <div class="col-12">
            <card>
              <div slot="header">
                <h4 class="card-title">Login Screen</h4>
                <p class="card-category">User access through AC</p>
                <br>
                <div class="text-center">
                  <button type="submit" class="btn btn-block btn-primary btn-fill float-right" @click.prevent="login"> Login </button>
                </div>
              </div>
            </card>
          </div>
        </div>  -->
      </div>
    </div>
  </div>
</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios';
  import AuthService from 'src/services/AuthService.js';
  import {AUTH_REQUEST} from 'src/store/actions/auth'

  export default {
    components: {
      Card,
    },
    data() {
      return {
        auth: undefined
      }
    },
    mounted() {

      const goto = window.location.href.split("goto=")[1].split("&")[0]
      this.auth = new AuthService(goto)

      console.log('mounting login page...')
      this.auth.getUser().then((response) => {
        if(response != null) {

          console.log('response != null\ngetUser response: ' + JSON.stringify(response))
          this.$store.dispatch(AUTH_REQUEST, { userInfo: response }).then(() => {
            //console.log('redirecting to overview.. ')

            //let routeData = this.$router.resolve('/');
            //this.$router.go(routeData);
            this.auth.login()
          })
        } else {
          console.log('no user found')
          this.auth.login()
        }
      })
    },
    methods: {
      login: function() {
        this.auth.login();
      },
    }
  }
</script>

<style>
  .bgimg {
    background-color: #f7f7f8;
    background-repeat: no-repeat;
    position: relative;
  }
  .top-logo-heading-login {
    width: 15%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
