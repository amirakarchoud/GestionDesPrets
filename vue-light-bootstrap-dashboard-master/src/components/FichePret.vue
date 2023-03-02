<template>

    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th v-for="column in columns" :key="column">{{column}}</th>
            <th> Actions </th>
            
          </tr>
        </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td>{{ index +1 }}</td>
          <td >{{itemValue(item, "borrower")}}</td>
          <td >{{itemValue(item, "requester")}}</td>
          <td >{{itemValue(item, "manager")}}</td>
          <td >{{itemValue(item, "status")}}</td>
          <td >{{itemValue(item, "comments")}}</td>
        
          <td>
          <tr v-for="(obj, index3) in dataobj" :key="index3">

              <td>
              <b>Objet {{ index3 +1 }} :</b> {{ obj[0].label }}
            </td>
            
          </tr>
        </td>
          <td>
              <b>Détails Signature :</b> 
              <br></br>
              <b>Electronique : </b>{{ item.signature.electronic_signature}}
              <br></br>
              <b>Preuve : </b>
              {{ item.signature.proof}}
              <br></br>
              <b>Code : </b>
              {{ item.signature.validation_code}}
          </td>
          <td>
            <button class="btn btn-info"><i class="fa fa-pencil" ></i></i></button>
            <button class="btn btn-info"><i class="fa fa-trash-o"></i></button> 
            <button @click="downloadPret()" class="btn btn-info"><i class="nc-icon nc-cloud-download-93"></i></button> 
            <br></br>
            <button class="btn btn-info"><i class="fa fa-question-circle" ></i></i>Perdu</button>
            <button class="btn btn-info"><i class="fa fa-refresh"></i>Retourné</button>
          </td>

        </slot>
      </tr>
      </tbody>
    </table>


  </template>
  <script>
    export default {
      name: 'lo-table',
      props: {
        columns: Array,
        data: Array,
        dataobj :Array
      },
      methods: {
        hasValue (item, column) {
          return item[column.toLowerCase()] !== 'undefined'
        },
        itemValue (item, column) {
          return item[column.toLowerCase()]
        },
        downloadPret () { 
              
              const id = this.$route.params.id;
              console.log("ID: ", id);
              this.responseAvailable = false;
              fetch(`http://localhost:3000/loan/${id}/download`, {
                "method": "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(response => response.blob())
              .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Pret.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              })
              .catch(error => console.error(error));

       },
      }
    }
  </script>
  <style>
  
  </style>
  