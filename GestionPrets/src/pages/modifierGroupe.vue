<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <update-grp-form> </update-grp-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//importation des composants nécessaires pour la modification d'un groupe
import updateGrpForm from "./UserProfile/updateGrpForm.vue";
import UserCard from "./UserProfile/UserCard.vue";

export default {
  components: {
    updateGrpForm,
    UserCard,
  },
};
</script>
<style></style>
