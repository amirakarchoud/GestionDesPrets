<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un Type</h4>
    <form>




      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Label"
                    placeholder="Nom Type"
                    v-model="data.label" style="width:280px;">
          </base-input>
        </div>
        
      </div>

      <div class="row">
        <div class="col-md-5">
          <textarea type="text"
                    label="Description"
                    placeholder="Description Type"
                    v-model="data.description" style="width:280px;border:1px solid #d8e1e6;">
          </textarea>
        </div>
        
      </div>





      <div class="row">
        <div class="col-md-6" >
        <label for="group">Groupe </label>
         <br>
          <select v-model="data.group" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un groupe</option>
        <option v-for="option in optionsT" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>




      
       
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="created" :disabled="hasEmptyRequiredFields">
          Ajouter Un Type
        </button>
        <router-link to="/admin/type"> 
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
  import Notifications from 'vue-notification'

  export default {
    components: {
      Card
    },
    data () {
      return {
        data:{
          label:'',
          description:'',
          group:''
          
        },
        notifications: {
          success:{
          title: 'Type a été ajouté avec succès!',
         
          type: 'success',
          duration: 3000,
          position: 'top-right',
          color: '#ffffff'
          },
          failure:{
           
          title: 'Erreur!',
          
          type: 'warning',
          duration: 3000,
          position: 'top-right',
          color: '#ffffdf'
          
          }
        
      },
      selectedT: 'A',
      optionsT: [
        
      ]
      
      }
    },
    
computed: {
    hasEmptyRequiredFields() {
      return !this.data.label || !this.data.group || !this.data.description;
    }
  },
    methods: {
     



      created() {
  // POST request using fetch with error handling
  console.log(this.data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data:{label:this.data.label,description:this.data.description , group:this.data.group }})
  };
  fetch('http://localhost:3000/objectType', requestOptions)
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        
        return Promise.reject(error);
      }

      this.postId = data.id;

      this.$notify(this.notifications.success);
      this.$router.push('/admin/type');
    })
    .catch(error => {
      this.errorMessage = error;
      this.$notify(this.notifications.failure);
      console.error('There was an error!', error);
    });
},


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

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },

    },

beforeMount(){
  this.getGroupes();
 },

  }

</script>
<style>

</style>
