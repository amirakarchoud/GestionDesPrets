<template>
  <card>
    <h4 slot="header" class="card-title">Valider Demande </h4>
    <form>

      <div v-if="this.signatureType===true" class="row">
        <div class="col-md-5">
          <div>Code de Validation</div>
          <base-input type="text"
                    placeholder="code"
                      v-model="code">
          </base-input>
        </div>

      </div>

      <div v-if="this.signatureType===false" class="row">
          <div class="col-md-5">
            <b-form-file
              browse-text="Parcourir"
              v-model="file"
              placeholder="Choisissez un fichier ou déposez-le ici..."
              drop-placeholder="Déposez le fichier ici..."
            ></b-form-file>
            <div class="mt-3">Fichier selectionné: {{ file ? file.name : '' }}</div>
          </div>
      </div>

      <div class="text-center">
        <router-link to="/membre/demande">
          <button type="submit" class="btn btn-info btn-fill float-right" @click="(signatureType===false)? uploadFile() : validate()">
            Valider Demande
          </button>
        </router-link>
        <router-link to="/membre/demande">
         <button type="submit" class="btn btn-info btn-fill float-right"  style="margin-right:10px">
          Retour
        </button></router-link>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import moment from "moment";
  export default {
    props: {
      data: Object,
    },
    components: {
      Card
    },
    data () {
      return {
          code: '',
          type: '',
          picked:false,
          file: null,
          signatureType: false,
          fichier:''
        }
      },
    methods: {
      uploadFile() {
        const formData = new FormData();
        formData.append('file', this.file);

        /*fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            console.log('File uploaded successfully');
          })
          .catch(error => {
            console.log('Error uploading file:', error);
          });*/
        this.validate();
      },
       validate() {
        this.date = moment().format();
        //console.log(this.data[0]);
        console.log(this.file);

        if(this.file!=null)
        this.fichier=this.file.name;
        const id = this.$route.params.id;
        const requestOptions1 = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            data: {
              borrower: this.data.borrower,
              requester: this.data.requester,
              manager: this.data.manager,
              status: this.data.status,
              objects: this.data.objects,
              signature: {
                electronic_signature: this.signatureType,
                proof: '/home/proofs/'+this.fichier,
                date:this.date
              }
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
               status: this.data.status,
               objects: this.data.objects,
               signature: {
                 electronic_signature: this.signatureType,
                 validation_code: this.code,
                 date:this.date
               }
             }
           })
         };
         let requestOptions = (this.data.signature.electronic_signature)?requestOptions2:requestOptions1;
        const res =  fetch(`http://localhost:3000/loan/${id}`, requestOptions)
          .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
            this.$toast.success("La demande du prêt est validée !", {
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
      }
    },
    mounted() {
      this.signatureType = this.data.signature.electronic_signature;
    }
  }

</script>
<style>

</style>
