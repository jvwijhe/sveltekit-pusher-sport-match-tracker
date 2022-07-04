<script lang="ts">
    import GameCard from "../components/game/Card.svelte";
    import GameListLiveScore from "../components/game/List/LiveScore.svelte";
    import IndicatorRealtime from "../components/indicator/Realtime.svelte";

    import { onMount } from "svelte";

    import { gameIndex } from "$lib/services/api/game.service";
    import type Game from "$lib/types/game.type";

    import { eventCreate } from "$lib/services/api/event.service";

    import eventTypes  from "$lib/mockup-data/event-types"

    export let games: Game[];
    export let event: Event;

    const  getRandomInt = (max:Number) => {
        return Math.floor(Math.random() * max);
    }       


    const addEvent = async () => {
        let randomGameIndex = getRandomInt(games.length)
        let randomGame = games[randomGameIndex];

        let randomEventIndex = getRandomInt(eventTypes.length)
        let randomEvent = eventTypes[randomEventIndex];

        const event = {
            text: randomEvent,
            minute: getRandomInt(90),
            type: randomEvent,
            gameId: randomGame.id,
        };
        await eventCreate(randomGame.id, event);
    };

    onMount(async () => {
        // await createGame()
        games = await gameIndex();
    });
</script>

<svelte:head>
    <title>Game tracker</title>
</svelte:head>
{#if games}
    <section class="my-12">
        <div class="mx-auto container flex justify-between">
            <div>
                <h1 class="text-blue-800 text-3xl font-bold">Featured match</h1>
                <p class="text-gray-600">
                    Follow your favourite soccer matches
                </p>
            </div>
            <div class="">
                <button
                    type="button"
                    on:click={addEvent}
                    class="text-white bg-blue-500 p-3 rounded "
                >
                    <span
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline-block h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"
                            />
                        </svg></span
                    >
                    <span class="text-sm">Add event</span></button
                >
            </div>
        </div>
    </section>

    <section class="my-6">
        <div class="mx-auto container">
            <div class="grid grid-cols-2 gap-6">
                {#if games[0]}
                    <div>
                        <GameCard game={games[0]} />
                    </div>
                {/if}
                {#if games[1]}
                    <div>
                        <GameCard game={games[1]} />
                    </div>
                {/if}
            </div>
        </div>
    </section>

    <section class="my-6 py-12">
        <div class="mx-auto container">
            <div class="w-full">
                <div class="mb-3 w-full flex justify-between">
                    <h3 class="font-bold text-xl text-gray-800">Games</h3>
                    <IndicatorRealtime
                        >Score is updated in realtime</IndicatorRealtime
                    >
                </div>
                <div class="grid grid-cols-1 bg-white rounded p-2 shadow">
                    {#if games}
                        <div>
                            {#each games as game}
                                <GameListLiveScore {game} />
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </section>
{/if}
