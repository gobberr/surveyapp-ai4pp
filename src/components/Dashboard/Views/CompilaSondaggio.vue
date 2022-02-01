<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary">Compila sondaggio</h4>

            </template>
            <!-- If you want to hide survey, comment the lines below -->
            <h2>{{surveyName}}</h2>
            <survey :survey="survey"></survey>
          </card>
        </div>
      </div>
    </div>  
  </div>

</template>

<script>


import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";

import { init as customWidget } from "../../UIComponents/customwidget";
import Card from '../../UIComponents/Cards/Card.vue';
import axios from 'axios'

// widgets.icheck(SurveyVue);
widgets.select2(SurveyVue);
widgets.inputmask(SurveyVue);
widgets.jquerybarrating(SurveyVue);
widgets.jqueryuidatepicker(SurveyVue);
widgets.nouislider(SurveyVue);
widgets.select2tagbox(SurveyVue);
widgets.sortablejs(SurveyVue);
widgets.ckeditor(SurveyVue);
widgets.autocomplete(SurveyVue);
widgets.bootstrapslider(SurveyVue);
customWidget(SurveyVue);

SurveyVue.Serializer.addProperty("question", "tag:number");

let model = new SurveyVue.Model(this.json);
model.onComplete.add(function(sender) {
  console.log('sender.data', sender.data)
})


export default {
  components: {
    Survey,
    Card
  },
  data() {

    return {
      survey: model,
      surveyId: this.$route.params.id,
      surveyName: '',
      json: {
        "questionTitleLocation": "bottom",
        "showQuestionNumbers": "off",
        "pages": [
          {
            "name": "page1",
            "elements": []
          }
        ]
      },
    };
  },

  created: function() {
    this.getSurveyDetails(this.$route.params.id)
  },

  methods: {
    getSurveyDetails: function(surveyId) {
        
        let http = axios.create({
            baseURL: 'http://localhost:3000',
        });
        http.get('/getSurvey?surveyId=' + surveyId)
        .then(response => {
          console.log(response.data)
          this.json = response.data
          const selectedSurvey = JSON.parse(localStorage.getItem('selectedSurvey'))
          this.surveyName = selectedSurvey.name
          
          this.json = selectedSurvey.json 
          model = new SurveyVue.Model(this.json);
          model.onComplete.add(function(sender) {
            console.log(sender.data)
          })
          this.survey = model
          
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
