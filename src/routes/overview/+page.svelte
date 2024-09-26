<script lang="ts">
    import iconExpand from "$lib/images/icon_expand.svg"
    import { database } from "../database"

    import Chart from "./Chart.svelte"
    import Details from "./Details.svelte"

    let tasksToDisplay = database.tasksToDisplay
</script>

<div class="page">
    <div class="hero">
        <!-- Less than ideal accessibility-wise. Will have to investigate how to fix it -->
        <div class="timespan">
            <p class="timespan__legend">Show for</p>

            <div class="timespan__options">
                <label for="day" class="glass-button timespan__label">
                    <input type="radio" class="hidden" id="day" value="day" />
                    Day
                </label>

                <label for="week" class="glass-button timespan__label">
                    <input
                        type="radio"
                        class="hidden"
                        id="week"
                        value="weeek"
                    />
                    Week
                </label>

                <label for="month" class="glass-button timespan__label">
                    <input
                        type="radio"
                        class="hidden"
                        id="month"
                        value="month"
                    />
                    Month
                </label>

                <label for="year" class="glass-button timespan__label">
                    <input type="radio" class="hidden" id="year" value="year" />
                    Year
                </label>
            </div>
        </div>

        <h1 class="focused-time">
            Focused time: <span class="focused-time__value">7 hrs 30 min</span>
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

    .timespan {
        width: 100%;

        grid-area: timespan;
        display: flex;
        align-items: center;
        gap: 3rem;
    }

    .timespan__legend {
        display: none;

        white-space: nowrap;
    }

    .timespan__options {
        width: 100%;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .timespan__label {
        padding-inline: 1rem;
        height: 1.5rem;

        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        font-size: var(--font-size-100);
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

        .timespan {
            width: auto;
        }

        .timespan__legend {
            display: block;

            font-size: var(--font-size-400);
        }

        .timespan__options {
            gap: 2rem;
        }

        .timespan__label {
            height: 3rem;

            font-size: var(--font-size-400);
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
        .timespan {
            gap: 4rem;
        }

        .timespan__legend {
            font-size: var(--font-size-500);
        }

        .timespan__label {
            padding-inline: 2rem;

            font-size: var(--font-size-500);
        }

        /* Heading */

        .focused-time {
            font-size: var(--font-size-800);
            justify-content: end;
        }

        /* Chart */
    }
</style>
