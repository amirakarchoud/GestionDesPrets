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
        <!--Bouton pour redireger le gestionnaire à la page principale de tous les prêts non retounées -->
        <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-notes"></i> <router-link to="/admin/pretNonRetourne">Prêts Non Retournés</router-link></button></div>
        <!--Bouton pour redireger le gestionnaire à la page principale de tous les prêts Assignés -->
        <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-notes"></i> <router-link to ="/admin/pretAssigne">Prêts Assignés</router-link> </button></div>
        <!--Bouton pour redireger le gestionnaire à la page principale de tous les prêts Retournés-->
        <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-notes"></i> <router-link to="/admin/pretRetourne">Prêts Retournés</router-link></button></div></div>
         
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
                <h4 class="card-title">Les Prêts</h4>
                <p class="card-category"></p>
              </template>
              <lo-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="result"
                       :prets="prets">
                       
              </lo-table>
            </card>
  
          </div>
        </div>
      </div>
  </div>
  </template>

<script>
import LoTable from 'src/components/TablePret.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['Id', 'Prêtteur', 'Demandeur', 'Gestionnaire', 'Etat']
const tableData = []

export default {
  components: {
    LoTable,
    Card
  },
  //Déclarations de variables nécessaires
  data () {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      result:[],
      prets:[],
  responseAvailable: false
    }
  },


methods: {
  // Méthode pour récupérer tous les pre^ts
  afficherPret () { 
    this.responseAvailable = false;
  //Appel à l'API de récupérations de tous les prêts (loan)
    fetch("http://localhost:3000/loan", {
  "method": "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(async response => {
  //conversion de resultat en JSON
    const data = await response.json();

    // Test response
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.responseAvailable=true;

    console.log(data);
    let i = 0;
    while (i < data.length) {
    //if (data[i].signature.proof != null)

    //On test sur le status de loan récupéré, s'il est différent de Request alors c'est un prêt et on l'ajout par la suite à la table des pre^ts par la méthode push 
    // Sinon on l'ignore car il s'agit d'une demande 
    if(data[i].status != "Request" )
    {
      this.prets.push(data[i]);
    }
      i++;
    }
    
    this.result = data;
  })
  .catch(error => {
    this.errorMessage = error;
    console.error("There was an error!", error);
  });
  },
},
//Appel à la fonction 
beforeMount(){
 this.afficherPret();
}
}

</script>

<style>
</style>
