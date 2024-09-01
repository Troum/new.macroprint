<script setup lang="ts">
import {ref} from "vue"
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "@/locales/ru.json"

const productQuery = groq`*[_type == "about"][0]{
    info
  }`;

const about = ref<any>()
const breadcrumbsStore = useBreadcrumbsStore()


const links = computed((): any[] => {
  return useBreadcrumbItems().value
})


useFetcher(productQuery)
    .then(response => {
      about.value = response.data?.value
      const breadcrumbs = links.value.map(item => {
        const slug = slugify(item.label).toLowerCase()
        const label = breadcrumbsList.breadcrumbs[slug]?.label

        return {
          ariaLabel: label,
          label: label,
          to: item.to,
          current: item.current,
        }
      })
      breadcrumbsStore.setList(breadcrumbs)
    })
definePageMeta({
  title: "О компании",
})
</script>

<template>
  <div class="mp-page">
    <div class="mp-about__container">
      <template v-if="about">
        <ContentComponent :content="about.info"/>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>