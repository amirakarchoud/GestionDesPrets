 <!-- Ce fichier représente la fiche de demande affichées suite au choix d'une demande particulière -->

 <template>

    <table class="table"> 

      <!-- Parcour de données sauvgarder dans la  table data-->
      <tbody  >
        <!-- Création de chaque champ avec sa valeur dans une une même ligne, Pour afficher les détails d'une demnade sous forme d'une Fiche et non pas un table à un seul ligne -->
       
          <tr><td> <b> Prêtteur </b> </td><td >{{data.borrower}}</td></tr>
          <tr><td> <b> Demandeur </b> </td><td >{{data.requester}}</td></tr>
          <tr><td> <b> Gestionnaire </b> </td><td >{{data.manager}}</td></tr>
          <tr>
            <td ><span v-if="data.comments == 'No comment'"> Aucun commentaire</span>
            <span v-else>{{data.comments}}</span></td>
          </tr>
          
          

        <tr>
          <td><b> Signature </b> </td>
          <td>
            <!-- Affichage de détails de signature -->
            <tr> <td><b>Electronique : </b>
              <span v-if="data.signature.electronic_signature" class="checkbox checked"></span>
              <span v-else class="checkbox"></span>
            
          </td>
        </tr> 
            <tr> <td><b>Preuve : </b>{{ data.signature.proof}}</td></tr> 
          </td>
        </tr>

        <tr>
          <td> <b>Actions</b> </td>
          <td>
             <!-- Définitions de l'ensemble des boutons (Action) possible sur cette pret-->
            <button @click="downloadPret()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button> <!-- Bouton de téléchargement de prêt -->
            </td>
        </tr>
      </tbody>
    </table>


  </template>
  <script>
    export default {
      name: 'lop-table',
      props: {
        columns: Array,
        data: Object
      },
      data() {
    return {
      selectedType: '', // new property for selected type filter
      selectedGroup: '', // new property for selected group filter
      selectedLabel: '',
      searchTextFocus: false,
      selectedTypeFocus: false,
      groups:[],
      loanObjects:[],
      objects:[]
    };
  },
     
      methods: {
        

        // Méthode pour retourner la valeur d'un élément récupéré
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        // Méthode exécuté suite au clic sur le bouton de télechargement, qui utilise l'id de prêt sélcionné pour fait appel à l'API de téléchargement
        downloadPret () { 
              
              const id = this.$route.params.id;
              //console.log("ID: ", id);
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
                link.download = 'Pret.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
              .catch(error => console.error(error));

       }
       

      }
    }
   
  </script>
<style>
.checkbox {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #bbb;
  border-radius: 3px;
  margin: 0 4px;
  vertical-align: middle;
}

.checked::before {
  content: "\2713";
  font-size: 14px;
  line-height: 16px;
  color: #00b300;
}

.search-select-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-box {
  display: flex;
  align-items: center;
  margin-right: 10px;
 
  padding: 5px;
}
.search-box input[type="text"] {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  padding-right: 30px;
  border: none;
  border-radius: 20px; /* added border-radius */
  background-color: #f9f9f9;
  transition: border-radius 0.1s ease-out;
}
.search-box input[type="text"]:focus {
  outline: none;
  border: 2px solid #68d7ed;
  transition: border-color 0.3s ease-out;
}

.search-box i {
  color: #ccc;
  margin-left: 5px;
}


.search-box button:hover {
  background-color: #ddd;
}

.select-box select {
  width: 200px;
  padding: 8px 16px;
  border: solid;
  border-radius: 20px; /* added border-radius */
  font-size: 16px;
  border-color:lightgrey;
  background-color: #fff;
  transition: background-color 0.3s;

}

.select-box select:focus {
  background-color: #fff;
  outline: none;
  border: 2px solid #68d7ed;
  transition: border-color 0.3s ease-out;
  
}
</style>
  

  