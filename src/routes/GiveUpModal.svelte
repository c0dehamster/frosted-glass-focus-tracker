<script lang="ts">
    import Dialog from "$lib/components/Dialog.svelte"
    import { createEventDispatcher, onMount } from "svelte"

    export let shown = false

    const dispatch = createEventDispatcher()

    let onCancel = () => dispatch("cancel")
    let onGiveUp = () => dispatch("giveUp")
</script>

<Dialog {shown} on:close={onCancel}>
    <div class="dialog__contents">
        <h1 class="dialog__title">Are you sure you want to give up?</h1>

        <button
            class="glass-button dialog__button dialog__button--give-up"
            on:click={onGiveUp}
        >
            Give up
        </button>

        <button
            class="glass-button dialog__button dialog__button--cancel"
            on:click={onCancel}
        >
            Cancel
        </button>
    </div>
</Dialog>

<style>
    .dialog__contents {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "title title"
            "cancel give-up";
        gap: 2rem;
        place-items: center;
    }

    .dialog__title {
        grid-area: title;

        justify-self: center;

        font-size: var(--font-size-500);
        text-align: center;
        text-wrap: balance;
    }

    .dialog__button {
        justify-self: stretch;
        height: 2.5rem;

        font-size: var(--font-size-300);
    }

    .dialog__button--give-up {
        grid-area: give-up;
    }

    .dialog__button--cancel {
        grid-area: cancel;
    }

    @media screen and (width > 40rem) {
        .dialog__title {
            font-size: var(--font-size-600);
        }

        .dialog__button {
            height: 4rem;

            padding-inline: 1.5rem;

            font-size: var(--font-size-500);
        }
    }
</style>
