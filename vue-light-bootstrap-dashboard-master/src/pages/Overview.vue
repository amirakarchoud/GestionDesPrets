<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
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

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
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

      <div class="row">
        <div class="col-md-6">
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
                <i class="fa fa-circle text-info"></i> Validé
                <i class="fa fa-circle text-danger"></i> En cours
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-6">
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
        pieChart: {
          data: {
            labels: [],
            series: []
          }
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
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

    methods:{
      countOb () { 

      fetch("http://localhost:3000/object", {
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
      console.log("here");
      
    console.log("here 2");
    console.log(this.nbrObj);
   console.log(this.borr);
   console.log(this.dispo);
   console.log(Math.round(this.borr/(this.nbrObj)*100));
   console.log(Math.round(this.dispo/(this.nbrObj)*100));

      this.pieChart = {
      data: {
        labels: [`${this.borr} (${Math.round(this.borr/(this.nbrObj)*100)}%)`, `${this.dispo} (${Math.round(this.dispo/(this.nbrObj)*100)}%)`],
        series: [this.borr, this.dispo]
      }
  
    };
      
      console.log(this.pieChart);
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
    },








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




fetchLoansAndCountThisMonth() {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  fetch('http://localhost:3000/loan')
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
        const borrowDate = new Date(loan.date.borrow);
        const borrowMonth = borrowDate.getMonth() + 1;
        if (borrowMonth === thisMonth) {
          this.numLoansThisMonth++;
        }
      });
    })
    .catch(error => {
      console.error('Error fetching loans:', error);
    });
}




    },

    beforeMount(){
   this.countOb();
   this.countType();
   this.fetchLoansAndCountThisMonth();
  
   
 },
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
