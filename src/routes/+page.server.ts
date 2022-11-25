import { PrismaClient, } from "@prisma/client";
import { invalid } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const prisma = new PrismaClient();

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function pick<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

async function createQuestion(client: PrismaClient) {
    const allUsers = await client.user.findMany();
    const someUsers = shuffle(allUsers).slice(0, 4);

    const user = pick(someUsers);

    const question = await client.question.create({
        data: {
            correctOption: { connect: { id: user.id } },
            options: {
                createMany: {
                    data: someUsers
                        .filter(({ id }) => id !== user.id)
                        .slice(0, 3)
                        .map(({ id }) => ({ userId: id }))
                }
            }
        },
        include: {
            correctOption: true,
            options: {
                include: {
                    user: true
                }
            }
        }
    })

    return { question, options: someUsers };
}

export const load: PageServerLoad = async () => {
    try {
        const { question, options } = await createQuestion(prisma);
        console.log('load')
        return {
            question: {
                id: question.id,
                img: question.correctOption.img,
                options
            }
        };
    } finally {
        await prisma.$disconnect();
    }
}

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const chosen = data.get("chosen")?.valueOf();
        const questionId = data.get("questionId")?.valueOf();
        if (!chosen || !questionId) {
            return invalid(400, { chosen, missing: true });
        }
        // await new Promise(r => setTimeout(r, 1000));
        try {
            const question = await prisma.question.findUniqueOrThrow({
                where: { id: +questionId },
                include: { correctOption: true }
            });

            if (question.answerId) {
                return invalid(400, { result: 'already-answered' } as const);
            }

            await prisma.question.update({
                where: { id: question.id },
                data: {
                    answerId: +chosen
                },
            });

            console.log('action')

            if (question.correctOptionId === +chosen) {
                return { result: 'success' } as const;
            } else {
                return { result: 'failure', answer: question.correctOption } as const;
            }
        } finally {
            await prisma.$disconnect()
        }
    }
}
