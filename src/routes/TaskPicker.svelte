<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import iconExpand from "$lib/images/icon_expand.svg"
    import iconClose from "$lib/images/icon_close.svg"
    import { createEventDispatcher, onMount } from "svelte"

    export let tasksList: Array<Task>
    export let isModalShown = false

    const dispatch = createEventDispatcher()

    let activeTasks = tasksList.filter((task) => task.status === "active")
    let dialog: HTMLDialogElement
    let isMounted = false

    let show = () => {}
    let onClose = () => {}
    let onClear = () => {}
    let onSelect = (id: string) => {}

    onMount(() => {
        isMounted = true

        show = () => dialog.showModal()

        onClose = () => {
            dispatch("close")
            dialog.close()
        }

        onClear = () => {
            dispatch("clear")
            dialog.close()
        }

        onSelect = (id: string) => {
            dispatch("select", id)
            dialog.close()
        }
    })

    $: {
        if (isMounted && isModalShown) show()
    }
</script>

<dialog class="dialog" bind:this={dialog} on:click={onClose} on:keydown>
    <button class="dialog__button" on:click={onClose}>
        <img src={iconClose} alt="close" class="dialog__icon" />
    </button>

    <ul class="dialog__contents" on:click|stopPropagation on:keydown>
        {#if activeTasks.length > 0}
            {#each activeTasks as task}
                <li class="dialog__list-item">
                    <button
                        class="dialog__label"
                        on:click={(e) => onSelect(task.id)}
                    >
                        {task.name}
                    </button>
                </li>
            {/each}
        {/if}
    </ul>

    <button class=" glass-button dialog__clear" on:click={onClear}>
        Clear
    </button>
</dialog>

<style>
    /* Pop-up */

    .dialog:modal {
        max-width: 90%;
    }

    .dialog__button {
        position: absolute;
        inset-inline-end: 0rem;
        inset-block-start: 0rem;
        padding: 1rem;
    }

    .dialog__icon {
        width: 1.5rem;
        aspect-ratio: 1;
    }

    .dialog__clear {
        height: 2.5rem;
        padding-inline: 1rem;
        font-size: var(--font-size-300);
    }

    .dialog__list-item:where(:not(:last-child)) {
        border-bottom: 1px solid var(--color-primary-200);
    }

    .dialog__list-item {
        padding-block: 1rem;
        padding-inline: 1.5rem;
    }

    .dialog__label {
        font-size: var(--font-size-300);

        text-wrap: balance;
    }

    @media screen and (width > 40rem) {
        .dialog__clear {
            height: 4rem;
            padding-inline: 1.5rem;
            font-size: var(--font-size-500);
        }

        .dialog__list-item {
            padding-block: 1.5rem;
            padding-inline: 2rem;
        }

        .dialog__button {
            padding: 1.5rem;
        }

        .dialog__icon {
            width: 2rem;
        }

        .dialog__label {
            font-size: var(--font-size-500);
        }
    }

    @media screen and (width > 64rem) {
        /* TODO: implment the separate task picker for the large screen*/

        /*         .dialog:modal {
            display: none;
        } */
    }
</style>
