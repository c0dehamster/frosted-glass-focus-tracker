<script lang="ts">
    import "./style.css"

    import backgroundPatternMobile from "../lib/images/bg_pattern_mobile.svg"
    import backgroundPatternTablet from "../lib/images/bg_pattern_tablet.svg"
    import backgroundPatternDesktop from "../lib/images/bg_pattern_desktop.svg"
    import Header from "$lib/components/Header.svelte"
</script>

<svelte:head>
    <title>Frosted Glass time manager</title>
</svelte:head>

<div
    class="app"
    style="
        --background-pattern-mobile: url({backgroundPatternMobile});
        --background-pattern-tablet: url({backgroundPatternTablet});
        --background-pattern-desktop: url({backgroundPatternDesktop});"
>
    <div class="header">
        <Header></Header>
    </div>

    <main class="wrapper">
        <slot />
    </main>
</div>

<style>
    /* TODO: fix the scrollbar issue */
    .app {
        position: relative;

        min-height: 100vh;
        width: 100%;

        display: grid;
    }

    .header {
        position: fixed;
        z-index: 100;
        inset-inline: 0;
        inset-block-start: 0;
    }

    .wrapper {
        display: grid;

        background-image: var(--background-pattern-mobile);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }

    @media screen and (width > 40rem) {
        .wrapper {
            background-image: var(--background-pattern-tablet);
        }
    }

    @media screen and (width > 64rem) {
        .wrapper {
            background-image: var(--background-pattern-desktop);
        }
    }
</style>
