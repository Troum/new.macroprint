<script setup lang="ts">
import {PortableText, type PortableTextComponents} from "@portabletext/vue";
import { type PortableTextBlock } from "@portabletext/types";
import {getImageDimensions} from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import {createClient} from "@sanity/client";
import {useWindowSize} from "@vueuse/core";

interface Props {
  content: PortableTextBlock[];
}

defineProps<Props>()

const SampleImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  const client = createClient({projectId: 'gtsnokwt', dataset: 'production', useCdn: true})
  return h('img', {
    src: urlBuilder(client)
        .image(value)
        .width((useWindowSize().width.value - 390) / 3)
        .auto('format')
        .url(),
    alt: value.alt || ' ',
    loading: 'lazy',
    style: {
      display: isInline ? 'inline-block' : 'block',
      marginTop: '10px',
      marginBottom: '10px',
      marginRight: '20px',
      float: 'left',
      aspectRatio: width / height,
    },
  });
};

const components: PortableTextComponents = {
  block: {
    h1: (_, { slots }) => h('h1', { class: 'text-2xl my-3' }, slots.default?.()),
    h2: (_, { slots }) => h('h2', { class: 'text-xl my-3' }, slots.default?.()),
    h3: (_, { slots }) => h('h3', { class: 'text-[18px] my-3' }, slots.default?.()),
    blockquote: (_, { slots }) =>
        h('blockquote', { class: 'my-3 pl-2 border-l-2 border-l-black-pearl-950' }, slots.default?.()),
  },
  types: {
    image: SampleImageComponent,
    list: {
      bullet: (_: any, { slots }: any) => h('ul', { class: 'mp-list__disc' }, slots.default?.()),
      number: (_: any, { slots }: any) => h('ol', { class: 'mp-list__decimal' }, slots.default?.()),
    },
    listItem: {
      bullet: (_: any, { slots }: any) =>
          h('li', { style: { listStyleType: 'mp-list__disc' } }, slots.default?.()),
    }
  },
  hardBreak: () => true
};
</script>

<template>
<PortableText :value="content" :components="components"/>
</template>

<style lang="scss">

</style>