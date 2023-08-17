<script lang="ts">
  import { enhance } from "$app/forms";
  import ZodIssues from "$lib/components/ZodIssues.svelte";

  export let form;
</script>

<div>
  <h1>Create an account</h1>
  <form method="post" use:enhance>
    <label for="username">Username</label><br />
		<input id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
		<input type="submit" value="Signup" />
  </form>
</div>
{#if form?.issues}
<div>
  <ZodIssues issues={form.issues} />
</div>
{/if}