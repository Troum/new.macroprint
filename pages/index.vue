<script setup lang="ts">
import _ from "lodash"
import {ref, onMounted} from "vue"
import {useWindowSize} from "@vueuse/core";
import {VueperSlide, VueperSlides} from "vueperslides";
import type {ProductCardInterface} from "~/interfaces/components/ProductCardInterface";
import type {PublicationCardInterface} from "~/interfaces/components/PublicationCardInterface";
import type {VacancyInterface} from "~/interfaces/components/VacancyInterface";
import ContentComponent from "~/components/ContentComponent.vue";
import groq from "groq";
import type {SlideInterface} from "~/interfaces/components/SlideInterface";
import {useFetcher} from "~/composables/useFetcher";
import { useBreakpoint } from "~/composables/useBreakpoint";
const { isMobile } = useBreakpoint()
const carouselSlider = ref()
const {width, height} = useWindowSize()
const newsSlider = ref()
const type = computed(() => {
  return isMobile.value ? 'crop' : 'fill'
})
const itemHeight = computed((): number => {
  if (isMobile.value) {
    return 363
  }
  return Math.ceil(height.value * 0.43)
})
const page = ref<number>(0)
const carousel = ref<SlideInterface|any>()
const products = ref<ProductCardInterface[]|any>([])
const publications = ref<PublicationCardInterface[]|any>([])
const vacancies = ref<VacancyInterface[]|any>([])

const carouselQuery = groq`*[_type == "carousel"][0]{
    slides
  }`;
const productsQuery = groq`*[_type == "product"]{
    title,
    slug,
    icon,
    preview_content,
    preview_image
  }`;
const publicationsQuery = groq`*[_type == "publication"]{
    title,
    slug,
    preview_content,
    preview_image,
    _createdAt
  }`;
const vacanciesQuery = groq`*[_type == "vacancy"]{
    label,
    slug,
    content
  }`;

useFetcher(productsQuery).then(response => products.value = response.data.value)
useFetcher(vacanciesQuery).then(response => vacancies.value = response.data.value)
useFetcher(publicationsQuery).then(response => publications.value = response.data.value)
useFetcher(carouselQuery).then(response => carousel.value = response.data.value)

onMounted(() => {
  setInterval(() => {
    if (!carouselSlider.value) return

    if (carouselSlider.value.page === carouselSlider.value.pages) {
      return carouselSlider.value.select(0)
    }

    next()
  }, 3000)
})
const previous = () => {
  newsSlider.value.previous()
}
const next = () => {
  newsSlider.value.next()
}
definePageMeta({
  title: "Главная",
})
</script>

<template>
  <div class="mp-page">
    <client-only>
      <div class="mp-carousel__wrapper" :style="`height: ${itemHeight}px`">
        <UCarousel v-model="page" v-slot="{ item }" :items="carousel?.slides" class="mp-carousel">
          <div class="relative">
            <SanityImage bg="fff" :fit="type"  class="mx-auto z-[1]"
                         :w="width"
                         :h="itemHeight" :asset-id="item.slide.asset?._ref"></SanityImage>
            <template v-if="!_.isUndefined(item.description) && !isMobile">
              <div class="z-[2] absolute top-[40%] right-[5%] max-w-[25%] p-8 bg-black-pearl-950 text-gray-50">
                <ContentComponent :content="item.description" />
              </div>
            </template>
          </div>
        </UCarousel>
        <template v-if="_.isUndefined(carousel?.slides[page].description)">
          <SloganComponent/>
        </template>
      </div>
    </client-only>
    <div>
      <HeadingComponent heading="Продукция"/>
    </div>
    <div class="mp-cards__container">
      <template v-for="(product, index) of products" :key="index">
        <ProductCard :product="product"/>
      </template>
    </div>
    <template v-if="publications && publications.length">
      <div class="mp-news__container">
        <div class="flex justify-between">
          <UButton class="flex items-center justify-start" @click="previous()" variant="link"
                   :ui="{variant: {link: 'text-white hover:text-white'}}">
            <UIcon name="i-heroicons-arrow-long-left" class="text-[48px]"></UIcon>
            <span class="uppercase">Предыдущие</span>
          </UButton>
          <HeadingComponent heading="Новости компании" class="text-white text-[]"/>
          <UButton class="flex items-center justify-end" @click="next()" variant="link"
                   :ui="{variant: {link: 'text-white hover:text-white'}}">
            <span class="uppercase">Следующие</span>
            <UIcon name="i-heroicons-arrow-long-right" class="text-[48px]"></UIcon>
          </UButton>
        </div>
        <VueperSlides
            ref="newsSlider"
            class="no-shadow"
            :visible-slides="4"
            :bullets="false"
            :arrows="false"
            slide-multiple
            :infinite="true"
            :gap="3"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            fixedHeight="567px"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
          <vueper-slide v-for="(publication, index) in publications" :key="index">
            <template #content>
              <PublicationCard :publication="publication"/>
            </template>
          </vueper-slide>
        </VueperSlides>
      </div>
    </template>
    <template v-if="vacancies && vacancies.length">
      <div class="mp-vacancies__container">
        <HeadingComponent heading="Список вакансий"/>
        <client-only>
          <UAccordion multiple
                      :ui="{item: {base: 'bg-white mb-4', padding: 'p-4'}, default: {class: 'bg-black-pearl-950 rounded-sm mb-2 py-4 hover:bg-black-pearl-950 text-white', openIcon: 'i-heroicons-chevron-left-20-solid'}}"
                      variant="solid"
                      size="xl" :items="vacancies">
            <template #item="{ item }">
              <ContentComponent :content="item.content" />
            </template>
          </UAccordion>
        </client-only>

      </div>
    </template>
    <div>
      <MapComponent />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>