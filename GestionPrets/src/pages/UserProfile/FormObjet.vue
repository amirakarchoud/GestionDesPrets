<!-- Composant FormObjet.vue pour ajouter un nouvel objet dans la base de données-->
<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un objet</h4>
    <!-- Formulaire pour saisir les informations de l'objet -->
    <form>

<!-- -->

<!-- Champ pour saisir le label de l'objet-->
      <div class="row">
        <div class="col-md-5">
          <base-input id="labelOb" type="text"
                    label="Label"
                    placeholder="Nom objet"
                    v-model="data.label" style="width:280px;">
          </base-input>
        </div>
        
      </div>

<!--Champ pour sélectionner le groupe de l'objet -->


      <div class="row">
        <div class="col-md-6" >
        <label  for="group">Groupe </label>
         <br>
          <select id="g" v-model="group" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un groupe</option>
        <option v-for="option in optionsG" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>



<!-- Champ pour sélectionner le type de l'objet-->


      <div class="row">
        <div class="col-md-6" >
        <label  for="group">Type </label>
         <br>
          <select id="t" v-model="data.type" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un type</option>
        <option v-for="option in optionsT" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>




 <!-- Les boutons pour confirmer l'ajout ou annuler et retourner a la page precendente du tableau des objets-->    
       
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="created" :disabled="hasEmptyRequiredFields">
          Ajouter Un Objet
        </button>
        <router-link to="/admin/objet"> 
         <button type="submit" class="btn btn-info btn-fill float-right"  style="margin-right:10px">
          Retour
        </button></router-link>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  //import Card from 'src/components/Cards/Card.vue'
  import Notifications from 'vue-notification'
// Définition des propriétés du composant FormObjet
  export default {
    components: {
   //   Card
    },
    data () {
      return {
        //initialisation du data a remplir de l'objet cree
        data:{
          label:'',
          type:'',
          borrowed:false
          
        },
        //declaration des notifications a utiliser
        notifications: {
          success:{
          title: 'Objet a été ajouté avec succès!',
         
          type: 'success',
          duration: 3000,
          position: 'top-right',
          color: '#ffffff'
          },
          failure:{
           
          title: 'Erreur!',
          
          type: 'warning',
          duration: 3000,
          position: 'top-right',
          color: '#ffffdf'
          
          }
        
      },
      //initialisation des types 
        types:[],
        //initialisation du groupe d'objet selectionne
        group:'',
       
      selectedT: 'A',
      //liste des options de la liste deroulante des types
      optionsT: [
        
      ],
      //liste des options de la liste deroulante des groupes
      optionsG: [
        
      ]
      }
    },
     // Fonction de surveillance pour les changements de groupe de l'objet
    watch: {
      //si le groupe change on met a jour la liste deroulante des types 
      //si la valeur ancienne est la meme que la nouvelle valeur alors on change rien , sinon on met a jour la liste deroulante des types
  'group'(newValue, oldValue) {
    console.log("watch");
    if (newValue !== oldValue) {
      console.log("watch in");
      this.getTypes(newValue);
      console.log("watch after");
      console.log(this.optionsT);
    }
  }
},
computed: {
  //verification que les champs ne sont pas vides
    hasEmptyRequiredFields() {
      return !this.data.label || !this.data.type;
    }
  },
  //definition des methodes
    methods: {

      //methode POST pour ajouter un objet 
      created() {
  // POST request using fetch with error handling
  console.log(this.data);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data:{label:this.data.label , type:this.data.type }})
  };
  fetch('http://localhost:3000/object', requestOptions)
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        
        return Promise.reject(error);
      }

      this.postId = data.id;
//affichage de notification du succes
      this.$toast.success("Objet ajoute avec succes !", {
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
              //redirection vers le tableau des objets apres l'ajout
      this.$router.push('/admin/objet');
    })
    .catch(error => {
      this.errorMessage = error;
      this.$toast.error("Erreur !", {
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
            rtl: false,
          });
      console.error('There was an error!', error);
    });
},
//methode pour recuperer les type selon l'id du groupe 
//id: id du groupe
getTypes (id) { 
  console.log("types");

  console.log(this.types);
   
       this.optionsT=[];
       //remplir les options de la liste deroulante par les types du groupe selectionne
       
      this.optionsT= this.types.filter(o=>o.group==id).map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });

    
    
    
    },



//methode GET pour recuperer tous les types de la base
    getTypesAll () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/objectType", {
    "method": "GET",
    headers: {
      "Content-Type": "application/json"
    }
})
.then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      this.types= data;

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },

    



//methode GET pour recuperer tous les groupes de la base
    getGroupes () { 
      this.responseAvailable = false;

      fetch("http://localhost:3000/objectGroup", {
    "method": "GET",
    headers: {
      "Content-Type": "application/json"
    }
})
.then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      //remplir la liste des options des groupes
      this.optionsG= data.map(o => {
  return {
    text: o.label,
    value: o._id
  };
          });

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },

    },
//Appel des methodes avant que le composant FormObjet soit monté
beforeMount(){
  this.getTypesAll (); //pour reccuperer les types
  this.getGroupes();//pour reccuperer les groupes
 },

  }

</script>
<style>

</style>
