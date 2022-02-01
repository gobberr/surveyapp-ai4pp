<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title text-primary">Profilo utente</h4>
            </template>
            <!-- LIST INFORMATIONS -->
            <div class="info-profile">
              <div class="field" v-if="user.profile && user.profile.username">
                <span class="info">Username</span>
                <span class="value">{{ formatPartner(user.profile.username) }}</span>
              </div>
              <div class="field" v-if="user.profile && user.profile.email">
                <span class="info">Email</span>
                <span class="value">{{user.profile.email}}</span>
              </div>
              <div class="field" v-if="user.profile && user.profile.companyName">
                <span class="info">Azienda</span>                
                <input type="text" class="value" v-model="azienda" placeholder="Azienda">
              </div>             
              <div class="field" v-if="user.profile && user.profile.vat">
                <span class="info">Partita IVA </span>
                <input type="text" class="value" v-model="partitaIVA" placeholder="Partita IVA">                
              </div>
              <div class="field" v-if="user.profile && user.profile.fiscalCode">
                <span class="info">Codice fiscale</span>
                <span class="value">{{user.profile.fiscalCode}}</span>
              </div>             
              <div class="field" v-if="user.profile && user.profile.iban">
                <span class="info">IBAN </span>                
                <input type="text" class="value" v-model="iban" placeholder="IBAN">
              </div>
              <div class="field" v-if="user.profile && user.profile.walletAddress">
                <span class="info">Identificativo wallet</span>
                <span class="value">{{user.profile.walletAddress}}</span>
              </div>
            </div>
          </card>
          <div class="d-flex flex-row-reverse">            
            <button :disabled="loadingButton" v-on:click="saveUser" v-if="userIsNotAdmin" class="btn btn-fill btn-primary btn-icon float-right"><i class="fa fa-floppy-o"></i> Salva</button>
          </div>                    
          <!--<pre>{{JSON.stringify(user, null,2)}}</pre>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'
  import { parseJwt } from "./../../../utils/jwt.js";
import {AUTH_UPDATE_PROFILE } from 'src/store/actions/auth'
  export default {
    components: {
      Card
    },
    data() {
      return {
        user: this.$store.state.auth,
        azienda: '',
        partitaIVA: '',
        iban: '',
        loadingButton: false,
        tokenParsed: undefined,
        userIsNotAdmin: this.$store.state.auth.role[0] !== 'admin'        
      }
    },
    beforeMount() {
      this.tokenParsed = parseJwt(localStorage.getItem('access_token'));
    },
    created: function() {
      this.azienda = this.user.profile.companyName; 
      this.partitaIVA = this.user.profile.vat;
      this.iban = this.user.profile.iban
    },
    mounted: function() {
      this.azienda = this.user.profile.companyName; 
      this.partitaIVA = this.user.profile.vat;
      this.iban = this.user.profile.iban
    },
    methods: {
      formatPartner: function(partnerName) {        
        if(partnerName === 'hera') {
          return 'Hera'
        } else if(partnerName === 'heracomm') {
          return 'Hera Comm'
        } else if(partnerName === 'camst') {
          return 'Camst'
        } else if(partnerName === 'conad') {
          return 'Conad'
        } else if(partnerName === 'Tutti i partner') {
          return 'Tutti i partner'
        } else if(partnerName === 'ecc') {
          return 'ECC'
        }
      },
      saveUser: async function() {          
          const body = {
              attributes: {
                walletAddress: [this.user.profile.walletAddress],
                walletUser: [localStorage.getItem('walletUser')],
                iban: [this.iban],
                vat: [this.partitaIVA],
                companyName: [this.azienda],
                firstName: [localStorage.getItem('firstName')],
                lastName: [localStorage.getItem('lastName')],
                partner: [localStorage.getItem('partner')],
                fiscalCode: [localStorage.getItem('fiscalCode')],
                email: [localStorage.getItem('email')],
                dcashPassword: [localStorage.getItem('dcashPassword')]
              }
            }            
           try {
             var http = axios.create({baseURL: window.env.VUE_APP_SBM_ENDPOINT});
             const result = await http.put('/' + window.env.VUE_APP_ADMIN_REALM + '/users/' + this.tokenParsed.sub, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } })
             console.log("RESULT", result);
             this.$notify({
                message: 'Salvataggio profilo avvenuta con successo',
                type: 'success',
                timeout: 10000,
                horizontalAlign: 'right',
                verticalAlign: 'bottom'
              })
              this.$store.dispatch(AUTH_UPDATE_PROFILE, { payload: { iban: this.iban, vat: this.partitaIVA, companyName: this.azienda } });
              
           } catch (error) {
             console.error("Errore nella chiamata PUT", error);
           }
      },
    }
  }
</script>
<style>
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
