import type Event from "$lib/types/event.type";
import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();


const dbEventCreate = async (gameId:String, event:Event) => {

    return prisma.event.create({
        data: {
            text: event.text,
            minute: event.minute,
            type: event.type,
            gameId: event.gameId
        }
    })
};



export {dbEventCreate }