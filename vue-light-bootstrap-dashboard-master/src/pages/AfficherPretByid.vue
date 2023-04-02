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
      <!-- Exécution de la méthode goback() suite au clic sur le bouton de Retour -->
      <div class="col-md-3"><button  @click="goBack()" class="btn btn-default btn-block btn-info"><i class="nc-icon nc-stre-left"></i> Retour</button></div></div>
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
                <h4 class="card-title">Le Prêt</h4>
                <p class="card-category"></p>
              </template>
              <lo-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="result"
                       :dataobj="objects"
                       >
                       
              </lo-table>
            </card>
  
          </div>
        </div>
      </div>
  </div>
  </template>

<script>
import LoTable from 'src/components/FichePret.vue'
const tableData = []

export default {
  components: {
    LoTable
  },
  // Déclaration de l'ensemble des variables nécessaires
  data () {
    return {
      table1: {
        
        data: [...tableData],
        dataobj: [...tableData]
      },
      
      result:[],
      objects: [],
      responseAvailable: false,
   
    }
  },
 


methods: {
  //Méthode pour le reour à la page précedente
  goBack() {
      window.history.go(-1);
    },
  //Méthode pour récupérer un prêt spécifique selon son identifiant unique
  afficherPretById () { 
    
    const id = this.$route.params.id;
    this.responseAvailable = false;
  //Appel à l'API de loan/id en lui fournissant l'identifiant récupérer dans l'URL
    fetch(`http://localhost:3000/loan/${id}`, {
  "method": "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(async response => {
    // conversion de réponse récupéré en JSON et le mettre sous format de tableau 
    const data = [await response.json()];
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.responseAvailable=true;
    // récupération des objets de ce demande (loan) dans un tableau
    this.tableObject=data[0].objects
    this.result = data;
    console.log(this.result);
    /**  Sur chaque objet on va faire l'appel de l'API  object/id pour récupérer tous les informations 
     * relatives à cet objet pour avoir afficher ce dernier par son nom au lieu de son id 
    */
     
          let i = 0; 
          const promises = [];
          while (i < this.tableObject.length) {
            console.log(this.tableObject[i]);
            const idObj = this.tableObject[i];
            //  Appel à l'API d'un objet selon son id 
            const promise = fetch(`http://localhost:3000/object/${idObj}`, {
              "method": "GET",
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(async response => {
              // conversion de réponse récupéré en JSON et le mettre sous format de tableau 
              const dataobj = [await response.json()];
              if (!response.ok) {
                const error = (dataobj && dataobj.message) || response.statusText;
                return Promise.reject(error);
              }
              this.objects.push(dataobj); 
            })
            .catch(error => {
              console.error("There was an error fetching objects.", error);
            });

            promises.push(promise);
            i++;
          }

Promise.all(promises).then(() => {
  console.log("DataObj", this.objects); 
});

  //YOUFA HOUNI
  })
  .catch(error => {
    this.errorMessage = error;
    console.error("There was an error!", error);
  });
  },
},

beforeMount(){
 this.afficherPretById();
},
}

</script>

<style>
</style>
