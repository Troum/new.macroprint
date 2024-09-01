<script setup lang="ts">
import type {PropType} from "vue";
import type {SloganButtonInterface} from "~/interfaces/components/SloganButtonInterface";

defineProps({
  greeting: {
    type: String,
    default: 'Добро пожаловать'
  },
  slogan: {
    type: String,
    default: 'Мы cделаем <br/> Ваш мир ярче.'
  },
  button: {
    type: Object as PropType<SloganButtonInterface>,
    default: (): SloganButtonInterface => {
      return {
        label: 'О компании',
        route: 'about',
        color: 'punch'
      }
    }
  }
})
</script>

<template>
  <div class="mp-slogan__container">
    <p class="mp-slogan__greeting">{{ greeting }}</p>
    <p class="mp-slogan__text" v-html="slogan"></p>
    <UButton style="width: fit-content;"
             class="px-4 mt-12"
             :ui="{rounded: 'rounded-none'}"
             :label="button.label"
             :color="button.color"
             :to="button.route"></UButton>
  </div>
</template>

<style scoped lang="scss">
.mp {
  &-slogan {
    &__container {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 155px;
      color: #fff;
      padding: 10px;
      top: 50%;
      transform: translateY(-50%);
      @media (min-width: 1920px) {
        left: 265px;
      }
    }

    &__greeting {
      font-size: .9rem;
      letter-spacing: 4px;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__text {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 2.7rem;

      &::after {
        content: url("@/assets/images/line.svg");
        display: block;
        position: absolute;
        bottom: 30.5%;
        right: -2%;
      }
    }
  }
}
</style>