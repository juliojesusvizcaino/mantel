import { invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();

        console.log(data)

        const image = data.get('image') as any;
        console.log(image);
        // if (!(image instanceof File)) {
        //     return invalid(400, { error: 'not a file' })
        // }
        console.log(await image.text());
        // console.log(image.read());
        // const chosen = data.get("chosen")?.valueOf();
        // const questionId = data.get("questionId")?.valueOf();
        // if (!chosen || !questionId) {
        //     return invalid(400, { chosen, missing: true });
        // }
        // // await new Promise(r => setTimeout(r, 1000));
        // try {
        //     const question = await prisma.question.findUniqueOrThrow({
        //         where: { id: +questionId },
        //         include: { correctOption: true }
        //     });
        //
        //     if (question.answerId) {
        //         return invalid(400, { result: 'already-answered' } as const);
        //     }
        //
        //     await prisma.question.update({
        //         where: { id: question.id },
        //         data: {
        //             answerId: +chosen
        //         },
        //     });
        //
        //     console.log('action')
        //
        //     if (question.correctOptionId === +chosen) {
        //         return { result: 'success' } as const;
        //     } else {
        //         return { result: 'failure', answer: question.correctOption } as const;
        //     }
        // } finally {
        //     await prisma.$disconnect()
        // }
    }
}
