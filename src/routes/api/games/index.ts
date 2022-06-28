import PrismaClient from '$lib/prisma';
const prisma = new PrismaClient();

export const get = async ({ params  }) => {


    const body = await prisma.game.findMany({
        include: {
            events:true
        }
    });

    return {
        statusCode: 200,
        body:body
    }
};


export const post = async ({ request  }) => {

    const postData = await request.json()
    const body = await prisma.game.create({
        data: {
            homeTeam:postData.homeTeam,
            awayTeam: postData.awayTeam,
            homeScore: postData.homeScore,
            awayScore: postData.awayScore,
            startTime: postData.startTime,
            events: {
                create:  postData.events
            }
        }
    })

    return {
        statusCode: 200,
        body:request
    }
};
