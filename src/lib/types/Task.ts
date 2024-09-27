import { interval, isWithinInterval } from "date-fns"
import type { WorkSession } from "./WorkSession"
import type { durationInSeconds } from "./duration"

export type taskStatus = "active" | "suspended" | "completed"

export class Task {
    id: string
    name: string
    description: string | null
    deadline: Date | null
    workSessions: Array<WorkSession>
    status: taskStatus

    constructor(
        id: string,
        name: string,
        description: string | null,
        deadline: Date | null
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.workSessions = []
        this.status = "active"
    }

    // TODO: come up with a better name for the function
    focusedTimeByInterval(start: Date, end: Date): durationInSeconds {
        let workSessionsWithinInterval = this.workSessions.filter((item) =>
            isWithinInterval(item.start, interval(start, end))
        )

        return workSessionsWithinInterval.reduce<durationInSeconds>(
            (accumulator, currentValue) => {
                return accumulator + currentValue.duration
            },
            0
        )
    }
}
