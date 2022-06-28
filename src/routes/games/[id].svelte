<script context="module">
    export async function load({ params, fetch }) {
        const url = `/api/games/${params.id}`;
        const response = await fetch(url, {
            headers: new Headers({
                Accept: "application/json",
            }),
        });

        return {
            status: response.status,
            props: {
                game: response.ok && (await response.json()),
            },
        };
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import pusher from "$lib/pusher";
    import { gameFetchUpdates,gameFetchLatestEvent } from "../../services/game.service"

    import GameCard from "../../components/game/Card.svelte";
    import EventListItem from "../../components/event/list/Item.svelte";
    import IndicatorRealtime from "../../components/indicator/Realtime.svelte";

    import { gameFetchAllEvents } from "../../services/game.service";
    import type Game from "$lib/types/game.type";
    import type Event from "$lib/types/event.type";

    export let game: Game;
    export let events: Event[];

    onMount(async () => {
        events = await gameFetchAllEvents(game.id);

        
    });

    var channel = pusher.subscribe(`games.${game.id}`);
    channel.bind("event_created", async function (data) {
        // refetch game data once we receive an update from Pusher
       events = await gameFetchAllEvents(game.id);
    });

</script>

<svelte:head>
    <title>{game.homeTeam} vs {game.awayTeam}</title>
</svelte:head>

{#if game}
    <section class="my-12">
        <div class="mx-auto container">
            <h1 class="text-blue-800 text-3xl font-bold">
                {game.homeTeam} vs {game.awayTeam}
            </h1>
        </div>
    </section>

    <section class="my-6">
        <div class="mx-auto container">
            <GameCard {game} />
        </div>
    </section>

    <section class="my-6 py-12">
        <div class="mx-auto container">
            <div class="w-full">
                <div class="mb-3 w-full flex justify-between">
                    <h3 class="font-bold text-xl text-gray-800">
                        Game updates
                    </h3>
                    <IndicatorRealtime>Score is updated in realtime</IndicatorRealtime
                    >
                </div>
                <div
                    class="grid grid-cols-1 bg-white rounded p-2 shadow divide-y divide-gray-400 "
                >
                {#if events}
                <div>
                    {#each events as event}
                        <EventListItem {event} />
                    {/each}
                </div>
                {/if}
                </div>
            </div>
        </div>
    </section>
{/if}
