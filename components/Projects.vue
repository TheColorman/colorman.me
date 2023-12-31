<script setup>
const { data: projects } = await useAsyncData(`content-/projects/`, () => {
    return queryContent("/projects/").where({ promoted: true }).find();
});

const icons = {
    github: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <title>GitHub</title> <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
};
const NL = resolveComponent("NuxtLink");
</script>

<style scoped>
.box-outer {
    @apply mb-4 w-full;
    @apply rounded-lg p-[3px];
    @apply bg-gradient-to-br;
    @apply from-purple-200 via-blue-200 to-blue-300;
    @apply hover:from-purple-200 hover:via-purple-300 hover:to-blue-300;
    @apply bg-size-200 bg-pos-0 hover:bg-pos-75;
    @apply transition-all duration-300;
}
.box-inner {
    @apply h-full w-full rounded-md p-2;
    @apply bg-gradient-to-br;
    @apply from-purple-100 via-indigo-100 to-sky-100;
    @apply bg-size-200 bg-pos-0 hover:bg-pos-75;
    @apply transition-all duration-200;
}

.project-title {
    @apply text-lg font-medium;
}
.project-subtitle {
    @apply text-gray-500;
}
.project-description {
    @apply text-sm;
    @apply whitespace-pre-wrap;
}
.github-icon {
    @apply h-5 w-5;
    @apply text-black;
}

@media (prefers-color-scheme: dark) {
    .box-outer {
        @apply bg-gradient-to-br;
        @apply from-purple-600 via-blue-600 to-blue-500;
        @apply hover:from-purple-600 hover:via-purple-500 hover:to-blue-500;
    }
    .box-inner {
        @apply bg-black;
        @apply from-fuchsia-900/40 via-violet-900/40 to-blue-900/60;
    }
    .project-subtitle {
        @apply text-gray-400;
    }
    .github-icon {
        @apply text-white;
    }
}
</style>

<template>
    <h2 class="mb-1">🧱My projects</h2>
    Check out my
    <NuxtLink href="/projects">Project Repository</NuxtLink> for a full list of
    projects.
    <div class="paragraph mt-3 columns-[14rem] gap-4">
        <div
            v-for="(project, index) in projects"
            :key="project.title"
            class="box-outer inline-block"
            :class="{
                'hover:cursor-pointer': project.url,
                hidden: index > 2,
                'sm:inline-block': index > 2,
            }"
        >
            <component
                :is="project.links[0].url ? NL : 'div'"
                :href="project.links[0].url"
                target="_blank"
                rel="noopener noreferrer"
                class="link-nostyle h-full w-full"
            >
                <div class="box-inner">
                    <h3 class="project-title">
                        {{ project.title }}
                    </h3>
                    <p class="project-subtitle mb-2">
                        {{ project.subtitle }}
                    </p>
                    <p class="project-description">
                        {{ project.short_description }}
                    </p>
                    <a
                        v-if="project.links"
                        :href="project.links[0].url"
                        class="my-3 flex justify-between"
                        >Link
                        <div
                            v-html="
                                icons[
                                    project.links[0].url
                                        .split(':')[1]
                                        .split('.')[0]
                                        .slice(2)
                                ]
                            "
                            class="github-icon"
                        ></div>
                    </a>
                    <ul v-if="project.tags" class="flex flex-wrap gap-1">
                        <li v-for="tag in project.tags" :key="tag" class="tag">
                            {{ tag }}
                        </li>
                    </ul>
                </div>
            </component>
        </div>
    </div>
</template>
