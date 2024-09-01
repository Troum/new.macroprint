<script setup lang="ts">
import {ref} from "vue"

import LogoComponent from "~/components/LogoComponent.vue";
import MenuComponent from "~/components/MenuComponent.vue";
import groq from "groq";
import {useFetcher} from "~/composables/useFetcher";
import {useCommonStore} from "~/store/common";


const items = ref<any[]>([
  {
    label: 'Продукция',
    items: [[]],
  },
  {
    label: 'Клиентам',
    items: [[
      {
        label: 'Реквизиты',
        route: '/requisites',
      },
      {
        label: 'Технические требования',
        route: '/requirements',
      }
    ]],
  },
  {
    label: 'О компании',
    items: [
      [
        {
          label: 'Новости компании',
          route: '/blog',
        },
        {
          label: 'История компании',
          route: '/about',
        }
      ]
    ],
  },
  {
    label: 'Вакансии',
    route: '/vacancies',
    items: []
  }
])

const menuQuery = groq`*[_type == "product"]{
    title,
    slug
  }`;

useFetcher(menuQuery).then((response: any) => {
   response.data.value.forEach((item: any) => {
     items.value[0].items[0].push(
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
  <div class="mp-header">
    <div>
      <a class="text-white text-[12px]" :href="address?.address_link" target="_blank">{{ address?.address_text }}</a>
    </div>
    <div class="mp-header__phones">
      <template v-for="contact of contacts">
        <a class="flex items-center gap-x-3 text-white text-[12px] before:content-[''] before:inline-block before:w-[12px] before:h-[16px] before:bg-[url('/images/phone.png')] before:bg-no-repeat" :href="contact.href" target="_blank">
          <span>{{ contact.contact }}</span>
        </a>
      </template>
    </div>
  </div>
  <div class="mp-menu">
    <RouterLink to="/">
      <LogoComponent/>
    </RouterLink>
    <div class="flex gap-x-8 items-center justify-start">
      <template v-for="item of items">
        <MenuComponent :dropdown="item" :items="item.items"/>
      </template>
      <UButton class="h-[48px] w-[152px] flex justify-center items-center bg-black-pearl-950 hover:bg-black-pearl-950" to="/contacts">
        <span>Как нас найти?</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>

</style>