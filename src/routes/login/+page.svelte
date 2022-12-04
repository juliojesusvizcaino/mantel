<script lang="ts">
	import { PUBLIC_GOOGLE_AUTH_CLIENT_ID } from '$env/static/public';
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div class="grid place-items-center">
	<div
		id="g_id_onload"
		data-client_id={PUBLIC_GOOGLE_AUTH_CLIENT_ID}
		data-login_uri="http://localhost:5173/google"
		data-auto_prompt="true"
	/>
	<div
		class="g_id_signin"
		data-type="standard"
		data-size="medium"
		data-theme="outline"
		data-text="sign_in_with"
		data-shape="rectangular"
		data-logo_alignment="left"
	/>
</div>
