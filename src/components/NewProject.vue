<script lang="ts">
    import { createNewContext } from "../helpers/contextOperations";
    import { useActor } from "@xstate/vue";

    export default{
        data() {
            return {
                projectName: "",
                projectType: ""
            }
        },
        mounted(){
            let params = (new URL(window.location.href)).searchParams;
            this.projectType = params.get("app");
        },
        methods: {
            submit: function(e) {
                e.preventDefault();
                console.log("projectType: ", this.projectType);
                const projectExists = window.localStorage.getItem(this.projectName);
                
                let context = createNewContext(this.projectType);

                if (!projectExists) {
                    let currentProject = this.projectType + "_" + this.projectName;
                    window.localStorage.setItem(
                        currentProject,
                        JSON.stringify(context)
                    );
                    window.localStorage.setItem("currentProject", currentProject);
                    window.location.href = "dashboard";
                } else {
                    alert(
                        `Project ${this.projectName} already exist, please choose a different name`
                    );
                }
            }
        }
    };
</script>

<template>
    <form @submit="submit">
        <div class="input-group">
            <input
                v-model="projectName"
                type="text"
                placeholder="Project's name"
                class="input input-bordered input-primary w-full max-w-xs"
                name="projectName"
                required
            />
            <button type="submit" id="newProjectSubmit" class="btn btn-primary"
                >Create new Project
            </button>
        </div>
    </form>
</template>
