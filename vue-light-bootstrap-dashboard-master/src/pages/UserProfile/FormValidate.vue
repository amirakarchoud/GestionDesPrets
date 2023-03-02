<template>
    <card>
      <h4 slot="header" class="card-title">Valider Demande </h4>
      <form>
  
      <div class="row">
          <div class="col-md-5">
            <div>Code de Validation</div>
            <base-input type="text"
                      placeholder="code"
                     >
            </base-input>
          </div>
          
        </div>

        <div class="row">
            <div class="col-md-5">
                <div> Type Signature </div>
                <br></br>

            <input type="radio" id="electronic" value="Electronic" v-model="picked" />
            <label for="electronic"> Electronique </label>
            <br></br>
            <input type="radio" id="manuel" value="Manuel" v-model="picked" />
            <label for="manuel">  Manuel </label>
        </div>
        </div>
      
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="validate">
            Valider Demande
          </button>
          <router-link to="/admin/demande"> 
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
            code:'',
            type:''
            
          },
         
          picked:'',
          
        }
      },
      methods: {
        validate() {
            /*
            console.log(this.data);
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data:{code:this.data.code , type:this.data.type }})
            };
            fetch('http://localhost:3000/validate', requestOptions)
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
            */

  }
  
      }
    }
  
  </script>
  <style>
  
  </style>
  