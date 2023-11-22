<script lang="ts">
    import { defineComponent } from "vue";
    
    //onst items = ref('Item 1','Item 2','Item 3');

    export default defineComponent({
        
        data(){
            return {
                projectList:[],
                emptyList: "No projects found"
            }
        },
        methods:{
            projectsList: function(){
                
                const keys = Object.keys(localStorage)
                var i = keys.length;

                if(keys.length == 0){
                    this.projectList.push(this.emptyList)
                }
                else{
                    while ( i-- > 1 ) {            
                        this.projectList.push(keys[i])
                    }
                }
            }
        },
    });
</script>

<template>
    <div class="overflow-x-auto">
        <div class="divider divider-info">Select personal project</div>
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th align="left">Project Name</th>
            </tr>
            </thead>
            <tbody align="left">
                <tr v-for="project in projectList" :key="project.id"> <!-- Read projectList array -->
                <td v-text=project></td> <!--list project-->
                <td>
                    <button className="btn btn-primary">Open Project</button>
                </td>
                </tr>
            </tbody>
        </table>

        <button
            id="newProjectSubmit" 
            class="btn btn-primary"
            @click="projectsList"
            >Storage Project
        </button>
        <div class="divider divider-info">New personal project</div>      
    </div>
</template>
