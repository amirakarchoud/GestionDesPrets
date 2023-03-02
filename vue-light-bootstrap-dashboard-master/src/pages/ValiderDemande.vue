<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-validate>
          </form-validate>
        </div>
        
      </div>
    </div>
  </div>
</template>
  <script>
    import FormValidate from './UserProfile/FormValidate.vue'
    import UserCard from './UserProfile/UserCard.vue'
  
    export default {
      components: {
        FormValidate,
        UserCard
      }
    }

  
  </script>
  <style>
  
  </style>
  