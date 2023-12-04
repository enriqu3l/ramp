<script lang="ts">
    import { createNewContext, defaultContext } from "../helpers/contextOperations";
    import { useActor } from "@xstate/vue";
    import actor from "../state-machines/appMachine"

    export default{
        props: ['app'],
        setup() {
            const { state, send } = useActor(actor);
            return {
                state,
                newProject: (projectType, projectName) => {
                    send({ type: "NEW_PROJECT", data: { projectType, projectName }});
                }
            };
        },
        data() {
            return {
                inputProjectName: "",
                projectType: this.app,
            }
        },
        mounted() {
            //No longer needed as we are using props
            //let params = (new URL(window.location.href)).searchParams;
            //this.projectType = params.get("app");

            //Example of how to load the context
            //send({ type: "LOAD" });
        },
        methods: {
            submit: function(e) {
                e.preventDefault();
                const projectExists = window.localStorage.getItem(this.inputProjectName);

                if (!projectExists) {
                    let projectName = this.projectType + "_" + this.inputProjectName;
                    this.newProject(this.projectType, projectName);
                } else {
                    alert(
                        `Project ${this.inputProjectName} already exist, please choose a different name`
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
                v-model="inputProjectName"
                type="text"
                placeholder="Project's name"
                class="input input-bordered input-primary w-full max-w-xs"
                name="inputProjectName"
                required
            />
            <button type="submit" id="newProjectSubmit" class="btn btn-primary"
                >Create new Project
            </button>
        </div>
    </form>
</template>
