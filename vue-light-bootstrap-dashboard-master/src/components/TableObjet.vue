<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th> Label</th>
          <th> Etat</th>
          <th> Type</th>
          <th> Groupe</th>
          <th> Modifier</th>
          <th> Supprimer</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        
        <td >{{itemValue(item, "label")}}</td>
        <td >{{borrowedStatus(item.borrowed)}}</td>
        <td >{{item.type.label}}</td>
        <td >{{item.type.group.label}}</td>
        <td><button class="btn btn-info"><i class="fa fa-pencil" ></i></i></button> </td>
        <td><button class="btn btn-info"><i class="fa fa-trash-o"></i></button> </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>

  export default {
    name: 'lo-table',
    props: {
      columns: Array,
      data: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      borrowedStatus(borrowed) {
    return borrowed ? 'Emprunte' : 'Disponible';
  }
     
      
    }
  }

</script>

<style>

</style>
