<script lang="ts">

    import type Event from "../../../lib/types/event.type"

    import EventType from "../Type.svelte";
    export let event:Event;
</script>

{#if event}
    <div class="text-sm text-gray-600 flex items-center gap-6 py-3 px-2">
        <div class="w-16">
            <span class="italic">{event?.minute}&#34;</span>
        </div>
        
        <div class="flex items-center gap-2">
            <EventType eventType={event?.type} />
            <span>{event?.text}</span>
        </div>
        
    </div>
{/if}
