<script lang="ts">
  import { importCsv, type ImportedProjectData } from "../helpers/import"

  export default{
    data(){
      return {
        fileName:'',
        second:'',
        inpCount: 0
      };
    },
    computed:{},
    methods:{
      
      onChange: function(e){

        const fr = new FileReader();
        
          fr.onload = (e) => {
            let project: ImportedProjectData;
            try {
              project = importCsv(e.target.result as string);
            } catch (error) {
              console.error(
                "An error ocurred while parsing the csv file please contact the maintainer of this tool"
              );
              return;
            }

            window.localStorage.setItem(project.name, JSON.stringify(project.data));
            window.location.reload();
          };

        const file = e.target.files[0];

        if (file) {
          fr.readAsText(file);
        }
      }
    }
  };
</script>

<template>
  <div>
    <label class="btn btn-primary" for="importFile">    
      Import Project
    </label>
    
    <input 
      type="file"
      style="visibility:hidden"
      accept=".csv"
      id="importFile"
      @change="onChange"
      />
      
    <p v-text="fileName"></p>

  </div>
</template>
