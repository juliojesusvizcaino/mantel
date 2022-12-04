import { PUBLIC_GOOGLE_AUTH_CLIENT_ID } from '$env/static/public'
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client(PUBLIC_GOOGLE_AUTH_CLIENT_ID);
// async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: PUBLIC_GOOGLE_AUTH_CLIENT_ID,
//     })
//     const payload = ticket.getPayload();
//     const userid = payload?.sub;
// }


export const POST: RequestHandler = async ({ request, cookies }) => {
    console.log('doing something', request, cookies);
    const csrfTokenCookie = cookies.get('g_csrf_token');
    if (!csrfTokenCookie) {
        throw error(400, 'No CSRF token in Cookie.');
    }

    const form = await request.formData();
    const csrfTokenBody = form.get('g_csrf_token')?.toString();
    console.log('body', request.body)
    // console.log('form data', await request.formData());

    if (!csrfTokenBody) {
        throw error(400, 'No CSRF token in post body.');
    }

    if (csrfTokenCookie !== csrfTokenBody) {
        throw error(400, 'Failed to verify double submit cookie.');
    }

    const idToken = form.get('credential')?.toString();

    if (idToken === undefined) {
        throw error(400, 'No credential in post body.');
    }

    const ticket = await client.verifyIdToken({
        idToken,
        audience: PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    })
    const payload = ticket.getPayload();
    const userid = payload?.sub;

    console.log('payload', payload);
    console.log('userid', userid);


    return json(35);
}
