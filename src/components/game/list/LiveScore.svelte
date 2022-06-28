<script>
    import Card from "../Card.svelte";


    import teams from "../../../mockup-data/teams";
    import { gameFetchUpdates } from "../../../services/game.service"

    import pusher from "$lib/pusher";
    export let game;
    // add game to a new variable because we are going to update it later. The property is only for the initial fetch
    export let gameData = game;

    // find the homeTeam in the teams array to attach the logo.
    const homeTeam = teams.find((team) => {
        return team.name == game.homeTeam;
    });
    // find the awayTeam in the teams array to attach the logo.
    const awayTeam = teams.find((team) => {
        return team.name == game.awayTeam;
    });

    $: homeScore = gameData.homeScore;
    $: awayScore = gameData.awayScore;

  

    // Subscribe to the game with the correct id
    var channel = pusher.subscribe(`games.${game.id}`);
    channel.bind("event_created", async function (data) {
        // refetch game data once we receive an update from Pusher
       gameData = await gameFetchUpdates(game.id);
    });
</script>

<a
    href="/games/{game.id}"
    class="py-3 px-3 text-sm text-gray-600 border-b border-gray-200 flex justify-between"
>
    <div class="flex gap-6">
        <div>
            <img
                src={homeTeam.logo}
                class="inline-block h-6 w-6 object-cover object-center"
                alt={homeTeam.name}
            />
            <span class="ml-2">
                {homeTeam.name}
            </span>
        </div>

        <span>-</span>
        <div>
            <img
                src={awayTeam.logo}
                class="inline-block h-6 w-6 object-cover object-center"
                alt={awayTeam.name}
            />
            <span class="ml-2">
                {awayTeam.name}
            </span>
        </div>
    </div>

    <div class="flex">
        <span>
            {homeScore}
        </span>
        <span>-</span>
        <span>
            {awayScore}
        </span>
    </div>
</a>
