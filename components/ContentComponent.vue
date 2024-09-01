<script setup lang="ts">
import {PortableText, type PortableTextComponents} from "@portabletext/vue";
import { type PortableTextBlock } from "@portabletext/types";
import {getImageDimensions} from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import {createClient} from "@sanity/client";

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
        .width(width)
        .auto('format')
        .url(),
    alt: value.alt || ' ',
    loading: 'lazy',
    style: {
      display: 'inline-block',
      marginTop: '10px',
      marginBottom: '10px',
      marginRight: '20px',
      float: 'left',
      aspectRatio: width / height,
    },
  });
};

const components: PortableTextComponents = {
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
};
</script>

<template>
<PortableText :value="content" :components="components"/>
</template>

<style lang="scss">

</style>