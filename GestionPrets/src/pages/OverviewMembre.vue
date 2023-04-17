<!--définit le composant Vue qui est une page de tableau de bord de l'application de gestion de prêts d'objets.-->
<template>
  <div class="content">
    <div class="container-fluid">
      
      <div class="dashboard">
        <div class="headerT">

    <img class="logoT" src="../../public/img/logo.jpeg" alt="Application Logo">
    <h1 class="titre">Bienvenue sur l'application de Gestion de Prêts</h1>
    </div>
    <div class="contentT">
      <p class="description">Cette application de gestion de prêts est conçue pour aider les utilisateurs à gérer efficacement leurs prêts. Avec cette application, vous pouvez facilement suivre et gérer vos prêts en un seul endroit. L'application est facile à utiliser et conviviale.</p>
      <p class="features-title">Les fonctionnalités de l'application incluent :</p>
      <ul class="ulT">
        <li>Suivi des prêts actuels et passés</li>
        <li>Gestion des demandes des differents objets</li>
        <li>Signature elecronique des demandes</li>
        <li>Telecharger et retourner les prêts </li>
      </ul>
      <p class="ending-text">Nous espérons que cette application vous aidera à mieux gérer vos prêts et les demandes.</p>
    </div>
  </div>

</div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
       }
    },
 
    methods:{



    },

   
 }
</script>
<style>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F6F7FB;
}

.headerT {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
}

.logoT {
  width: 100px;
  margin-right: 20px;
}

.titre {
  font-size: 50px;
  font-weight: bold;
  color: #2C2E43;
  margin: 0;
}

.contentT {
  margin-top: 50px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
}
.description {
  font-size: 24px;
  color: #2C2E43;
  line-height: 1.5;
}

.features-title {
  font-size: 24px;
  font-weight: bold;
  color: #2C2E43;
  margin-top: 30px;
}

.ulT {
  font-size: 18px;
  color: #2C2E43;
  margin-left: 50px;
}

.ending-text {
  font-size: 18px;
  color: #2C2E43;
  margin-top: 30px;
}
</style>
