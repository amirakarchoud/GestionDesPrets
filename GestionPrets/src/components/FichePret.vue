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
      <router-link :to="{ name: 'EditLoanAdmin', params: { id: data._id, data: data, objects: loanObjects  } }">
        <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
      </router-link>
      <button class="btn btn-info" v-b-modal.delete><i class="fa fa-trash-o"></i></button>
      <button @click="downloadPret()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button>
      <br></br>
      <button @click="changeStatus('NotReturned')" class="btn btn-info" v-b-modal.modal-1><i class="fa fa-question-circle" ></i>Perdu</button>
      <button @click="changeStatus('Returned')" class="btn btn-info" v-b-modal.modal-1><i class="fa fa-refresh"></i>Retourné</button>
    </td>
        </tr>
      </tbody>
    </table>


  <div>
  <b-modal id="modal-1" title="Confirmation" @ok="setLoanStatus()" ok-title-html= "Oui" cancel-title-html="Non" >
    <div class="d-block text-center">
      <h5>Êtes-vous sur de déclarer <span v-if="this.loanStatus==='NotReturned'">la perte</span><span v-if="this.loanStatus==='Returned'">le retour</span> de ce prêt?</h5>
    </div>
  </b-modal>
    <b-modal id="delete" title="Confirmation" @ok="deleteLoan()" ok-title-html= "Oui" cancel-title-html="Non" >
      <div class="d-block text-center">
        <h5>Êtes-vous sur de supprimer ce prêt?</h5>
      </div>
    </b-modal>
</div>


</div>

  </template>
  <script>
    import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';
  import Notif from "@/components/NotificationPlugin/Notif.vue";
    export default {
    components: { DatePicker },
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
      loanStatus: ''
    };
  },
     
      methods: {
        hasValue (item, column) {
          return item[column.toLowerCase()] !== 'undefined'
        },
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        downloadPret () {
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
                link.download = 'Pret.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
              .catch(error => console.error(error));
       },
        async changeStatus(status){ this.loanStatus = await status; console.log(this.loanStatus)},
        async setLoanStatus() {
          //this.$router.go();
          this.data.status= this.loanStatus;
          this.$router.push('');
          this.$toast.success("L'état du prêt a été modifié avec succès!", {
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
          let returndate='';
          if(this.loanStatus=='Returned')
            returndate = moment().format();
          else if (this.loanStatus=='NotReturned')
            returndate = '';
          const id = this.$route.params.id;
          console.log('date');
          console.log(returndate);
          const requestOptions1 = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data.borrower,
                requester: this.data.requester,
                manager: this.data.manager,
                date: {request: this.data.date.request},
                status: this.loanStatus,
                objects: this.data.objects,
                signature: {electronic_signature: this.data.signature.electronic_signature, proof: this.data.signature.proof, validation_code: this.data.signature.validation_code }
              }
            })
          };
          const requestOptions2 = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data.borrower,
                requester: this.data.requester,
                manager: this.data.manager,
                date: {request: this.data.date.request,borrow: this.data.date.borrow,return:returndate},
                status: this.loanStatus,
                objects: this.data.objects,
                signature: {electronic_signature: this.data.signature.electronic_signature, proof: this.data.signature.proof, validation_code: this.data.signature.validation_code }
              }
            })
          };
          const requestOptions = (this.loanStatus=='Returned')?requestOptions2:requestOptions1;
          const res = await fetch(`http://localhost:3000/loan/${id}`, requestOptions)
            .then(async response => {
              const data = await response.json();
              // check for error response
              if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
              this.postId = data.id;
            })
            .catch(error => {
              this.errorMessage = error;
              console.error('There was an error!', error);
            });
        },
        async deleteLoan(){
          const id = this.$route.params.id;
          await fetch(`http://localhost:3000/loan/${id}`, { method: 'DELETE' });
          this.$router.go(-1);
          this.$toast.success("Le prêt a été supprimée avec succès!", {
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
  

  