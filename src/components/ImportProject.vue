<template>
    <div>
        <input type="text" v-model="color" />
        <p> {{ color }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
const color = ref("green");
</script>

<style scoped></style>