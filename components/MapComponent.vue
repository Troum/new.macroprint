<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import type {BehaviorType, LngLat, YMap} from '@yandex/ymaps3-types';
import {YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker} from 'vue-yandex-maps';
import type {MarkerInterface} from "~/interfaces/components/MarkerInterface";

const map = shallowRef<null | YMap>(null);
const marker = ref<MarkerInterface>({
  src: '/images/marker.png',
  coordinates: [27.518999, 53.842895] as LngLat
})
const behaviors = ref<BehaviorType[]>([])
</script>

<template>
  <yandex-map
      class="grayscale"
      v-model="map"
      :settings="{
        location: {
          center: [27.518999, 53.842895],
          zoom: 17,
        },
        behaviors: behaviors
      }"
      width="100%"
      height="500px"
  >
    <yandex-map-default-scheme-layer/>
    <yandex-map-default-features-layer/>
    <yandex-map-marker
        position="top-center left-center"
        :settings="{ coordinates: marker.coordinates }"
    >
      <nuxt-img
          class="pin grayscale-0"
          :src="marker.src"
      />
    </yandex-map-marker>
  </yandex-map>
</template>

<style scoped>
.pin {
  cursor: pointer;
  max-width: unset;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>