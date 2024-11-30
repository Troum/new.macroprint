<script setup lang="ts">
import groq from "groq";
import {ref} from "vue"
import {useFetcher} from "~/composables/useFetcher";
import type {FooterInterface} from "~/interfaces/components/FooterInterface";
import useTransforms from "~/composables/useTransforms";
import {useCommonStore} from "~/store/common";
import { useSocialNetworks } from "~/composables/useSocialNetworks";

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
  <div class="mp-footer">
    <client-only>
      <div class="flex flex-col gap-y-4">
        <LogoComponent :type="true"/>
        <AddressComponent :address="footer?.address"/>
        <div class="flex flex-col gap-y-1">
          <template v-for="contact of footer?.contacts">
            <a class="text-punch-600 last-of-type:mt-3" :href="contact.href" target="_blank">{{ contact.contact }}</a>
          </template>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-white mb-4">Время работы</p>
        <p class="text-punch-600 text-[12px] my-0">Время работы:
          <span v-html="transformSchedule(footer?.schedule?.start)"></span> -
          <span v-html="transformSchedule(footer?.schedule?.end)"></span>
        </p>
        <p class="text-punch-600 text-[12px] my-0">{{ footer?.schedule?.weekend }}</p>
        <p class="text-punch-600 text-[12px] my-0">{{ footer?.schedule?.factory }}</p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-white mb-4">Меню</p>
        <FooterMenuComponent />
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="text-white mb-4">Информация</p>
        <div class="text-punch-600 text-[12px]">
          <ContentComponent :content="footer?.info"/>
        </div>
        <div class="text-punch-600 my-4 text-[12px]">Все права защищены &copy; {{ new Date().getFullYear() }}</div>
        <div class="flex flex-wrap items-center justify-between">
          <template v-for="socialMedia of footer?.socialNetworks">
            <a :href="socialMedia.url" target="_blank">
              <component class="text-white" :is="useSocialNetworks(socialMedia.network)?.icon" />
            </a>
          </template>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped>

</style>