<template>
    <div class="content">
      <div class="container-fluid">
        <!---------------->
         <div class="col-12 ">
  <div class="card"><!----><!---->
  <div class="card-body">




  <div class="places-buttons">
  <div class="row justify-content-center">
  <div class="col-12 ">
  <h5>
                <p class="category"></p></h5>
        </div></div>

        <div class="row justify-content-center">

    <div class="col-md-3 col-md-offset-1"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-simple-add"></i> <router-link to="/membre/demandeAdd">Ajouter une Demande</router-link>  </button></div>

    </div>

        </div>
        </div>
        </div><!----></div>
         <!---------------->


        <div class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover"
                  body-classes="table-full-width table-responsive"
            >
              <template slot="header">
                <h4 class="card-title">Les Demandes</h4>
                <p class="card-category"></p>
              </template>
              <lo-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="result"
                       :demandes="demandes">

              </lo-table>
            </card>

          </div>
        </div>
      </div>
  </div>
  </template>

<script>
import localStorage from 'localStorage';
import LoTable from 'src/components/TableDemandeMember.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['Id', 'Prêtteur', 'Demandeur', 'Gestionnaire', 'Etat']
const tableData = []

export default {
  components: {
    LoTable,
    Card
  },
  data () {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],

      },
      username:'',
      result:[],
      demandes:[],
  responseAvailable: false
    }
  },


methods: {
  test () {
    console.log(this.result);
  },
  afficherDemande () {
    //Decommenter cette ligne qd vous fait la laison entre le ms Auth et ms loan
    //this.username = localStorage.getItem('requester');
    // et commenter / supprimer celui-ci
    this.username = 'lipn requester';
    this.responseAvailable = false;

    fetch("http://localhost:3000/loan", {
  "method": "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(async response => {
    const data = await response.json();

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.responseAvailable=true;

    console.log(data);
    let i = 0;
    while (i < data.length) {
    console.log("DEMANDEUR",data[i].requester);
    console.log("DEMANDEUR4",this.username);
    console.log("SIGNATURE",data[i].signature);

    if (data[i].signature.proof == null && data[i].requester == this.username)
    //if (data[i].signature.proof == null)

    {
      console.log("SIGNATURE PROOF",data[i].signature.proof);
      this.demandes.push(data[i]);
    }
      i++;
    }

    console.log("DEMANDE", this.demandes);
    console.log("DATA1111", data[0].borrower);
    console.log("DATA2222", this.demandes[0].borrower);

    this.result = data;
  })
  .catch(error => {
    this.errorMessage = error;
    console.error("There was an error!", error);
  });
  },
},

beforeMount(){
 this.afficherDemande();
}
}

</script>

<style>
</style>
