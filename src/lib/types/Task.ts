import type { WorkSession } from "./WorkSession"

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
        description?: string,
        deadline?: Date
    ) {
        this.id = id
        this.name = name
        this.description = description ? description : null
        this.deadline = deadline ? deadline : null
        this.workSessions = []
        this.status = "active"
    }
}
