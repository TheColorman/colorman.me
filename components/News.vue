<script setup>
// Markdown
import md from "markdown-it";
const renderer = md();

const news = [
    {
        date: new Date("2023-11-03"),
        title: "Hired! 💼",
    },
    {
        date: new Date("2023-02-24"),
        title: "Now part of 2 student organizations! 🏴",
    },
    {
        date: new Date("2023-01-29"),
        title: "New website up! 🎉",
    },
];

const NL = resolveComponent("NuxtLink");
</script>

<template>
    <h1>📰News</h1>
    <ul class="paragraph flex flex-col gap-y-3">
        <li v-for="el in news" :key="el.date" class="grid grid-cols-5">
            <component
                :is="el.url ? NL : 'p'"
                :href="el.url"
                class="col-span-2"
            >
                {{
                    el.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                }}
            </component>
            <div
                class="col-span-3 col-start-3"
                v-html="renderer.render(el.title)"
            ></div>
        </li>
    </ul>
</template>
