<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <form-validate :data="data">
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
      },
      data(){
        return {
          data: this.$route.params.data,
        }
      }
    }


  </script>
  <style>

  </style>
