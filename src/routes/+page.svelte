<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import iconExpand from "$lib/images/icon_expand.svg"
    import favicon from "$lib/images/favicon128x128.png"

    import Clock from "./Clock.svelte"
    import CompleteModal from "./CompleteModal.svelte"
    import TaskPicker from "./TaskPicker.svelte"
    import GiveUpModal from "./GiveUpModal.svelte"
    import NotificationSettingsModal from "./NotificationSettingsModal.svelte"

    import { timerStore } from "./timer"
    import { onMount } from "svelte"
    import { database } from "./database"

    let duration = 30 // For testing, 30 seconds
    let breakDuration = 5

    // Task picker-related variables

    let tasksToDisplay = database.tasksToDisplay
    let taskSelected: Task | null = null

    // Various pop-ups

    let taskPickerShown = false
    let giveUpShown = false
    let notificationSettingShown = false

    let notification: Notification

    const onSelect = async (id: string) => {
        let taskById = await database.getById(id)
        taskSelected = taskById ? taskById : null
    }

    const onStart = () => timerStore.runTimer(duration, taskSelected)

    const onBreak = () => {
        notification.close()
        timerStore.takeABreak(breakDuration)
    }

    const onClose = () => {
        notification.close()
        timerStore.reset()
    }

    const onGiveUp = () => {
        giveUpShown = false
        timerStore.giveUp()
    }

    // I have no reliable way to debug this. Problems are to be expected

    const onNotificationEnable = () => {
        Notification.requestPermission().then((result) => {
            console.log(result)
            notificationSettingShown = false
        })
    }

    const onNotificationDecline = () => (notificationSettingShown = false)

    onMount(() => {
        notificationSettingShown = Notification.permission === "default"
    })

    $: {
        if ($timerStore.status === "elapsed") {
            notification = new Notification("Well done!", {
                icon: favicon,
                body: "You've been focused for 30 minutes",
            })
        }
    }
</script>

<div class="page">
    <NotificationSettingsModal
        shown={notificationSettingShown}
        on:enable={onNotificationEnable}
        on:decline={onNotificationDecline}
    ></NotificationSettingsModal>

    <CompleteModal durationMinutes={30} on:break={onBreak} on:close={onClose}
    ></CompleteModal>

    <GiveUpModal
        shown={giveUpShown}
        on:giveUp={onGiveUp}
        on:cancel={() => (giveUpShown = false)}
    ></GiveUpModal>

    {#if $tasksToDisplay}
        <TaskPicker
            tasksList={$tasksToDisplay}
            isModalShown={taskPickerShown}
            on:select={(e) => {
                onSelect(e.detail)
                taskPickerShown = false
            }}
            on:close={() => (taskPickerShown = false)}
            on:clear={() => {
                taskSelected = null
                taskPickerShown = false
            }}
        ></TaskPicker>
    {/if}

    <div class="clock">
        <Clock {duration}></Clock>
    </div>

    <!-- Idle state -->

    <div
        class="select-task {$timerStore.status === 'idle'
            ? 'select-task--shown'
            : ''}"
    >
        <button
            class="select-task__button"
            on:click={() => (taskPickerShown = true)}
        >
            {#if taskSelected !== null}
                <span class="select-task__title">
                    {taskSelected.name}
                </span>
            {:else}
                Select a task...
            {/if}

            <img
                src={iconExpand}
                alt="expand the task list"
                class="select-task__icon"
            />
        </button>
    </div>

    <button
        class="glass-button start-button {$timerStore.status === 'idle'
            ? 'start-button--shown'
            : ''}"
        on:click={onStart}
    >
        Start!
    </button>

    <!-- Timer active -->

    <div
        class="active-task {$timerStore.status === 'active' ||
        $timerStore.status === 'elapsed'
            ? 'active-task--shown'
            : ''}"
    >
        <p class="active-task__label">Working on...</p>
        <p class="active-task__name">
            {#if $timerStore.task !== null}
                {$timerStore.task.name}
            {:else}
                Something extremely important
            {/if}
        </p>
    </div>

    <div
        class="controls {$timerStore.status === 'active' ||
        $timerStore.status === 'elapsed'
            ? 'controls--shown'
            : ''}"
    >
        <button class="controls__give-up" on:click={() => (giveUpShown = true)}>
            Give up
        </button>

        <button class="glass controls__finished">Finished!</button>
    </div>

    <!-- Break -->

    <p class="break {$timerStore.status === 'break' ? 'break--shown' : ''}">
        <!-- TODO: implement random advices (optional) -->
        Resting...
    </p>

    <button
        class="glass-button resume-button {$timerStore.status === 'break'
            ? 'resume-button--shown'
            : ''}"
    >
        Back to work
    </button>
</div>

