<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"
    import { timerStore } from "./timer"

    export let durationMinutes: number

    const dispatch = createEventDispatcher()

    let dialog: HTMLDialogElement

    let isMounted = false

    let onTakeABreak = () => {}
    let onClose = () => {}

    onMount(() => {
        isMounted = true

        onTakeABreak = () => {
            dispatch("break")
            dialog.close()
        }

        onClose = () => {
            dispatch("close")
            dialog.close()
        }
    })

    $: {
        if (isMounted && $timerStore?.status === "elapsed") dialog.showModal()
    }
</script>

<!-- TODO: fix the accessibility warning -->

<dialog class="notification" bind:this={dialog} on:click={onClose} on:keydown>
    <div class="card" on:click|stopPropagation on:keydown>
        <h1 class="card__title">Well done!</h1>
        <p class="card__details">
            You've been focused for {durationMinutes} minutes
        </p>

        <button
            class="glass-button card__button card__button--break"
            on:click={onTakeABreak}>Take a break</button
        >
        <button
            class="glass-button card__button card__button--close"
            on:click={onClose}>Close</button
        >
    </div>
</dialog>

<style>
    .notification:modal {
        max-width: 90%;
    }

    .card {
        display: grid;
        place-items: center;
        grid-template-areas:
            "title title"
            "details details"
            "break close";
        gap: 2rem;
    }

    .card__title {
        grid-area: title;

        font-size: var(--font-size-600);
    }

    .card__details {
        grid-area: details;

        font-size: var(--font-size-300);
        text-align: center;
        text-wrap: balance;
    }

    .card__button {
        justify-self: stretch;
        height: 2.5rem;

        font-size: var(--font-size-300);
    }

    .card__button--break {
        grid-area: break;
    }

    .card__button--close {
        grid-area: close;
    }

    .notification:modal::backdrop {
        background-color: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.25rem);
    }

    @media screen and (width > 40rem) {
        .card {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
        }

        .card__title {
            font-size: var(--font-size-700);
        }

        .card__details {
            font-size: var(--font-size-500);
        }

        .card__button {
            height: 4rem;

            padding-inline: 1.5rem;

            font-size: var(--font-size-500);
        }
    }

    @media screen and (width > 64rem) {
        .notification:modal {
            margin-block: 0rem;
            margin-inline: auto;
            inset-block-start: 6rem;

            padding-inline: 3rem;
            padding-block: 1.5rem;

            background: none;
        }

        .notification:modal::before {
            content: "";

            position: absolute;
            inset: 0;
            z-index: -1;

            background-color: var(--color-neutral-100);
            backdrop-filter: blur(0.25rem);
        }

        .notification:modal::backdrop {
            background: none;
            backdrop-filter: none;
        }

        .card {
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-areas:
                "title break close"
                "details break close";
            row-gap: 1rem;
            column-gap: 3rem;
        }

        .card__title {
            justify-self: start;

            font-size: var(--font-size-600);
        }

        .card__details {
            justify-self: start;

            font-size: var(--font-size-400);
        }
    }
</style>
