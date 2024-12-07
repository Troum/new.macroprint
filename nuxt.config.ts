// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            // @ts-ignore
            title: 'Макропринт',
        }
    },
    ssr: false,
    devtools: {enabled: true},
    compatibilityDate: '2024-09-01',
    hooks: {
        'pages:extend'(pages) {
            pages.push({
                name: 'Главная',
                path: '/'
            });
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        "@nuxt/ui",
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        "vue-yandex-maps/nuxt",
        "@nuxtjs/sanity",
        "@nuxtjs/seo"
    ],
    ui: {
        // @ts-ignore
      icons: {}
    },
    colorMode: {
        preference: 'light'
    },
    css: [
        "vueperslides/dist/vueperslides.css",
        "@/assets/styles/main.scss",
    ],
    yandexMaps: {
        apikey: '0845768b-3f33-453f-970b-be8e7b249bd7',
    },
    sanity: {
        projectId: process.env.SANITY_PROJECT_ID ?? 'gtsnokwt',
        useCdn: false,
        token: process.env.SANITY_API_TOKEN ?? 'skD5EFFZKlHTYktk8w5sQut95EISGvF0W0IyYBqKPGfg3oD9s4worPgHIANUAqfsPnnfiznq1zaKgaIRVdTz5p6EsMQyAr2ypyPD2GXKQyDO4xCcQ1pna3Aqg6wOmNOnsTYrmVjbnivfGK4Hd5FsOIFS06aptqFpowLfrTbGq3tkvcRIrv6s',
        ignoreBrowserTokenWarning: true
    },
    image: {
        sanity: {
            projectId: process.env.SANITY_PROJECT_ID,
        }
    }
})