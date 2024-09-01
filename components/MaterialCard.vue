<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {PropType} from "vue";
import type {MaterialCardInterface} from "~/interfaces/components/MaterialCardInterface";
import slugify from "slugify";

const props = defineProps({
  material: {
    type: Object as PropType<MaterialCardInterface>,
    required: true
  },
})

const cardWidth = ref<number>(200)
const cardHeight = ref<number>(200)

const slug = computed(() => {
  return slugify(props.material?.materialTitle)
})

onMounted(() =>{
  const card = document.getElementById(`card_material_${slug.value}`)
  const cardImage = document.getElementById(`card_material_image_${slug.value}`)
  if (card) {
    cardWidth.value = Math.ceil(card.getBoundingClientRect().width)
  }
  if (cardImage) {
    cardHeight.value = Math.ceil(cardImage.getBoundingClientRect().height)
  }

})
</script>

<template>
  <UCard
      :id="`card_material_${slug}`"
      :ui="{base: 'relative', ring: 'ring-0', divide: 'divide-none', header: {base: 'relative min-h-[129px]', padding: 'p-0'}, footer: {base: 'absolute bottom-0 w-full'}}">
    <template #header>
      <div class="min-h-[200px] absolute top-0 left-0 right-0 bottom-0 rounded-sm">
        <SanityImage :id="`card_material_image_${slug}`"
                     bg="b2e4ff"
                     fit="clip"
                     class="mx-auto"
                     :w="cardWidth" :asset-id="material.materialImage?.asset._ref"/>
      </div>
    </template>
    <template #default>
      <client-only>
        <h3 class="capitalize font-bold mt-10 mb-4 text-[24px]">{{ material.materialTitle }}</h3>
        <ContentComponent :content="material.materialDescription" />
      </client-only>
    </template>
  </UCard>
</template>

<style scoped lang="scss">

</style>