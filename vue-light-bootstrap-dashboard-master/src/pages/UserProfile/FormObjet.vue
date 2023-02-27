<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un objet</h4>
    <form>




      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Label"
                    placeholder="Nom objet"
                    v-model="data.label" style="width:280px;">
          </base-input>
        </div>
        
      </div>




      <div class="row">
        <div class="col-md-6" >
        <label for="group">Groupe </label>
         <br>
          <select v-model="group" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un groupe</option>
        <option v-for="option in optionsG" :value="option.value">
             {{ option.text }}
         </option>
          </select>
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
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="created" :disabled="hasEmptyRequiredFields">
          Ajouter Un Objet
        </button>
        <router-link to="/admin/objet"> 
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
          type:'',
          borrowed:false
          
        },
        notifications: {
          success:{
          title: 'Objet a été ajouté avec succès!',
         
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
        types:[],
        group:'',
       
      selectedT: 'A',
      optionsT: [
        
      ],
      optionsG: [
        
      ]
      }
    },
    watch: {
  'group'(newValue, oldValue) {
    console.log("watch");
    if (newValue !== oldValue) {
      console.log("watch in");
      this.getTypes(newValue);
      console.log("watch after");
      console.log(this.optionsT);
    }
  }
},
computed: {
    hasEmptyRequiredFields() {
      return !this.data.label || !this.data.type;
    }
  },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },

      testClic(){
          console.log(this.data);
      },



      created() {
  // POST request using fetch with error handling
  console.log(this.data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data:{label:this.data.label , type:this.data.type }})
  };
  fetch('http://localhost:3000/object', requestOptions)
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
      this.$router.push('/admin/objet');
    })
    .catch(error => {
      this.errorMessage = error;
      this.$notify(this.notifications.failure);
      console.error('There was an error!', error);
    });
},

getTypes (id) { 
  console.log("types");

  console.log(this.types);
   
       this.optionsT=[];
       
       
      this.optionsT= this.types.filter(o=>o.group==id).map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });

    
    
    
    },




    getTypesAll () { 
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
      this.types= data;

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
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
      this.optionsG= data.map(o => {
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
  //this.test();
  this.getTypesAll ()
  this.getGroupes();
  // this.getTypes(id);
 },

  }

</script>
<style>

</style>
