<template>
  <card>
    <h4 slot="header" class="card-title">Ajouter un type d'objet</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Nom"
                    placeholder="Nom du type"
                    v-model="user.company">
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

      
       
      <div class="text-center">
      
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Ajouter Un Type
        </button>
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile" style="margin-right:10px">
          Retour
        </button>
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
      ]
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
