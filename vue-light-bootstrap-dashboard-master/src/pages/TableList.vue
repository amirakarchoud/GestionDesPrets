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
      <div class="col-md-3"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-notes"></i>  Ajouter un groupe</button></div>
      <div class="col-md-3"><button class="btn btn-default btn-block btn-info">Ajouter un type</button></div></div>
      
      
      
     
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
                     :data="table1.data">
                     
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
  const tableColumns = ['Id', 'Nom', 'Groupe', 'Type']
  const tableData = [{
    id: 1,
    nom: 'Dakota Rice',
    groupe: 'Niger',
    type: 'Oud-Turnhout'
  },
  {
    id: 2,
    nom: 'Minerva Hooper',
    groupe: 'Curaçao',
    type: 'Sinaai-Waas'
  },
  {
    id: 3,
    nom: 'Sage Rodriguez',
    groupe: 'Netherlands',
    type: 'Baileux'
  },
  {
    id: 4,
    nom: 'Philip Chaney',
    groupe: 'Korea, South',
    type: 'Overland Park'
  },
  {
    id: 5,
    nom: 'Doris Greene',
    groupe: 'Malawi',
    type: 'Feldkirchen in Kärnten'
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
        }
      }
    }
  }
</script>
<style>
</style>
