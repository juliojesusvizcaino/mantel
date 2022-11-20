import { invalid } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        question: {
            id: 1,
            img: "black-cat-looking-up-at-owner.jpg",
            options: [{ id: 1, name: "Paco" }, { id: 2, name: "Pepe" }, { id: 3, name: "Macarena" }],
        },
        questions: [
            {
                id: 1,
                img: "black-cat-looking-up-at-owner.jpg",
                options: [{ id: 1, name: "Paco" }, { id: 2, name: "Pepe" }, { id: 3, name: "Macarena" }],
            },
            {
                id: 2,
                img: "black-cat-looking-up-at-owner.jpg",
                options: [{ id: 4, name: "Paco2" }, { id: 5, name: "Pepe2" }, { id: 6, name: "Macarena2" }],
            },
        ]
    }
}

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const chosen = data.get("chosen")
        if (!chosen) {
            return invalid(400, { chosen, missing: true });
        }
        await new Promise(r => setTimeout(r, 1000));
        return {
            success: chosen && +chosen.valueOf() === 1, next: {
                id: 2,
                img: "sam-chang-5-ckjYvTZQw-unsplash.jpg",
                options: [{ id: 4, name: "Paco2" }, { id: 5, name: "Pepe2" }, { id: 6, name: "Macarena2" }],
            },
        };
    }
}
