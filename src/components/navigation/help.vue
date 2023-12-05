<script lang="ts">

const activeClasses = "tab-active";

export default {
    name: 'help',
    data() { return {} },
    computed: {},
    methods: {
    }
}
</script>

<template>
    <div className="activeClasses">
        <a href="help" className="btn btn-secondary">
            Help
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M15 3.97998H12V1.97998C12 1.42998 11.55 0.97998 11 0.97998H5C4.45 0.97998 4 1.42998 4 1.97998V3.97998H1C0.45 3.97998 0 4.42998 0 4.97998V8.97998H3V7.97998H5V8.97998H11V7.97998H13V8.97998H16V4.97998C16 4.42998 15.55 3.97998 15 3.97998ZM10 3.97998H6V2.97998H10V3.97998ZM13 10.98H11V9.97998H5V10.98H3V9.97998H0V13.98C0 14.53 0.45 14.98 1 14.98H15C15.55 14.98 16 14.53 16 13.98V9.97998H13V10.98Z"
                    fill="currentColor" />
            </svg>
        </a>
    </div>
</template>
