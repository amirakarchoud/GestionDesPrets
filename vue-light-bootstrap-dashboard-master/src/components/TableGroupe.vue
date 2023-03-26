<template>
  <div>
    <div
      style="display: flex; align-items: center; justify-content: flex-start"
    >
      <div class="search-wrapper">
        <i class="nc-icon nc-zoom-split"></i>
        <input type="text" v-model="search" placeholder="Rechercher label..." />
      </div>
    </div>
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
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <slot :row="item">
            <td>{{ itemValue(item, "label") }}</td>
            <td>{{ itemValue(item, "description") }}</td>
            <td>
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
import Notifications from "vue-notification";
export default {
  name: "lg-table",
  props: {
    columns: Array,
    data: Array,
  },
  data() {
    return {
      search: "",
      showModal: false,
      groupeId: null,
    };
  },
  computed: {
    filteredItems() {
      return this.data.filter((d) => {
        return d.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  methods: {
    showConfirmationModal(id) {
      this.groupeId = id;
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.showModal = false;
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    async deleteGrp() {
      const id = this.groupeId;
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      await fetch(`http://localhost:3000/objectGroup/${id}`, requestOptions)
        .then(async (response) => {
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
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
          // reload the page
          this.hideConfirmationModal();

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
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        })
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
