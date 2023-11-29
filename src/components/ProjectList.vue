<script lang="ts">

    import { defineComponent } from "vue";
    import { APPS } from "../helpers/constants";
    import { daysPassed } from "../helpers/date";

    export default defineComponent({
        
        data() {
            return {
                projectType: "",
                projectList:[],
            }
        },
        mounted() {
            let params = (new URL(window.location.href)).searchParams;
            this.projectType = params.get("app");
        },
        computed: {            
            projectsList() {
                

                let projectKeys: string[] = [];
                if (window?.localStorage) {

                    const keys = Object.keys(window.localStorage);                              
                    projectKeys = keys.filter((key) => {
                        
                        const dataStr = window.localStorage.getItem(key);   
                        if (typeof dataStr !== "string") {
                            return false;
                        }
                        try {
                            const data = JSON.parse(dataStr);
       
                            return (
                                data &&
                                data.hasOwnProperty("runSessions") &&
                                data.hasOwnProperty("actionItems") &&
                                data.hasOwnProperty("type") &&
                                data.type === APPS[this.projectType].code
                            );
                        } catch (error) {
                            return false;
                        }
                    });
                }

                this.projectList = projectKeys
                .map((key) => {
                    
                    const dataStr = window.localStorage.getItem(key);
                    
                    if (typeof dataStr !== "string") {
                        return {
                            name: key,
                            lastRunSession: -1,
                        };
                    }
                    const data = JSON.parse(dataStr);
                    return {
                        name: key,
                        lastRunSession: daysPassed(data.runSessions.at(-1).date),
                        type: data.type,
                    };
                })                
                .filter((project) => project.lastRunSession !== -1) // filter out projects that are invalid
                .sort((a, b) => b.lastRunSession - a.lastRunSession); // sort by last run session oldest first
                
                if (this.projectList.length === 0) {
                    return "No projects found";
                }
            },
        },
        methods: {
            chooseProject: function(projectName: string) {
                window.localStorage.setItem("currentProject", projectName);
                window.location.href = "dashboard";
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
                <th>Project Name</th>
                <th>Last Session</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {{ this.projectsList }}                
                <tr v-for="project in this.projectList">
                    <td>{{ project.name }}</td>
                    <td> {{ project.lastRunSession }} days ago </td>
                    <td v-if="project.name !== 'No projects found'">
                        <button
                            class="btn btn-primary"
                            @click="chooseProject(project.name)"
                            >
                                Open Project
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="divider divider-info">New personal project</div>      
    </div>
</template>
