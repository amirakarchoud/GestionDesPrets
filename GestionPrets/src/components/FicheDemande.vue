 <!-- Ce fichier représente la fiche de demande affichées suite au choix d'une demande particulière -->

 <template>
  <div>

  <table class="table"> 

    <!-- Parcour de données sauvgarder dans la  table data-->
    <tbody  >
      <!-- Création de chaque champ avec sa valeur dans une une même ligne, Pour afficher les détails d'une demnade sous forme d'une Fiche et non pas un table à un seul ligne -->
     
        <tr><td> <b> Prêtteur </b> </td><td >{{data.borrower}}</td></tr>
        <tr><td> <b> Demandeur </b> </td><td >{{data.requester}}</td></tr>
        <tr><td> <b> Gestionnaire </b> </td><td >{{data.manager}}</td></tr>
        <tr>
            <td> <b> Commentaires </b> </td>
            <td ><span v-if="data.comments == 'No comment'"> Aucun commentaire</span>
            <span v-else>{{data.comments}}</span></td>
        </tr>
        

      <tr>
          <td> <b>Actions</b> </td>
          <td>
 <router-link v-if="getParentRoute()==='membre'" :to="{ name: 'EditDemande', params: { id: data._id, data: data, objects: loanObjects  } }">
          <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
        </router-link>
        <router-link v-if="getParentRoute()==='admin'" :to="{ name: 'EditDemandeAdmin', params: { id: data._id, data: data, objects: loanObjects  } }">
          <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
        </router-link>

        <!--<button  v-if="getParentRoute()==='admin'" class="btn btn-info" v-b-modal.signature><i class="fa fa-pencil" ></i></button> -->

        <button class="btn btn-info" v-b-modal.delete><i class="fa fa-trash-o"></i></button>
        <button @click="downloadDemande()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button>
        <router-link v-if="getParentRoute()==='membre'" :to="{ name: 'ValiderDemande', params: { id: data._id, data: data, objects: loanObjects  } }">
          <button class="btn btn-info"><i class="nc-icon nc-check-2"></i></button>
        </router-link>
        <button v-b-modal.validate v-if="getParentRoute()==='admin'" class="btn btn-info">Choisir type de signature</button>
        <!-- <button v-b-modal.validate v-if="getParentRoute()==='admin'" class="btn btn-info"><i class="nc-icon nc-check-2"></i></button>-->
        <button v-b-modal.receivedLoan v-if="getParentRoute()==='admin'" class="btn btn-info"><i class="fa fa-check-circle"></i>Objet Reçu</button>
 </td>
        </tr>
    </tbody>
  </table>

 <div>
      <b-modal id="delete" title="Confirmation" @ok="deleteRequest()" ok-title-html= "Oui" cancel-title-html="Non" >
        <div class="d-block text-center">
          <h5>Êtes-vous sur de supprimer cette demande?</h5>
        </div>
      </b-modal>
    </div>

    <div>
      <b-modal id="validate" title="Confirmer le mode de signature" @ok="modifySignatureType()" ok-title-html= "Valider" cancel-title-html="Retour" >
        <div class="d-block text-center">
          <label for="group">Signature éléctronique </label>
          <br>
          <input type="checkbox" id="checkbox" v-model="signatureType" style="border:1px solid #d8e1e6;">
          <label for="checkbox" style="margin-left:10px;">{{ signatureType?"Oui":"Non" }}</label>
        </div>
      </b-modal>
    </div>

    <div>
      <b-modal id="receivedLoan" title="Confirmation" @ok="setLoanToReceived()" ok-title-html= "Confirmer la reception" cancel-title-html="Retour" >
        <div class="d-block text-center">
          <label for="group">Êtes-vous sur de confirmer la réception du prêt par le demandeur? </label>
        </div>
      </b-modal>
    </div>


  </div>


</template>
<script>
 import routes from "@/routes/routes";
    import moment from "moment/moment";
  export default {
    name: 'lop-table',
    props: {
      columns: Array,
      data: Object,
        dataobj :Array
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
    objects:[],
      signatureType: false,
          dateBorrow:'',
  };
},
   
    methods: {
       getParentRoute(){return this.$route.matched[0].name;},
        hasValue (item, column) {
          return item[column.toLowerCase()] !== 'undefined'
        },
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        // Méthode exécuté suite au clic sur le bouton de télechargement, qui utilise l'id de prêt sélcionné pour fait appel à l'API de téléchargement
        downloadDemande () { 
              
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
                link.download = 'Demande.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
              .catch(error => console.error(error));
  
       },
        async deleteRequest(){
          const id = this.$route.params.id;
          await fetch(`http://localhost:3000/loan/${id}`, { method: 'DELETE' });
          this.$router.go(-1);
          this.$toast.success("La demande du prêt a été supprimée avec succès!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        },
        async modifySignatureType(){
          //this.$router.go();
          const id = this.$route.params.id;
          const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data.borrower,
                requester: this.data.requester,
                manager: this.data.manager,
                status: this.data.status,
                objects: this.data.objects,
                signature: {electronic_signature: this.signatureType}
              }
            })
          };
          const res = await fetch(`http://localhost:3000/loan/${id}`, requestOptions)
            .then(async response => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.$toast.success("La signature a été bien choisi et la demande a été validée!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
              this.postId = data.id;
            })
            .catch(error => {
              this.errorMessage = error;
              console.error('There was an error!', error);
            });

        },
        async setLoanToReceived(){
          this.dateBorrow = moment().add(1, 'minutes').format();
          console.log(this.dateBorrow);
          const id = this.$route.params.id;
          const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data.borrower,
                requester: this.data.requester,
                manager: this.data.manager,
                date: {request: this.data.date.request,borrow: this.dateBorrow},
                status: 'InProgress',
                objects: this.data.objects,
                signature: {electronic_signature: this.signatureType, proof: this.data.signature.proof, validation_code: this.data.signature.validation_code }
              }
            })
          };
          const res = await fetch(`http://localhost:3000/loan/${id}`, requestOptions)
            .then(async response => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.$toast.success("Le prêt a été réceptionné par le demandeur !", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
              });
              this.postId = data.id;
            })
            .catch(error => {
              this.errorMessage = error;
              console.error('There was an error!', error);
            });
        },

      },
      mounted() {
        this.signatureType = this.data.signature.electronic_signature;
      }
  }
 
</script>
<style>
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

