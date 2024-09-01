<script setup lang="ts">
import type {PropType} from "vue";
import type {PublicationCardInterface} from "~/interfaces/components/PublicationCardInterface";
import moment from "moment";

defineProps({
  publication: {
    type: Object as PropType<PublicationCardInterface>,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="`/blog/${publication.slug.current}`">
    <UCard :ui="{base: 'relative', ring: 'ring-0', divide: 'divide-none', header: {base: 'relative', padding: 'p-0'}}">
      <template #header>
        <SanityImage bg="b2e4ff" fit="clip" class="mx-auto" :asset-id="publication.preview_image.asset._ref"/>
      </template>
      <template #default>
        <client-only>
          <div class="flex items-center justify-start gap-x-1">
            <UIcon name="i-heroicons-calendar-days"></UIcon>
            <p class="text-[12px] mb-0">{{ moment(publication._createdAt).format('DD/MM/YYYY') }}</p>
          </div>
          <h3 class="capitalize font-bold text-[24px] text-punch-600 my-4">{{ publication.title }}</h3>
          <p class="line-clamp-4">{{ publication.preview_content }}</p>
        </client-only>
      </template>
    </UCard>
  </RouterLink>
</template>

<style scoped lang="scss">
</style>