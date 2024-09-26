<script lang="ts">
    import type { Task } from "$lib/types/Task"
    import TaskTile from "./TaskTile.svelte"

    export let tasks: Array<Task>
</script>

<div class="details">
    <div class="glass header">
        <p class="header__task">Task</p>
        <p class="header__time-spent">Time spent</p>
        <p class="header__status">Status</p>
    </div>

    <div class="tasks">
        <ul class="tasks__list">
            {#if tasks.length > 0}
                {#each tasks as task}
                    <li class="tasks__list-item">
                        <TaskTile {task}></TaskTile>
                    </li>{/each}
            {/if}
        </ul>
    </div>
</div>

<style>
    .details {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .header {
        /* The header is only displayed on large screen */
        display: none;

        padding-block: 2rem;
        padding-inline: 4rem;

        grid-template-columns: 3fr 1fr 1fr;
        align-items: center;

        font-size: var(--font-size-500);
    }

    .header__time-spent {
        justify-self: center;
    }

    .header__status {
        justify-self: center;
    }

    .tasks {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .tasks__list {
        display: flex;
        flex-direction: column;

        box-shadow: 0.25rem 0.25rem 2rem 0.25rem rgba(0, 0, 0, 0.1);
    }

    .tasks__list-item:where(:not(:last-child)) {
        border-bottom: 1px solid var(--color-primary-200);
    }

    @media screen and (width > 64rem) {
        .header {
            display: grid;
        }
    }
</style>
