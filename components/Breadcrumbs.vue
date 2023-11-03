<script setup>
const NL = resolveComponent("NuxtLink");
</script>

<script>
export default {
    props: ["breadcrumbs"],
};
</script>

<style scoped>
nav {
    @apply text-sm font-medium;
    @apply transition-all duration-200;
}
a {
    @apply text-gray-700 hover:text-yellow-600;
    @apply transition-all duration-200;
}
.final {
    @apply text-gray-500;
}

@media (prefers-color-scheme: dark) {
    a {
        @apply text-gray-400 hover:text-yellow-300;
    }
}
</style>

<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li
                v-for="(val, index) of breadcrumbs"
                :key="index"
                :class="{
                    'inline-flex': index == 0,
                    flex: index != 0,
                }"
                :aria-current="index == breadcrumbs.length - 1 ? 'page' : ''"
                class="items-center"
            >
                <component
                    :is="index == 0 ? NL : 'div'"
                    :href="index == 0 ? val.path : ''"
                    :class="{
                        'link-nostyle': index == 0,
                        'inline-flex': index == 0,
                        flex: index != 0,
                        final: index == breadcrumbs.length - 1,
                    }"
                    class="items-center"
                >
                    <svg
                        v-if="val.name.toLowerCase() == 'home'"
                        aria-hidden="true"
                        class="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                        ></path>
                    </svg>
                    <svg
                        v-else-if="index != 0"
                        aria-hidden="true"
                        class="h-6 w-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <NuxtLink
                        v-if="
                            index != breadcrumbs.length - 1 &&
                            val.name.toLowerCase() != 'home'
                        "
                        :href="val.path"
                        class="link-nostyle ml-1 md:ml-2"
                    >
                        {{
                            val.name.charAt(0).toUpperCase() + val.name.slice(1)
                        }}
                    </NuxtLink>
                    <span
                        v-else-if="val.name.toLowerCase() != 'home'"
                        class="ml-1 md:ml-2"
                    >
                        {{
                            val.name.charAt(0).toUpperCase() + val.name.slice(1)
                        }}
                    </span>
                    <p v-else class="text-sm">
                        {{
                            val.name.charAt(0).toUpperCase() + val.name.slice(1)
                        }}
                    </p>
                </component>
            </li>
        </ol>
    </nav>
</template>
