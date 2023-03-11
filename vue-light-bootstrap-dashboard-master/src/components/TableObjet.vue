<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
          <th> Modifier</th>
          <th> Supprimer</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td >{{itemValue(item, "_id")}}</td>
        <td >{{itemValue(item, "label")}}</td>
        <td >{{itemValue(item, "borrowed")}}</td>
        <td >{{itemValue(item, "type")}}</td>
        <td><button class="btn btn-info"><i class="fa fa-pencil" ></i></button> </td>
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
      }
    }
  }
</script>
<style>

</style>
