<script setup lang="ts">
import type {PropType} from "vue";

defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true
  },
  dropdown: {
    type: Object as PropType<{label: string, route: string}>,
    required: true
  }
})

</script>

<template>
  <template v-if="items.length">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }"
               :ui="{container: 'z-20 group mp-menu__container', ring: 'ring-0', background: 'mt-[32px] bg-white', rounded: 'rounded-0', item: {rounded: 'rounded-0'}}">
      <UButton variant="ghost"
               color="white"
               :ui="{padding: {lg: 'px-0'}}"
               trailing-icon="i-heroicons-chevron-down-20-solid">{{ dropdown.label }}</UButton>
      <template #item="{item}">
        <RouterLink :to="item.route" class="flex gap-x-1 items-center before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-black before:rounded-full">
          <span>{{ item.label }}</span>
        </RouterLink>
      </template>
    </UDropdown>
  </template>
  <template v-else>
    <RouterLink :to="dropdown.route">
      <span class="text-sm">{{ dropdown.label }}</span>
    </RouterLink>
  </template>
</template>

<style scoped>

</style>