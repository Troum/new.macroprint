<script setup lang="ts">
import {useWindowSize} from "@vueuse/core";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import {useBreakpoint} from "~/composables/useBreakpoint";

const breadcrumbsStore = useBreadcrumbsStore()
const {isMobile} = useBreakpoint()
const links = computed(() => {
  return breadcrumbsStore.getList
})

const title = computed(() => {
  return breadcrumbsStore.getList.pop()?.label
})

const {height} = useWindowSize()
const calculatedHeight = computed(() => {
  if (isMobile.value) {
    return 250
  }
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
    <h1 class="font-medium leading-[48px] text-[48px] lg:text-[36px] xl:text-[36px] text-white">{{ title }}</h1>
  </div>

</template>

<style scoped>

</style>