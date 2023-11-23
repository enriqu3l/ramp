<script lang="ts">
    import { appNames } from "../helpers/constants";
    import { createNewContext } from "../helpers/contextOperations";

    export default{
        data() {
            return {
                projectName: "",
                projectType: ""
            }
        },
        methods: {
            submit: function(e) {
                e.preventDefault();
                const projectExists = window.localStorage.getItem(this.projectName);

                let context = createNewContext(appNames.TEAM_HEALTH);

                if (!projectExists) {
                    window.localStorage.setItem(
                        this.projectName,
                        JSON.stringify(context)
                    );
                    window.localStorage.setItem("currentProject", this.projectName);
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
