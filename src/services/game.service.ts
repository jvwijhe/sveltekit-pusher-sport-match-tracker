const gamesIndex = async () => {
        try {
            const response = await fetch(`/api/games`, {
                method: "GET",
                headers: new Headers({
                    Accept: "application/json",
                }),
            })
            return await response.json()
        } catch (err) {
            console.log(err);
            return false
        }
};

 
 const gameFetchUpdates = async (id:String) => {
    try {
        const response =  await fetch(`/api/games/${id}`, {
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

const gameFetchLatestEvent = async (id:String) => {
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

export {gamesIndex, gameFetchUpdates, gameFetchLatestEvent, gameFetchAllEvents}