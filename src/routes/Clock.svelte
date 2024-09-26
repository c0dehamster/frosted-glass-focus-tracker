<script lang="ts">
    import pointer from "$lib/images/pointer.svg"
    import { timeLeft, timerStore } from "./timer"

    export let duration: number

    $: pointerAngle =
        $timerStore?.status === "active" || $timerStore.status === "break"
            ? ($timeLeft * 360) / duration
            : 0
</script>

<div
    class="clock"
    style="
        --pointer: url({pointer});
        --pointer-angle: {pointerAngle}deg"
>
    <div class="glass clock__face"></div>

    <div class="clock__digits">
        <span class="clock__digit clock__digit--1">25</span>
        <span class="clock__digit clock__digit--2">20</span>
        <span class="clock__digit clock__digit--3">15</span>
        <span class="clock__digit clock__digit--4">10</span>
        <span class="clock__digit clock__digit--5">5</span>
        <span class="clock__digit clock__digit--0">0</span>
    </div>

    <div class="pointer"></div>

    <div class="clock__controls">
        <slot />
    </div>

    <div class="hand"></div>

    <!-- The SVGs are not displayed and used purely as masks -->

    <svg viewBox="0 0 1 1" class="mask-mobile sr-only">
        <defs>
            <clipPath clipPathUnits="objectBoundingBox" id="maskMobile">
                <path
                    d="M1 0.5C1 0.776142 0.776142 1 0.5 1C0.223858 1 0 0.776142 0 0.5C0 0.223858 0.223858 0 0.5 0C0.776142 0 1 0.223858 1 0.5ZM0.11 0.5C0.11 0.715391 0.284609 0.89 0.5 0.89C0.715391 0.89 0.89 0.715391 0.89 0.5C0.89 0.284609 0.715391 0.11 0.5 0.11C0.284609 0.11 0.11 0.284609 0.11 0.5Z"
                    fill="black"
                />
            </clipPath>
        </defs>
    </svg>
</div>

<style>
    /* General styling / clock face */
    .clock {
        position: relative;
        container: clock-face / inline-size;

        width: 100%;
        max-width: 60vh;
        aspect-ratio: 1;

        border-radius: 50%;

        --_clock-face-diameter: 80cqw;
    }

    /* Workaround for the clock face shadow which otherwise would have been clipped */

    .clock::before {
        content: "";
        position: absolute;
        width: var(--_clock-face-diameter);
        aspect-ratio: 1;
        border-radius: 50%;

        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;

        box-shadow: 0.25rem 0.25rem 2rem 0.25rem rgba(0, 0, 0, 0.1);
    }

    .clock__face {
        position: absolute;

        width: var(--_clock-face-diameter);
        border-radius: 50%;
        aspect-ratio: 1;

        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }

    .clock__face::before {
        border-radius: 50%;
    }

    /* Digits */

    .clock__digits {
        position: absolute;
        inset: 0;
    }

    .clock__digit {
        position: absolute;

        height: 50cqw;

        padding-block-start: 1.5cqw;

        transform-origin: 50% 100%;
        left: 50%;

        font-size: 5.4cqw;
    }

    /* I wish there was a more concise way to do this */

    .clock__digit--0 {
        transform: translateX(-50%);
    }

    .clock__digit--1 {
        transform: translateX(-50%) rotate(-60deg);
    }

    .clock__digit--2 {
        transform: translateX(-50%) rotate(-120deg);
    }

    .clock__digit--3 {
        transform: translateX(-50%) rotate(-180deg);
    }

    .clock__digit--4 {
        transform: translateX(-50%) rotate(-240deg);
    }

    .clock__digit--5 {
        transform: translateX(-50%) rotate(-300deg);
    }

    /* Pointers */

    .hand {
        position: absolute;
        z-index: 10;

        width: 0.25rem;
        height: 42cqw;

        transform-origin: 50% 44cqw;

        transform: translateX(-50%) rotate(var(--pointer-angle));
        left: 50%;
        top: 6cqw;

        background-color: var(--color-primary-400);
        box-shadow: 0 0 1rem 0 var(--color-primary-400);
    }

    @media screen and (width < 40rem) {
        .clock {
            --_clock-face-diameter: 100cqw;
        }

        .clock__face {
            clip-path: url(#maskMobile);
        }

        /* Fake shadow inside the ring */

        .clock::after {
            content: "";
            position: absolute;
            width: 78cqw;
            aspect-ratio: 1;
            border-radius: 50%;

            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;

            background: radial-gradient(
                closest-side at center,
                rgba(0, 0, 0, 0) calc(100% - 2rem),
                rgba(0, 0, 0, 0.05)
            );
        }

        .hand {
            display: none;
        }

        /* Notch-style pointer */

        .pointer {
            position: absolute;

            width: 11cqw;
            height: 44cqw;

            top: 6cqw;
            left: 50%;

            transform-origin: 50% 100%;
            transform: translateX(-50%) rotate(var(--pointer-angle));

            background-image: var(--pointer);
            background-repeat: no-repeat;
            background-size: contain;
        }
    }

    @media screen and (width > 64rem) {
    }
</style>
