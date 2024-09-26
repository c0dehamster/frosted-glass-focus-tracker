<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import iconExpand from "$lib/images/icon_expand.svg"
    import iconEdit from "$lib/images/icon_edit.svg"
    import iconDelete from "$lib/images/icon_delete.svg"
    import iconCheck from "$lib/images/icon_done.svg"

    import { createEventDispatcher } from "svelte"

    export let task: Task

    const dispatch = createEventDispatcher()

    let expanded = false

    const toggleExpanded = () => (expanded = !expanded)

    const toggleActive = () => {
        if (task.status === "active") {
            dispatch("suspend", task.id)
        } else {
            dispatch("resume", task.id)
        }
    }

    const toggleCompleted = () => dispatch("toggleCompleted", task.id)
    const onEdit = () => dispatch("edit", task.id)
    const onDelete = () => dispatch("delete", task.id)
</script>

<div class="glass task-tile" style="--icon-checkmark: url({iconCheck});">
    <div class="task-tile__header">
        <button
            class="task-tile__checkbox {task.status === 'completed'
                ? 'task-tile__checkbox--completed'
                : ''}"
            on:click={toggleCompleted}
        >
            <span class="sr-only">Mark as completed</span>
        </button>

        <button class="task-tile__name" on:click={toggleExpanded}>
            {task.name}
        </button>

        <button class="expand" on:click={toggleExpanded}>
            <img src={iconExpand} alt="expand" class="expand__icon" />
        </button>
    </div>

    <div class="details {expanded ? 'details--expanded' : ''}">
        <div class="details__buffer">
            <div class="details__contents">
                {#if task.description !== null}
                    <p class="details__description">
                        {task.description}
                    </p>
                {/if}

                <div class="controls">
                    {#if task.status === "completed"}
                        <div class="status">
                            <p>Done</p>
                            <img
                                src={iconCheck}
                                alt="expand"
                                class="status__icon"
                            />
                        </div>
                    {:else}
                        <button
                            class="glass controls__button controls__button--toggle-active"
                            on:click={toggleActive}
                        >
                            {#if task.status === "active"}
                                <span>Suspend</span>
                            {:else if task.status === "suspended"}
                                <span>Resume</span>
                            {/if}
                        </button>
                    {/if}

                    <button
                        class="glass controls__button controls__button--edit"
                        on:click={onEdit}
                    >
                        <img src={iconEdit} alt="edit" class="controls__icon" />
                    </button>

                    <button
                        class="glass controls__button controls__button--delete"
                        on:click={onDelete}
                    >
                        <img
                            src={iconDelete}
                            alt="delete"
                            class="controls__icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .task-tile {
        display: grid;

        align-items: center;

        box-shadow: none;

        /* Workaround: by moving the padding into the children, I prevent shadows from clipping */
        --_padding-block: 1.5rem;
        --_padding-inline: 1.5rem;
    }

    .task-tile__header {
        padding-block: var(--_padding-block);
        padding-inline: var(--_padding-inline);

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "checkbox expand"
            "name name";
        align-items: center;
        gap: 1.5rem;
    }

    /* Dividing line */

    .task-tile:where(:not(:last-child)) {
        border-bottom: 1px solid var(--color-primary-200);
    }

    /* Checkbox */

    .task-tile__checkbox {
        grid-area: checkbox;

        width: 1rem;
        aspect-ratio: 1;
        border: 1px solid var(--color-primary-400);
    }

    .task-tile__checkbox--completed::before {
        content: "";
        position: absolute;
        z-index: 2;

        /* Pretty much just a position where the checkmark looks the best */

        transform: translate(-50%, -50%);
        top: 25%;
        left: 60%;

        width: 250%;
        aspect-ratio: 1;

        background-image: var(--icon-checkmark);
        background-repeat: no-repeat;
        background-size: cover;
    }

    .task-tile__name {
        grid-area: name;
        justify-self: start;

        font-size: var(--font-size-300);

        text-wrap: balance;
        text-align: start;
    }

    .expand {
        grid-area: expand;
        justify-self: end;
    }

    .expand__icon {
        width: 100%;
        height: 100%;
    }

    /* Expandable */

    .details {
        display: grid;
        /* Collapsed state. Transition does not work with height, therefore grid rows hack */
        grid-template-rows: 0fr;

        transition: grid-template-rows 200ms ease-out;
    }

    .details--expanded {
        grid-template-rows: 1fr;
    }

    .details__buffer {
        overflow: hidden;
    }

    .details__contents {
        padding-inline: var(--_padding-inline);
        padding-block-end: var(--_padding-block);

        display: grid;
        gap: 1.5rem;
    }

    .details__description {
        font-size: var(--font-size-100);
    }

    .controls {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 1.5rem;

        /* Workaround for the padding preventing the details from hiding completely */
    }

    .controls__button {
        height: 2rem;
    }

    .controls__icon {
        width: 80%;
        height: 80%;
    }

    .controls__button--toggle-active {
        justify-self: start;

        padding-inline: 1rem;

        font-size: var(--color-primary-300);
    }

    .status {
        justify-self: start;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        font-size: var(--font-size-300);
    }

    .status__icon {
        height: 100%;
        aspect-ratio: 1;
    }

    .controls__button--edit,
    .controls__button--delete {
        aspect-ratio: 1;
    }

    @media screen and (width > 40rem) {
        .task-tile {
            --_padding-block: 2rem;
            --_padding-inline: 2.5rem;
        }

        .task-tile__header {
            grid-template-columns: auto 1fr auto;
            grid-template-areas: "checkbox name expand";
        }

        .task-tile__checkbox {
            width: 1.5rem;
        }

        .task-tile__name {
            font-size: var(--font-size-400);
        }

        .expand {
            width: 2rem;
        }

        /* Expandable */

        .details__contents {
            padding-inline-start: 5.5rem;
            padding-inline-end: 6rem;
            gap: 2rem;
        }

        .details__description {
            font-size: var(--font-size-300);
        }

        .controls {
            gap: 2rem;
        }

        .controls__button {
            height: 3rem;
        }

        .controls__button--toggle-active {
            padding-inline: 2rem;

            font-size: var(--font-size-400);
        }

        .status {
            gap: 1rem;

            font-size: var(--font-size-400);
        }
    }

    @media screen and (width > 64rem) {
        .task-tile {
            --_padding-block: 2.5rem;
            --_padding-inline: 3rem;
        }

        .task-tile__header {
            gap: 3rem;
        }

        .task-tile__checkbox {
            width: 2rem;
        }

        .task-tile__name {
            font-size: var(--font-size-500);
        }

        .expand {
            width: 3rem;
        }

        .details__contents {
            padding-inline-start: 8rem;
            padding-inline-end: 9rem;
            gap: 3rem;
        }
    }
</style>
