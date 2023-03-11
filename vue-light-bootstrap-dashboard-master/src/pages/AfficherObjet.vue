<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->
       <div class="col-12 ">
<div class="card"><!----><!---->
<div class="card-body">




<div class="places-buttons">
<div class="row justify-content-center">
<div class="col-12 ">
<h5>
              <p class="category"></p></h5>
      </div></div><div class="row justify-content-center">
      <div class="col-md-3 col-md-offset-1"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-simple-add"></i>  <router-link to="/admin/objetadd">Ajouter un objet</router-link> </button></div>
      <div class="col-md-3"><router-link to="/admin/groupe"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-notes"></i>  Gestion des groupes</button></router-link></div>
      <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><router-link to="/admin/type">Gestion des types</router-link></button></div></div>
      
      
      
     
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
              <h4 class="card-title">Les Objets</h4>
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
  import LoTable from 'src/components/TableObjet.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Id', 'Label', 'Etat', 'Type']
  const tableData = [{
    id: 1,
    label: 'Key C320',
    etat: 'preté',
    type: 'Cle salle'
  },
  {
    id: 2,
    label: 'Key A210',
    etat: 'preté',
    type: 'Cle Bureau'
  },
  {
    id: 3,
    label: 'cantine',
    etat: 'disponible',
    type: 'Badge'
  },
  {
    id: 4,
    label: '123',
    etat: 'preté',
    type: 'Carte'
  },
  {
    id: 5,
    label: '999',
    etat: 'disponible',
    type: 'Carte'
  }]
  export default {
    components: {
      LoTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        result:[],
    responseAvailable: false,
    groups:[]
      }
    },


methods: {
    test () { 
      console.log(this.result);
    },
    afficherOb () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/object", {
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
   this.afficherOb();
 },



  }





 


</script>

<style>
</style>
