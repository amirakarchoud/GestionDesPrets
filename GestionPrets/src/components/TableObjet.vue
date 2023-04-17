<!-- Ce fichier contient un composant Vue appelé "lo-table", qui est une table de donnees des objets 
   avec des fonctionnalités de recherche et de filtrage pour les données -->
<template>
  <div>
    <!-- Le conteneur de recherche et de sélection -->
    <div class="search-select-container">
      <!-- Barre de recherche par label-->
      <div class="search-box">
        <input
          type="text"
          v-model="searchText"
          placeholder="Rechercher Label..."
        />
        <i class="nc-icon nc-zoom-split"></i>
      </div>
      <!-- liste déroulante pour le filtrage par groupe -->
      <div class="select-box">
        <select v-model="selectedType">
          <option value="">Tous les groupes</option>
          <option v-for="g in groups" :value="g.value">{{ g.text }}</option>
        </select>
      </div>
    </div>
    <!-- Table des objets -->
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th>Label</th>
            <th>Etat</th>
            <th>Type</th>
            <th>Groupe</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredDataByText" :key="index">
          <slot :row="item">
            <td>{{ itemValue(item, "label") }}</td>
            <td>{{ borrowedStatus(item.borrowed) }}</td>
            <td>{{ item.type.label }}</td>
            <td v-if="item.type.group !== null">{{ item.type.group.label }}</td>
            <!-- Bouton pour modifier l'objet -->
            <td>
              <router-link
                :to="{ name: 'Obmod', params: { id: itemValue(item, '_id') } }"
                ><button class="btn btn-info">
                  <i class="fa fa-pencil"></i>
                </button>
              </router-link>
            </td>
            <!-- Bouton pour supprimer l'objet -->
            <td>
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

    <!-- Modale de confirmation pour la suppression d'un objet -->
    <!-- Son affichage depend de la valeur du flag showModal-->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Etes vous sur de supprimer cet objet ?</p>
        <div class="modal-buttons">
          <button class="btn btn-danger" @click="deleteObject()">
            Supprimer
          </button>
          <button class="btn btn-secondary" @click="hideConfirmationModal()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "vue-notification";

export default {
  name: "lo-table",
  props: {
    columns: Array,
    data: Array, //les objets a afficher dans le tableau
    groups: Array, //tableau des groupes passes en parametre
  },
  data() {
    return {
      showModal: false, //initialisation du flag showModal
      objectId: null,
      selectedType: "",
      searchText: "", //initialisation du texte du recherche
      searchTextFocus: false,
      selectedTypeFocus: false,
    };
  },
  //filtrage des donnees selon les groupes ou le label
  computed: {
    filteredData() {
      if (!this.selectedType) {
        return this.data;
      }
      return this.data.filter(
        (item) => item.type.group._id === this.selectedType
      );
    },
    filteredDataByText() {
      if (!this.searchText) {
        return this.filteredData;
      }
      return this.filteredData.filter((item) =>
        item.label.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    //methode pour afficher le message de confirmation
    showConfirmationModal(id) {
      this.objectId = id;
      this.showModal = true;
    },
    //methode pour cacher le message de confirmation
    hideConfirmationModal() {
      this.showModal = false;
    },

    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    //methode pour transformer le flag borrowed en 'emprunte' si il est a vrai sinon en 'disponible' si il est a faux
    borrowedStatus(borrowed) {
      return borrowed ? "Emprunte" : "Disponible";
    },

    //methode delete pour supprimer un objet de la base de donnees apres la confirmation
    async deleteObject() {
      const id = this.objectId;
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      fetch(`http://localhost:3000/object/${id}`, requestOptions)
        .then(async (response) => {
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          // reload the page
          this.hideConfirmationModal();
          location.reload();
          //afficher la notification
          this.$toast.success("Objet supprimé avec succes !", {
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
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

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
  border-radius: 30px;
}

.search-select-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-box {
  display: flex;
  align-items: center;
  margin-right: 10px;

  padding: 5px;
}
.search-box input[type="text"] {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  padding-right: 30px;
  border: none;
  border-radius: 20px; /* added border-radius */
  background-color: #f9f9f9;
  transition: border-radius 0.1s ease-out;
}
.search-box input[type="text"]:focus {
  outline: none;
  border: 2px solid #68d7ed;
  transition: border-color 0.3s ease-out;
}

.search-box i {
  color: #ccc;
  margin-left: 5px;
}

.search-box button:hover {
  background-color: #ddd;
}

.select-box select {
  width: 200px;
  padding: 8px 16px;
  border: solid;
  border-radius: 20px; /* added border-radius */
  font-size: 16px;
  border-color: lightgrey;
  background-color: #fff;
  transition: background-color 0.3s;
}

.select-box select:focus {
  background-color: #fff;
  outline: none;
  border: 2px solid #68d7ed;
  transition: border-color 0.3s ease-out;
}
</style>
