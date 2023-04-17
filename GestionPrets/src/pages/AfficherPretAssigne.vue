<template>
  <div class="content">
    <div class="container-fluid">
      <!---------------->

      <!---------------->

      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Les Prêts Assignés</h4>
              <p class="card-category"></p>
            </template>
            <lo-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="result"
            >
            </lo-table>
          </card>
        </div>
      </div>

      <div class="row justify-content-center">
        <!--Bouton pour redireger le gestionnaire à la page principale de tous les prêts-->
        <div class="col-md-3">
          <router-link to="/admin/pret"
            ><button class="btn btn-default btn-block btn-info">
              <i class="nc-icon nc-stre-left"></i> Retour
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoTable from "src/components/TablePretAssigne.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Prêtteur", "Demandeur", "Gestionnaire"];
const tableData = [];

export default {
  components: {
    LoTable,
    Card,
  },
  // Déclaration de l'ensemble des variables nécessaires
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      result: [],
      responseAvailable: false,
    };
  },

  methods: {
    //Méthode pour récperer tous les prêts  assignes
    afficherPret() {
      this.responseAvailable = false;
      //Appel à l'API de prêt  assignes
      fetch("http://localhost:3000/loan/assigned", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const data = await response.json();

          // Test sur la reponse
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          this.responseAvailable = true;

          //console.log(data);
          this.result = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
  //Appel à la fonction pour exécution
  beforeMount() {
    this.afficherPret();
  },
};
</script>

<style></style>
