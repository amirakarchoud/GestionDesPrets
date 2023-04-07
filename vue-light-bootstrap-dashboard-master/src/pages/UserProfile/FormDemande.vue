<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter une demande</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <label for="group">EMPRUNTEUR </label>
          <br>
          <select v-model="selectedBorrower" style="width:280px; height:40px; border:1px solid #d8e1e6;">
            <option disabled value="">Veuillez selectionner un emprunteur</option>
            <option v-for="borrower in listBorrower" :value="borrower">
              {{ borrower }}
            </option>
          </select>
        </div>
      </div>
      <!--<div class="row">
        <div class="col-md-5">
          <base-input type="text"
                      label="DEMANDEUR"
                      placeholder="NOM"
                      v-model="requester">
          </base-input>
        </div>
      </div> -->
      <!--
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                      label="GESTIONNAIRE"
                      placeholder="NOM"
                      v-model="manager">
          </base-input>
        </div>
      </div> -->


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

      <!--<div class="row">
        <div class="col-md-6" >
          <label for="group">Objet </label>
          <br>
          <select v-model="selectedObject">
            <option disabled value="">Veuillez selectionner un objet</option>
            <option v-for="option in getFilterObject" :value="option._id">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div> -->

      <vue-multi-select
        ref="multiSelect"
        v-model="selectedObject"
        search
        :options="options"
        :btnLabel="btnLabel"
        @open="open"
        @close="close"
        :selectOptions="getFilterObject">
        <template v-slot:option="{option}">
          <input type="checkbox" :checked="option.selected"/>
          <span>  {{option.label}}</span>
        </template>
      </vue-multi-select>

      <div class="row">
        <div class="col-md-5">
          <label for="textarea-default">COMMENTAIRES</label>
          <b-form-textarea type="text"
                           placeholder="COMMENTAIRE"
                           v-model="comments">
            ></b-form-textarea>
        </div>
      </div>
      <!--
      <div class="row">
        <div class="col-md-6" >
          <label for="group">Date du pret </label>
          <br>
          <date-picker v-model="date" type="datetime"></date-picker>
        </div>
      </div>  -->

      <!--<div class="row">
        <div class="col-md-6" >
          <label for="group">Signature éléctronique </label>
          <br>
          <input type="checkbox" id="checkbox" v-model="checked" style="border:1px solid #d8e1e6;">
          <label for="checkbox" style="margin-left:10px;">{{ checked }}</label>
        </div>
      </div> -->

      <div class="text-center">
        <router-link to="/membre/demande">
        <button type="submit" class="btn btn-info btn-fill float-right" @click="createLoan">
          Ajouter Une demande
        </button>
        </router-link>
        <router-link to="/membre/demande">
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
import moment from "moment";
import vueMultiSelect from 'vue-multi-select';
import 'vue-multi-select/dist/lib/vue-multi-select.css';
export default {
  components: { DatePicker, vueMultiSelect },
  name: "FormDemande",
  data() {
    return {
      listBorrower: ['lipn admin','fatma','omar'],
      requester: 'lipn requester',
      manager: 'lipn admin',
      listGroup: [],
      listType: [],
      listObject: [],
      selectedBorrower:'',
      selectedGroup:'',
      selectedType:'',
      selectedObject: [],
      checked: false,
      objectsId: [],
      comments: '',
      values: [],
      btnLabel: values => `${this.selectedObject.map(object => object.label )}`,
      options: {
        multi: true,
        groups: false,
      },
    }
  },
  methods: {
    findLoanById(id) {
      return this.listLoans.find(loan => loan._id === id);
    },
    async getGroup() {
      const res = await fetch("http://localhost:3000/objectGroup");
      this.listGroup = await res.json();
      //console.log(this.listGroup);
    },
    async getType() {
      const res = await fetch("http://localhost:3000/objectType");
      this.listType = await res.json();
      //console.log(this.listType);
    },
    async getObject() {
      const res = await fetch("http://localhost:3000/object");
      this.listObject = await res.json();
      console.log(this.listObject);
    },
    getObjectId() {
      this.objectsId = [];
      this.getFilterObject.forEach(item => this.objectsId.push(item._id));
      return this.objectsId;
    },
    async createLoan() {
      //console.log(this.date);
      //alert(this.date);
      //alert(moment(this.date).format());
      this.date = moment().format();
      this.$toast.success("La demande du prêt a été crée avec succès!", {
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
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          data: {
            borrower: this.selectedBorrower,
            requester: this.requester,
            manager: this.manager,
            date: {request: this.date},
            status: 'Request',
            comments: this.comments,
            objects: this.getObjectId(),
            signature: {}
          }
        })
      };
      const res = await fetch('http://localhost:3000/loan', requestOptions)
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
    openManually() {
      this.$refs.multiSelect.openMultiSelect();
    },
    open() {
      console.log('open');
    },
    close() {
      console.log('close');
    },
  },
  mounted() {
    this.getGroup();
    this.getType();
    this.getObject();
  },
  computed:{
    getFilterType(){console.log(this.selectedGroup); return this.listType.filter(t=> t.group===this.selectedGroup); },
    getFilterObject(){console.log(this.selectedType); return this.listObject.filter(o=> (o.type._id===this.selectedType) && !o.borrowed);},
  },

}
</script>


