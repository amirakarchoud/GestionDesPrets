<template>
  <card>
    <h4 slot="header" class="card-title">Modifier la demande</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                      label="PRÊTTEUR"
                      placeholder="NOM"
                      v-model="borrower">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                      label="DEMANDEUR"
                      placeholder="NOM"
                      v-model="requester">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                      label="GESTIONNAIRE"
                      placeholder="NOM"
                      v-model="manager">
          </base-input>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6" >
          <label for="group">Groupe </label>
          <br>
          <select v-model="selectedGroup" style="width:280px; height:40px; border:1px solid #d8e1e6;">
            <option disabled value="">Veuillez selectionner un groupe</option>
            <option v-for="option in listGroup" :value="option._id">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6" >
          <label for="group">Type </label>
          <br>
          <select v-model="selectedType" style="width:280px; height:40px; border:1px solid #d8e1e6;">
            <option disabled value="">Veuillez selectionner un type</option>
            <option v-for="option in getFilterType" :value="option._id">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6" >
          <label for="group">Objet </label>
          <br>
          <select v-model="selectedObject" style="width:280px; height:40px; border:1px solid #d8e1e6;">
            <option disabled value="">Veuillez selectionner un objet</option>
            <option v-for="option in getFilterObject" :value="option._id">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6" >
          <label for="group">Date du pret </label>
          <br>
          <date-picker v-model="date" type="datetime"></date-picker>
        </div>
      </div>

      <!--<div class="row">
        <div class="col-md-6" >
          <label for="group">Signature éléctronique </label>
          <br>
          <input type="checkbox" id="checkbox" v-model="checked" style="border:1px solid #d8e1e6;">
          <label for="checkbox" style="margin-left:10px;">{{ checked }}</label>
        </div>
      </div>-->

      <div class="text-center">
        <router-link :to="{name: 'DemandeByIdAdmin'}">
          <button class="btn btn-info btn-fill float-right" @click="editRequest()">
            Modifier la demande
          </button>
        </router-link>
        <router-link :to="{name: 'DemandeByIdAdmin'}">
          <button type="submit" class="btn btn-info btn-fill float-right"  style="margin-right:10px">
            Retour
          </button>
        </router-link>
      </div>
      <div class="clearfix"></div>


    </form>
  </card>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  components: {DatePicker},
  name: "EditDemande",
  data(){
    return{
      borrower: '',
      requester: '',
      manager: '',
      listGroup: [],
      listType: [],
      listObject: [],
      selectedGroup:'',
      selectedType:'',
      selectedObject: [],
      date: '2023-03-14' ,
      dateReturn: '2090-12-30',
      checked: false,
      objectsId: []
    }
  },
  methods: {
    async getGroup() {
      const res = await fetch("http://localhost:3000/objectGroup");
      const finalRes = await res.json();
      this.listGroup = finalRes;
      //console.log(this.listGroup);
    },
    async getType() {
      const res = await fetch("http://localhost:3000/objectType");
      const finalRes = await res.json();
      this.listType = finalRes;
      //console.log(this.listType);
    },
    async getObject() {
      const res = await fetch("http://localhost:3000/object");
      const finalRes = await res.json();
      this.listObject = finalRes;
      console.log(this.listObject);
    },
    getObjectId(){this.objectsId = [];this.getFilterObject.forEach(item => this.objectsId.push(item._id)); return this.objectsId;},
    async editRequest() {
      this.$toast.success("La demande du prêt a été modifiée avec succès!", {
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
      const id = this.$route.params.id;
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: {borrower: this.borrower, requester: this.requester, manager: this.manager, date: {borrow: this.date, return: this.dateReturn}, status: 'InProgress', objects: this.getObjectId(), signature: {electronic_signature: this.checked}   }})
      };
      const res = await fetch(`http://localhost:3000/loan/${id}`, requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    },
    showLoan(){
      console.log(this.$route.params.data);
      this.borrower = this.$route.params.data[0].borrower;
      this.requester = this.$route.params.data[0].requester;
      this.manager = this.$route.params.data[0].manager;
      /*this.date = '2023-03-14 00:00:00';
      console.log(this.date);*/
      //this.selectedGroup =
    }
  },
  mounted() {
    this.getGroup();
    this.getType();
    this.getObject();
    this.showLoan();
    //console.log("aa");
  },
  computed:{
    getFilterType(){return this.listType.filter(t=> t.group==this.selectedGroup)},
    getFilterObject(){return this.listObject.filter(o=> (o.type._id==this.selectedType) && !o.borrowed)},
  },

}
</script>


