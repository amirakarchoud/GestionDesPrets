<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-type-modif>
          </form-type-modif>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import FormTypeModif from './UserProfile/FormTypeModif.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      FormTypeModif,
      UserCard
    }
  }

</script>
<style>

</style>
