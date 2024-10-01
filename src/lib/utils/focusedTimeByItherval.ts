import type { DurationInSeconds } from "$lib/types/duration"
import type { Task } from "$lib/types/Task"
import type { TimeInterval } from "$lib/types/TimeInterval"
import { differenceInSeconds, interval, isWithinInterval } from "date-fns"

export const focusedTimeByInterval = (
    task: Task,
    timespan: TimeInterval
): DurationInSeconds => {
    let workSessionsWithinInterval = task.workSessions.filter((item) =>
        isWithinInterval(item.start, interval(timespan.start, timespan.end))
    )

    return workSessionsWithinInterval.reduce<DurationInSeconds>(
        (accumulator, currentValue) => {
            return (
                accumulator +
                differenceInSeconds(currentValue.end, currentValue.start)
            )
        },
        0
    )
}
