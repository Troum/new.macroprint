<script setup lang="ts">
import groq from "groq";
import {ref} from "vue"
import {useFetcher} from "~/composables/useFetcher";
import type {FooterInterface} from "~/interfaces/components/FooterInterface";
import useTransforms from "~/composables/useTransforms";
import {useCommonStore} from "~/store/common";
import {useSocialNetworks} from "~/composables/useSocialNetworks";

const commonStore = useCommonStore()
const {transformSchedule} = useTransforms();
const footer = ref<FooterInterface | any>()
const carouselQuery = groq`*[_type == "footer"][0]{
    contacts,
    address,
    schedule,
    info,
    socialNetworks
  }`;
useFetcher(carouselQuery).then(response => {
  footer.value = response.data.value
  if (footer.value) {
    commonStore.setAddress(footer.value.address)
    commonStore.setContacts(footer.value.contacts)
  } else {
    commonStore.setAddress(footer.value.address)
    commonStore.setContacts(footer.value.contacts)
  }

})
</script>

<template>
  <client-only>
    <div class="bg-black-pearl-950 p-4">
      <div class="grid grid-cols-2">
        <div class=" flex flex-wrap gap-x-4">
          <LogoComponent :type="true"/>
          <AddressComponent :address="footer?.address"/>
          <div class="flex flex-col gap-y-[2px] mt-2">
            <template v-for="contact of footer?.contacts">
              <a class="text-punch-600 text-[12px]" :href="contact.href" target="_blank">{{ contact.contact }}</a>
            </template>
          </div>
        </div>
        <div class="flex flex-col gap-y-[2px]">
          <span class="text-white m2-4">Время работы</span>
          <span class="text-punch-600 text-[12px] my-0">Время работы:
            <span v-html="transformSchedule(footer?.schedule?.start)"></span> -
            <span v-html="transformSchedule(footer?.schedule?.end)"></span>
          </span>
          <span class="text-punch-600 text-[12px] my-0">{{ footer?.schedule?.weekend }}</span>
          <span class="text-punch-600 text-[12px] my-0">{{ footer?.schedule?.factory }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2 mt-4">
        <div class="flex flex-col gap-y-[2px]">
          <p class="text-white mb-4">Меню</p>
          <FooterMenuComponent/>
        </div>
        <div class="flex flex-wrap gap-x-4">
          <p class="text-white mb-4">Информация</p>
          <div class="text-punch-600 text-[12px]">
            <ContentComponent :content="footer?.info"/>
          </div>
          <div class="text-punch-600 my-4 text-[12px]">Все права защищены &copy; {{ new Date().getFullYear() }}</div>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-x-2 mt-8">
        <template v-for="socialMedia of footer?.socialNetworks">
          <a :href="socialMedia.url" target="_blank">
            <component class="text-white" :is="useSocialNetworks(socialMedia.network)?.icon"/>
          </a>
        </template>
      </div>

    </div>
  </client-only>
</template>

<style scoped>

</style>