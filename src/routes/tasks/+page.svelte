<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import { liveQuery } from "dexie"
    import { database } from "../database"

    import ConfirmDeleteModal from "./ConfirmDeleteModal.svelte"
    import NewTaskForm from "./NewTaskForm.svelte"
    import TaskTile from "./TaskTile.svelte"

    let taskToEdit: Task | null = null
    let taskToDeleteId: string
    let confirmDeleteShown = false

    const suspendTask = (id: string) =>
        database.toggleCompleted(id, "suspended")
    const resumeTask = (id: string) => database.toggleCompleted(id, "active")

    const editTask = async (id: string) => {
        let taskById = await database.getById(id)
        taskToEdit = taskById ? taskById : null
    }

    const onEditComplete = () => (taskToEdit = null)

    const toggleCompleted = async (id: string) => {
        let task = await database.getById(id)

        if (task?.status !== "completed") {
            database.toggleCompleted(id, "completed")
        } else {
            database.toggleCompleted(id, "active")
        }
    }

    const onDelete = (id: string) => {
        taskToDeleteId = id
        confirmDeleteShown = true
    }

    const onDeleteConfirm = () => {
        database.deleteTask(taskToDeleteId)
        taskToDeleteId = ""
        confirmDeleteShown = false
    }

    const onDeleteCancel = () => {
        taskToDeleteId = ""
        confirmDeleteShown = false
    }

    let tasksToDisplay = liveQuery(() => database.tasks.toArray())
</script>

<div class="page">
    <ConfirmDeleteModal
        shown={confirmDeleteShown}
        on:delete={onDeleteConfirm}
        on:cancel={onDeleteCancel}
    ></ConfirmDeleteModal>

    <div class="glass form">
        <NewTaskForm {taskToEdit} on:editComplete={onEditComplete}
        ></NewTaskForm>
    </div>

    <ul class="tasks-list">
        {#if $tasksToDisplay}
            {#each $tasksToDisplay as task (task.id)}
                <TaskTile
                    {task}
                    on:suspend={(e) => suspendTask(e.detail)}
                    on:resume={(e) => resumeTask(e.detail)}
                    on:edit={(e) => editTask(e.detail)}
                    on:delete={(e) => onDelete(e.detail)}
                    on:toggleCompleted={(e) => toggleCompleted(e.detail)}
                ></TaskTile>
            {/each}
        {/if}
    </ul>
</div>

<style>
    .page {
        padding-block: 6.75rem;
        padding-inline: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 2rem;
    }

    .tasks-list {
        box-shadow: 0.25rem 0.25rem 2rem 0.25rem rgba(0, 0, 0, 0.1);
    }

    @media screen and (width > 40rem) {
        .page {
            padding-block: 8rem;
            padding-inline: 4rem;
            gap: 5rem;
        }
    }

    @media screen and (width > 64rem) {
        .page {
            padding-inline: 20%;
        }
    }
</style>
