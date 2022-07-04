import type Event from "$lib/types/event.type";


const eventCreate = async (gameId:String, event:Event) => {
        try {
            fetch(`/api/games/${gameId}/events`, {
                method: "POST",
                headers: new Headers({
                    Accept: "application/json",
                }),
                body: JSON.stringify(event),
            })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            });

        } catch (err) {
            console.log(err);
        }



};

const gameFetchAllEvents = async (id:String) => {
try {
    const response =  await fetch(`/api/games/${id}/events`, {
        method: "GET",
        headers: new Headers({
            Accept: "application/json",
        }),
    })
    return await response.json()
} catch (err) {
    console.log(err);
}
};

export {eventCreate, gameFetchAllEvents}