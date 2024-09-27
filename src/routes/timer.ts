import type { Task } from "$lib/types/Task"
import { derived, writable } from "svelte/store"
import { database } from "./database"
import type { durationInSeconds } from "$lib/types/duration"
import { WorkSession } from "$lib/types/WorkSession"

type TimerStatus = "idle" | "active" | "elapsed" | "failed" | "break"

interface Timer {
    timerStart: Date
    duration: durationInSeconds
    timeElapsed: number
    status: TimerStatus
    task: {
        name: string
        id: string
    } | null
}

// TODO: move the defaults to a more appropriate location

const defaultTimer: Timer = {
    timerStart: new Date(Date.now()),
    duration: 1800,
    timeElapsed: 0,
    status: "idle",
    task: null,
}

const createTimerStore = (timer: Timer) => {
    const { set, update, subscribe } = writable(timer)

    const runTimer = (duration: number, task: Task | null) => {
        /* Initialize the timer */

        let newTask = task ? { name: task.name, id: task.id } : null

        set({
            timerStart: new Date(Date.now()),
            duration,
            timeElapsed: 0,
            status: "active",
            task: newTask,
        })

        /* The countdown loop */

        let timerLoop: number

        let status: TimerStatus = "active"

        const onElapsed = () => {
            clearInterval(timerLoop)

            // TODO: add the task handler
        }

        timerLoop = setInterval(() => {
            update((store) => {
                if (store.status === "failed") {
                    onElapsed()

                    return {
                        ...store,
                        timeElapsed: 0,
                        status: "idle",
                    }
                }

                if (store.timeElapsed === store.duration) {
                    onElapsed()
                    status = "elapsed"

                    if (store.task) {
                        database.addWorkSession(
                            store.task.id,
                            new WorkSession(
                                store.timerStart,
                                new Date(Date.now())
                            )
                        )
                    }
                }

                return {
                    ...store,
                    status,
                    timeElapsed: store.timeElapsed + 1,
                }
            })
        }, 1000)
    }

    const takeABreak = (duration: number) => {
        set({
            timerStart: new Date(Date.now()),
            duration,
            timeElapsed: 0,
            status: "break",
            task: null,
        })

        /* The countdown loop */

        let timerLoop: number

        let status: TimerStatus = "break"

        const onElapsed = () => {
            clearInterval(timerLoop)

            // TODO: add the task handler
        }

        timerLoop = setInterval(() => {
            update((store) => {
                if (store.timeElapsed === store.duration) {
                    onElapsed()
                    status = "idle"
                }

                return {
                    ...store,
                    status,
                    timeElapsed: store.timeElapsed + 1,
                }
            })
        }, 1000)
    }

    const reset = () => {
        update((store) => {
            // Will have to figure out what to do about the timestamp
            return {
                ...store,
                status: "idle",
                timeElapsed: 0,
                task: null,
            }
        })
    }

    const giveUp = () => {
        update((store) => {
            if (store.task) {
                database.addWorkSession(
                    store.task.id,
                    new WorkSession(store.timerStart, new Date(Date.now()))
                )
            }

            return {
                ...store,
                status: "failed",
            }
        })

        // TODO: add the task handler
    }

    return {
        subscribe,
        runTimer,
        takeABreak,
        giveUp,
        reset,
    }
}

export const timerStore = createTimerStore(defaultTimer)

export const timeLeft = derived(timerStore, ($timerStore) => {
    return $timerStore.duration - $timerStore.timeElapsed
})
