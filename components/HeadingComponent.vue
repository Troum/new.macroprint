<script setup lang="ts">
defineProps({
  heading: {
    type: String,
    required: true
  }
})
</script>

<template>
<h2 class="mp-heading">{{ heading }}</h2>
</template>

<style scoped>

</style>