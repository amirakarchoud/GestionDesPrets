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
      <b>Détails Signature :</b>
      <br></br>
      <b>Electronique : </b>{{ item.signature.electronic_signature}}
      <br></br>
      <b>Preuve : </b>
      {{ item.signature.proof}}
      <br></br>
      <b>Code : </b>
      {{ item.signature.validation_code}}
    </td>
    <td>
      <button class="btn btn-info"><i class="fa fa-pencil" ></i></button>
      <button class="btn btn-info" v-b-modal.delete><i class="fa fa-trash-o"></i></button>
      <button @click="downloadPret()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button>
      <br></br>
      <button @click="changeStatus('NotReturned')" class="btn btn-info" v-b-modal.modal-1><i class="fa fa-question-circle" ></i>Perdu</button>
      <button @click="changeStatus('Returned')" class="btn btn-info" v-b-modal.modal-1><i class="fa fa-refresh"></i>Retourné</button>
    </td>



    </slot>
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
      name: 'lo-table',
      props: {
        columns: Array,
        data: Array,
        dataobj :Array
      },
      data(){
        return{
          loanStatus: ''
        }
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
          this.data[0].status= this.loanStatus;
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
          console.log(returndate);

          console.log(this.data[0]);
          const id = this.$route.params.id;
          console.log(this.data[0]);
          console.log(this.dataobj);
          const requestOptions1 = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data[0].borrower,
                requester: this.data[0].requester,
                manager: this.data[0].manager,
                date: {request: this.data[0].date.request, return: returndate},
                status: this.loanStatus,
                objects: this.data[0].objects,
                signature: {electronic_signature: this.data[0].signature.electronic_signature, proof: this.data[0].signature.proof, validation_code: this.data[0].signature.validation_code }
              }
            })
          };
          const requestOptions2 = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: {
                borrower: this.data[0].borrower,
                requester: this.data[0].requester,
                manager: this.data[0].manager,
                date: {borrow: this.data[0].date.borrow, return: returndate},
                status: this.loanStatus,
                objects: this.data[0].objects,
                signature: {electronic_signature: this.data[0].signature.electronic_signature, proof: this.data[0].signature.proof, validation_code: this.data[0].signature.validation_code }
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

  </style>
