<script setup lang="ts">
const menu = [
  {
    name: 'Продукция',
    route: '/production'
  },
  {
    name: 'Новости',
    route: '/blog'
  },
  {
    name: 'О компании',
    route: '/about'
  },
  {
    name: 'Вакансии',
    route: '/vacancies'
  },
  {
    name: 'Контакты',
    route: '/contacts'
  }
]
</script>
<template>
  <div class="flex flex-col gap-y-1 lg:gap-y-4">
    <template v-for="item of menu">
      <RouterLink class="text-punch-600 text-[12px] lg:text-[14px]" :to="item.route">{{ item.name }}</RouterLink>
    </template>
  </div>
</template>