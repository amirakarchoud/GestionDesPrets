<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->


      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Vos Prêts</h4>
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
import LoTable from 'src/components/TablePretMembre.vue'
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
    //Decommenter cette ligne qd vous fait la laison entre le ms Auth et ms loan
    //this.username = localStorage.getItem('Username');
    // et commenter / supprimer celui-ci
    this.username = 'lipn requester';
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
  if(data[i].status != "Request"  && data[i].requester == this.username)
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
