<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un objet</h4>
    <form>


    <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Identifiant du l'objet"
                    placeholder="ID"
                    v-model="user.id">
          </base-input>
        </div>
        
      </div>




      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Label"
                    placeholder="Nom objet"
                    v-model="data.label">
          </base-input>
        </div>
        
      </div>



      <div class="row">
        <div class="col-md-6" >
        <label for="group">Groupe </label>
         <br>
          <select v-model="selected" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un groupe</option>
        <option v-for="option in options" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>



      <div class="row">
        <div class="col-md-6" >
        <label for="group">Type </label>
         <br>
          <select v-model="data.type" style="width:280px; height:40px; border:1px solid #d8e1e6;">
          <option disabled value="">Veuillez selectionner un type</option>
        <option v-for="option in optionsT" :value="option.value">
             {{ option.text }}
         </option>
          </select>
        </div>
       
      </div>




      
       
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="created">
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
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        data:{
          label:'',
          type:'',
          borrowed:false
          
        },
        user: {
          company: '',
          username: 'michael23',
          email: '',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Melbourne, Australia',
          city: 'melbourne',
          country: 'Australia',
          postalCode: '',
          aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
        },
        selected: 'A',
      options: [
        { text: 'Cles', value: 'A' },
        { text: 'Badges', value: 'B' },
        { text: 'Cartes', value: 'C' }
      ],
      selectedT: 'A',
      optionsT: [
        { text: 'Bureau', value: '111111111111111111111111' },
        { text: 'Salles', value: '222222222222222222222222' },
        { text: 'Labo', value: '333333333333333333333333' }
      ]
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },

      testClic(){
          console.log(this.data);
      },



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
