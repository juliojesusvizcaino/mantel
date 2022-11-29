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
    // const { a, b } = await request.json();
    const csrf_token_cookie = cookies.get('g_csrf_token');
    if (!csrf_token_cookie) {
        throw error(400, 'No CSRF token in Cookie.');
    }

    const { csrf_token_body } = await request.json()
    if (!csrf_token_body) {
        throw error(400, 'No CSRF token in post body.');
    }

    if (csrf_token_cookie !== csrf_token_body) {
        throw error(400, 'Failed to verify double submit cookie.');
    }

    console.log('the json', await request.json());

    return json(35);
}
