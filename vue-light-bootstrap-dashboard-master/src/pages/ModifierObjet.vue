<!-- 
Ce fichier représente le composant Vue pour la modification d'un objet. Il utilise le composant FormObjetModif pour afficher le formulaire de modification.
-->
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <!-- 
          appel du composant FormObjetModif pour afficher le formulaire de modifiaction d'objet-->
          <form-objet-modif>
          </form-objet-modif>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import FormObjetModif from './UserProfile/FormObjetModif.vue'

  export default {
    components: {
      FormObjetModif //composant du formulaire de modifiaction d'un objet
    }
  }

</script>
<style>

</style>
