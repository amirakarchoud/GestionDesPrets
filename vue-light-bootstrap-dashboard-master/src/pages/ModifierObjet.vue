<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-objet-modif>
          </form-objet-modif>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import FormObjetModif from './UserProfile/FormObjetModif.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      FormObjetModif,
      UserCard
    }
  }

</script>
<style>

</style>
