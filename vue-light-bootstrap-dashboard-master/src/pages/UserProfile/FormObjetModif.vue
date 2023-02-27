<template>
  <div>
  <card>
    <h4 slot="header" class="card-title">Modifier un objet</h4>
    <form>




      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Label"
                    placeholder="Nom objet"
                    v-model="data.label">
          </base-input>
        </div>
        
      </div>






      <div class="row">
        <div class="col-md-6" >
        <label for="group">Type </label>
         <br>
          <select v-model="data.type" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un type</option>
        <option v-for="option in optionsT" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>




      
       
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="showConfirmationModal">
          Modifier
        </button>
        <router-link to="/admin/objet"> 
         <button type="submit" class="btn btn-info btn-fill float-right"  style="margin-right:10px">
          Retour
        </button></router-link>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>


  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p>Etes vous sur de modifier cet objet ?</p>
      <div class="modal-buttons">
        <button class="btn btn-danger" @click="created()">Modifier</button>
        <button class="btn btn-secondary" @click="hideConfirmationModal()">Cancel</button>
      </div>
    </div>
  </div>



</div>

</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import Notifications from 'vue-notification'

  export default {
    components: {
      Card,
      Notifications
    },
    data () {
      return {
        showModal: false,
        notifications: {
          success:{
          title: 'Objet a été modifié avec succès!',
         
          type: 'success',
          duration: 3000,
          position: 'top-right',
          color: '#ffffff'
          },
          failure:{
           
          title: 'Erreur!',
          
          type: 'error',
          duration: 5000,
          position: 'top-right',
          
          }
        
      },
      objectId: null,
        object:{},
        idm:'',
        data:{
          label:'',
          type:'',
          borrowed:false
          
        },
        
      selectedT: 'A',
      optionsT: [
        
      ]
      }
    },
    methods: {


      showConfirmationModal() {
      //this.objectId = id;
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.showModal = false;
    },

      
  get () {
    const id = this.$route.params.id;
    fetch(`http://localhost:3000/object/${id}`)
      .then(response => response.json())
      .then(data => {
        this.data = data;
      })
      .catch(error => {
        console.error(error);
      });

  },



      created() {
        const id = this.$route.params.id;
  // POST request using fetch with error handling
  console.log(this.data);
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data:{label:this.data.label , type:this.data.type }})
  };
  fetch(`http://localhost:3000/object/${id}`, requestOptions)
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        this.$notify(this.notifications.failure);
        return Promise.reject(error);
      }

      this.postId = data.id;
      this.hideConfirmationModal();
      console.log("notif")
      console.log(this.notifications);
      this.$notify(this.notifications.success);
      this.$router.push('/admin/objet');
      
    })
    .catch(error => {
      this.errorMessage = error;
      this.$notify(this.notifications.failure);
      console.error('There was an error!', error);
    });
},

getTypes () { 
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
      this.optionsT= data.map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });

     /*  console.log(data);
      for (let i = 0; i < data.length; i++) {
  
   this.optionsT[i].value = data[i]._id;
   this.optionsT[i].text = data[i].label;

  console.log( data[i].label , data[i]._id); }*/

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },

    },

beforeMount(){
  //this.test();
   this.getTypes();
   this.get();
 },

  }

</script>
<style>

</style>
