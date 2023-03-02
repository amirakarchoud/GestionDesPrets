<template>
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th v-for="column in columns" :key="column">{{column}}</th>
            <th> Actions </th>
            
          </tr>
        </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in prets" :key="index">
        <slot :row="item">
          <td>{{ index +1 }}</td>
          <td >{{itemValue(item, "borrower")}}</td>
          <td >{{itemValue(item, "requester")}}</td>
          <td >{{itemValue(item, "manager")}}</td>
          <td >{{itemValue(item, "status")}}</td>
          <td><router-link :to="{ name: 'PretById', params: { id: itemValue(item, '_id') } }"><button class="btn btn-info"><i class="nc-icon nc-zoom-split" ></i></i></button> </router-link></td>        </slot>
      </tr>
      </tbody>
    </table>
  </template>
  <script>
    export default {
      name: 'lo-table',
      props: {
        columns: Array,
        data: Array,
        prets:Array
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
  