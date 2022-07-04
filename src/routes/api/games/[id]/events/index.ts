
import PrismaClient from '$lib/prisma';
import { dbEventCreate } from '$lib/services/db/event.db.service';
const prisma = new PrismaClient();

import pusher from "$lib/pusher";

export const get = async ({ params  }) => {

    if(!params.id) {
        return {
            statusCode: 404,
        }
    }
    
    const body = await prisma.event.findMany({
        where: { gameId: params.id },
        orderBy: {
            minute: 'desc',
          },
    });

    return {
        statusCode: 200,
        body:body
    }
};

export const post = async ({ request,params }) => {

    const postData = await request.json()

    // insert into db
    // insert will trigger a db trigger which sends an event to pusher
    try {
        const body = await dbEventCreate(params.id,postData)    
     
        return {
            statusCode: 200,
            body:body
        }


    } catch (error) {
        return {
            statusCode: 400,
            body:false
        }
    }
    

   
};
