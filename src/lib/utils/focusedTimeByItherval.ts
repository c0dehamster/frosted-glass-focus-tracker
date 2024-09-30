import type { durationInSeconds } from "$lib/types/duration"
import type { Task } from "$lib/types/Task"
import type { TimeInterval } from "$lib/types/TimeInterval"
import { differenceInSeconds, interval, isWithinInterval } from "date-fns"

export const focusedTimeByInterval = (
    task: Task,
    timespan: TimeInterval
): durationInSeconds => {
    let workSessionsWithinInterval = task.workSessions.filter((item) =>
        isWithinInterval(item.start, interval(timespan.start, timespan.end))
    )

    return workSessionsWithinInterval.reduce<durationInSeconds>(
        (accumulator, currentValue) => {
            return (
                accumulator +
                differenceInSeconds(currentValue.end, currentValue.start)
            )
        },
        0
    )
}
