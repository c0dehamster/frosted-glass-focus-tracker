<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte"

    export let shown = false

    const dispatch = createEventDispatcher()

    let dialog: HTMLDialogElement

    let mounted = false

    let show = () => {}
    let close = () => {}

    onMount(() => {
        mounted = true

        show = () => dialog.showModal()

        close = () => dialog.close()
    })

    $: {
        if (mounted) {
            if (shown) {
                show()
            } else {
                close()
            }
        }
    }
</script>

<dialog
    class="dialog"
    bind:this={dialog}
    on:click={() => {
        dispatch("close")
        close()
    }}
    on:keydown={(e) => {
        if (e.key === "Escape") {
            dispatch("close")
        }
    }}
>
    <div on:click|stopPropagation on:keydown>
        <slot />
    </div>
</dialog>
