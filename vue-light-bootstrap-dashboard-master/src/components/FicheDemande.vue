<template>
    <table class="table"> 
      <!-- Parcour de données sauvgarder dans la  table data-->
      <tbody v-for="(item, index) in data" :key="index">
       <!-- Création de chaque champ avec sa valeur dans une une même ligne, Pour afficher les détails d'une demnade sous forme d'une Fiche et non pas un table à un seul ligne -->  
          <tr><td><b> ID </b></td><td>{{ index +1 }}</td> </tr>
          <tr><td> <b> Prêtteur </b> </td><td >{{itemValue(item, "borrower")}}</td></tr>
          <tr><td> <b> Demandeur </b> </td><td >{{itemValue(item, "requester")}}</td></tr>
          <tr><td> <b> Gestionnaire </b> </td><td >{{itemValue(item, "manager")}}</td></tr>
          <tr><td> <b> Etat </b> </td><td >{{itemValue(item, "status")}}</td></tr>
          <tr><td> <b> Commentaires </b> </td><td >{{itemValue(item, "comments")}}</td></tr>
          
          <tr>
            <td> 
              <b> Objets </b> 
            </td>
            <td>
            <tr>
            <!-- Parcour de données sauvgarder dans la  table dataobj qui définit tous les détails de chaque objet récupérer dans l'ensemble des objets de la demande  -->
            <tbody v-for="(obj, index3) in dataobj" :key="index3">
                <td>
                <b>Objet {{ index3 +1 }} :</b> {{ obj[0].label }}
                </td>
            </tbody>
            </tr>
          </td>
        </tr>
        <tr>
          <td> <b>Actions</b> </td>
          <td>
            <!-- Définitions de l'ensemble des boutons (Action) possible sur cette demande-->
            <button class="btn btn-info"><i class="fa fa-pencil" ></i></i></button> <!-- Bouton de modification-->
          <button class="btn btn-info"><i class="fa fa-trash-o"></i></button> <!-- Bouton de suppresion-->
          <button @click="downloadDemande()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button> <!-- Bouton de téléchargement de demande -->
          <router-link to="/membre/validerdemande">
            <button class="btn btn-info"><i class="nc-icon nc-check-2"></i></button> <!-- Bouton de formulaire de validation de demande-->
          </router-link>
          <button class="btn btn-info"> Objet Reçu </button> <!-- Bouton de déclaration d'objet comme réçu par le demandeur-->
          </td>
        </tr>
      </tbody>
    </table>

  </template>
  <script>
    export default {
      name: 'lo-table',
      props: {
        columns: Array,
        data: Array,
        dataobj :Array
      },
      methods: {
        // Méthode pour retourner la valeur d'un élément récupéré
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        // Méthode exécuté suite au clic sur le bouton de télechargement, qui utilise l'id de demande sélcionné pour fait appel à l'API de téléchargement
        
        downloadDemande () { 
              
              const id = this.$route.params.id;
              console.log("ID: ", id);
              this.responseAvailable = false;
              fetch(`http://localhost:3000/loan/${id}/download`, {
                "method": "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(response => response.blob())
              .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Demande.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
              .catch(error => console.error(error));

       },
        

      }
    }
  </script>
  <style>
  
  </style>
  