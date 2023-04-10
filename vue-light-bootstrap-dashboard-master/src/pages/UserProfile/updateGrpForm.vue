<template>
  <div>
    <!-- Composant pour la création du formulaire de modification d'un groupe -->
    <card>
      <h4 slot="header" class="card-title">Modifier groupe</h4>
      <form>
        <div class="row">
          <div class="col-md-5">
            <base-input
              type="text"
              label="Label"
              placeholder="Label"
              v-model="data.label"
            >
            </base-input>
          </div>
        </div>
        <!-- Champ description -->
        <div class="row">
          <div class="col-md-10">
            <label for="group">Description </label>
            <br />
            <textarea
              type="text"
              label="Description"
              rows="4"
              cols="50"
              v-model="data.description"
            >
            </textarea>
          </div>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="btn btn-info btn-fill float-right"
            @click.prevent="showConfirmationModal"
          >
            Modifier
          </button>
          <router-link to="/admin/groupe">
            <button
              type="submit"
              class="btn btn-info btn-fill float-right"
              style="margin-right: 10px"
            >
              Retour
            </button>
          </router-link>
        </div>
        <div class="clearfix"></div>
      </form>
    </card>
    <!-- Ce composant représente le contenu de la fenêtre de confirmation -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Etes vous sûr de modifier ce groupe ?</p>
        <div class="modal-buttons">
          <button class="btn btn-danger" @click="update()">Modifier</button>
          <button class="btn btn-secondary" @click="hideConfirmationModal()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import Notifications from "vue-notification";
export default {
  components: {
    Card,
    Notifications,
  },
  //initialisation des données du composant
  data() {
    return {
      showModal: false,
      groupeId: null,
      groupe: {},
      data: {
        label: "",
        description: "",
      },
    };
  },
  //définition d'une fonction qui est exécutée avant le chargement de la page
  beforeMount() {
    this.getGroupById(); //récupération des informations du groupe en fonction de son ID
  },
  methods: {
    // Affichage de la fenêtre de confirmation
    showConfirmationModal() {
      this.showModal = true;
    },
    // cacher la fenêtre de confirmation
    hideConfirmationModal() {
      this.showModal = false;
    },
    //Définition d'une méthode asynchrone pour récupérer le groupe selon son ID
    async getGroupById() {
      this.responseAvailable = false;
      //Enregistrer la configuration de la requête HTTP GET dans un objet
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const id = this.$route.params.id;
      //Excecution de la requête HTTP GET
      await fetch(
        `http://localhost:3000/objectGroup/${id}`,
        requestOptions
      ).then(async (response) => {
        const data = await response.json();
        this.data = data;
        // Vérification de l'existence d'une erreur
        if (!response.ok) {
          // Récupération du message d'erreur
          const error = (data && data.message) || response.statusText;
          //Affichage d'une notification d'erreur
          return Promise.reject(error);
        }
        this.responseAvailable = true;
      });
    },
    //Définition d'une méthode asynchrone pour modifier un groupe
    update() {
      //récupération de l'ID du groupe à modifier
      const id = this.$route.params.id;

      //Enregistrer la configuration de la requête HTTP PUT dans un objet
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { label: this.data.label, description: this.data.description },
        }),
      };
      //Excecution de la requête HTTP PUT
      fetch(`http://localhost:3000/objectGroup/${id}`, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          // Vérification de l'existence d'une erreur
          if (!response.ok) {
            // Récupération du message d'erreur
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
          // Si la réponse est ok, Cacher la fenêtre de confirmation de suppression
          this.hideConfirmationModal();
          //Affichage d'une notification de succès
          this.$toast.success("Le groupe a été modifié avec succès !", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          //Redirection vers la page de gestions des groupes si la réponse est ok
          this.$router.push("/admin/groupe");
        })
        //Capter les erreurs de la requête HTTP PUT
        .catch((error) => {
          this.errorMessage = error;
          this.$toast.error("Erreur !", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        });
    },
  },
};
</script>
<style></style>
