<script setup>
const { path } = useRoute();

const { data: projects } = await useAsyncData(`content-${path}`, () => {
    return queryContent(path).find();
});

const icons = {
    github: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <title>GitHub</title> <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    "external-link": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>`,
    discord: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path fill="currentColor" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>`,
};

let query = "";

const filterTags = useState("filterTags", () => new Set());

let filteredProjects = useState("filteredProjects", () => [...projects.value]);
/**
 *
 * @param {string} query
 */
function filterProjects(query) {
    const newFiltered = [...projects.value].filter((project) => {
        const projectTags = project.tags.map((tag) => tag.toLowerCase());
        const tagsMatch = Array.from(filterTags.value.values()).every((tag) =>
            projectTags.includes(tag.toLowerCase())
        );

        const queryWords = query
            .toLowerCase()
            .trim()
            .split(" ")
            .filter((word) => word !== "");
        const queryMatch =
            queryWords.length > 0
                ? queryWords.some((word) => project.rawContent.includes(word))
                : true;

        return tagsMatch && queryMatch;
    });
    return newFiltered
}
</script>

<style scoped>
input {
    @apply border-2 border-gray-400 bg-gray-50 text-lg text-gray-900;
    @apply rounded-lg focus:border-blue-500 focus:ring-blue-500;
    @apply block w-full p-2.5;
}
.box-outer {
    @apply max-w-2xl;
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
    @apply cursor-default;
    @apply mb-2 text-xl font-medium;
}
.project-subtitle {
    @apply cursor-default;
    @apply text-lg;
    @apply text-gray-500;
}
.project-description {
    @apply cursor-default;
    @apply text-base;
}

.link-button {
    /* Shape */
    @apply rounded-md py-1 px-3;
    @apply flex items-center;
    @apply text-sm font-medium;

    /* Colors */
    @apply bg-gradient-to-br;

    @apply text-black;

    @apply bg-size-200 bg-pos-0 hover:bg-pos-75;
    @apply transition-all duration-200;

    @apply from-purple-300/80 via-indigo-300/80 to-indigo-300/80;
    @apply border border-purple-500/40;

    @apply hover:from-purple-300/80 hover:via-indigo-300/80 hover:to-indigo-300/80;
    @apply hover:border-purple-600/60;

    @apply shadow-md;
}

.tag {
    /* Shape */
    @apply rounded-full py-1 px-2;
    @apply whitespace-nowrap;
    @apply shadow-md;
}

/* Style horizontal scrollbar */
::-webkit-scrollbar {
    background-color: transparent;
}
::-webkit-scrollbar-track {
    @apply bg-gray-300;
    @apply rounded-full;
    @apply bg-clip-content;
    @apply border-[5px] border-solid border-transparent;
}
::-webkit-scrollbar-thumb {
    @apply bg-gray-400 transition-all duration-200 hover:bg-gray-500/70;
    @apply rounded-full;
    @apply border-[6px] border-solid border-transparent;
    @apply bg-clip-content;
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

    .link-button {
        @apply text-white;
        @apply from-purple-500/60 via-blue-500/60 to-blue-500/60;
        @apply border border-fuchsia-400/50;

        @apply hover:from-purple-500/60 hover:via-blue-500/60 hover:to-blue-500/60;
        @apply hover:border-indigo-400/70;
    }

    ::-webkit-scrollbar-track {
        @apply bg-gray-700;
    }
    ::-webkit-scrollbar-thumb {
        @apply bg-gray-600 hover:bg-gray-500/60;
    }
}
</style>

<template>
    <div class="background">
        <section class="main w-full md:w-[46rem]">
            <div class="m-12 mt-5">
                <Breadcrumbs
                    :breadcrumbs="[
                        { name: 'home', path: '/' },
                        { name: 'projects', path: '/projects' },
                    ]"
                />
                <h1 class="mb-5 text-4xl">Project repository</h1>
                <input
                    type="text"
                    id="project_search"
                    placeholder="🔍Search for a project..."
                    @input="
                        (event) => {
                            query = event.target.value;
                            filteredProjects = filterProjects(query);
                        }
                    "
                />
                <ul
                    v-if="filterTags.size > 0"
                    class="300 mt-3 flex gap-4 overflow-x-auto"
                >
                    <li v-for="tag in filterTags" :key="tag">
                        <button
                            class="tag group relative overflow-hidden"
                            @click="
                                () => {
                                    filterTags.delete(tag);
                                    filteredProjects = filterProjects(query);
                                }
                            "
                        >
                            {{ tag }}
                            <div
                                class="absolute top-0 right-0 m-0.5 hidden h-6 w-[2.2rem] items-center justify-end rounded-full bg-gradient-to-l from-blue-300 via-blue-300 to-transparent pr-0.5 group-hover:flex group-focus:flex dark:from-[#3569CD] dark:via-[#3569CD]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="float-right h-4 w-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </button>
                    </li>
                </ul>
                <p
                    v-if="query.length > 0 || filterTags.size > 0"
                    class="ml-1 mt-1 -mb-2 text-sm text-gray-500 dark:text-gray-400"
                >
                    {{ filteredProjects.length }} results
                </p>
                <hr class="border-gray -mb-6 mt-3 border-b" />
            </div>
            <div class="mb-8 flex flex-col gap-8 px-8">
                <div
                    v-for="(project, index) in filteredProjects"
                    :key="index"
                    class="box-outer inline-block"
                >
                    <div class="box-inner">
                        <h2 class="project-title">{{ project.title }}</h2>
                        <p class="project-subtitle mb-2">
                            {{ project.subtitle }}
                        </p>
                        <p class="project-description mb-4">
                            {{ project.description }}
                        </p>
                        <div class="flex gap-4 overflow-auto">
                            <NuxtLink
                                v-for="(link, index) in project.links"
                                :key="index"
                                :href="link.url"
                                :target="_blank"
                                :rel="'noopener noreferrer'"
                                class="link-nostyle"
                            >
                                <button class="link-button" tabindex="-1">
                                    {{ link.title }}
                                    <div
                                        v-html="icons[link.icon]"
                                        class="ml-2 h-5 w-5"
                                    ></div>
                                </button>
                            </NuxtLink>
                        </div>
                        <ul
                            class="mt-3 flex gap-4 overflow-x-auto border-t border-gray-300 pt-2"
                        >
                            <li
                                v-for="(tag, index) in project.tags"
                                :key="index"
                            >
                                <button
                                    class="tag"
                                    @click="
                                        () => {
                                            filterTags.add(tag);
                                            filteredProjects = filterProjects(query);
                                        }
                                    "
                                >
                                    {{ tag }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
