<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1>Email verification</h1>
<p>Your email verification link was sent to your inbox</p>
<h2>Resend verification</h2>
<form method="post" use:enhance>
  <input type="submit" value="Resend">
</form>