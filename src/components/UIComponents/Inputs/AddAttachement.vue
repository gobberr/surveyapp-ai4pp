<template>
 <md-dialog :md-active.sync="showDialog" @md-clicked-outside="showDialog = false; $emit('close');">
        <md-dialog-title>Allega documento</md-dialog-title>
  <div id="uploadFileDiv">
    <div class="container">

      <!-- UPLOADING -->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropboxx">
          <input type="file" id="file" ref="file" :disabled="isSaving" v-on:change="handleFileUpload()" accept=".pdf" class="input-file">
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
        <p v-if="spinnerStatus" class="text-primary">Salvataggio..<spinner style="margin: auto;" :status="spinnerStatus" :rotation=true :depth=9 :size=70 color='#007bff'></spinner></p>
        <hr>
        <p>
          <a href="javascript:void(0)" @click="reset()" class="float-left">Carica ancora</a>
          <button v-on:click="submitFile()" class="btn btn-info btn-fill float-right mb-2">Salva</button>
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
        <h4>L'allegato non può essere salvato</h4>
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
 </md-dialog>
</template>

<script>
  import axios from 'axios'
  import Spinner from 'vue-spinner-component/src/Spinner.vue'

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3, STATUS_SUBMITTED = 4, STATUS_SUBMIT_FAILED = 5;

  export default {
    props: {
      showDialog: {
        type: Boolean,
        required: true
      },
      blockchainId: {
        type: String,
        required: true
      },
      contractId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        file: '',
        filename: '',
        uploadError: null,
        currentStatus: null,
        responseMsg: '',
        spinnerStatus: false,
        cid: this.$store.state.auth.owner,
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
        this.spinnerStatus = true;
        this.responseMsg = '';


        let formDataFile = new FormData();
        formDataFile.append('file', this.file);
        formDataFile.append('type', this.file.type);


        var http = axios.create({
          baseURL: window.env.VUE_APP_SBM_ENDPOINT,
        });
        http.post('/smartcontract/' + this.contractId + '/attachment?owner=' + this.owner + '&blockchainId=' + this.blockchainId + '&filename=' + this.filename, formDataFile, { 
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 
            'Content-Type': "multipart/form-data" 
          } 
        })
        .then(response => {


          this.$emit('added');

        }).catch(error => {

          if(error.response && error.response.status == 400){
            this.currentStatus = STATUS_SUBMIT_FAILED;
            this.responseMsg = "L'allegato é giá stato salvato in precdenza.";
          }
        });

      },
      handleFileUpload() {
        this.currentStatus = STATUS_SAVING;
        this.file = this.$refs.file.files[0];

        if (this.file.type == "") {
          let extension = this.file.name.split('.').pop();
          if (extension == "pdf") {
            this.currentStatus = STATUS_SUCCESS;
            this.filename = this.file.name
          } else {
            this.currentStatus = STATUS_FAILED;
            this.responseMsg = "Tipo di file non valido. Caricare un file pdf, per favore.";
            this.file = null;
          }
        } else if (this.file.type != "application/pdf") {
          this.currentStatus = STATUS_FAILED;
          this.responseMsg = "Tipo di file non valido. Caricare un file pdf, per favore";
          this.file = null;
        } else {
          this.currentStatus = STATUS_SUCCESS;
          this.filename = this.file.name
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

</style>
