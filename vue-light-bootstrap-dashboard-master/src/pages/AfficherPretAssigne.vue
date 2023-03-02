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
        <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-stre-left"></i> <router-link to="/admin/pret">Retour</router-link></button></div>

    </div>
       
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
              <h4 class="card-title">Les Prêts</h4>
              <p class="card-category"></p>
            </template>
            <lo-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="result"
                     :prets="prets">
                     
            </lo-table>
          </card>

        </div>
      </div>
    </div>
</div>
</template>

<script>
import LoTable from 'src/components/TablePretAssigne.vue'
import Card from 'src/components/Cards/Card.vue'
const tableColumns = ['Id', 'Prêtteur', 'Demandeur', 'Gestionnaire', 'Etat']
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
    },
    result:[],
    prets:[],
responseAvailable: false
  }
},


methods: {
test () { 
  console.log(this.result);
},
afficherPret () { 
  this.responseAvailable = false;

  fetch("http://localhost:3000/loan/assigned", {
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
  let i = 0;
  while (i < data.length) {
  console.log("SIGNATURE",data[i].signature);
  if (data[i].signature.proof != null)
  {
    console.log("SIGNATURE PROOF",data[i].signature.proof);
    this.prets.push(data[i]);
  }
    i++;
  }
  //const dataPrets = { prets: this.prets };
  console.log("DATAPRET", this.prets);
  console.log("DATA1111", data[0].borrower);
  console.log("DATA2222", this.prets[0].borrower);
  
  //let dataPrets = JSON.parse(JSON.stringify(this.prets));
  //console.log(dataPrets);
  //console.log("DATAPRETPRET", dataPrets);
  
  this.result = data;
})
.catch(error => {
  this.errorMessage = error;
  console.error("There was an error!", error);
});
},
},



beforeMount(){
//this.test();
this.afficherPret();
},



}

</script>

<style>
</style>
