<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import iconCheck from "$lib/images/icon_done.svg"
    import iconExpand from "$lib/images/icon_expand.svg"
    import { timeIntervalToReportStore } from "./timespan"
    import { focusedTimeByInterval } from "../../lib/utils/focusedTimeByItherval"
    import { secondsToHoursAndMinutes } from "$lib/utils/secondsToHoursAndMinutes"

    export let task: Task

    let expanded = false

    const toggleExpanded = () => (expanded = !expanded)

    let timeSpentOnTask = focusedTimeByInterval(
        task,
        $timeIntervalToReportStore
    )

    let timeFormatted = secondsToHoursAndMinutes(timeSpentOnTask)

    $: detailsClass = expanded ? "details details--expanded" : "details"
</script>

<div class="glass task">
    <button class="task__name" on:click={toggleExpanded}>{task.name}</button>

    <button class="task__expand" on:click={toggleExpanded}>
        <img src={iconExpand} alt="expand" class="task__icon" />
    </button>

    <div class={detailsClass}>
        <div class="details__buffer">
            <div class="details__contents">
                <div class="time-spent">
                    <p class="time-spent__label">Time spent:</p>
                    <p class="time-spent__value">
                        {#if timeFormatted.hours > 0 || timeFormatted.minutes > 0}
                            {#if timeFormatted.hours > 0}
                                <span class="time-spent__hours"
                                    >{timeFormatted.hours} hrs</span
                                >
                            {/if}
                            {#if timeFormatted.minutes > 0}
                                <span class="time-spent__minutes"
                                    >{timeFormatted.minutes} min</span
                                >
                            {/if}
                        {:else}
                            0 min
                        {/if}
                    </p>
                </div>

                <div class="status">
                    {#if task.status === "completed"}
                        <p>Done</p>
                        <img
                            src={iconCheck}
                            alt="expand"
                            class="status__icon"
                        />
                    {:else}
                        <p>Active</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .task {
        padding: 1rem;

        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
            "name expand"
            "details details";
        align-items: center;

        box-shadow: none;
    }

    .task__name {
        grid-area: name;

        justify-self: start;

        font-size: var(--font-size-100);
        text-wrap: balance;
        text-align: start;
    }

    .task__expand {
        justify-self: end;

        width: 1rem;
        aspect-ratio: 1;
    }

    .task__icon {
        width: 100%;
    }

    .status__icon {
        width: 100%;
    }

    .details {
        grid-area: details;

        display: grid;
        grid-template-rows: 0fr;

        transition: grid-template-rows 150ms ease-out;
    }

    .details--expanded {
        grid-template-rows: 1fr;
    }

    .details__buffer {
        overflow: hidden;
    }

    .details__contents {
        padding-block-start: 1.5rem;

        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }

    .time-spent {
        justify-self: start;

        display: flex;
        flex-direction: column;
        align-items: start;

        font-size: var(--font-size-100);
    }

    .status {
        justify-self: end;

        display: flex;
        align-items: center;
        gap: 0.5rem;

        font-size: var(--font-size-100);
    }

    .status__icon {
        height: 1rem;
        aspect-ratio: 1;
    }

    @media screen and (width > 40rem) {
        .task {
            padding-block: 1.5rem;
            padding-inline: 2.5rem;
        }

        .task__name {
            font-size: var(--font-size-400);
        }

        .task__expand {
            width: 2rem;
        }

        .time-spent {
            flex-direction: row;
            gap: 1rem;

            font-size: var(--font-size-300);
        }

        .status {
            font-size: var(--font-size-300);
        }

        .status__icon {
            height: 1.5rem;
        }
    }

    @media screen and (width > 64rem) {
        .task {
            padding-block: 2rem;
            padding-inline: 4rem;

            grid-template-columns: 3fr 2fr;
            grid-template-areas: "name details";
        }

        .task__name {
            font-size: var(--font-size-500);
        }

        .task__expand {
            display: none;
        }

        .details {
            grid-template-rows: 1fr;
        }

        .details__contents {
            padding: 0rem;

            justify-content: space-around;
        }

        .time-spent__label {
            display: none;
        }

        .time-spent {
            font-size: var(--font-size-400);

            justify-self: center;
        }

        .status {
            justify-self: center;

            font-size: var(--font-size-400);
        }

        .status__icon {
            height: 2rem;
        }
    }
</style>
