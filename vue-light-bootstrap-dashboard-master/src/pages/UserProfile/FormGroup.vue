<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un groupe d'objet</h4>
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
          @click.prevent="created"
        >
          Valider
        </button>
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
  data() {
    return {
      data: {
        label: "",
        description: "",
      },
      notifications: {
        success: {
          title: "Le groupe a été ajouté avec succès!",

          type: "success",
          duration: 3000,
          position: "top-right",
          color: "#ffffff",
        },
        failure: {
          title: "Erreur!",

          type: "danger",
          duration: 3000,
          position: "top-right",
          color: "#ffffdf",
        },
      },
    };
  },
  methods: {
    testClic() {
      console.log(this.data);
    },

    created() {
      // POST request using fetch with error handling
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { label: this.data.label, description: this.data.description },
        }),
      };
      fetch("http://localhost:3000/objectGroup", requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
          this.$notify(this.notifications.success);
          this.$router.push("/admin/groupe");
          // window.location.assign("/admin/groupe#/admin/groupe");
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
