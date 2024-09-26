import type { Task, WorkSession, taskStatus } from "$lib/types/task"
import Dexie, { liveQuery, type Table } from "dexie"

export class DexieCustomDatabase extends Dexie {
    tasks!: Table<Task>

    constructor() {
        super("TasksDatabase")

        this.version(1).stores({
            tasks: "&id, name, description, status, workSessions",
        })
    }

    /* CREATE */

    async addTask(name: string, description: string | null) {
        try {
            let id = crypto.randomUUID()
            this.tasks.put(
                {
                    id,
                    name,
                    description,
                    status: "active",
                    workSessions: [],
                },
                id
            )

            console.log(`Added task "${name}" at ${id}`)
        } catch (error) {
            console.error(`Failed to add task "${name}": ${error}`)
        }
    }

    /* READ */

    get tasksToDisplay() {
        return liveQuery(() => this.tasks.toArray())
    }

    async getById(id: string) {
        try {
            return this.tasks.get(id)
        } catch (error) {
            console.error(`Failed to retrieve ${id}: ${error}`)
        }
    }

    /* UPDATE */

    async toggleCompleted(id: string, status: taskStatus) {
        try {
            let updated = await this.tasks.update(id, { status: status })
            if (updated) {
                console.log(`Updated task ${id} status to ${status}`)
            } else {
                console.log(`Nothing was updated: no task with key ${id}`)
            }
        } catch (error) {
            console.error(`Failed to update task ${id}: ${error}`)
        }
    }

    async editTask(
        id: string,
        newData: {
            name: string
            description: string | null
        }
    ) {
        try {
            await this.tasks.update(id, {
                name: newData.name,
                description: newData.description,
            })
        } catch (error) {
            console.error(`Failed to update task ${id}: ${error}`)
        }
    }

    async addWorkSession(id: string, newSession: WorkSession) {
        try {
            let updated = await this.tasks.update(id, (task) => {
                task.workSessions.push(newSession)
            })

            if (updated) {
                let workSessionsUpdated = (await this.tasks.get(id))
                    ?.workSessions
                console.log(
                    `Added! Work sessions for the task ${id}:`,
                    workSessionsUpdated
                )
            } else {
                console.log(`Nothing was updated: no task with key ${id}`)
            }
        } catch (error) {
            console.error(`Failed to update task ${id}: ${error}`)
        }
    }

    /* DELETE */

    async deleteTask(id: string) {
        try {
            await this.tasks.delete(id)
        } catch (error) {
            console.error(`Failed to delete ${id}: ${error}`)
        }
    }
}

export const database = new DexieCustomDatabase()
