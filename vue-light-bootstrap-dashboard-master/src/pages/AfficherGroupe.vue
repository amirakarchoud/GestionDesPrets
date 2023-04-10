<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="d-flex justify-content-between">
                <h4 class="card-title">Les groupes</h4>
                <button class="btn btn-default btn-info">
                  <i class="nc-icon nc-simple-add"></i
                  ><router-link to="/admin/ajouterGroupe">
                    Ajouter un groupe</router-link
                  >
                </button>
              </div>

              <p class="card-category"></p>
            </template>
            <!-- utilisation du composant lg-table importé du component TableGroupe -->
            <lg-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="result"
            >
            </lg-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LgTable from "src/components/TableGroupe.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Label", "Description"];
const tableData = [];
export default {
  components: {
    LgTable,
    Card,
  },
  //méthode qui retourne l'objet contenant les proriétés initialisées du tableau des groupes
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        columns: [...tableColumns],
        data: [...tableData],
      },
      result: [],
      responseAvailable: false,
    };
  },

  methods: {
    //Définition d'une méthode pour afficher les groupes
    afficherGrp() {
      this.responseAvailable = false;
      //Excecution de la requête HTTP GET
      fetch("http://localhost:3000/objectGroup", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const data = await response.json();

          // Vérification de l'existence d'une erreur
          if (!response.ok) {
            // Récupération du message d'erreur
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          this.responseAvailable = true;

          this.result = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
  //définition d'une fonction qui est exécutée avant le chargement de la page
  beforeMount() {
    this.afficherGrp();
  },
};
</script>
<style></style>
