<script setup lang="ts">
import {ref} from "vue"
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "@/locales/ru.json"

const requisitesQuery = groq`*[_type == "requisites"][0]{
    info
  }`;

const requisites = ref<any>()
const breadcrumbsStore = useBreadcrumbsStore()

const links = computed((): any[] => {
  return useBreadcrumbItems().value
})

useFetcher(requisitesQuery)
    .then(response => {
      requisites.value = response.data?.value
      breadcrumbsStore.setList(links.value)
    })

definePageMeta({
  title: "Реквизиты",
})
</script>

<template>
  <div class="mp-page">
    <div class="mp-requisites__container">
      <template v-if="requisites">
        <ContentComponent :content="requisites.info"/>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>