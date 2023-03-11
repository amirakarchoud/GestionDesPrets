<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->
<div class="card"><!----><!---->
<div class="card-body">




<div class="places-buttons">
<div class="row justify-content-center">
<div class="col-12 ">
<h5>
              <p class="category"></p></h5>
      </div></div><div class="row justify-content-center">
      <div class="col-md-3 col-md-offset-1"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-simple-add"></i>  <router-link to="/admin/ajouterType">Ajouter un Type</router-link> </button></div>

      
      
      
     
      </div>
      </div>
      </div><!----></div>
       <!---------------->


      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Les Types</h4>
              <p class="card-category"></p>
            </template>
            <lo-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="result"
                     :groups="groups">
                     
            </lo-table>
          </card>

        </div>

       

      </div>

     
     



      
    </div>
  </div>
</template>
<script>
  import LoTable from 'src/components/TableType.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Id', 'Label', 'Groupe']
  
  export default {
    components: {
      LoTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: []
        },
        result:[],
    responseAvailable: false,
    groups:[]
      }
    },


methods: {
    
    afficherTy () { 
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

      console.log(data);
      this.result = data;
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
      this.groups= data.map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });
          console.log("g");
          console.log(this.groups);

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    }
},



beforeMount(){
  this.getGroupes();
   this.afficherTy();
 },



  }





 


</script>

<style>
</style>
