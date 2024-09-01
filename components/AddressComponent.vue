<script setup lang="ts">
import type {PropType} from "vue";

defineProps({
  address: {
    type: Object as PropType<{ address_text: null, address_link: string|undefined }>,
    default: () => {
      return {}
    }
  }
})
</script>

<template>
<div class="flex flex-col gap-y-2">
  <p class="text-white text-[12px]">{{ address.address_text }}</p>
  <a class="text-[10px] text-white underline underline-offset-2" :href="address.address_link">Cмотреть на карте</a>
</div>
</template>

<style scoped>

</style>