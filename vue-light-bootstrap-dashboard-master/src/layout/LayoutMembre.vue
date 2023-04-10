<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/membre/pret">
        <i class="nc-icon nc-paper-2"></i>
        <p>Afficher les prets</p>
      </sidebar-link>
      <sidebar-link to="/admin/objet">
        <i class="nc-icon nc-notes"></i>
        <p>Afficher les objets</p>
      </sidebar-link>
      <sidebar-link to="/membre/demande">
        <i class="nc-icon nc-paper-2"></i>
        <p>Gestion des Demandes</p>
      </sidebar-link>

      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
