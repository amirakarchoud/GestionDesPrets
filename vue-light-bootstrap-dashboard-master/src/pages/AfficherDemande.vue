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
      
    </div>
         
        </div>
        </div>
        </div><!----></div>
        
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
import LoTable from 'src/components/TableDemande.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['Id', 'Prêtteur', 'Demandeur', 'Gestionnaire', 'Etat']
const tableData = []

export default {
  components: {
    LoTable,
    Card
  },

  // Déclaration de l'ensemble des variables nécessaires 
  data () {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
        
      },
      result:[], 
      demandes:[],
  responseAvailable: false
    }
  },


methods: {

  // cette méthode permet de récupérer la liste de tous les demandes pour le gestionnaire 
  afficherDemande () { 
    this.responseAvailable = false;
// Appel à l'API de tous les prets 
    fetch("http://localhost:3000/loan", {
  "method": "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(async response => {
    const data = await response.json();

    // Test sur la response
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.responseAvailable=true;

    //console.log(data);
    let i = 0;
    while (i < data.length) {
    //console.log("SIGNATURE",data[i].signature);
    //if (data[i].signature.proof == null )

    // pour distinguer les demandes et prêts 
    //test sur le champ status récupérer lors de récupération de tous les prêts s'il est égale à Request alors c'est une demande 
    // et donc on va ajouter ce "loan" à la liste de demandes avec la méthode push
    if(data[i].status == "Request" )
    {
      //console.log("SIGNATURE PROOF",data[i].signature.proof);
      this.demandes.push(data[i]);
    }
      i++;
    }

   // console.log("DATAPRET", this.demandes);
    //console.log("DATA1111", data[0].borrower);
    //console.log("DATA2222", this.demandes[0].borrower);
    
    this.result = data;
  })
  .catch(error => {
    this.errorMessage = error;
    console.error("OOps il y a un problème !", error);
  });
  },
},


// Appel à la fonction 
beforeMount(){
 this.afficherDemande();
},

}

</script>

<style>
</style>
