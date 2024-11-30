<script setup lang="ts">
import {useRoute} from "vue-router";
import {useBreakpoint} from "~/composables/useBreakpoint";
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";
import MobileFooterComponent from "~/components/MobileFooterComponent.vue";

const {isMobile} = useBreakpoint();
const isMain = computed(() => {
  return useRoute().name !== 'index'
})


</script>

<template>
  <div>
    <template v-if="isMobile">
      <MobileHeaderComponent/>
    </template>
    <template v-else>
      <HeaderComponent />
    </template>
    <template v-if="isMain">
      <BreadcrumbsComponent />
    </template>
    <slot />
    <template v-if="isMobile">
      <MobileFooterComponent />
    </template>
    <template v-else>
      <FooterComponent />
    </template>
  </div>
</template>

<style scoped>

</style>