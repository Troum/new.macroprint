<script setup lang="ts">
import {useRoute} from "vue-router";
import {useBreakpoint} from "~/composables/useBreakpoint";
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";

const isMain = computed(() => {
  return useRoute().name !== 'index'
})
const mobile = computed(() => {
  return useBreakpoint().between('mobile', 'tablet')
})

</script>

<template>
  <div>
    <template v-if="mobile">

    </template>
    <template v-else>
      <HeaderComponent />
    </template>
    <template v-if="isMain">
      <BreadcrumbsComponent />
    </template>
    <slot />
    <template v-if="mobile">

    </template>
    <template v-else>
      <FooterComponent />
    </template>
  </div>
</template>

<style scoped>

</style>