
import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();

export const get = async ({ params  }) => {

    if(!params.id) {
        return {
            statusCode: 404,
        }
    }
    
    const body = await prisma.event.findFirst({
        where: { gameId: params.id },
        orderBy: {
            id: 'desc',
          },
    });

    return {
        statusCode: 200,
        body:body
    }
};