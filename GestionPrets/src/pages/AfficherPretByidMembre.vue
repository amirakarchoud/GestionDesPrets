 <!-- Ce fichier représente la récupération des données d'un prêt particulière -->

 <template>
    <div class="content">
      <div class="container-fluid">
        <!---------------->
         <div class="col-12 ">
      
        <div class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover"
                  body-classes="table-full-width table-responsive"
            >
              <template slot="header">
                <h4 class="card-title">Le Prêt</h4>
                <p class="card-category"></p>
              </template>
              <lop-table class="table-hover table-striped"
                       :columns="table1.columns"
                       :data="result" 
                       >
                       
              </lop-table>
              <br>
              <table class="table"> 
              <tbody > 
                <tr><td> <b> Objets </b> </td><td ><lo-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="loanObjects"
                     :groups="groups">
                     
            </lo-table></td></tr>
              </tbody>
            </table>
              
            </card>
          </div>
        </div>
        <div class="row justify-content-center">
      <!-- Exécution de la méthode goback() suite au clic sur le bouton de Retour 
      <div class="col-md-3"><button  @click="goBack()" class="btn btn-default btn-block btn-info"><i class="nc-icon nc-stre-left"></i> Retour</button></div>
    -->
  
      <div class="col-md-3"><router-link to="/membre/pret"><button class="btn btn-default btn-block btn-info"><i class="nc-icon nc-stre-left"></i> Retour</button></router-link></div>
    </div>
      </div>
    
        </div>
      </div>
  </div>
  </template>

<script>
import LopTable from 'src/components/FichePretMembre.vue'

import LoTable from 'src/components/TableObjetPret.vue'
const tableData = []

export default {
  components: {
    LopTable,
    LoTable
  },
  // Déclaration de l'ensemble des variables nécessaires
  data () {
    return {
      table1: {
        
        data: [...tableData],
        dataobj: [...tableData],
        datatype: [...tableData],
        datagroupe: [...tableData]
      },
      
      result:{},
      objects: [],
      responseAvailable: false,
      groups:[],
      loanObjects:[],
      isLoading: true
     
   
    }
  },
 

methods: {

//methode  pour reccuperer les groupes de la base de donnees 
async getGroupes () { 
      this.responseAvailable = false;

     await fetch("http://localhost:3000/objectGroup", {
      "method": "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async response => {
      const data = await response.json();

      // Vérification des erreurs
      if (!response.ok) {
        // Récupération du message d'erreur depuis le corps de la réponse ou le texte par défaut
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      //remplir la liste des groupes pour le filtre
      //format text,value 
      this.groups= data.map(o => {
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


  //Méthode pour le reour à la page précedente
  goBack() {
      window.history.go(-1);
    },

  //Méthode pour récupérer un prêt spécifique selon son identifiant unique
  async afficherPretByIdMembre () { 
    
    const id = this.$route.params.id;
    this.responseAvailable = false;
  //Appel à l'API de loan/id en lui fournissant l'identifiant récupérer dans l'URL
   await fetch(`http://localhost:3000/loan/${id}`, {
    "method": "GET",
    headers: {
      "Content-Type": "application/json"
    }
    }).then(async response => {
     
      const data = await response.json();
      // Vérification des erreurs
      if (!response.ok) {
        // Récupération du message d'erreur depuis le corps de la réponse ou le texte par défaut
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      this.result= data;
      //objj
      this.responseAvailable = false;
      await fetch("http://localhost:3000/object", {
      "method": "GET",
      headers: {
      "Content-Type": "application/json"
    }
    })
    .then(async response => {
      const data = await response.json();
      // Vérification des erreurs
      if (!response.ok) {
        // Récupération du message d'erreur depuis le corps de la réponse ou le texte par défaut
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.responseAvailable=true;
      //remplir la liste des groupes pour le filtre
      //format text,value 
      this.objects= data;
      this.loanObjects = this.objects.filter((obj) => this.result.objects.includes(obj._id));
      this.isLoading = false;

    })
    .catch(error => {
      this.errorMessage = error;
      console.error("Erreur dans la récupération de déatils de prêt", error);
    });
    console.log("DATAATATAT", data);
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("Erreur dans la récupération de déatils de prêt", error);
    });

}


},
async beforeMount(){
  await this.afficherPretByIdMembre();
  this.isLoading = true;
  await Promise.all([this.afficherPretByIdMembre(), this.getGroupes()]);
}
}

</script>
<style>
</style>
