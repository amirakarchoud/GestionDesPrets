<!-- 
Ce fichier représente le composant Vue pour afficher les types. Il utilise les composants LoTable et Card pour afficher les données récupérées via l'API REST.
Le tableau des colonnes et des données contient les valeurs récupérées depuis l'API REST dans la méthode "afficherTy".
La méthode "getGroupes" récupère les données pour la liste déroulante des groupes via l'API REST GET du groupe.
La méthode "beforeMount" est appelée avant que le composant ne soit monté et elle appelle les méthodes "getGroupes" et "afficherTy" pour récupérer les données et les préparer à être affichées. 
-->
<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->
      
<div class="card"><!----><!---->
<div class="card-body">



<!-- Bouton d'ajout de type -->
<div class="places-buttons">
<div class="row justify-content-center">
<div class="col-12 ">
<h5>
              <p class="category"></p></h5>
      </div></div><div class="row justify-content-center">
      <div class="col-md-3 col-md-offset-1"><router-link to="/admin/ajouterType"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-simple-add"></i>  Ajouter un Type</button></router-link></div>

      
      
      
     
      </div>
      </div>
      </div><!----></div>
       <!---------------->
<!-- Affichage des types -->

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Les Types</h4>
              <p class="card-category"></p>
            </template>
             <!-- appel du composant lo-table qui est le tableau des types parametré des colonnes et les donnees des objets a afficher, ainsi que les groupes pour la recherche -->
            <lo-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="result"
                     :groups="groups">
                     
            </lo-table>
          </card>

        </div>

       

      </div>

     
     



      
    </div>
  </div>
</template>
<script>
//importation du composant du tableau de type
  import LoTable from 'src/components/TableType.vue'
  import Card from 'src/components/Cards/Card.vue'
  // Définition des colonnes du tableau d'affichage des types
  const tableColumns = ['Id', 'Label', 'Groupe']
  
  export default {
    components: {
      LoTable,
      Card
    },
    data () {
      return {
        // Configuration/initialisation du tableau
        table1: {
          columns: [...tableColumns],
          data: []
        },
        // Données récupérées depuis l'API du GET Type
        result:[],
        // Flag pour indiquer si une réponse est disponible ou pas
    responseAvailable: false,
    //Les Groupes de types pour la liste déroulante de filtre pour la recherche
    groups:[]
      }
    },

// Méthodes pour récupérer les données depuis l'API
methods: {
    // Récupère la liste des types via l'API
    afficherTy () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/objectType", {
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
      this.result = data;
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },
    // Récupère la liste des groupes via l'API pour la liste deroulante de la recherche

    getGroupes () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/objectGroup", {
    "method": "GET",
    headers: {
      "Content-Type": "application/json"
    }
})
.then(async response => {
      const data = await response.json();

      // Vérification des erreurs
      if (!response.ok) {
        //  Récupération du message d'erreur depuis le corps de la réponse ou le texte par défaut
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
       // Affichage des données
      this.responseAvailable=true;
      this.groups= data.map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });
          console.log("g");
          console.log(this.groups);

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    }
},


//appel des methodes pour recuperer les groupes et la liste des types a afficher avant que le composant AfficherType soit monté
beforeMount(){
  this.getGroupes();
   this.afficherTy();
 },



  }





 


</script>

<style>
</style>
