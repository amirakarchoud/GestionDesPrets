<!--définit le composant Vue qui est une page de tableau de bord de l'application de gestion de prêts d'objets.-->
<template>
  <div class="content">
    <div class="container-fluid">
      <!-- Stats cards -->
      <div class="row">
        <!-- Carte du nombre total des objets  -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-app text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Nombre des Objets</p>
              <h4 class="card-title" >{{nbrObj}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Mis à jour
            </div>
          </stats-card>
        </div>

         <!-- Carte du nombre des prets  -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-single-copy-04 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Nombre des Prêts</p>
              <h4 class="card-title">{{nbrPret}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Mis à jour
            </div>
          </stats-card>
        </div>

         <!-- Carte du nombre des prets ce mois  -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-badge text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">objets empruntés ce mois</p>
              <h4 class="card-title">{{numLoansThisMonth}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Mis à jour
            </div>
          </stats-card>
        </div>

         <!-- Carte du nombre total des types  -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-tag-content text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Nombre des types</p>
              <h4 class="card-title">{{nbrType}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Mis à jour
            </div>
          </stats-card>
        </div>

      </div>




      <div class="row">
         <!-- Carte contenant le logo et texte  -->
        <div class="col-md-8">
          <div class="card"><!----><!---->
<div class="card-body">
  <div class="container">
    <div class="image-container">
      <br>
      <br>
      <img src="../../public/img/logo.jpeg" class="blurred-image" alt="img">
    </div>
    <div class="text-container">
      <h1>Gestion des <u style="text-decoration: underline;
  text-decoration-color: #68d7ed;">Prêts</u> et des <u style="text-decoration: underline;
  text-decoration-color: #68d7ed;">objets</u></h1>
  <br>
      <p>Interface de gestion des prêts et objets du laboratoire d'informatique de Paris-Nord . </p>
      <br>
      <br>
      <br>
      <br>
      
    </div>
  </div>

        </div>
      </div>
        </div>
 <!-- Pie chart -->
        <div class="col-md-4" v-if="nbrObj > 0">
          <chart-card :chart-data="pieChart.data" chart-type="Pie" >
            <template slot="header">
              <h4 class="card-title">Les objets</h4>
              <p class="card-category">Statistiques selon l'etat</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Emprunté
                <i class="fa fa-circle text-danger"></i> Disponible
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> 
              </div>
            </template>
          </chart-card>
        </div>
      </div>
 <!-- Bar chart  -->
      <div class="row">
        <div class="col-md-6" v-if="done > 0">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Les Prêts</h4>
              <p class="card-category">Statistiques</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Demandes de prêt
                <i class="fa fa-circle text-danger"></i>Prêt En cours
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-6">
           <!-- Carte du l'histprique des demandes  -->
          <card>
            <template slot="header">
              <h5 class="title">Les demandes des Prêts</h5>
              <p class="category">Historique</p>
            </template>
            <l-table :data="this.pret"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.requester}} veut emprunter {{row.objects[0].label}} le {{new Date(row.date.borrow).toLocaleDateString('en-CA')}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

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
        done:0, 
        showChart: false,
        test:0,
        nbrObj:0,
        nbrType:0,
        nbrPret:0,
        borr:0,
        dispo:0,
        obj:[],
        pret:[],
        numLoansThisMonth:0,
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        //initialisation du pie chart
        pieChart: {
          data: {
            labels: [],
            series: []
          }
        },

        serieR:[0,0,0,0,0,0,0,0,0,0,0,0], // séries de valeurs des demandes de prets pour le graphique à barres
        serieB:[0,0,0,0,0,0,0,0,0,0,0,0], // séries de valeurs des prets en cours pour le graphique à barres
        //initialisation du bar chart
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
            [],
            []
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {}
      }
    },
    //surveiller les changements dans nbrObj et done pour appeler les méthodes updatePieChart() et updateBChart() lorsque ces variables changent.
    watch: {
  nbrObj: {
    handler(newVal, oldVal) {
      if (newVal !== 0) {
        this.updatePieChart();
      }
    }
  
    
  },
  done: {
    handler(newVal, oldVal) {
      if (newVal !== 0) {
        this.updateBChart();
      }
    }
  
    
  }
},

    methods:{
      // met à jour les données du graphique du pieChart en fonction du nombre d'objets empruntés et non empruntés dans obj.
      updatePieChart() {
        console.log('nbr obj');
        console.log(this.nbrObj);
        if(this.nbrObj!== 0)
    this.pieChart = {
      data: {
        labels: [`${this.borr} (${Math.round(this.borr/(this.nbrObj)*100)}%)`, `${this.dispo} (${Math.round(this.dispo/(this.nbrObj)*100)}%)`],
        series: [this.borr, this.dispo]
      }
    };
  },

  //met à jour les données du barChart en fonction des séries de valeurs de demandes de prêts et de prêts en cours dans serieR et serieB.
  updateBChart() {
    console.log('update');
    this.barChart = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              this.serieR,
              this.serieB
            ]
      }
    };
  },

  //méthode qui envoie une requête GET à l'API pour récupérer les données d'objets, puis met à jour le nombre des objets (nbrObj), 
  // nombre des objets empruntes (borr) et nombre des objets disponibles (dispo)
  async  countOb () { 

    await fetch("http://localhost:3000/object", {
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

      this.obj=data;
      const borrowedObjs = data.filter(obj => obj.borrowed === true);
    this.borr = borrowedObjs.length;
    const NotborrowedObjs = data.filter(obj => obj.borrowed === false);
    this.dispo = NotborrowedObjs.length;
      this.nbrObj = data.length;
      
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },



// méthode qui envoie une requête GET à l'API pour récupérer les données de types d'objets, puis met à jour nbrType
countType () { 

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

this.nbrType = data.length;
})
.catch(error => {
this.errorMessage = error;
console.error("There was an error!", error);
});
},



//méthode qui envoie une requête GET à l'API pour récupérer les données de prêts, puis met à jour
//le nombre total des prets nbrPret et remplit la variable pret avec les 8 derniers prêts enregistrés(historique des prets).
async fetchLoansAndCountThisMonth() {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  await fetch('http://localhost:3000/loan')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.nbrPret = data.length;
      this.pret=data.slice(0, 8);
      data.forEach(loan => {
        const r = new Date(loan.date.request);
        const rm = r.getMonth() + 1;
        if(loan.status=='Request')
        {      
          this.serieR[rm-1]=this.serieR[rm-1]+1;
        }
        else if(loan.status=='InProgress')
        {  const borrowDate = new Date(loan.date.borrow);
        const borrowMonth = borrowDate.getMonth() + 1;
        console.log(borrowMonth);
        this.serieB[borrowMonth-1]=this.serieB[borrowMonth-1]+1;
          if (borrowMonth === thisMonth) {
          this.numLoansThisMonth++;
        }
        }
        
        
      });
      //afficher le bar chart quand les donnees sont reccuperees 
      this.done=1;
      this.barChart = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              this.serieR,
              this.serieB
            ]
      }
    };
    })
    .catch(error => {
      console.error('Error fetching loans:', error);
    });
}




    },

async beforeMount(){
   
  await this.countOb();
  this.countType();
  await this.fetchLoansAndCountThisMonth();
  }
  
   
 }
</script>
<style>
.container {
  display: flex;
}

.image-container {
  width: 50%;
  overflow: hidden;
}

.blurred-image {
  border-radius: 8px;
  width: 100%;
}

.text-container {
  width: 50%;
  padding: 20px;
}
</style>
