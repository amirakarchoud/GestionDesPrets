<template>
  <div>
    <table class="table">
      <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
          <th> Actions </th>
        </tr>
      </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td>{{ index +1 }}</td>
          <td >{{itemValue(item, "borrower")}}</td>
          <td >{{itemValue(item, "requester")}}</td>
          <td >{{itemValue(item, "manager")}}</td>
          <td >{{itemValue(item, "status")}}</td>
          <td >{{itemValue(item, "comments")}}</td>

          <td>
      <tr v-for="(obj, index3) in dataobj" :key="index3">

        <td>
          <b>Objet {{ index3 +1 }} :</b> {{ obj[0].label }}
        </td>

      </tr>
      </td>
      <td>
        <router-link v-if="getParentRoute()==='membre'" :to="{ name: 'EditDemande', params: { id: itemValue(item, '_id'), data: data, objects: dataobj  } }">
          <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
        </router-link>
        <router-link v-if="getParentRoute()==='admin'" :to="{ name: 'EditDemandeAdmin', params: { id: itemValue(item, '_id'), data: data, objects: dataobj  } }">
          <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
        </router-link>

        <!--<button  v-if="getParentRoute()==='admin'" class="btn btn-info" v-b-modal.signature><i class="fa fa-pencil" ></i></button> -->

        <button class="btn btn-info" v-b-modal.delete><i class="fa fa-trash-o"></i></button>
        <button @click="downloadDemande()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button>
        <router-link v-if="getParentRoute()==='membre'" :to="{ name: 'ValiderDemande', params: { id: itemValue(item, '_id'), data: data, objects: dataobj  } }">
          <button class="btn btn-info"><i class="nc-icon nc-check-2"></i></button>
        </router-link>
        <button v-b-modal.validate v-if="getParentRoute()==='admin'" class="btn btn-info"><i class="nc-icon nc-check-2"></i></button>
        <button v-b-modal.receivedLoan v-if="getParentRoute()==='admin'" class="btn btn-info"><i class="fa fa-check-circle"></i></button>

      </td>

      </slot>
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
      <b-modal id="validate" title="Confirmer le mode de signature" @ok="modifySignatureType()" ok-title-html= "Valider la demande" cancel-title-html="Retour" >
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
      name: 'lo-table',
      props: {
        columns: Array,
        data: Array,
        dataobj :Array
      },
      data(){
        return{
          signatureType: false,
          dateBorrow:'',
        }
      },
      methods: {
        getParentRoute(){return this.$route.matched[0].name;},
        hasValue (item, column) {
          return item[column.toLowerCase()] !== 'undefined'
        },
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        downloadDemande () {
              //console.log(this.$route.matched);
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
                borrower: this.data[0].borrower,
                requester: this.data[0].requester,
                manager: this.data[0].manager,
                date: {borrow: this.data[0].date.borrow},
                status: this.data[0].status,
                objects: this.data[0].objects,
                signature: {electronic_signature: this.signatureType, proof: this.data[0].signature.proof, validation_code: this.data[0].signature.validation_code }
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
                borrower: this.data[0].borrower,
                requester: this.data[0].requester,
                manager: this.data[0].manager,
                date: {borrow: this.dateBorrow},
                status: this.data[0].status,
                objects: this.data[0].objects,
                signature: {electronic_signature: this.signatureType, proof: this.data[0].signature.proof, validation_code: this.data[0].signature.validation_code }
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
        this.signatureType = this.data[0].signature.electronic_signature;
      }
    }
  </script>
  <style>

  </style>
