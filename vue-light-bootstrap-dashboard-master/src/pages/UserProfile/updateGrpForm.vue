<template>
  <div>
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

        <div class="row">
          <div class="col-md-10">
            <label for="group">Description </label>
            <br />

            <!--         <base-input type="text"
                      label="Description"
                      placeholder="Description"
                      v-model="data.description">
            </base-input>-->
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
  data() {
    return {
      showModal: false,
      notifications: {
        success: {
          title: "Le groupe a été modifié avec succès!",

          type: "success",
          duration: 3000,
          position: "top-right",
          color: "#ffffff",
        },
        failure: {
          title: "Erreur!",

          type: "danger",
          duration: 5000,
          position: "top-right",
        },
      },
      groupeId: null,
      groupe: {},
      data: {
        label: "",
        description: "",
      },
    };
  },
  beforeMount() {
    this.getGroupById();
  },
  methods: {
    showConfirmationModal() {
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.showModal = false;
    },

    async getGroupById() {
      this.responseAvailable = false;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const id = this.$route.params.id;
      await fetch(
        `http://localhost:3000/objectGroup/${id}`,
        requestOptions
      ).then(async (response) => {
        const data = await response.json();
        this.data = data;
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.responseAvailable = true;
      });
    },

    update() {
      // PUT request using fetch with error handling
      const id = this.$route.params.id;

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { label: this.data.label, description: this.data.description },
        }),
      };
      fetch(`http://localhost:3000/objectGroup/${id}`, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          this.postId = data.id;
          this.hideConfirmationModal();
          this.$notify(this.notifications.success);
          this.$router.push("/admin/groupe");
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
<style></style>
