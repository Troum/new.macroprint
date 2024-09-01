<script setup lang="ts">
import {useRoute} from "vue-router";
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";

const isMain = computed(() => {
  return useRoute().name !== 'index'
})

</script>

<template>
  <div>
    <HeaderComponent />
    <template v-if="isMain">
      <BreadcrumbsComponent />
    </template>
    <slot />
    <FooterComponent />
  </div>
</template>

<style scoped>

</style>