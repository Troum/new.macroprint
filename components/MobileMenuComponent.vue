<script setup lang="ts">
import type {PropType} from "vue";

defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true
  }
})

</script>

<template>
  <template v-if="items.length">
    <UAccordion :items="items" variant="link" :ui="{default: {class: 'text-gray'}}">
      <template #default="{ item, close, open }">
        <template v-if="item?.content.length">
          <UButton color="gray" variant="link" :ui="{ rounded: 'rounded-none' }">
            <span class="truncate" :class="item?.content.length ? '' : 'px-6'">{{ item.label }}</span>
            <template #leading>
              <template v-if="item?.content.length">
                <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="w-5 h-5 transform transition-transform duration-200"
                    :class="[open && 'rotate-90']"
                />
              </template>
            </template>
          </UButton>
        </template>
        <template v-else>
          <RouterLink :to="item.route" class="text-sm text-gray-500 pl-9 pb-1.5">{{ item.label }}</RouterLink>
        </template>
      </template>
      <template #item="{ item }">
        <div class="pl-9">
          <template v-for="link of item.content">
              <RouterLink :to="link.route">
                <div>{{ link.label }}</div>
              </RouterLink>
          </template>
        </div>
      </template>
    </UAccordion>
  </template>
</template>

<style scoped>

</style>