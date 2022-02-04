<template>
  <div class="content " >
    <div class="container-fluid">

      <!-- Selector --> 
      <div class="row">

        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary">Select a survey to see the results</h4>
            </template>
            <!-- LIST INFORMATIONS 
            <div class="info-profile">
              <div class="field">
                <span class="info">Username</span>
                <span class="value">username</span>
              </div>
            </div>
            -->
            <div>
              TODO:
              <ul>
                <li>
                  Lista policy: cliccandoci si entra nel dettaglio e si vedono i grafici relativi ai sondaggi
                </li>
                <li>
                  b
                </li>
              </ul>
            </div>

            <!-- Tabella templates -->
            <div class="justify-content-center mt-5">
              <b-table id="tableOne" responsive ref="tableOne" bordered hover :items="tableOne.data" :fields="tableOne.fields" v-if="tableOne.data.length>0" >
                <template slot="json" slot-scope="cell">
                  <a href="" @click.prevent="showDetails(cell.item, cell.index)" class="link text-primary"><i class="fa fa-2x fa-play" aria-hidden="true"></i></a>                  
                </template>
              </b-table>
            </div>
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
  import axios from 'axios'

  const tableOneColumns = [
    {
      key: 'id',
      label: 'id'
    },
    {
      key: 'name',
      label: 'name'
    },
    {
      key: 'json',
      label: 'run'
    }
  ];
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
        tableOne: {
          fields: [...tableOneColumns],
          data: []
        },
      
      }
    },
    created: function() {
      this.getSurveyList()
      
    },
    methods: {
      getSurveyList: function() {
        
        let http = axios.create({
            baseURL: 'http://localhost:3000',
        });
        http.get('/getActive')
        .then(response => {
          // console.log(response.data)
          let surveyList = []
          for (const [key, value] of Object.entries(response.data)) {
            // console.log(response.data[key])
            surveyList.push(response.data[key])
          }
          this.tableOne.data = surveyList          
        })
        .catch(e => {
          console.log("Error: " + e.message);
        })
      },

      showDetails(item, index) {
        //console.log(item, index)
        localStorage.setItem('selectedSurvey', JSON.stringify(item))
        this.$router.push("/resultsSurvey/" + item.id);
      },
      
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
