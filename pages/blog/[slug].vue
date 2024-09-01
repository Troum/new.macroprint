<script setup lang="ts">
import _ from "lodash"
import {ref} from "vue"
import {useRoute} from "vue-router";
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import type {PublicationCardInterface} from "~/interfaces/components/PublicationCardInterface";

const {slug} = useRoute().params
const productQuery = groq`*[_type == "publication" && slug.current == "${slug}"][0]{
    title,
    slug,
    main_content,
    _createdAt
  }`;

const post = ref<PublicationCardInterface[] | any>()
const breadcrumbsStore = useBreadcrumbsStore()


const links = computed((): any[] => {
  return useBreadcrumbItems().value
})


useFetcher(productQuery)
    .then(response => {
      post.value = response.data?.value
      const breadcrumbs = links.value.map(item => {
        const sluggy = slugify(item.label).toLowerCase()
        if (sluggy === slug) {
          return {
            ariaLabel: post.value.title,
            label: post.value.title,
            to: item.to,
            current: item.current,
          }
        } else {
          return item
        }
      })
      breadcrumbsStore.setList(breadcrumbs)
    })

</script>

<template>
<div class="mp-page">
  <div class="mp-blog-single__container">
    <template v-if="post">
      <ContentComponent :content="post.main_content"/>
    </template>
  </div>
</div>
</template>

<style scoped>

</style>