<script>
    import pusher from "$lib/pusher";
    import { onMount } from "svelte";

    import teams from "../../mockup-data/teams";
    import { gameFetchUpdates,gameFetchLatestEvent } from "../../services/game.service"
    import IndicatorRealtime from "../indicator/Realtime.svelte";
    import EventListItem from "../event/list/Item.svelte"

    export let game;

    // add game to a new variable because we are going to update it later. The property is only for the initial fetch
    export let gameData = game;

    // define the latestEvent variable
    export let latestEvent = {}
    
    // find the homeTeam in the teams array to attach the logo.
    const homeTeam = teams.find((team) => {
        return team.name == gameData.homeTeam;
    });

    // find the awayTeam in the teams array to attach the logo.
    const awayTeam = teams.find((team) => {
        return team.name == gameData.awayTeam;
    });

    $: homeScore = gameData.homeScore;
    $: awayScore = gameData.awayScore;

    // Subscribe to the game with the correct id
    var channel = pusher.subscribe(`games.${game.id}`);
    channel.bind("event_created", async function (data) {
        // refetch game data once we receive an update from Pusher
       gameData = await gameFetchUpdates(game.id);
       latestEvent = await gameFetchLatestEvent(game.id);
       console.log(latestEvent)
    });

    onMount(async () => {
        latestEvent = await gameFetchLatestEvent(game.id);
    })

</script>

<div class="relative border border-gray-100 rounded p-6 bg-white">
    <div class="mb-6 w-full flex justify-end">
        <IndicatorRealtime />
    </div>
   
    
    <div class="grid grid-cols-3 gap-3">
        <div class="w-full flex flex-col gap-3">
            <img src={homeTeam?.logo} class="mx-auto h-12 w-12 object-cover object-center"/>
            <span class="font-bold text-gray-600 text-3xl mx-auto">{homeScore}</span>
        </div>

        <div class="flex flex-col items-center">
            <span class="font-bold text-gray-700 text-3xl mx-auto">{gameData.startTime}</span>
            <div class="w-full mt-6 flex items-center gap-1 justify-center">
                <span class="inline-block text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                </span>
                <span class="text-gray-600 text-sm inline-block text-center">Stadium</span>
            </div>
        </div>
        
        <div class="w-full flex flex-col gap-3">
            <img src={awayTeam?.logo} class="mx-auto h-12 w-12 object-cover object-center"/>
            <span class="font-bold text-gray-600 text-3xl mx-auto">{awayScore}</span>
        </div>
    </div>

    {#if latestEvent}
    <div class="grid grid-cols-1 gap-3 px-6 mt-6">
            
        <EventListItem event={latestEvent} />
    </div>
    {/if}

</div>