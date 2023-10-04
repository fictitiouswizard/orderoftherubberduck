<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1>Reset Password</h1>
<form method="post" use:enhance>
  <label for="password">New Password</label>
  <input type="password" name="password" id="password" />
  <input type="submit" value="Reset Password" />
</form>