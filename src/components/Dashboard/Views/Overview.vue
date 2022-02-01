<template>
  <div class="content " >
    <div class="container-fluid">

      <!-- Selector --> 
      <div class="row">

        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary">Maybe some dashboard here or delete this page</h4>
            </template>
            <!-- LIST INFORMATIONS 
            <div class="info-profile">
              <div class="field">
                <span class="info">Username</span>
                <span class="value">username</span>
              </div>
            </div>
            -->
          </card>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import { GChart } from 'vue-google-charts'
  import TokenIcon from 'src/components/UIComponents/Icons/TokenIcon.vue'
  import UserIcon from 'src/components/UIComponents/Icons/UserIcon.vue'
  import Spinner from 'vue-spinner-component/src/Spinner.vue'


  export default {
    components: {
      Card,
      StatsCard,
      ChartCard,
      GChart,
      Spinner,
      TokenIcon,
      UserIcon
    },
    data() {
      return {
      
      }
    },
    mounted() {
      
    },
    methods: {

      
    }
  }
</script>
<style>
  .central {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-top: 0.75rem;
  }

  .img-size-fix {
    width: 100px;
    height: 100px;
  }

  .top-logo-heading-overview {
    width: 17%;
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  .info-profile{
    position: relative;
  }
  .info-profile .field{
    width: 100%;
    display: flex;
    font-size: 17px;
    margin-bottom: 10px;
  }
  .info-profile .field .info{
    width:20%;
    padding: 10px 20px;
    background-color: #f1f1f1;
  }
  .info-profile .field .value{
    width: 80%;
    padding: 10px 20px;
    font-weight: 700;
    border: solid 1px #f1f1f1;
  }
</style>
