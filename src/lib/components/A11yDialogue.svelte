<!-- Styled modal component -->

<script lang="ts">
    import A11yDialog, { type A11yDialogInstance } from "a11y-dialog"

    import { createEventDispatcher, onDestroy, onMount, tick } from "svelte"

    export let dialogRoot: string
    export let id: string
    export let titleId: string

    const dispatch = createEventDispatcher()

    let dialog: A11yDialogInstance
    let rootElement: HTMLElement

    let mounted = false
    let instantiated = false

    onMount(() => (mounted = true))

    onDestroy(() => {
        if (dialog) {
            dialog.destroy()
        }
    })

    // The following is mostly stolen from svelte-a11y-dialog

    let portalTarget = dialogRoot || "document.body"

    const instantiateDialog = async () => {
        await tick()

        dialog = new A11yDialog(rootElement)

        dialog.on("hide", () => {
            dispatch("close")
        })

        instantiated = true

        dispatch("instance", {
            instance: dialog,
        })
    }

    const teleportNode = async (node: Node) => {
        const destination = document.querySelector(portalTarget)
        destination?.appendChild(node)
        // We don't render the template until mounted. So we need
        // wait one more "tick" before instantiating the dialog
        instantiateDialog()
    }

    /**
     * Svelte actions don't want to be async so this is a hack
     * to get around that by delegating to teleportNode
     */
    const teleport = (node: Node) => {
        teleportNode(node)
    }
</script>

<div
    class="dialog-container"
    {id}
    bind:this={rootElement}
    aria-hidden="true"
    aria-labelledby={titleId}
    use:teleport
>
    <!-- The backdrop -->
    <div class="dialog-overlay" data-a11y-dialog-hide></div>

    <!-- The actual dialog -->
    <slot />
</div>

<style>
    /* General dialog styling */
    .dialog-container,
    .dialog-overlay {
        position: fixed;
        inset: 0;
    }

    .dialog-container {
        z-index: 30;
        isolation: isolate;

        display: grid;
        place-items: center;
    }

    .dialog-container[aria-hidden="true"] {
        display: none;
    }

    .dialog-overlay {
        background-color: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.25rem);
    }

    @media screen and (width > 64rem) {
        .dialog-overlay {
            background: transparent;
            backdrop-filter: none;
        }
    }
</style>
