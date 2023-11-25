<script lang="ts">
import { Chart, registerables } from 'chart.js/auto';

export default {
    data() {
        return {
            data: ""
        }
    },
    mounted() {
        const ctx = document.getElementById('chartTimeline');
        let chartTimeline = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'QA',
                    'DevOps',
                    'Developer',
                    'Proces',
                    'Product'
                ],
                datasets: [{
                    label: 'My first Chart Bar',
                    data: [65, 59, 70, 81, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            elements: {}
        });
    },

    methods: {
    }
};
</script>


<template>
    <div>
        <canvas id="chartTimeline"></canvas>
    </div>
</template>
