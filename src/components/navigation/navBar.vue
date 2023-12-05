<script lang="ts">
import actionItem from './actionItems.vue';
import dashboard from './dashboard.vue';
import runSession from './runSession.vue';
import saveProject from './saveProject.vue';
import help from './help.vue';

const currentUrl = window.location.pathname;
const arrayUrl = currentUrl.split('/');

export default {
    data() {
        return {
            backSelectProjectPage: '',
        }
    },
    created() {
        this.backSelectProjectPage = "http://" + location.host + "/select-project?app=" + arrayUrl[1]
    },
    components: {
        actionItem,
        dashboard,
        runSession,
        saveProject,
        help,
    },
    computed: {
        projectSelected() {
            return this.projectName = window?.localStorage.getItem("currentProject") || "";
        }
    },
    methods: {
    }
}
</script>

<template>
    <div>
        <div className="navbar bg-base-100">

            <a v-bind:href=this.backSelectProjectPage className="btn btn-ghost normal-case text-xl">
                🏠
            </a>
            <a className="flex-1">
                Current Project: {{ this.projectSelected }}
            </a>
            <a>
                <dashboard />
            </a>
            <a>
                <runSession />
            </a>
            <a>
                <actionItem />
            </a>
            <a>
                <saveProject />
            </a>
            <a>
                <help />
            </a>

        </div>
    </div>
</template>
