import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();

export const get = async ({ params  }) => {

    if(!params.id) {
        return {
            statusCode: 404,
        }
    }
    const body = await prisma.game.findUnique({
        where: {
            id: params.id,
          },
    });

    return {
        statusCode: 200,
        body:body
    }
};