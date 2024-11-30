<script setup lang="ts">
import {ref} from 'vue'

const isOpen = ref<boolean>(false)
const icon = computed(() => {
  return isOpen.value ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'
})
</script>

<template>
  <UPopover @update:open="isOpen = !isOpen" :popper="{ placement: 'bottom-start' }">
    <UButton
        :icon="icon"
        color="black"
        size="xl"
        variant="link"
    />
    <template #panel>
      <div class="w-[300px]">
        <slot></slot>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>