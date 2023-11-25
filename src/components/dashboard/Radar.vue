<script lang="ts">
import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);


export default {
    data() {
        return {
            data: ""
        }
    },
    mounted() {
        const ctx = document.getElementById('chartRadar');
        let chartRadar = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'QA',
                    'DevOps',
                    'Developer',
                    'Proces',
                    'Product'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [65, 59, 90, 81, 56],
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }, {
                        label: 'My Second Dataset',
                        data: [28, 48, 40, 19, 96],
                        fill: true,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)'
                    }
                ]
            },
            elements: {
                line: {
                    borderWidth: 1
                }
            }
        });
    },
    methods: {
    }
};


</script>

<template>
    <div>
        <h3> Team-Radar Chart</h3>
        <canvas id="chartRadar"></canvas>
    </div>
</template>
