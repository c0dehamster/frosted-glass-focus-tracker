import type { DurationInSeconds } from "$lib/types/duration"
import type { Task } from "$lib/types/Task"
import type { TimeInterval } from "$lib/types/TimeInterval"
import { focusedTimeByInterval } from "$lib/utils/focusedTimeByItherval"

export const totalTimeFocused = (
    tasks: Array<Task>,
    timespan: TimeInterval
): DurationInSeconds => {
    return tasks.reduce<DurationInSeconds>((accumulator, currentTask) => {
        return accumulator + focusedTimeByInterval(currentTask, timespan)
    }, 0)
}
