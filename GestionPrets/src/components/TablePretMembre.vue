<template>
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <!-- Parcour de l'ensemble des clonnes déclarées dans la Page Afficher Prêt pour afficher les différents champs de notre table-->
            <th v-for="column in columns" :key="column">{{column}}</th>
            <!-- Ajout d'un champ Action à cette table-->
            <th> Actions </th>
            
          </tr>
        </slot>
      </thead>
      <tbody>
        <!-- Parcour de données sauvgarder dans la  table demndes-->
      <tr v-for="(item, index) in prets" :key="index" v-bind:class="{ 'text-danger': itemValue(item, 'status') === 'NotReturned' }">
        <slot :row="item" >
          <td>{{ index +1 }}</td> <!-- Pour afficher l'id comme un index et non pas l'id réel (Juste pour amélioration d'affichage)-->
          <td >{{itemValue(item, "borrower")}}</td>
          <td >{{itemValue(item, "requester")}}</td>
          <td >{{itemValue(item, "manager")}}</td>
          <!--<td >{{itemValue(item, "status")}}</td>-->
          <td>
            <span v-if="itemValue(item, 'status') === 'InProgress'"> Prêt confirmé</span>
            <span v-else-if="itemValue(item, 'status') === 'Returned'">Prêt Retourné</span>
            <span v-else-if="itemValue(item, 'status') === 'NotReturned'">Prêt Non Retourné</span>
          </td>
           <!-- Pour transmettre en URL l'id d'un prêt spécifique suite à la clic sur le bouton Loupe-->
          <td><router-link :to="{ name:'PretByIdMembre', params: { id: itemValue(item, '_id') } }"><button class="btn btn-info"><i class="nc-icon nc-zoom-split" ></i></i></button> </router-link></td>        </slot>
      </tr>
      </tbody>
    </table>
  </template>
  <script>
    export default {
      name: 'lo-table',
      props: {
        columns: Array,
        prets:Array
      },
      methods: {
        // Méthode pour retourner la valeur d'un élément récupéré
        itemValue (item, column) {
          return item[column.toLowerCase()]
        }
      }
    }
  </script>
  <style>
  .text-danger {
  color: red;
  background-color: rgba(255, 0, 0, 0.1);
}
  </style>
  