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
        <td><router-link :to="{ name: 'Obmod', params: { id: itemValue(item, '_id') } }"><button class="btn btn-info"><i class="fa fa-pencil" ></i></i></button> </router-link></td>
        <td><button class="btn btn-info" @click.prevent="deleteObject(item._id)"><i class="fa fa-trash-o"></i></button> </td>
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
  },

  async deleteObject(id) {
    const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  };
  fetch(`http://localhost:3000/object/${id}`, requestOptions)
    .then(async response => {
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      // reload the page
      location.reload();
    })
    .catch(error => {
      this.errorMessage = error;
      console.error('There was an error!', error);
    });
  }
     
      
    }
  }

</script>

<style>

</style>
