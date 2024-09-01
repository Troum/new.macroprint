<script setup lang="ts">
import {useWindowSize} from "@vueuse/core";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";

const breadcrumbsStore = useBreadcrumbsStore()

const links = computed(() => {
  return breadcrumbsStore.getList
})

const title = computed(() => {
  return breadcrumbsStore.getList.pop()?.label
})

const {height} = useWindowSize()
const calculatedHeight = computed(() => {
  return Math.ceil((height.value * 160) / 1080)
})

</script>

<template>
  <div
      class="mp-breadcrumbs__container"
      :style="`height: ${calculatedHeight}px; background: url('/images/breadcrumbs.png') top center no-repeat; background-size: cover`">
    <LazyUBreadcrumb class="px-0 uppercase text-white" divider="/"
                     :links="links"
                     :ui="{ol: 'flex items-center gap-x-1.5 px-0', active: 'text-white', inactive: 'text-white', divider: {base: 'flex-shrink-2'}}"/>
    <h1 class="font-medium xl:text-[36px] text-white">{{ title }}</h1>
  </div>

</template>

<style scoped>

</style>