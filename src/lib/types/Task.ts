import { interval, isWithinInterval } from "date-fns"
import type { WorkSession } from "./WorkSession"
import type { DurationInSeconds } from "./duration"
import type { TimeInterval } from "./TimeInterval"

export type taskStatus = "active" | "suspended" | "completed"

export interface Task {
    id: string
    name: string
    description: string | null
    deadline: Date | null
    workSessions: Array<WorkSession>
    status: taskStatus
}
