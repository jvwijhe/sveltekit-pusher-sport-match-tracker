
import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();

export const get = async ({ params  }) => {

    let body = {};
    if(!params.id) {
        return {
            statusCode: 404,
        }
    }
    
    body = await prisma.event.findFirst({
        where: { gameId: params.id }
    });

    return {
        statusCode: 200,
        body:body
    }
};