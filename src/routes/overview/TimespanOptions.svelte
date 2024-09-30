<script lang="ts">
    import { timeIntervalToReportStore, type TimespanOptions } from "./timespan"

    let options: TimespanOptions = "week" // Defaults to a week

    let today = new Date(Date.now())

    $: {
        timeIntervalToReportStore.fromEndDate(today, options)
        console.log(options, $timeIntervalToReportStore)
    }
</script>

<div class="timespan">
    <p class="timespan__legend">Show for</p>

    <div class="timespan__options">
        <label for="day" class="glass-button timespan__label">
            <input
                type="radio"
                class="hidden"
                id="day"
                value="day"
                bind:group={options}
            />
            Day
        </label>

        <label for="week" class="glass-button timespan__label">
            <input
                type="radio"
                class="hidden"
                id="week"
                value="week"
                bind:group={options}
            />
            Week
        </label>

        <label for="month" class="glass-button timespan__label">
            <input
                type="radio"
                class="hidden"
                id="month"
                value="month"
                bind:group={options}
            />
            Month
        </label>

        <label for="year" class="glass-button timespan__label">
            <input
                type="radio"
                class="hidden"
                id="year"
                value="year"
                bind:group={options}
            />
            Year
        </label>
    </div>
</div>

<style>
    .timespan {
        width: 100%;

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

    @media screen and (width > 40rem) {
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
    }

    @media screen and (width > 64rem) {
        .timespan__legend {
            font-size: var(--font-size-500);
        }

        .timespan__label {
            padding-inline: 2rem;

            font-size: var(--font-size-500);
        }
    }
</style>
