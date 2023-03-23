<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <FormDemande>
          </FormDemande>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import FormDemande from "@/pages/UserProfile/FormDemande.vue";

export default {
  name: "AjouterDemande",
  components: {FormDemande}
}
</script>


