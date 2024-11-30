<script setup lang="ts">
import _ from "lodash"
import {useRoute} from "vue-router";
import {useBreakpoint} from "~/composables/useBreakpoint";
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";

const isMain = computed(() => {
  return useRoute().name !== 'index'
})
const laptop = computed(() => {
  return useBreakpoint().between('laptop', 'desktop')
})

</script>

<template>
  <div>
    <template v-if="!laptop">

    </template>
    <template v-else>
      <HeaderComponent />
    </template>
    <template v-if="isMain">
      <BreadcrumbsComponent />
    </template>
    <slot />
    <template v-if="!laptop">

    </template>
    <template v-else>
      <FooterComponent />
    </template>
  </div>
</template>

<style scoped>

</style>