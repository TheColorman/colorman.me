// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    css: ["~/assets/css/tailwind.css"],
    modules: ["@nuxt/content", "@nuxt/image-edge", "@nuxt/image"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        head: {
            title: "Alexander - Software development portfolio",
            meta: [
                {
                    name: "description",
                    content:
                        "I'm Alexander, a software engineer, data scientist, web developer and machine larning enthusiast, studying at the IT University of Copenhagen.",
                },
            ],
            htmlAttrs: {
                lang: "en",
            }
        },
    },
});