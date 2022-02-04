<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary">Charts sondaggio</h4>

            </template>
            <!-- If you want to hide survey, comment the lines below -->
            <h4>{{surveyName}}: {{numberSurveys}} sondaggi </h4>
            <hr>
            <h4 style="mt-6">Charts for each element of the survey</h4>
            <div v-for="(chart, index) in surveyResults" v-bind:key="index">
              {{chart}}, {{index}}

            </div>
          </card>
        </div>
      </div>
    </div>  
  </div>

</template>

<script>

import Card from '../../UIComponents/Cards/Card.vue';
import axios from 'axios'

export default {
  components: {    
    Card
  },
  data() {

    return {

      surveyId: this.$route.params.id,
      surveyName: '',
      numberSurveys: 0,
      surveyResults: []      
    };
  },

  created: function() {
    this.getSurveyResults(this.$route.params.id)
  },

  methods: {
    getSurveyResults: function(surveyId) {
        
        let http = axios.create({
            baseURL: 'http://localhost:3000',
        });
        http.get('/results?postId=' + surveyId)
        .then(response => {
          console.log(response.data)
          const selectedSurvey = JSON.parse(localStorage.getItem('selectedSurvey'))
          console.log('selectedSurvey', JSON.parse(selectedSurvey.json).pages[0])
          const elements = JSON.parse(selectedSurvey.json).pages[0].elements
          console.log(elements)
          this.surveyResults = elements
          this.surveyName = selectedSurvey.name
          this.numberSurveys = response.data.length
        })
        .catch(e => {
          console.log("Error: " + e.message);
        })
      },
  }
};
</script>

<style>
  th {
    color: black !important;
    font-weight: bold !important;
    background-color: lightgray;
    height: 50px;
  }
  .md-button.md-theme-default.md-primary {
    color: #00689d;
    color: var(--md-theme-default-primary-on-background, #00689d);
  }
</style>
