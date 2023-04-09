<template>
    <div>
      <!-- Le conteneur de recherche et de sélection -->
     <div class="search-select-container">
       <!-- Barre de recherche par label-->
     <div class="search-box">
       <input type="text" v-model="searchText" placeholder="Rechercher Label...">
       <i class="nc-icon nc-zoom-split"></i>
     </div>
      <!-- liste déroulante pour le filtrage par groupe -->
     <div class="select-box">
       <select v-model="selectedType">
         <option value="">Tous les groupes</option>
         <option v-for="g in groups" :value="g.value" > {{ g.text }} </option>
       </select>
     </div>
   </div>
 <!-- Table des objets -->
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
     <tr v-for="(item, index) in filteredDataByText" :key="index">
       <slot :row="item">
         
         <td >{{itemValue(item, "label")}}</td>
         <td >{{borrowedStatus(item.borrowed)}}</td>
         <td >{{item.type.label}}</td>
         <td >{{item.type.group.label}}</td>
         <!-- Bouton pour modifier l'objet -->
         <td><router-link :to="{ name: 'Obmod', params: { id: itemValue(item, '_id') } }"><button class="btn btn-info"><i class="fa fa-pencil" ></i></i></button> </router-link></td>
         <!-- Bouton pour supprimer l'objet -->
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
       data: Array, //les objets a afficher dans le tableau
       groups:Array //tableau des groupes passes en parametre
     },
     data() {
     return {
       showModal: false,//initialisation du flag showModal
       objectId: null,
       selectedType: '',
       searchText: '', //initialisation du texte du recherche 
       searchTextFocus: false,
       selectedTypeFocus: false
     };
   },
   //filtrage des donnees selon les groupes ou le label
   computed: {
     filteredData() {
       if (!this.selectedType) {
         return this.data
       }
       return this.data.filter(item => item.type.group._id === this.selectedType)
     },
     filteredDataByText() {
       if (!this.searchText) {
         return this.filteredData;
       }
       return this.filteredData.filter(item => item.label.toLowerCase().includes(this.searchText.toLowerCase()));
     }
   },
     methods: {
 
       //methode pour afficher le message de confirmation
       showConfirmationModal(id) {
       this.objectId = id;
       this.showModal = true;
     },
     //methode pour cacher le message de confirmation
     hideConfirmationModal() {
       this.showModal = false;
     },
 
       hasValue (item, column) {
         return item[column.toLowerCase()] !== 'undefined'
       },
       itemValue (item, column) {
         return item[column.toLowerCase()]
       },
       //methode pour transformer le flag borrowed en 'emprunte' si il est a vrai sinon en 'disponible' si il est a faux
       borrowedStatus(borrowed) {
     return borrowed ? 'Emprunte' : 'Disponible';
   },
 
   //methode delete pour supprimer un objet de la base de donnees apres la confirmation
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
       //afficher la notification
       this.$toast.success("Objet supprimé avec succes !", {
                 position: "top-right",
                 timeout: 5000,
                 closeOnClick: true,
                 pauseOnFocusLoss: true,
                 pauseOnHover: true,
                 draggable: true,
                 draggablePercent: 0.6,
                 showCloseButtonOnHover: false,
                 hideProgressBar: true,
                 closeButton: "button",
                 icon: true,
                 rtl: false
               });
     })
     .catch(error => {
       this.errorMessage = error;
       console.error('There was an error!', error);
     });
   }
      
       
     }
   }
 
 </script>