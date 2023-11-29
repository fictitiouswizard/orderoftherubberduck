<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="flex flex-col flex-auto items-center min-h-screen w-screen justify-center backdrop">
  <div class="bg-white
              h-1/4 w-80 md:w-80 rounded-3xl flex flex-col items-center justify-center
              lg:1/4">
    <h1 class="font-bold text-2xl mt-4">
      Login
    </h1>
    <form method="post" use:enhance class="flex flex-col mt-8">
      <div class="relative">
        <input
          name="username"
          id="username"
          class="peer border-b-2 px-2 py-3 my-2
             border-gray-400 placeholder-transparent
              focus:outline-none"
          placeholder="Username"
          type="text"
        />
        <label
          for="username"
          class="absolute left-0 -top-3.5
                  text-sm
                  transition-all
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-400
                  peer-placeholder-shown:top-5
                  peer-placeholder-shown:left-0 peer-focus:text-sm peer-focus:-top-3.5
                  peer-focus:text-black"
        >
          Username
        </label>
        </div>
      <div class="relative mt-4">
        <input
          type="password"
          id="password"
          name="password"
          class="peer border-b-2 px-2 py-3 my-2 border-gray-400
                 focus:outline-none placeholder-transparent"
          placeholder="Password"
        />
        <label
          for="password"
          class="absolute left-0 -top-3.5 text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:left-2
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-gray-400
                peer-focus:left-0
                peer-focus:-top-3.5
                peer-focus:text-sm
                peer-focus:text-black"
        >
          Password
        </label>
      </div>
      <button class="rounded-xl px-3 py-4 my-4 bg-blue-400 text-white font-bold shadow-md shadow-gray-400">
          Login
        </button>
    </form>
    <div class="mb-3">
      <a href="/signup" class="underline text-gray-600">Create an account</a>
    </div>
  </div>
</div>

<style>
    .backdrop {
        background-image: url("/images/trnava-university-BEEyeib-am8-unsplash.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
