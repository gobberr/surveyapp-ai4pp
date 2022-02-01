<template>
  <div id="uploadFileDiv">
    <div class="container">

      <!-- UPLOADING -->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropboxx">
          <input type="file" id="file" ref="file" :disabled="isSaving" v-on:change="handleFileUpload()" accept=".json" class="input-file">
          <p v-if="isInitial">
            <i class="fa fa-file-text"></i>
            Trascina il tuo file qui o clicca per selezionarlo
          </p>
          <p v-if="isSaving">
            Caricamento file...
          </p>
        </div>
      </form>

      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h4>File caricato correttamente: <i class="nc-icon nc-app"> {{file.name}}</i></h4>
        <p v-if="spinnerStatus" class="text-primary">Salvataggio..<spinner :status="spinnerStatus" :rotation=true :depth=9 :size=70 color='#007bff'></spinner></p>
        <hr>
        <p>
          <a href="javascript:void(0)" @click="reset()" class="float-left">Carica ancora</a>
          <button v-on:click="submitFile()" class="btn btn-info btn-fill float-right">Salva</button>
        </p>
      </div>

      <!--FAILED-->
      <div v-if="isFailed">
        <h4>Caricamento fallito</h4>
        <b-alert :show="responseMsg!=''" variant="danger">
          {{responseMsg}}
        </b-alert>
        <p>
          <a href="javascript:void(0)" @click="reset()">Prova ancora</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>

      <!--TEMPLATE SUBMITTED-->
      <div v-if="isSubmitted">
        <h4><i class="nc-icon nc-app"> {{file.name}}</i></h4>
        <b-alert :show="responseMsg!=''" variant="primary">
          Success
        </b-alert>
        <hr>
        <a href="javascript:void(0)" @click="reset()" class="float-left">Carica ancora</a>
      </div>
      <div v-if="isSubmitFailed">
        <h4>Il template non può essere salvato</h4>
        <b-alert :show="responseMsg!=''" variant="danger">
          {{responseMsg}}
        </b-alert>
        <hr>
        <p>
          <a href="javascript:void(0)" @click="reset()">Prova ancora</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Spinner from 'vue-spinner-component/src/Spinner.vue'

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3, STATUS_SUBMITTED = 4, STATUS_SUBMIT_FAILED = 5;

  export default {
    data() {
      return {
        file: '',
        uploadError: null,
        currentStatus: null,
        responseMsg: '',
        spinnerStatus: false,
        cid: localStorage.getItem('username'),
        owner: this.$store.state.auth.owner,
      }
    },
    components: {
      Spinner
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
      isSubmitted() {
        return this.currentStatus === STATUS_SUBMITTED;
      },
      isSubmitFailed() {
        return this.currentStatus === STATUS_SUBMIT_FAILED;
      }
    },
    methods: {

      submitFile() {
        let jsonTemplate = '';
        var app = this;
        app.spinnerStatus = true;
        app.responseMsg = '';

        const reader = new FileReader();
        reader.readAsText(app.file);
        reader.onload = () => {
          //console.log(JSON.parse(reader.result))
          jsonTemplate = JSON.parse(reader.result);
          if(jsonTemplate.cid != this.cid) {
            app.spinnerStatus = false;
            app.currentStatus = STATUS_SUBMIT_FAILED;
            app.responseMsg = 'Risposta del server: Cannot post a template with CID=' + jsonTemplate.cid + '. Expected CID=' + this.cid;
            return
          }
          if(jsonTemplate.owner != this.owner) {
            app.spinnerStatus = false;
            app.currentStatus = STATUS_SUBMIT_FAILED;
            app.responseMsg = 'Risposta del server: Cannot post a template with Owner=' + jsonTemplate.owner + '. Expected Owner=' + this.owner;
            return
          }
          //console.log(jsonTemplate)
          axios.post(window.env.VUE_APP_GENERATOR_ENDPOINT + '/' + this.owner + '/templates', jsonTemplate, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
          .then(function (response) {
            app.currentStatus = STATUS_SUBMITTED;
            let responseMessage = response.data;
            app.responseMsg = responseMessage;
            app.spinnerStatus = false;
          }).catch(function (error) {
            app.spinnerStatus = false;
            app.currentStatus = STATUS_SUBMIT_FAILED;
            error.response ? app.responseMsg = error.response.data : app.responseMsg = 'Connessione fallita';
          });
        };
      },
      handleFileUpload() {
        this.currentStatus = STATUS_SAVING;
        this.file = this.$refs.file.files[0];
        if (this.file.type == "") {
          let extension = this.file.name.split('.').pop();
          if (extension == "json") {
            this.currentStatus = STATUS_SUCCESS;
          } else {
            this.currentStatus = STATUS_FAILED;
            this.responseMsg = "Invalid file type. Please upload a json file.";
            this.file = null;
          }
        } else if (this.file.type != "application/json") {
          this.currentStatus = STATUS_FAILED;
          this.responseMsg = "Invalid file type. Please upload a json file.";
          this.file = null;
        } else {
          this.currentStatus = STATUS_SUCCESS;
        }
      },
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadError = null;
        this.form = null;
        this.responseMsg = '';
      }
    },
    mounted() {
      this.reset();
    }
  }
</script>

<style lang="scss">
  .dropboxx {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: azure;
    color: dimgray;
    padding: 5px 5px;
    min-height: 100px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 50%;
    height: 100px;
    position: absolute;
    cursor: pointer;
    top: 7px;
    bottom: 7px;
    left: 7px;
    right: 7px;
  }

  .dropboxx:hover {
    background: lightcyan; /* when mouse over to the drop zone, change color */
  }

  .dropboxx p {
    font-size: 1.2em;
    text-align: center;
    padding: 25px 0;
  }
  .btn-info.btn-fill {
    color: #FFFFFF;
    background-color: #00689d;
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .md-theme-default a:not(.md-button) {
    color: #00689d;
    color: var(--md-theme-default-primary-on-background, #00689d);
  }

</style>
