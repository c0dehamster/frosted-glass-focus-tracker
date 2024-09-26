<script lang="ts">
    import { createEventDispatcher } from "svelte"

    import Dialog from "$lib/components/Dialog.svelte"

    export let shown = false

    const dispatch = createEventDispatcher()

    const onCancel = () => dispatch("cancel")
    const onDelete = () => dispatch("delete")
</script>

<Dialog {shown} on:close={onCancel}>
    <div class="warning">
        <h1 class="warning__title">Are you sure you want to delete?</h1>

        <p class="warning__details">
            The task and all the progress on it will be deleted
        </p>

        <button
            class="warning__button warning__button--cancel"
            on:click={onCancel}
        >
            Cancel
        </button>

        <button
            class="glass-button warning__button warning__button--delete"
            on:click={onDelete}
        >
            Delete
        </button>
    </div>
</Dialog>

<style>
    .warning {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "title title"
            "details details"
            "cancel delete";
        gap: 2rem;
        place-items: center;
    }

    .warning__title {
        grid-area: title;

        justify-self: center;

        font-size: var(--font-size-500);
        text-align: center;
        text-wrap: balance;
    }

    .warning__button {
        width: 100%;
        height: 2.5rem;

        font-size: var(--font-size-300);
    }

    .warning__details {
        grid-area: details;

        font-size: var(--font-size-100);
        text-align: center;
        text-wrap: balance;
    }

    .warning__button--cancel {
        grid-area: cancel;
    }

    .warning__button--delete {
        grid-area: delete;
    }

    @media screen and (width > 40rem) {
        .warning__title {
            font-size: var(--font-size-600);
        }

        .warning__details {
            font-size: var(--font-size-300);
        }

        .warning__button {
            height: 4rem;

            padding-inline: 1.5rem;

            font-size: var(--font-size-500);
        }
    }
</style>
