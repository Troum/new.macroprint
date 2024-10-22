<script setup lang="ts">
import {VueperSlide, VueperSlides} from "vueperslides";
import _ from "lodash"
import {ref} from "vue"
import {useRoute} from "vue-router";
import groq from "groq";
import type {ProductCardInterface} from "~/interfaces/components/ProductCardInterface";
import {useFetcher} from "~/composables/useFetcher";
import {useWindowSize} from "@vueuse/core";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "@/locales/ru.json"

const {width, height} = useWindowSize()

const {slug} = useRoute().params
const productQuery = groq`*[_type == "product"]{
    title,
    main_content,
    main_images,
    slug,
    materials,
    examples,
    preview_image,
    preview_content,
    icon
  }`;

const products = ref<ProductCardInterface[] | any>()
const breadcrumbsStore = useBreadcrumbsStore()

const calculatedWidth = computed(() => {
  return Math.ceil((width.value * 540) / 1920)
})
const calculatedHeight = computed(() => {
  return Math.ceil((height.value * 540) / 1080)
})

const links = computed((): any[] => {
  return useBreadcrumbItems().value
})

const product = computed(() => {
  return _.find(products.value, (item: any) => {
    return item?.slug?.current === slug
  })
})

const others = computed(() => {
  return products.value.filter((item: any) => {
    return item?.slug?.current !== slug
  })
})


useFetcher(productQuery)
    .then(response => {
      products.value = response.data?.value
      const breadcrumbs = links.value.map(item => {
        const sluggy = slugify(item.label).toLowerCase()
        if (sluggy === slug) {
          return {
            ariaLabel: product.value.title,
            label: product.value.title,
            to: item.to,
            current: item.current,
          }
        } else {
          return item
        }
      })
      breadcrumbsStore.setList(breadcrumbs)
    })

</script>

<template>
  <div class="mp-page">
    <div class="mp-single_product__container">
      <div class="mp-single_product__carousel">
        <vueper-slides autoplay :pause-on-hover="true"
                       class="no-shadow"
                       :bullets="false"
                       :arrows="false"
                       :infinite="true"
                       :fixedHeight="`${calculatedHeight}px`">
          <vueper-slide v-for="(item, i) in product?.main_images"
                        :key="i">
            <template #content>
              <div class="flex items-center justify-center bg-[#f7f7f7]"
                   :style="`height: ${calculatedHeight}px; width: ${calculatedWidth}px`">
                <SanityImage fit="fill"
                             :asset-id="item.asset?._ref"></SanityImage>
              </div>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
      <template v-if="product">
        <div>
          <ContentComponent :content="product?.main_content"/>
        </div>
      </template>
    </div>
    <template v-if="product && product.materials?.length">
      <div class="mp-materials__container">
        <template v-for="material of product.materials">
          <MaterialCard :material="material"/>
        </template>
      </div>
    </template>
    <template v-if="product && product.examples?.length">
      <div class="mp-news__container">
        <div class="flex justify-between">
          <HeadingComponent heading="Примеры работ" class="text-white underline underline-offset-[16px] decoration-punch-600"/>
        </div>
        <VueperSlides
            ref="newsSlider"
            class="no-shadow"
            :visible-slides="3"
            :bullets="false"
            slide-multiple
            :infinite="true"
            :gap="3"
            :slide-ratio="1 / 3"
            :dragging-distance="140"
            fixedHeight="460px"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
          <vueper-slide v-for="(example, index) in product.examples" :key="index">
            <template #content>
              <ExampleCard :example="example"/>
            </template>
          </vueper-slide>
        </VueperSlides>
      </div>

    </template>
    <template v-if="product && others.length">
      <div class="flex justify-between">
        <HeadingComponent heading="Другая продукция"/>
      </div>
      <div class="mp-cards__container">
        <template v-for="other of others">
          <ProductCard :product="other" />
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>