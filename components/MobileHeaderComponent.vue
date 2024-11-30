<script setup lang="ts">
import {ref} from "vue"

import LogoComponent from "~/components/LogoComponent.vue";
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useCommonStore} from "~/store/common";
import MapIcon from "~/components/icons/MapIcon.vue";
import MobileMenuComponent from "~/components/MobileMenuComponent.vue";


const items = ref<any[]>([
  {
    label: 'Продукция',
    content: [],
  },
  {
    label: 'Клиентам',
    content: [
      {
        label: 'Реквизиты',
        route: '/requisites',
      },
      {
        label: 'Технические требования',
        route: '/requirements',
      }
    ],
  },
  {
    label: 'О компании',
    content: [
      {
        label: 'Новости компании',
        route: '/blog',
      },
      {
        label: 'История компании',
        route: '/about',
      }
    ],
  },
  {
    label: 'Вакансии',
    route: '/vacancies',
    content: []
  }
])

const menuQuery = groq`*[_type == "product"]{
    title,
    slug
  }`;

useFetcher(menuQuery).then((response: any) => {
  response.data.value.forEach((item: any) => {
    items.value[0].content.push(
        {
          label: item.title,
          route: `/production/${item.slug.current}`,
        }
    )
  })
})
const contacts = computed(() => {
  return useCommonStore().getContacts.slice(0, -1)
})
const address = computed(() => {
  return useCommonStore().getAddress
})
</script>

<template>
  <div class="bg-black-pearl-950 h-[40px] flex items-center gap-x-2 px-4">
    <MapIcon/>
    <a class="text-white text-[12px] underline" :href="address?.address_link" target="_blank">{{
        address?.address_text
      }}</a>
  </div>
  <div class="h-[80px] bg-punch-600 flex flex-wrap gap-x-4 items-center justify-center py-4">
    <template v-for="contact of contacts">
      <a class="flex items-center gap-x-3 text-white text-[12px] before:content-[''] before:inline-block before:w-[12px] before:h-[16px] before:bg-[url('/images/phone.png')] before:bg-no-repeat"
         :href="contact.href" target="_blank">
        <span>{{ contact.contact }}</span>
      </a>
    </template>
  </div>
  <div class="p-4 flex justify-between">
    <RouterLink to="/">
      <MobileLogoComponent/>
    </RouterLink>
    <div>
      <MobileDropdownMenu>
        <MobileMenuComponent :items="items"/>
      </MobileDropdownMenu>
    </div>
  </div>
  <!--  <div class="mp-menu">-->
  <!--    <RouterLink to="/">-->
  <!--      <LogoComponent/>-->
  <!--    </RouterLink>-->
  <!--    <div class="flex gap-x-8 items-center justify-start">-->
  <!--      <template v-for="item of items">-->
  <!--        <MenuComponent :dropdown="item" :items="item.items"/>-->
  <!--      </template>-->
  <!--      <UButton class="h-[48px] w-[152px] flex justify-center items-center bg-black-pearl-950 hover:bg-black-pearl-950" to="/contacts">-->
  <!--        <span>Как нас найти?</span>-->
  <!--      </UButton>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>

</style>