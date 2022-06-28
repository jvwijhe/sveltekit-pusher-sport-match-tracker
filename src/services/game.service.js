
 const gameFetchUpdates = async (id) => {
    try {
        const response=  await fetch(`/api/games/${id}`, {
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



const gameFetchLatestEvent = async (id) => {
    try {
        const response =  await fetch(`/api/games/${id}/events/latest`, {
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

const gameFetchAllEvents = async (id) => {
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




export {gameFetchUpdates, gameFetchLatestEvent, gameFetchAllEvents}