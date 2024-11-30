<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {PropType} from "vue";
import type {ProductCardInterface} from "~/interfaces/components/ProductCardInterface";

const props = defineProps({
  product: {
    type: Object as PropType<ProductCardInterface>,
    required: true
  }
})

const cardWidth = ref<number>(200)
const cardHeight = ref<number>(200)

onMounted(() =>{
  const card = document.getElementById(`card_${props.product.slug.current}`)
  const cardImage = document.getElementById(`card_image_${props.product.slug.current}`)
  if (card) {
    cardWidth.value = Math.ceil(card.getBoundingClientRect().width)
  }
  if (cardImage) {
    cardHeight.value = Math.ceil(cardImage.getBoundingClientRect().height)
  }

})
</script>

<template>
  <template v-if="product && product.slug">
    <UCard
        :id="`card_${product.slug?.current}`"
        :ui="{base: 'relative', shadow: 'shadow-lg', ring: 'ring-0', divide: 'divide-none', header: {base: 'relative h-[200px]', padding: 'p-0'}, footer: {base: 'absolute bottom-0 w-full'}}">
      <template #header>
        <div class="min-h-[200px] max-h-[200px] absolute top-0 left-0 right-0 bottom-0">
          <SanityImage :id="`card_image_${product.slug.current}`" bg="b2e4ff" fit="clip" class="mx-auto" :w="cardWidth" :asset-id="product.preview_image?.asset._ref"/>
        </div>
        <div
            class="absolute flex items-center justify-center bg-punch-600 rounded-xl left-4 top-[calc(100%-80px)] md:top-[calc(100%-50px)] w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
          <SanityImage class="mx-auto" :asset-id="product.icon?.asset._ref" :w="30" :h="30"/>
        </div>
      </template>
      <template #default>
        <client-only>
          <h3 class="capitalize font-bold mt-4 lg:mt-10 text-[16px] md:text-[24px]">{{ product.title }}</h3>
          <p class="line-clamp-3">{{ product.preview_content }}</p>
        </client-only>
      </template>
      <template #footer>
        <RouterLink :to="`/production/${props.product.slug.current}`">
          <UButton variant="link" :padded="false" color="punch" class="line"
                   :ui="{variant: {link: 'text-punch-500 hover:text-punch-700'}}">
            <span class="uppercase font-bold text-[10px]">Подробнее</span>
          </UButton>
        </RouterLink>
      </template>
    </UCard>
  </template>
</template>

<style scoped lang="scss">
.line {
  position: relative;

  &::after {
    position: absolute;
    right: -35%;
    content: '';
    display: block;
    height: 1px;
    width: 30%;
    background: #f9b7a8;
  }

  &::before {
    position: absolute;
    right: -85%;
    content: '';
    display: block;
    height: 1px;
    width: 55%;
    background: #fde8e3;
  }
}
</style>