<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-type> </form-type>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//importation des composants nécessaires pour l'ajout d'un groupe

import FormType from "./UserProfile/FormGroup.vue";
import UserCard from "./UserProfile/UserCard.vue";

export default {
  components: {
    FormType,
    UserCard,
  },
};
</script>
<style></style>
