<!-- 
Ce fichier représente le composant Vue pour afficher les objets pour les membres.
La difference est qu'il n'y a pas des boutons d'ajout , modification et suppression.
Il utilise les composants LoTable et Card pour afficher les données récupérées via l'API REST.
Le tableau des colonnes et des données contient les valeurs récupérées depuis l'API REST dans la méthode "afficherOb".
La méthode "getGroupes" récupère les données pour la liste deroulante des groupes via l'API REST.
La méthode "beforeMount" est appelée avant que le composant ne soit monté et elle appelle les méthodes "getGroupes" et "afficherOb" pour récupérer les données et les préparer à être affichées. 
-->
<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->
     <!---------------->

 <!-- Tableau des objets -->
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Les Objets</h4>
              <p class="card-category"></p>
            </template>
            <!-- appel du composant lo-table qui est le tableau des objets parametré des colonnes et les donnees des objets a afficher, ainsi que les groupes pour la recherche -->
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
//importation du composant du tableau d'objet
  import LoTable from 'src/components/TableObjetMembre.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Id', 'Label', 'Etat', 'Type']
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
          data: [...tableData]
        },
        // Données récupérées depuis l'API du GET groupe
        result:[],
        // Flag pour indiquer si une réponse est disponible ou pas
    responseAvailable: false,
    //Les Groupes de types pour la liste déroulante de filtre pour la recherche
    groups:[]
      }
    },

//definition des methodes
methods: {
  //methode GET pour reccuperer les objets de la base
    afficherOb () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/object", {
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

//methode GET pour reccuperer les groupes de la base de donnees 
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
        // Récupération du message d'erreur depuis le corps de la réponse ou le texte par défaut
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      //remplir la liste des groupes pour le filtre
      //format text,value 
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


//appel des methodes pour reecuperer les groupes et la liste des objets a afficher avant que le composant AfficherObjet soit monté
beforeMount(){
  this.getGroupes();
   this.afficherOb();
 },



  }





 


</script>

<style>
</style>
