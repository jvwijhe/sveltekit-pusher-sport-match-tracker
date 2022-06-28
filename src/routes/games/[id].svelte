<script context="module">

    export async function load({ params, fetch, session, stuff }) {
      const url = `/api/games/${params.id}`;
      const response = await fetch(url, {
            headers: new Headers({
                Accept: 'application/json',
            }),
        });
  
      return {
        status: response.status,
        props: {
          game: response.ok && (await response.json())
        }
      };
    }
  </script>

<script>
import { onMount } from 'svelte';

    import GameCard from '../../components/game/Card.svelte';
    import EventListItem from '../../components/event/list/Item.svelte';
    import IndicatorRealtime from '../../components/indicator/Realtime.svelte';
    
    // import GameListLiveScore from '../components/game/List/LiveScore.svelte';
    // import IndicatorRealtime from "../components/indicator/Realtime.svelte";

    // import { onMount } from 'svelte';
    // import teams from '../mockup-data/teams'
    // import startTimes from '../mockup-data/start-times'

    import { gameFetchAllEvents } from "../../services/game.service"


    export let game = {};
    export let events = []
    

    onMount(async () => {
        events = await gameFetchAllEvents(game.id);
        console.log(events)
    })

</script>

<svelte:head>
	<title>Game tracker</title>
</svelte:head>

{#if game}
<section class="my-12">
    <div class="mx-auto container">
        <h1 class="text-blue-800 text-3xl font-bold">{game.homeTeam} vs {game.awayTeam}</h1>
        <p>Follow your favourite soccer matches</p>
    </div>
</section>

<section class="my-6">
    <div class="mx-auto container">
        <GameCard game={game} />
    </div>
</section>



<section class="my-6 py-12">
    <div class="mx-auto container">
        <div class="w-full">
            <div class="mb-3 w-full flex justify-between">
            <h3 class="font-bold text-xl text-gray-800">Game updates</h3>
                <IndicatorRealtime>Score is updated in realtime</IndicatorRealtime>
            </div>
            <div class="grid grid-cols-1 bg-white rounded p-2 shadow divide-y divide-gray-400 ">
                <div>
                    {#each events as event}
                    <EventListItem event={event} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>




{/if}