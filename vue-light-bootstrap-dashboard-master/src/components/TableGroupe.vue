<template>
  <div>
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
        <tr v-for="(item, index) in data" :key="index">
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
      showModal: false,
      notifications: {
        success: {
          title: "Le groupe a été supprimé avec succès!",

          type: "success",
          duration: 3000,
          position: "top-right",
          color: "#ffffff",
        },
        failure: {
          title: "Erreur!",

          type: "error",
          duration: 5000,
          position: "top-right",
        },
      },
      groupeId: null,
    };
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
            this.$notify(this.notifications.failure);
            return Promise.reject(error);
          }
          // reload the page
          this.hideConfirmationModal();
          this.$notify(this.notifications.success);
          location.reload();
        })
        .catch((error) => {
          this.errorMessage = error;
          this.$notify(this.notifications.failure);
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
}
</style>
