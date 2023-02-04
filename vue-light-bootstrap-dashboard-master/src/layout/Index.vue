<template>
  <div class="wrapper" style="background-color: #2d7fd6;">
    
      <div class="row align-items-center h-100">
        <div class="col-12" style="height:80%; padding-left:10%">
          <div class="card" style=" height:80%; width:80%">
            <div class="card-body">
              <div class="places-buttons" style="height:80%">
                
                <div class="row justify-content-center" style="height:80%;display: flex;justify-content: center;">
                  <div class="col-md-3" style="display: flex;justify-content: center;">
                    <button class="btn btn-default btn-block btn-info" style="margin-top:50%;margin-bottom:50%">
                      <router-link to="/admin">Gestionnaire</router-link>
                    </button>
                  </div>
                  <div class="col-md-3" style="display: flex;justify-content: center;">
                    <button class="btn btn-default btn-block btn-info" style="margin-top:50%;margin-bottom:50%">
                      <router-link to="/membre">Membre</router-link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card
    }
  }
</script>
<style>
.row.align-items-center.h-100 {
    height: 100vh;
    display: flex;
    align-items: center;
  }
</style>


