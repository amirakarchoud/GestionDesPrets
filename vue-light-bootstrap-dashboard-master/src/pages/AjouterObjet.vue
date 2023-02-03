<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-objet>
          </form-objet>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import FormObjet from './UserProfile/FormObjet.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      FormObjet,
      UserCard
    }
  }

</script>
<style>

</style>
