<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="d-flex justify-content-between">
                <h4 class="card-title">Les demandes </h4>
                <button class="btn btn-default btn-info"><i class="nc-icon nc-simple-add"></i>  Ajouter une demande</button>
              </div>
             
              
              <p class="card-category"></p>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data">
                     
            </l-table>
          </card>

        </div>

       <!---------------->
       <!-- <div class="col-12 ">
<div class="card">
<div class="card-body">




<div class="places-buttons">
<div class="row justify-content-center">
<div class="col-12 ">
<h5>
              <p class="category"></p></h5>
      </div></div>
       <div class="row justify-content-center">
        <div class="col-md-3 col-md-offset-1"><button class="btn btn-default btn-block btn-info"><i
              class="nc-icon nc-simple-add"></i> Ajouter une demande</button></div>
      </div>
      
      
      
     
      </div> 
      </div>
      </div></div> -->
       <!---------------->

      </div>






      
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Id', 'Nom', 'Prénom', 'Badge','Objet_demandé', 'Date' ]
  const tableData = [{
    id: 1,
    nom: 'KARCHOUD',
    prénom: 'Amira',
    badge:'numéro badge',
    objet_demandé: 'ID objet',
    date: '2023-01-16'

  },
  {
    id: 2,
    nom: 'KAHLOUN',
    prénom: 'Fatma',
    badge:'numéro badge',
    objet_demandé: 'ID objet',
    date: '2022-12-27'

  },
  {
    id: 3,
    nom: 'BOURIGA',
    prénom: 'Yousra',
    badge:'numéro badge',
    objet_demandé: 'ID objet',
    date: '2022-12-11'

  },
  {
    id: 4,
    nom: 'ZITOUNI',
    prénom: 'Mouhab',
    badge:'numéro badge',
    objet_demandé: 'ID objet',
    date: '2023-12-05'

  },
  {
    id: 5,
    nom: 'GRAOUNA',
    prénom: 'Omar',
    badge:'numéro badge',
    objet_demandé: 'ID objet',
    date: '2022-12-01'

  }]
  export default {
    components: {
      LTable,
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
