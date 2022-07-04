import Pusher from 'pusher-js';
const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});


// const pusher = new Pusher({
//     appId: import.meta.env.VITE_PUSHER_APP_ID,
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     secret: import.meta.env.VITE_PUSHER_APP_SECRET,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   });

export default pusher;