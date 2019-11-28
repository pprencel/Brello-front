<script>
  import { link } from "svelte-routing";
  import Loader from "../components/common/Loader.svelte";

</script>
<div class="flex flex-col justify-center items-center text-xl m-10 text-center">
  <div class="text-2xl text-red-500">
    <h1>You are not authorized</h1>
    <h1>Please sign in first</h1>
  </div>

  <a href={`signin/`} use:link class="bg-indigo-600 text-white py-4 px-8 m-4 border-2 border-indigo-200 truncate">
    Sign in
  </a>
</div>
