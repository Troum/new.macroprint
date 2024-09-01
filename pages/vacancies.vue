<script setup lang="ts">
import {ref} from "vue"
import type {VacancyInterface} from "~/interfaces/components/VacancyInterface";
import ContentComponent from "~/components/ContentComponent.vue";
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "~/locales/ru.json";

const vacancies = ref<VacancyInterface[]|any>([])

const vacanciesQuery = groq`*[_type == "vacancy"]{
    label,
    slug,
    content
  }`;
const links = computed((): any[] => {
  return useBreadcrumbItems().value
})
const breadcrumbsStore = useBreadcrumbsStore()
const updateBreadcrumbs = () => {
  breadcrumbsStore.setList(links.value)
}
useFetcher(vacanciesQuery).then(response =>  {
  vacancies.value = response.data.value
  updateBreadcrumbs()
})

definePageMeta({
  title: "Вакансии компании",
})
</script>

<template>
  <div class="mp-page">
    <div class="mp-vacancies__container bg-white">
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
  </div>
</template>

<style scoped lang="scss">

</style>