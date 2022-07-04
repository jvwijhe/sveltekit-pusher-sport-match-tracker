<script lang="ts">
    import { onMount } from "svelte";

    import type Game from "$lib/types/game.type";

    import teams from "$lib/mockup-data/teams";
    import startTimes from "$lib/mockup-data/start-times";

    export let game: Game;
    export let events: Event[];

    const createGame = async () => {
        try {
            const homeTeam = teams[Math.floor(Math.random() * teams.length)];
            const awayTeam = teams[Math.floor(Math.random() * teams.length)];
            const startTime =
                startTimes[Math.floor(Math.random() * startTimes.length)];

            // const homeScore = Math.floor(Math.random() * 7);
            // const awayScore = Math.floor(Math.random() * 7);
            // start at 0-0 because events now increase scores
            const homeScore = 0
            const awayScore = 0

            fetch(`/api/games/`, {
                method: "POST",
                headers: new Headers({
                    Accept: "application/json",
                }),
                body: JSON.stringify({
                    homeTeam: homeTeam.name,
                    awayTeam: awayTeam.name,
                    homeScore: homeScore,
                    awayScore: awayScore,
                    startTime: startTime,
                    events: [
                        {
                            text: "The match has started!",
                            minute: 0,
                            type: "match_started",
                        },
                    ],
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                });
        } catch (err) {
            console.log(err);
        }
    };

    onMount(async () => {
        await createGame();
        // events = await gameFetchAllEvents(game.id);
    });

    // var channel = pusher.subscribe(`games.${game.id}`);
    // channel.bind("event_created", async function (data) {
    //     // refetch game data once we receive an update from Pusher
    //    events = await gameFetchAllEvents(game.id);
    // });
</script>

<svelte:head>
    <title>Create a game</title>
</svelte:head>

<section class="my-12">
    <div class="mx-auto container">
        <h1 class="text-blue-800 text-3xl font-bold">Create a game</h1>
    </div>
</section>
