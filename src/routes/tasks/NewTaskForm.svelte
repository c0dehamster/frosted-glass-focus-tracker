<script lang="ts">
    import type { Task } from "$lib/types/Task"

    import { createEventDispatcher } from "svelte"
    import { createForm } from "felte"

    import { database } from "../database"

    export let taskToEdit: Task | null = null

    const dispatch = createEventDispatcher()

    let errorMessage = ""

    const { form, data, setFields } = createForm({
        onSubmit: (values, { reset }) => {
            if (!taskToEdit) {
                database.addTask(
                    values.name,
                    values.description !== "" ? values.description : null
                )
            } else {
                database.editTask(taskToEdit.id, {
                    name: values.name,
                    description:
                        values.description !== "" ? values.description : null,
                })

                dispatch("editComplete")
            }

            reset()
        },

        validate: (values) => {
            const errors: { name: string } = { name: "" }
            if (values.name === "") errors.name = "Please enter a task name"
            errorMessage = errors.name !== "" ? errors.name : ""
            return errors
        },

        initialValues: {
            name: taskToEdit !== null ? taskToEdit.name : "",
            description: taskToEdit !== null ? taskToEdit.description : "",
        },
    })

    $: isNotEmpty = $data.name !== "" || $data.description !== ""

    $: {
        if (taskToEdit !== null) {
            setFields("name", taskToEdit.name)
            setFields("description", taskToEdit.description)

            // Default values don't set the form to not empty, hence workaround
            isNotEmpty = true
        }
    }
</script>

<form use:form class="form">
    <!-- TODO: limit the size of the inputs -->
    <div class="form__input-wrapper">
        <input
            type="text"
            name="name"
            class="form__name {isNotEmpty ? 'form__name--active' : ''}"
            placeholder="Add new task"
            id="new-task-name"
            autocomplete="off"
        />
        <label for="new-task-name" class="sr-only">New task name</label>
        <p class="error-message">{isNotEmpty ? errorMessage : ""}</p>
    </div>

    <div class="expandable {isNotEmpty ? 'expandable--active' : ''}">
        <div class="expandable__buffer">
            <div class="expandable__contents">
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    class="expandable__description {isNotEmpty
                        ? 'expandable__description--active'
                        : ''}"
                    placeholder="Add task description (optional)"
                ></textarea>

                <div class="form__controls">
                    <button class="form__button" type="button"> Cancel </button>

                    <button class="glass-button form__button" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>

<style>
    .form {
        display: grid;
    }

    .form__input-wrapper {
        padding: 1.5rem;

        display: grid;
        gap: 1rem;
    }

    .error-message {
        font-size: var(--font-size-100);
        text-align: end;
    }

    .expandable {
        display: grid;
        grid-template-rows: 0fr;

        transition: grid-template-rows 200ms ease-out;
    }

    .form:hover > .expandable,
    .form:focus-within > .expandable,
    .expandable--active {
        grid-template-rows: 1fr;
    }

    .expandable__buffer {
        overflow: hidden;
    }

    .expandable__contents {
        padding-block-end: 1.5rem;
        padding-inline: 1.5rem;

        display: grid;
        gap: 1.5rem;

        overflow: hidden;
    }

    /* Inputs */

    .form__name {
        height: 2rem;
        padding-inline: 1rem;

        border-bottom: 1px solid var(--color-primary-200);

        font-size: var(--font-size-300);
    }

    .form__name:hover,
    .expandable__description:hover {
        border-color: var(--color-primary-400);
    }

    .form__name--active,
    .expandable__description--active {
        border-color: var(--color-primary-400);
        color: var(--color-primary-400);
    }

    .expandable__description {
        padding: 1rem;

        resize: none;

        border: 1px solid var(--color-primary-200);

        font-size: var(--font-size-100);
    }

    /* Controls */

    .form__controls {
        justify-self: end;

        display: flex;
        gap: 1rem;
    }

    .form__button {
        height: 2rem;
        padding-inline: 1rem;
    }

    @media screen and (width > 40rem) {
        .form__input-wrapper {
            padding-block: 2.5rem;
            padding-inline: 4rem;
        }

        .form__name {
            height: 2.5rem;
            padding-inline: 1.5rem;

            font-size: var(--font-size-400);
        }

        .error-message {
            font-size: var(--font-size-300);
        }

        .expandable__contents {
            padding-block-end: 2.5rem;
            padding-inline: 4rem;

            gap: 2.5rem;
        }

        .expandable__description {
            padding-inline: 1.5rem;

            font-size: var(--font-size-300);
        }

        .form__button {
            height: 3rem;
            padding-inline: 2rem;

            font-size: var(--font-size-400);
        }
    }

    @media screen and (width > 64rem) {
        .form__name {
            height: 3rem;
            padding-inline: 2rem;

            font-size: var(--font-size-500);
        }

        .expandable__description {
            padding-inline: 2rem;
            padding-block: 1.5rem;
        }
    }
</style>
