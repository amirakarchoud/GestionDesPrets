<!-- Ce code est un template pour ajouter un nouveau type à la liste existante. Il inclut un formulaire pour saisir les informations du type. -->
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
           <!-- Le composant FormType est utilisé pour afficher et ajouter les informations du type. -->
          <form-type>
          </form-type>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
// Importation du composant FormType utilisé dans ce fichier pour afficher le formulaire d'ajout d'un type
  import FormType from './UserProfile/FormType.vue'

  export default {
    components: {
      FormType // Le composant FormType est importé et enregistré comme composant enfant.
      
    }
  }

</script>
<style>

</style>
