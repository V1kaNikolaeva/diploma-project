<template>

</template>

<script setup>
import { ref } from 'vue';


const modes = ref([]);

const mode = (modeName, message) => {
    modes.value.push({modeName: modeName, message: message})
}

const modeOff = () => {
    
    modes.value.shift()
}

</script>

<style scoped>

</style>