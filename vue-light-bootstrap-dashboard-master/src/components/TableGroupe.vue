<template>
  <div>
    <!-- Composant pour la barre de recherche -->
    <div
      style="display: flex; align-items: center; justify-content: flex-start"
    >
      <div class="search-wrapper">
        <i class="nc-icon nc-zoom-split"></i>
        <input type="text" v-model="search" placeholder="Rechercher label..." />
      </div>
    </div>

    <!--  Définition des colonnes du tableau des groupes d'objet  -->
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th>Label</th>
            <th>Description</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </slot>
      </thead>
      <!-- Contenu du tableau  -->
      <tbody>
        <!-- Parcourir les données existantes dans la BD et les insérer ligne par ligne dans le tableau des groupes -->
        <tr v-for="(item, index) in filteredItems" :key="index">
          <slot :row="item">
            <td>{{ itemValue(item, "label") }}</td>
            <td>{{ itemValue(item, "description") }}</td>
            <td>
              <!-- redirection vers le formulaire de modification du groupe -->
              <router-link
                :to="{
                  name: 'Groupeupdate',
                  params: { id: itemValue(item, '_id') },
                }"
                ><button class="btn btn-info">
                  <i class="fa fa-pencil"></i>
                </button>
              </router-link>
            </td>
            <td>
              <!-- Faire apparaitre une fenêtre de confirmation lors du clic sur le bouton de suppression -->
              <button
                class="btn btn-info"
                @click.prevent="showConfirmationModal(item._id)"
              >
                <i class="fa fa-trash-o"></i>
              </button>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
    <!-- Ce composant représente le contenu de la fenêtre de confirmation -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Etes vous sûr de supprimer ce groupe ?</p>
        <div class="modal-buttons">
          <button class="btn btn-danger" @click="deleteGrp()">Supprimer</button>
          <button class="btn btn-secondary" @click="hideConfirmationModal()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lg-table", //définition d'un composant
  //propriétés du composant
  props: {
    columns: Array,
    data: Array,
  },
  //données du composant
  data() {
    return {
      search: "", //chaîne de caractères pour la recherche
      showModal: false, // variable de type booléen pour afficher ou cacher la fenêtre de confirmation
      groupeId: null, //ID du groupe sélectionné pour la confirmation
    };
  },
  computed: {
    //propriété permettant de définir des fonctions pour effectuer des opérations sur les données existantes
    // fonction permettant de filtrer les données pour la recherche
    filteredItems() {
      return this.data.filter((d) => {
        return d.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  //définition des méthodes du composant
  methods: {
    // Affichage de la fenêtre de confirmation
    showConfirmationModal(id) {
      this.groupeId = id;
      this.showModal = true;
    },
    // cacher la fenêtre de confirmation
    hideConfirmationModal() {
      this.showModal = false;
    },
    //vérifier si l'élément existe
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    // récupérer la valeur de l'élément
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    //Définition d'une méthode asynchrone pour supprimer un groupe
    async deleteGrp() {
      //récupération de l'ID du groupe à supprimer
      const id = this.groupeId;
      //Enregistrer la configuration de la requête HTTP DELETE dans un objet
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      //Excecution de la requête HTTP DELETE
      await fetch(`http://localhost:3000/objectGroup/${id}`, requestOptions)
        .then(async (response) => {
          // Vérification de l'existence d'une erreur
          if (!response.ok) {
            // Récupération du message d'erreur
            const error = (data && data.message) || response.status;
            //Affichage d'une notification d'erreur
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
            return Promise.reject(error);
          }
          // Si la réponse est ok, Cacher la fenêtre de confirmation de suppression
          this.hideConfirmationModal();
          // Affichage d'une notification de succès
          this.$toast.success("Le groupe a été supprimé avec succès !", {
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
          //Actualisation de la page après une seconde
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        })
        //Capter les erreurs de la requête HTTP DELETE
        .catch((error) => {
          this.errorMessage = error;
          //Affichage d'une notification d'erreur
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
<!-- ce bloc définit les styles des éléments -->
<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  width: 350px;
  background-color: #fff;
  border-style: double;
  border-color: #68d7ed;
  border-width: medium;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
}
.modal-buttons {
  margin-top: 20px;
}
.search-wrapper {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-left: 5px;

  padding: 5px;
  border-radius: 20px;
}
.search-wrapper input[type="text"] {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  padding-right: 3px;
  border: none;

  transition: border-radius 0.1s ease-out;
}
.search-wrapper input[type="text"]:focus {
  outline: none;
  border-bottom: 2px solid #68d7ed;
  transition: border-color 0.3s ease-out;
}
.search-wrapper i {
  color: grey;
  margin-left: 5px;
}
</style>
