<script setup lang="ts">
import {ref} from "vue"
import type {PublicationCardInterface} from "~/interfaces/components/PublicationCardInterface";
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "~/locales/ru.json";

const publications = ref<PublicationCardInterface[]|any>([])

const publicationsQuery = groq`*[_type == "publication"]{
    title,
    slug,
    preview_content,
    preview_image,
    _createdAt
  }`;
const links = computed((): any[] => {
  return useBreadcrumbItems().value
})
const breadcrumbsStore = useBreadcrumbsStore()
const updateBreadcrumbs = () => {
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
}
useFetcher(publicationsQuery).then(response => {
  publications.value = response.data.value
  updateBreadcrumbs()
})
definePageMeta({
  title: "Новости компании",
})
</script>

<template>
  <div class="mp-page">
    <div class="mp-blog__container">
      <template v-for="(publication, index) in publications" :key="index">
        <PublicationCard :publication="publication"/>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>