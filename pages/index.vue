<template>
    <div class="background">
        <section class="main">
            <div class="m-[5vh]">
                <div>
                    <div class="relative flex pt-8 sm:pt-0">
                        <p class="pretitle-main ml-8 font-mono">I'm</p>
                        <p
                            class="absolute -right-2 -top-8 w-80 self-end text-sm sm:-top-5 sm:w-96 md:right-5 md:text-base"
                        >
                            <span class="text-red-700">
                                The website redesign is currently work in
                                progress</span
                            >, so not everything has made it here yet.
                            <a href="https://legacy.colorman.me">
                                Click here to view the old site.</a
                            >
                        </p>
                    </div>
                    <h1 class="title">
                        Colorman
                        <p class="sm:inline">(or Alexander)</p>
                    </h1>
                </div>
                <div class="flex md:gap-6">
                    <div class="w-full md:w-3/5 aboutsection">
                        <div class="flex flex-col gap-8">
                            <p class="subtitle-main ml-3">
                                I'm a software engineer, data scientist, web
                                designer and machine learning enthusiast. I'm
                                currently studying Data Science at
                                <NuxtLink
                                    href="https://itu.dk/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >The IT University of Copenhagen</NuxtLink
                                >.
                            </p>
                            <nuxt-img
                                src="https://i.imgur.com/54u33jr.jpg"
                                alt="Picture of me"
                                class="rounded-lg shadow-xl md:hidden"
                            />
                        </div>
                        <hr class="mt-12 mb-8" />
                        <Aboutme />
                        <!-- This is so fucking stupid holy shit -->
                        <!-- If I don't wrap these two components with a div, they get rendered twice -->
                        <!-- Even in the static html build they're only there once, but when you load the page there are two of them -->
                        <hr class="my-8" />
                        <News />
                    </div>
                    <div class="hidden md:block md:w-2/5">
                        <nuxt-img
                            src="https://i.imgur.com/54u33jr.jpg"
                            alt="Picture of me"
                            class="hidden rounded-lg shadow-2xl md:block"
                        />
                    </div>
                </div>
                <div>
                    <hr class="my-8" />
                    <Projects />
                    <hr class="my-8" />
                    <Socials />
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>
