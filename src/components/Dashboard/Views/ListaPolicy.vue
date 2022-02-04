<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary ">Policy list</h4>


            
              <!-- Tabella templates -->
              <div class="justify-content-center mt-5">
                <b-table id="tableOne" responsive ref="tableOne" bordered hover :items="tableOne.data" :fields="tableOne.fields" v-if="tableOne.data.length>0" >
                  <template slot="json" slot-scope="cell">
                    <a href="" @click.prevent="showDetails(cell.item, cell.index)" class="link text-primary"><i class="fa fa-2x fa-play" aria-hidden="true"></i></a>
                    
                  
                  </template>
                </b-table>
              </div>

            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
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
      label: 'See surveys'
    }
  ];
  export default {

    components: {
      Card
    },

    data() {
      return {
        tableOne: {
          fields: [...tableOneColumns],
          data: []
        },
        templateList: [],
        filters: [],
        rowPerPage: 10,
        page: 0,
        creator: localStorage.getItem('username'),

        selected: this.$store.state.auth.owner,
        options: [],
        templatesNotFoundMessage: false
      }
    },
    created: function() {
      this.getPolicyList()
    },

    methods: {
      getPolicyList: function() {
        
        
      },

      showDetails(item, index) {
        //console.log(item, index)
        localStorage.setItem('selectedSurvey', JSON.stringify(item))
        this.$router.push("/compileSurvey/" + item.id);
      },

    }
  }

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
