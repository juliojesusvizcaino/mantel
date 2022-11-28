import { invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { writeFile } from 'fs/promises';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// https://stackoverflow.com/a/35511953/6553856
function convertToValidFilename(string: string): string {
    return (string.replace(/[/|\\:*?"<>]/g, " "));
}

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const name = data.get('name')?.valueOf().toString();
        const image = data.get('image')?.valueOf();

        if (!(image instanceof Blob) || !name) {
            return invalid(400, { error: 'invalid input' })
        }

        // https://stackoverflow.com/a/60468824/6553856
        const buffer = Buffer.from(await image.arrayBuffer());
        const path = `./media/${convertToValidFilename(name)}__${image.name}`;
        await writeFile(path, buffer);

        try {
            await prisma.user.create({ data: { name, img: path } });
        } finally {
                await prisma.$disconnect();
            }
        }
}
