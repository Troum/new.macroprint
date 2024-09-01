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
    name: 'Клиентам',
    route: '/for-clients'
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
  <div class="flex flex-col gap-y-4">
    <template v-for="item of menu">
      <RouterLink class="text-punch-600" :to="item.route">{{ item.name }}</RouterLink>
    </template>
  </div>
</template>