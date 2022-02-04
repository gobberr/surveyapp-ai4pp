<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h3 class="card-title text-primary">Create a new survey</h3>
              <p class="card-title text-secondary mt-2">Start adding items to your survey</p>

              <!-- PAGE BUTTONS -->
              <div class="row">              
                <button class="btn btn-primary btn-square btn-icon float-left m-2 ml-3" @click="createCommentSurvey()"><i class="nc-icon nc-simple-add"></i> Add comment</button>
                <button class="btn btn-primary btn-square btn-icon float-left m-2" @click="createRankingSurvey()"><i class="nc-icon nc-simple-add"></i> Add ranking</button>
                <button class="btn btn-primary btn-square btn-icon float-left m-2" @click="createRatingSurvey()"><i class="nc-icon nc-simple-add"></i> Add rating</button>  
                <button class="btn btn-success btn-square btn-icon float-left m-2" @click="postSurvey()"><i class="nc-icon nc-check-2"></i> Salva sondaggio</button>                            
                <button class="btn btn-primary btn-square btn-icon float-left m-2" v-if="json.pages[0].elements.length > 0" @click="resetSurvey()"><i class="nc-icon nc-refresh-02"></i> Reset survey</button>
              </div>

              <!-- SURVEY PREVIEW -->
              <h3 class="card-title text-primary mt-5">Preview</h3>                
              <survey :survey="survey"></survey>                
            </template>


            <!-- DIALOG Comment -->
            <div class="row">
              <md-dialog :md-active.sync="createComment">
                <md-dialog-title>Add comment to the survey</md-dialog-title>    
                <md-dialog-content>     
                  <div class="row">
                    <div class="col-md-11">
                      <md-field :class="messageClass" class="m-4">
                        <label for="title">Question</label>
                        <md-input required name="title" id="title" v-model="commentSurvey.title"/>                      
                      </md-field> 
                      <md-field class="m-4">
                        <label for="name">Name (must be unique)</label>
                        <md-input required name="name" id="name" v-model="commentSurvey.name"/>
                        
                      </md-field> 
                      <div class="m-4">
                        <md-checkbox name="required" id="required" v-model="commentSurvey.isRequired" class="md-primary">Required</md-checkbox>
                      </div>  
                      <div class="m-4">
                        <span style="color:red; font-size:16px" v-if="showCompileError">*Compile all the required fields</span>
                      </div>                          
                    </div>            
                  </div>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="createComment = false; showCompile = false">Chiudi</md-button>
                  <md-button class="md-primary" @click="addCommentToSurvey(commentSurvey)">Salva</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- DIALOG Ranking -->
            <div class="row">
              <md-dialog :md-active.sync="createRanking" >
                <md-dialog-title>Add ranking to the survey</md-dialog-title>    
                <md-dialog-content>     
                  <div class="row">
                    <div class="col-md-11">
                      <md-field class="m-4">
                        <label for="title">Question</label>
                        <md-input required name="title" id="title" v-model="rankingSurvey.title"/>                      
                      </md-field>    
                      <md-field class="m-4">
                        <label for="name">Name (must be unique)</label>
                        <md-input required name="name" id="name" v-model="rankingSurvey.name"/>
                      </md-field>                 
                      <div class="m-4">
                        <md-chips class="md-primary shake-on-error" name="choices" id="choices" v-model="choices" :md-format="isValidChipOption" md-placeholder="Inserisci choices qui"></md-chips>
                      </div>                    
                      <div class="m-4">
                        <md-checkbox name="required" id="required" v-model="rankingSurvey.isRequired" class="md-primary">Required</md-checkbox>
                      </div>
                      <div class="m-4">
                        <span style="color:red; font-size:16px" v-if="showCompileError">*Compile all the required fields</span>
                      </div>                                                              
                    </div>                              
                  </div>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="createRanking = false; showCompile = false">Chiudi</md-button>
                  <md-button class="md-primary" @click="addRankingToSurvey(rankingSurvey)">Salva</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- DIALOG Rating -->
            <div class="row">
              <template>
              <md-dialog :md-active.sync="createRating" >
                
                <md-dialog-title>Add rating to the survey</md-dialog-title>
                <md-dialog-content>        
                  <div class="row">
                    <div class="col-md-11">
                      <md-field class="m-4">
                        <label for="title">Question</label>
                        <md-input required name="title" id="title" v-model="ratingSurvey.title"/>                      
                      </md-field>
                      <md-field class="m-4">
                        <label for="name">Name (must be unique)</label>
                        <md-input required name="name" id="name" v-model="ratingSurvey.name"/>
                      </md-field> 
                      <md-field class="m-4">
                        <label for="title">minRateDescription</label>
                        <md-input required name="minRateDescription" id="minRateDescription" v-model="ratingSurvey.minRateDescription"/>
                      </md-field>
                      <md-field class="m-4">                    
                        <label for="title">maxRateDescription</label>
                        <md-input required name="maxRateDescription" id="maxRateDescription" v-model="ratingSurvey.maxRateDescription"/>
                      </md-field>
                      <div class="m-4">
                        <md-checkbox name="required" id="required" v-model="ratingSurvey.isRequired" class="md-primary">Required</md-checkbox>
                      </div>  
                      <div class="m-4">
                        <span style="color:red; font-size:16px" v-if="showCompileError">*Compile all the required fields</span>
                      </div>                                                         
                    </div>            
                  </div>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="createRating = false; showCompile = false">Chiudi</md-button>
                  <md-button class="md-primary" @click="addRatingToSurvey(ratingSurvey)">Salva</md-button>
                </md-dialog-actions>
              </md-dialog>
              </template>
            </div>
  

          </card>
        </div>
      </div>
    </div>
  </div>

  
