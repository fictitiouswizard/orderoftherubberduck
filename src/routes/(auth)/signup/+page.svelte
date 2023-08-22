<script lang="ts">
  import { enhance } from "$app/forms";
  import ZodIssues from "$lib/components/ZodIssues.svelte";
  import "../../../app.css"
  import { base } from '$app/paths'

  $: backgroundImage = `${base}/librarybackdrop.jpg`
  $: bgImage = `background-image: url("${backgroundImage}";`

  console.log(backgroundImage);

  export let form;
</script>

<div class="flex flex-col flex-auto items-center min-h-screen w-screen justify-center backdrop">
  <div class="bg-white h-1/4 w-1/4 rounded-3xl flex flex-col items-center justify-center">
    <h1 class="font-bold text-2xl mt-4">
      Create an account
    </h1>
    <form method="post" use:enhance class="flex flex-col mt-2">
      <label for="username">Username</label>
      <input id="username" name="username" />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" />
      <button class="rounded-xl px-3 py-4 my-4 bg-blue-400 text-white font-bold shadow-md shadow-gray-400">
        Register
      </button>
    </form>
  </div>
  {#if form?.issues}
    <div class="bg-white my-3">
      <ZodIssues issues={form.issues} />
    </div>
  {/if}
</div>

<style>
  .backdrop {
      background-image: url("/images/librarybackdrop.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
  }
</style>
