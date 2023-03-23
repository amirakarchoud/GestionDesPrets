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
        </div></div>

        <div class="row justify-content-center">
      <!--  <div class="col-md-3 col-md-offset-1"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-simple-add"></i>  <router-link to="/admin/objetadd">Ajouter un prêt</router-link> </button></div>
      -->
        <div class="col-md-3"><router-link :to="{path:'../demande'}"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-stre-left"></i> Retour</button></router-link></div></div>

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
                <h4 class="card-title">La Demande</h4>
                <p class="card-category"></p>
              </template>
              <lo-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="result"
                       :dataobj="objects"
                       >

              </lo-table>
            </card>

          </div>
        </div>
      </div>
  </div>
  </template>

<script>
import LoTable from 'src/components/FicheDemande.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['Id', 'Prêtteur', 'Demandeur', 'Gestionnaire', 'Etat', 'Commentaires', 'Objets']
const tableData = []

export default {
  components: {
    LoTable,
    Card
  },
  data () {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
        dataobj: [...tableData]
      },

      result:[],
      objects: [],
      responseAvailable: false,

    }
  },



methods: {

  test () {
    console.log(this.result);
  },
  goBack() {
      window.history.go(-1);
    },
  afficherDemandeById () {

    const id = this.$route.params.id;
    this.responseAvailable = false;

    fetch(`http://localhost:3000/loan/${id}`, {
  "method": "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(async response => {
    const data = [await response.json()];

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.responseAvailable=true;

    console.log("DATA",data);
    console.log("OBJECT",data[0].objects)
    this.tableObject=data[0].objects
    console.log("OBJECT 2",this.tableObject)

    this.result = data;
    console.log(this.result);
    // HEDHA JDID
    let i = 0; // declare and initialize i here
const promises = [];
while (i < this.tableObject.length) {
  console.log(this.tableObject[i]);
  const idObj = this.tableObject[i];
  const promise = fetch(`http://localhost:3000/object/${idObj}`, {
    "method": "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(async response => {
    const dataobj = [await response.json()];
    if (!response.ok) {
      const error = (dataobj && dataobj.message) || response.statusText;
      return Promise.reject(error);
    }
    console.log("DATAO_BJECT",dataobj);
    this.objects.push(dataobj); // add the dataobj to the array
  })
  .catch(error => {
    console.error("There was an error fetching objects.", error);
  });

  promises.push(promise);
  i++;
}

Promise.all(promises).then(() => {
  console.log("DataObj", this.objects); // this will log the final value of this.objects
  // do something with this.objects here
});


  //YOUFA HOUNI
  })
  .catch(error => {
    this.errorMessage = error;
    console.error("There was an error!", error);
  });
  },
},



beforeMount(){
 this.afficherDemandeById();
},



}

</script>

<style>
</style>
