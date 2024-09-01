<script setup lang="ts">
import {ref} from "vue"
import {useWindowSize} from "@vueuse/core";
import {VueperSlide, VueperSlides} from "vueperslides";
import type {ProductCardInterface} from "~/interfaces/components/ProductCardInterface";
import type {PublicationCardInterface} from "~/interfaces/components/PublicationCardInterface";
import type {VacancyInterface} from "~/interfaces/components/VacancyInterface";
import ContentComponent from "~/components/ContentComponent.vue";
import groq from "groq";
import type {SlideInterface} from "~/interfaces/components/SlideInterface";
import {useFetcher} from "~/composables/useFetcher";

const {width, height} = useWindowSize()
const newsSlider = ref()
const itemHeight = computed((): number => {
  return Math.ceil(height.value * 0.43)
})

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
        <UCarousel v-slot="{ item }" :items="carousel?.slides" class="mp-carousel">
          <SanityImage bg="fff" fit="fill" class="mx-auto" :w="width" :h="itemHeight" :asset-id="item.asset?._ref"></SanityImage>
        </UCarousel>
        <SloganComponent/>
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
    <div>
      <MapComponent />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>