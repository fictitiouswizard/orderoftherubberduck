<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1>Reset Password</h1>

<form method="post" use:enhance>
  <label>
    <span>Email</span>
    <input type="email" name="email" />
  </label>

  <button type="submit">Reset Password</button>
</form>