<style>
    /* Tablet first, since it is the simplest layout */

    .page {
        position: relative;
        padding-inline: 4rem;

        display: grid;
        grid-template-rows: 4fr 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
    }

    .clock {
        position: relative;
        z-index: 10;

        grid-column: 1 / 3;
        align-self: end;

        width: 100%;

        display: grid;
        place-items: center;
    }

    .start-button,
    .active-task,
    .controls,
    .select-task,
    .break,
    .resume-button {
        /* Items are toggled on and off depending on the timer status */
        display: none;
    }

    /* Idle state */

    .start-button {
        height: 3rem;
        padding-inline: 2rem;

        grid-row: 2 / 4;

        font-size: var(--font-size-500);
    }

    .start-button--shown {
        display: inline-flex;
    }

    .select-task {
        grid-row: 2 / 4;

        position: relative;
        z-index: 20;
    }

    .select-task--shown {
        display: block;
    }

    .select-task__button {
        font-size: var(--font-size-500);
        gap: 0.5rem;
    }

    .select-task__icon {
        width: 2rem;
        aspect-ratio: 1;
    }

    .select-task__title {
        /* TODO: fix excessive width */

        font-size: var(--font-size-500);
        text-wrap: balance;
    }

    /* Active state */

    .active-task {
        grid-row: 2 / 3;
        grid-column: 1 / 3;

        flex-direction: column;
        align-items: center;
        gap: 1rem;

        text-align: center;
    }

    .active-task--shown {
        display: flex;
    }

    .active-task__label {
        font-size: var(--font-size-300);
        font-weight: var(--font-weight-bold);
    }

    .active-task__name {
        font-size: var(--font-size-600);

        text-wrap: balance;
    }

    .controls {
        grid-row: 3 / 4;
        grid-column: 1 / 3;

        gap: 3rem;
    }

    .controls--shown {
        display: flex;
    }

    .controls__give-up {
        font-size: var(--font-size-500);
    }

    .controls__finished {
        height: 3rem;
        padding-inline: 2rem;

        font-size: var(--font-size-500);
    }

    /* Break state */

    .break {
        grid-row: 2 / 3;
        grid-column: 1 / 3;

        font-size: var(--font-size-600);
    }

    .break--shown {
        display: block;
    }

    .resume-button {
        grid-row: 3 / 4;
        grid-column: 1 / 3;

        height: 3rem;
        padding-inline: 2rem;

        font-size: var(--font-size-500);
    }

    .resume-button--shown {
        display: inline-flex;
    }

    @media screen and (width < 40rem) {
        .page {
            grid-template-columns: 1fr;
            grid-template-rows: 3fr 1fr;

            padding-inline: 2rem;
        }
        .clock {
            grid-row: 1 / 3;
            align-self: center;

            padding: 0rem;
        }

        /* Idle state */

        .select-task {
            grid-row: 1 / 3;
            grid-column: 1 / 2;

            max-width: 75%;
        }

        .select-task__button {
            font-size: var(--font-size-300);
        }

        .select-task__icon {
            width: 1.5rem;
        }

        .select-task__title {
            font-size: var(--font-size-300);
        }

        .start-button {
            grid-row: 2 / 3;
            grid-column: 1 / 2;

            font-size: var(--font-size-300);
            height: 2.5rem;
        }

        /* Active state */

        .active-task {
            grid-row: 1 / 3;

            max-width: 75%;
        }

        .active-task__label {
            font-size: var(--font-size-100);
        }

        .active-task__name {
            font-size: var(--font-size-300);
        }

        .controls {
            grid-row: 2 / 3;
        }

        .controls__give-up {
            font-size: var(--font-size-300);
        }

        .controls__finished {
            height: 2rem;

            padding-inline: 1rem;

            font-size: var(--font-size-300);
        }

        /* Break */

        .break {
            grid-row: 1 / 3;
            grid-column: 1 / 2;

            font-size: var(--font-size-300);
        }

        .resume-button {
            grid-row: 2 / 3;

            height: 2rem;

            padding-inline: 1rem;

            font-size: var(--font-size-300);
        }
    }

    @media screen and (width > 64rem) {
        .page {
            grid-template-rows: 1fr 1fr 1fr;

            padding-inline: 2rem;
        }

        /* Decorative background lines */

        .page::before,
        .page::after {
            content: "";
            position: absolute;

            height: 2px;

            background-color: var(--color-primary-200);
        }

        .page::before {
            top: 35%;
            left: 2%;
            width: 70%;
        }

        .page::after {
            top: 65%;
            left: 20%;
            width: 60%;
        }

        /* A mess of magic numbers to fit the freehand-drawn design*/

        .clock {
            grid-row: 1 / 4;
            grid-column: 2 / 3;
            align-self: center;
        }

        /* Idle state */

        .select-task {
            grid-row: 2 / 3;
            grid-column: 1 / 2;
            justify-self: end;
        }

        .select-task__button {
            font-size: var(--font-size-700);
        }

        .select-task__icon {
            width: 4rem;
        }

        .select-task__title {
            font-size: var(--font-size-600);
        }

        .start-button {
            height: 4rem;

            margin-block-start: 2rem;

            grid-row: 3 / 4;
            grid-column: 1 / 2;
            align-self: start;
            justify-self: end;

            font-size: var(--font-size-600);
        }

        /* Active state */

        .active-task {
            grid-row: 2 / 3;
            grid-column: 1 / 2;
            justify-self: end;
        }

        .controls {
            margin-block-start: 2rem;

            grid-row: 3 / 4;
            grid-column: 1 / 2;
            align-self: start;
            justify-self: end;
        }

        .controls__give-up {
            font-size: var(--font-size-600);
        }

        .controls__finished {
            height: 4rem;
            font-size: var(--font-size-600);
        }

        /* Break */

        .break {
            grid-row: 2 / 3;
            grid-column: 1 / 2;

            justify-self: end;

            padding-inline-end: 8rem;

            font-size: var(--font-size-700);
        }

        .resume-button {
            grid-row: 3 / 4;
            grid-column: 1 / 2;

            height: 4rem;

            margin-block-start: 2rem;

            align-self: start;
            justify-self: end;

            font-size: var(--font-size-600);
        }
    }
</style>
