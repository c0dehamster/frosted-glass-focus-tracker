<script lang="ts">
    import iconExpand from "$lib/images/icon_expand.svg"
    import type { DurationInSeconds } from "$lib/types/duration"
    import { secondsToHoursAndMinutes } from "$lib/utils/secondsToHoursAndMinutes"
    import { onMount } from "svelte"

    import { database } from "../database"

    import Chart from "./Chart.svelte"
    import Details from "./Details.svelte"
    import { timeIntervalToReportStore } from "./timespan"
    import TimespanOptions from "./TimespanOptions.svelte"
    import { totalTimeFocused } from "./totalTimeFocused"

    let tasksToDisplay = database.tasksToDisplay
    let focusedTime: DurationInSeconds = 0
    let focusedTimeFormatted: {
        hours: number
        minutes: number
    }

    $: {
        if ($tasksToDisplay) {
            focusedTime = totalTimeFocused(
                $tasksToDisplay,
                $timeIntervalToReportStore
            )

            focusedTimeFormatted = secondsToHoursAndMinutes(focusedTime)
        }
    }
</script>

<div class="page">
    <div class="hero">
        <!-- Less than ideal accessibility-wise. Will have to investigate how to fix it -->
        <div class="timespan-wrapper">
            <TimespanOptions></TimespanOptions>
        </div>

        <h1 class="focused-time">
            {#if focusedTime > 0}
                Focused time: <span class="focused-time__value">
                    {#if focusedTimeFormatted.hours > 0}
                        <span class="focused-time__hours">
                            {focusedTimeFormatted.hours} hrs
                        </span>
                    {/if}
                    {#if focusedTimeFormatted.minutes > 0}
                        <span class="focused-time__minutes">
                            {focusedTimeFormatted.minutes} min
                        </span>
                    {/if}
                </span>
            {:else}
                Nothing to display yet
            {/if}
        </h1>

        <div class="chart">
            <Chart></Chart>
        </div>

        <div class="divider">
            <button class="divider__button"
                >View detailed statistics
                <img src={iconExpand} alt="" class="divider__icon" />
            </button>
        </div>
    </div>

    <div class="details">
        {#if $tasksToDisplay}
            <Details tasks={$tasksToDisplay}></Details>
        {/if}
    </div>
</div>

<style>
    .page {
        padding-block-end: 2.5rem;
        padding-inline: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }

    .hero {
        padding-block-start: 8rem;
        min-height: 100vh;

        display: grid;
        grid-template-areas:
            "timespan"
            "title"
            "chart"
            "divider";
        align-items: baseline;
        justify-items: center;
        gap: 2.5rem;
    }

    /* Timespan radio group */

    .timespan-wrapper {
        grid-area: timespan;
    }

    /* Heading */

    .focused-time {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        font-size: var(--font-size-500);
        font-weight: var(--font-weight-normal);
        text-align: center;
    }

    .focused-time__value {
        font-weight: var(--font-weight-bold);
    }

    /* Chart */

    .chart {
        width: 100%;
    }

    /* Divider */

    .divider {
        grid-area: divider;
        align-self: end;

        width: 100%;

        padding-block: 1rem;
        display: grid;
        place-items: center;

        border-top: 1px solid var(--color-primary-300);
    }

    .divider__button {
        font-size: var(--font-size-100);
        gap: 0.5rem;
    }

    .divider__icon {
        height: 1rem;
        aspect-ratio: 1;
    }

    @media screen and (width > 40rem) {
        .page {
            padding-inline: 4rem;
            padding-block-end: 5rem;
        }

        .hero {
            padding-block-start: 9rem;

            grid-template-areas:
                "title"
                "chart"
                "timespan"
                "divider";
            gap: 6rem;
        }

        /* Timespan radio group */

        .timespan-wrapper {
            width: auto;
        }

        /* Heading */

        .focused-time {
            font-size: var(--font-size-700);
        }

        /* Chart */

        /* Divider */

        .divider {
            padding-block: 2rem;
        }

        .divider__button {
            font-size: var(--font-size-500);
        }

        .divider__icon {
            height: 3rem;
        }
    }

    @media screen and (width > 64rem) {
        .page {
            padding-inline: 8rem;
        }

        .hero {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                "timespan timespan"
                "title chart"
                "divider divider";
            align-items: center;
        }

        /* Timespan radio group */
        .timespan-wrapper {
            gap: 4rem;
        }

        /* Heading */

        .focused-time {
            font-size: var(--font-size-800);
            justify-content: end;
        }

        /* Chart */
    }
</style>
