<script>
    import GameCard from '../components/game/Card.svelte';
    import GameListLiveScore from '../components/game/List/LiveScore.svelte';
    import IndicatorRealtime from "../components/indicator/Realtime.svelte";

    import { onMount } from 'svelte';
    import teams from '../mockup-data/teams'
    import startTimes from '../mockup-data/start-times'

    import { gameFetchUpdates,gameFetchLatestEvent } from "../services/game.service"


    export let games = [];
    
    const createGame = async()=>{
        // if(!searchText)return
        try{
            const homeTeam = teams[Math.floor(Math.random()*teams.length)];
            const awayTeam = teams[Math.floor(Math.random()*teams.length)];
            const startTime = startTimes[Math.floor(Math.random()*startTimes.length)];



            const homeScore = Math.floor(Math.random() * 7)
            const awayScore = Math.floor(Math.random() * 7)

            fetch(`/api/games/`, {
                method: 'POST',
                headers: new Headers({
                Accept: 'application/json',
                }),
                body: JSON.stringify({
                    homeTeam: homeTeam.name,
                    awayTeam: awayTeam.name,
                    homeScore: homeScore,
                    awayScore:awayScore,
                    startTime: startTime,
                    events: [{
                        text: 'Free kick',
                        minute:  55,
                        type:    'home_free_kick'
                    }]
                })
            })
            .then(response => response.json())
            .then(result =>    {
                console.log(result)
    
            })  
        }catch(err){
            console.log(err)
        }
    }

    const getGames = async()=>{
        try{
            fetch(`/api/games/`, {
                method: 'GET',
                headers: new Headers({
                Accept: 'application/json',
                })
            })
            .then(response => response.json())
            .then(result =>    {
                games = result
    
            })  
        }catch(err){
            console.log(err)
        }
    }


    onMount(async () => {
        // await createGame()
        await getGames();
    })

</script>

<svelte:head>
	<title>Game tracker</title>
</svelte:head>


<section class="my-12">
    <div class="mx-auto container">
        <h1 class="text-blue-800 text-3xl font-bold">Featured match</h1>
        <p>Follow your favourite soccer matches</p>
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



<section class="my-6  py-12">
    <div class="mx-auto container">
        <div class="w-full">
            <div class="mb-3 w-full flex justify-between">
            <h3 class="font-bold text-xl text-gray-800">Games</h3>
                <IndicatorRealtime>Score is updated in realtime</IndicatorRealtime>
            </div>
            <div class="grid grid-cols-1 bg-white rounded p-2 shadow">
                <div>
                    {#each games as game}
                    <GameListLiveScore game={game}/>
                        {/each}
                </div>
            </div>
        </div>
    </div>
</section>


