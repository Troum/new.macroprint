<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {PropType} from "vue";
import type {MaterialCardInterface} from "~/interfaces/components/MaterialCardInterface";
import slugify from "slugify";
import type {ExampleCardInterface} from "~/interfaces/components/ExampleCardInterface";

const props = defineProps({
  example: {
    type: Object as PropType<ExampleCardInterface>,
    required: true
  },
})

const cardWidth = ref<number>(200)
const cardHeight = ref<number>(200)

const slug = computed(() => {
  return slugify(props.example?.exampleTitle)
})

onMounted(() =>{
  const card = document.getElementById(`card_example_${slug.value}`)
  const cardImage = document.getElementById(`card_example_image_${slug.value}`)
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
      :id="`card_example_${slug}`"
      :ui="{background: 'bg-transparent', shadow: 'shadow-none', base: 'relative', ring: 'ring-0', divide: 'divide-none',body:{padding: 'px-0'}, header: {base: 'relative min-h-[129px]', padding: 'p-0'}, footer: {base: 'absolute bottom-0 w-full'}}">
    <template #header>
      <div class="min-h-[100px] top-0 left-0 right-0 bottom-0 rounded-sm">
        <SanityImage :id="`card_example_image_${slug}`"
                     fit="clip"
                     class="mx-auto"
                     :w="cardWidth" :asset-id="example.exampleImage?.asset._ref"/>
      </div>
    </template>
    <template #default>
      <client-only>
        <h3 class="font-bold mt-4 text-[18px] text-white">{{ example.exampleTitle }}</h3>
        <h4 class="font-bold my-2 text-[14px] text-punch-600">{{ example.exampleMaterial }}</h4>
        <div class="text-white">
          <ContentComponent :content="example.exampleDescription" />
        </div>
      </client-only>
    </template>
  </UCard>
</template>

<style scoped lang="scss">

</style>