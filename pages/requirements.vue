<script setup lang="ts">

import {ref} from "vue"
import type {RequirementsInterface} from "~/interfaces/components/RequirementsInterface";
import {useFetcher} from "~/composables/useFetcher";
import Document from "~/components/icons/Document.vue";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "~/locales/ru.json";

const modalContent = ref<any>()
const modalTitle = ref<any>()
const isOpen = ref<boolean>(false)
const requirements = ref<RequirementsInterface|any>()
const requirementsQuery = groq`*[_type == "requirements"][0]{
    commonRequirements,
    outsideRequirements,
    files[]{
      title,
      "downloadLink": file.asset->url
    }
  }`;
const breadcrumbsStore = useBreadcrumbsStore()

const links = computed((): any[] => {
  return useBreadcrumbItems().value
})
useFetcher(requirementsQuery).then(response => {
  requirements.value = response.data.value
  breadcrumbsStore.setList(links.value)
})
const openModal = (content: any) => {
  modalContent.value = content.main_content
  modalTitle.value = content.title
  isOpen.value = true
}
definePageMeta({
  title: "Технические требования",
})
</script>

<template>
  <div class="mp-page">
    <div class="mp-requirements__container">
      <h2 class="text-[28px] font-thin">Общие требования к макетам</h2>
    </div>
    <div class="mp-requirements__container">
      <ContentComponent :content="requirements?.commonRequirements" />
    </div>
    <div class="mp-requirements__container my-4 bg-[#F7F7F7]">
      <div class="grid grid-cols-3 gap-8 py-16">
        <template v-for="requirement of requirements?.outsideRequirements">
          <div>
            <p class="mb-2 font-bold">{{ requirement?.title }}</p>
            <p>{{ requirement?.preview_content }}</p>
            <ULink @click="openModal(requirement)" class="text-punch-600" href="">Подробнее...</ULink>
          </div>

        </template>
      </div>
    </div>
    <div class="mp-requirements__container my-4">
      <h2 class="text-[42px] font-thin">Библиотека файлов</h2>
      <h3 class="text-[10px] uppercase font-bold">мануалы и учебники с техническими требованиями</h3>
      <div class="flex flex-wrap justify-between gap-8 basis-1/3 py-16">
        <template v-for="file of requirements?.files">
          <div class="flex gap-x-4 items-center justify-start">
            <a target="_blank" :href="file?.downloadLink" class="flex items-center justify-center rounded-full h-[110px] w-[110px] bg-black-pearl-950">
              <Document />
            </a>
            <p class="mb-2 font-bold">{{ file?.title }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ modalTitle }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>
      <ContentComponent :content="modalContent" />
    </UCard>
  </UModal>
</template>

<style scoped>

</style>