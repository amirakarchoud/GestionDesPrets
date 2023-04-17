<!-- 
Ce fichier représente le composant Vue pour la modification d'un type. Il utilise le composant FormTypeModif pour afficher le formulaire de modification.
-->
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <!-- 
          appel du composant FormTypeModif pour afficher le formulaire de modifiaction d'un type-->
          <form-type-modif>
          </form-type-modif>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import FormTypeModif from './UserProfile/FormTypeModif.vue'

  export default {
    components: {
      FormTypeModif //composant du formulaire de modifiaction d'un type
    }
  }

</script>
<style>

</style>
