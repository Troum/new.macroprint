<script setup lang="ts">
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import slugify from "slugify";
import * as breadcrumbsList from "~/locales/ru.json";
import groq from "groq";
import {ref} from "vue"
import {useFetcher} from "~/composables/useFetcher";
import useTransforms from "~/composables/useTransforms";
import type {FormSubmitEvent} from "#ui/types";
import {type InferType, object, string} from "yup";

const {transformSchedule} = useTransforms();
const contactsQuery = groq`*[_type == "contacts"][0]{
    info,
    address,
    schedule,
    contacts
  }`;
const contacts = ref<any>()

const links = computed((): any[] => {
  return useBreadcrumbItems().value
})
const breadcrumbsStore = useBreadcrumbsStore()
const updateBreadcrumbs = () => {
  breadcrumbsStore.setList(links.value)
}
const phoneOrEmail = (value: string) => {
  const phoneRegex = /^\+375\((29|44|33|25|17)\)\d{7}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return phoneRegex.test(value) || emailRegex.test(value);
};
const schema = object({
  name: string()
      .required('Поле обязательно для заполнения'),
  company: string()
      .required('Поле обязательно для заполнения'),
  contact: string()
      .required('Поле обязательно для заполнения')
      .test(
          'contact',
          'Контакт должен быть номером телефона или адресом электронной почты',
          (value) => phoneOrEmail(value)
      ),
  message: string()
      .required('Поле обязательно для заполнения'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  company: undefined,
  contact: undefined,
  message: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}

useFetcher(contactsQuery)
    .then(response => {
      contacts.value = response.data?.value
      updateBreadcrumbs()
    })

definePageMeta({
  title: "Контакты",
})
</script>

<template>
  <div class="mp-page">
    <div>
      <MapComponent/>
    </div>
    <div class="mp-contacts__container">
      <div>
        <HeadingComponent heading="Как нас найти?" class="font-thin text-left"/>
        <template v-if="contacts && contacts.info">
          <div class="font-thin">
            <ContentComponent :content="contacts?.info"/>
          </div>
        </template>
        <div class="flex flex-col gap-y-8 mt-3">
          <div class="flex justify-between items-center">
            <div class="basis-1/2">
              <span class="font-bold">Адрес:</span>
            </div>
            <div class="basis-1/2">
              <a class="font-thin text-punch-600 decoration-0"
                 target="_blank"
                 :href="contacts?.address.address_link">{{ contacts?.address.address_text }}</a>
            </div>
          </div>
          <div class="flex justify-between items-baseline">
            <div class="basis-1/2">
              <span class="font-bold">Телефоны:</span>
            </div>
            <div class="flex flex-col gap-y-2 justify-start basis-1/2">
              <template v-if="contacts && contacts.contacts">
                <template v-for="item of contacts.contacts">
                  <a class="font-thin text-punch-600 decoration-0" :href="item?.href">{{ item?.contact }}</a>
                </template>
              </template>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="basis-1/2">
              <span class="font-bold">Время работы:</span>
            </div>
            <div class="text-punch-600 font-thin basis-1/2">
              <span class="text-punch-600 font-thin" v-html="transformSchedule(contacts?.schedule?.start)"></span> -
              <span class="text-punch-600 font-thin" v-html="transformSchedule(contacts?.schedule?.end)"></span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="basis-1/2">
              <span class="font-bold">Производство:</span>
            </div>
            <div class="text-punch-600 font-thin basis-1/2">
              <span>{{ contacts?.schedule?.factory }}</span>, &nbsp;
              <span class="lowercase">{{ contacts?.schedule?.weekend }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="my-8">
        <UCard :ui="{background: 'bg-white', ring: 'ring-0'}">
          <UForm :schema="schema" :state="state" class="space-y-8" @submit="onSubmit">
            <UFormGroup label="ФИО" name="name">
              <UInput placeholder="Ваши фамилия, имя и отчество (если имеется)" color="gray"
                      v-model="state.name"/>
            </UFormGroup>
            <UFormGroup label="Название компании" name="company">
              <UInput placeholder="Название вашей компании" color="gray" v-model="state.company"/>
            </UFormGroup>
            <UFormGroup label="Email или телефон" name="contact">
              <UInput placeholder="Ваш контакт для связи" color="gray" v-model="state.contact"/>
            </UFormGroup>
            <UFormGroup label="Сообщение" name="message">
              <UTextarea placeholder="Ваше сообщение" color="gray" v-model="state.message"/>
            </UFormGroup>
            <div class="flex justify-end">
              <UButton type="submit" color="punch" class="h-[48px] w-[148px] flex justify-center" :ui="{rounded: 'rounded-sm'}">
                <span class="tracking-widest">Отправить</span>
              </UButton>
            </div>
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>