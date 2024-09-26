<script lang="ts">
    import { createEventDispatcher } from "svelte"

    import Dialog from "$lib/components/Dialog.svelte"

    export let shown = false

    const dispatch = createEventDispatcher()

    let enable = () => dispatch("enable")
    let decline = () => dispatch("decline")
</script>

<Dialog {shown} on:close={decline}>
    <div class="dialog__contents">
        <h1 class="dialog__title">Enable notifications?</h1>

        <p class="dialog__details">
            We will only use them to notify you when the timer has elapsed
        </p>

        <!-- TODO: implement permanent decline -->

        <button
            class="dialog__button dialog__button--decline"
            on:click={decline}
        >
            Decline
        </button>

        <button
            class="glass-button dialog__button dialog__button--enable"
            on:click={enable}
        >
            Enable
        </button>
    </div>
</Dialog>

<style>
    .dialog__contents {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "title title"
            "details details"
            "decline enable";
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

    .dialog__details {
        grid-area: details;

        font-size: var(--font-size-100);
        text-align: center;
        text-wrap: balance;
    }

    .dialog__button {
        justify-self: stretch;
        height: 2.5rem;

        font-size: var(--font-size-400);
    }

    .dialog__button--decline {
        grid-area: decline;
    }

    .dialog__button--enable {
        grid-area: enable;
    }

    @media screen and (width > 40rem) {
        .dialog__title {
            font-size: var(--font-size-600);
        }

        .dialog__details {
            font-size: var(--font-size-300);
        }

        .dialog__button {
            height: 4rem;

            padding-inline: 1.5rem;

            font-size: var(--font-size-500);
        }
    }
</style>
