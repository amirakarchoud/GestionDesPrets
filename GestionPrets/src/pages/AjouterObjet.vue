<!-- Ce code est un template pour ajouter un nouvel objet à la liste existante. Il inclut un formulaire pour saisir les informations de l'objet. -->
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
       <!-- Le composant FormObjet est utilisé pour afficher et ajouter les informations de l'objet. -->
          <form-objet>
          </form-objet>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
// Importation du composant FormObjet utilisé dans ce fichier pour afficher le formulaire d'ajout d'un type
  import FormObjet from './UserProfile/FormObjet.vue'

  export default {
    components: {
      FormObjet // Le composant FormObjet est importé et enregistré comme composant enfant.
      
    }
  }

</script>
<style>

</style>
