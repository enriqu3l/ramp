<script lang="ts">

const activeClasses = "tab-active";

export default {
    name: 'saveProject',
    data() { return {} },
    computed: {},
    methods: {}
}
</script>

<template>
    <div className="activeClasses">
        <a>
            <button onClick:{exportProject} className="btn btn-ghost mr-2">
                Save Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="ml-2">
                    <g clipPath="url(#clip0_514_42)">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M7.98999 -0.0100098C3.56999 -0.0100098 -0.0100098 3.56999 -0.0100098 7.98999C-0.0100098 12.41 3.56999 15.99 7.98999 15.99C12.41 15.99 15.99 12.41 15.99 7.98999C15.99 3.56999 12.41 -0.0100098 7.98999 -0.0100098ZM11.7 9.69999L8.69999 12.7C8.51999 12.88 8.26999 12.99 7.98999 12.99C7.70999 12.99 7.45999 12.88 7.27999 12.7L4.27999 9.69999C4.09999 9.51999 3.98999 9.26999 3.98999 8.98999C3.98999 8.43999 4.43999 7.98999 4.98999 7.98999C5.26999 7.98999 5.51999 8.09999 5.69999 8.27999L6.98999 9.56999V3.98999C6.98999 3.43999 7.43999 2.98999 7.98999 2.98999C8.53999 2.98999 8.98999 3.43999 8.98999 3.98999V9.57999L10.28 8.28999C10.46 8.10999 10.71 7.99999 10.99 7.99999C11.54 7.99999 11.99 8.44999 11.99 8.99999C11.99 9.26999 11.88 9.51999 11.7 9.69999Z"
                            fill="currentColor" />
                    </g>
                    <defs>
                        <clipPath id="clip0_514_42">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </a>
    </div>
</template>
