<template>
  <div class="contact-us full-screen">
    <div class="wrapper wrapper-full-page section content">
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
              <h2 class="title text-danger">404 Not Found</h2>
              <h2 class="title">Oops! It seems that this page does not exist.</h2>
              <button v-on:click="goBack()" class="btn btn-primary btn-fill btn-icon float-right"><i class="nc-icon nc-stre-left"></i> Go Back </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

     methods: {
       goBack: function() {
         this.$router.go(-1)
       }
     }
      
  }

</script>
