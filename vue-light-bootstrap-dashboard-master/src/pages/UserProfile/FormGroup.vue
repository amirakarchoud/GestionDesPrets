<template>
  <!-- Composant pour la création du formulaire d'ajout d'un groupe -->
  <card>
    <h4 slot="header" class="card-title">Ajouter un groupe d'objet</h4>
    <form>
      <!-- Champ label -->
      <div class="row">
        <div class="col-md-5">
          <base-input
          id ="binput"
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
      <!-- Bouton de validation -->
      <div class="text-center">
        <button
        id="valider"
          type="submit"
          class="btn btn-info btn-fill float-right"
          @click.prevent="created">Valider </button>

        <!-- EN cas de validation, redirection vers la page de gestion des groupes -->
        <router-link to="/admin/groupe">
          <button
            type="submit"
            class="btn btn-info btn-fill float-right"
            style="margin-right: 10px"
          >
            Retour
          </button></router-link
        >
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";

export default {
  components: {
    Card,
  },
  //initialisation des données du formulaire
  data() {
    return {
      data: {
        label: "",
        description: "",
      },
    };
  },
  //définition des méthodes du composant
  methods: {
    //Définition d'une méthode pour créer un groupe
    created() {
      //Enregistrer la configuration de la requête HTTP DELETE dans un objet
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { label: this.data.label, description: this.data.description },
        }),
      };
      //Excecution de la requête HTTP POST
      fetch("http://localhost:3000/objectGroup", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          // Vérification de l'existence d'une erreur
          if (!response.ok) {
            // Récupération du message d'erreur
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
          //Affichage d'une notification de succès
          this.$toast.success("Le groupe a été ajouté avec succès !", {
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
        //Capter les erreurs de la requête HTTP POST
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
