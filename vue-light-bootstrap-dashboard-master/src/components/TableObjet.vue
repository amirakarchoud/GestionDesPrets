<template>
   <div>
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
        <td><button class="btn btn-info" @click.prevent="showConfirmationModal(item._id)"><i class="fa fa-trash-o"></i></button> </td>
      </slot>
    </tr>
    </tbody>
  </table>


 
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p>Etes vous sur de supprimer cet objet ?</p>
      <div class="modal-buttons">
        <button class="btn btn-danger" @click="deleteObject()">Supprimer</button>
        <button class="btn btn-secondary" @click="hideConfirmationModal()">Cancel</button>
      </div>
    </div>
  </div>



</div>
</template>




<script>
import Notifications from 'vue-notification'

  export default {
    name: 'lo-table',
    props: {
      columns: Array,
      data: Array
    },
    data() {
    return {
      showModal: false,
      objectId: null,
    };
  },
    methods: {

      showConfirmationModal(id) {
      this.objectId = id;
      this.showModal = true;
    },
    hideConfirmationModal() {
      this.showModal = false;
    },

      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      borrowedStatus(borrowed) {
    return borrowed ? 'Emprunte' : 'Disponible';
  },

  async deleteObject() {
    const id=this.objectId;
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
      this.hideConfirmationModal();
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 350px;
  background-color: #fff;
  border-style: double;
  border-color: #68d7ed;
  border-width: medium;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}


</style>
