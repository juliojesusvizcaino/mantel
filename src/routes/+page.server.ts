import { PrismaClient } from "@prisma/client";
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

export const load: PageServerLoad = async () => {
    try {
        const user = await prisma.user.findFirstOrThrow();
        const userNames = await prisma.user.findMany({ select: { id: true, name: true } })
        return {
            question: {
                id: 1,
                img: user.img,
                options: shuffle([user, ...userNames.filter(({ id }) => id !== user.id).slice(0, 3)]),
            }
        };
    } finally {
        await prisma.$disconnect();
    }
}

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const chosen = data.get("chosen")
        if (!chosen) {
            return invalid(400, { chosen, missing: true });
        }
        // await new Promise(r => setTimeout(r, 1000));

        const allUsers = await prisma.user.findMany();
        const someUsers = shuffle(allUsers).slice(0, 4);

        const next = pick(someUsers);

        return {
            success: chosen && +chosen.valueOf() === 1, next: {
                id: next.id,
                img: next.img,
                options: someUsers
            },
        };
    }
}