</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import * as SurveyVue from "survey-vue";
  import "bootstrap/dist/css/bootstrap.css";
  var Survey = SurveyVue.Survey;
  Survey.cssType = "bootstrap";
  import * as widgets from "surveyjs-widgets";
  import { init as customWidget } from "../../UIComponents/customwidget";

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

  // logic
  export default {
    name: "survey-creator",

    components: {
      Survey,
      Card
    },

    data() {        
      return {
        showCompileError: false,

        createComment: false,
        commentSurvey: {},      
        
        createRanking: false,
        rankingSurvey: {},
        choices: [],

        createRating: false,
        ratingSurvey: {
          "minRateDescription": "Not Satisfied",
          "maxRateDescription" : "Completely satisfied"
        },

        json: {
          "questionTitleLocation": "top",
          "showNavigationButtons": false,
          "showQuestionNumbers": "off",
          "pages": [
            {
              "name": "page1",
              "elements": []
            }
          ]
        },
        survey: model
      };
      
    },
    
    mounted() {
      // console.log('page mounted')
    },

    methods: {

      // COMMENT METHODS
      createCommentSurvey: function() {
        this.commentSurvey = {}
        this.createComment = true    
      },

      addCommentToSurvey: function(item) { 
        try {
          if(item.title.length > 0 && item.name.length > 0) {
            console.log('adding', item)       
          }  
        } catch (error) {        
          this.showCompileError = true
          return
        }
        
        let comment = {
          "type": "comment",
          "name": item.name,
          "isRequired": item.isRequired || false,
          "title": item.title          
        }
        this.json.pages[0].elements.push(comment)
        model = new SurveyVue.Model(this.json);      
        this.survey = model
        this.createComment = false
        this.showCommentError = false
      },

      // RATING METHODS
      createRatingSurvey: function() {
        this.ratingSurvey = {
          "minRateDescription": "Not Satisfied",
          "maxRateDescription" : "Completely satisfied"
        },
        this.createRating = true    
      },

      addRatingToSurvey: function(item) {  
        try {
          if(item.title.length > 0 && item.name.length > 0 && item.name.minRateDescription > 0 && item.name.maxRateDescription > 0) {
            console.log('adding', item)       
          }  
        } catch (error) {        
          this.showCompileError = true
          return
        }

        let rating = {
          "type": "rating",
          "name": item.name,
          "isRequired": item.isRequired || false,
          "title": item.title,
          "minRateDescription": item.minRateDescription,
          "maxRateDescription": item.maxRateDescription          
        }
        this.json.pages[0].elements.push(rating)
        model = new SurveyVue.Model(this.json);
        this.survey = model
        this.createRating = false
      },

      // RANKING METHODS
      createRankingSurvey: function() {
        this.rankingSurvey = {}
        this.createRanking = true
        this.choices = []
      },

      addRankingToSurvey: function(item) { 
        
        try {
          if(item.title.length > 0 && item.name.length > 0 && this.choices.length > 1) {
            console.log('adding', item)       
          }  
        } catch (error) {        
          this.showCompileError = true
          return
        }

        let ranking = {
          "type": "ranking",
          "name": item.name,
          "isRequired": item.isRequired || false,
          "title": item.title,
          "choices": this.choices          
        }
        this.json.pages[0].elements.push(ranking)

        model = new SurveyVue.Model(this.json);
        this.survey = model
        this.createRanking = false
      },

      isValidChipOption: function(filter) { 
        if(filter.length == 0) {
          return false 
        } else {
          return filter
        }
      },

      // PAGE METHODS
      postSurvey: function() {
        if(this.json.pages[0].elements.length === 0) {
          return // survey vuoto
        } 
        delete this.json.showNavigationButtons;
        console.log(this.json)
        // TODO: post survey in the backend      
      },

      resetSurvey: function() {
        this.json = {
          "questionTitleLocation": "top",
          "showQuestionNumbers": "off",        
          "showNavigationButtons": false,
          "pages": [
            {
              "name": "page1",
              "elements": []
            }
          ]
        }
        model = new SurveyVue.Model(this.json);
        this.survey = model
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
  .md-checkbox {
    display: flex;
  }
  .md-dialog {
    width: 90%;
  }
</style>