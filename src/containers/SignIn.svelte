<script>
  import { userStore } from '../stores/userStore.js';
  import Loader from "../components/common/Loader.svelte";

  let res = null
  let promise
  const handleSubmit = (e) => {
   promise = userStore.signin(e.target);
  }
</script>


  <div class="flex flex-col justify-center items-center text-xl m-10">
    <form on:submit|preventDefault="{handleSubmit}" class="bg-indigo-500 p-4" style="width: 300px" autocomplete="off">
      <label class="block w-full text-white" for="email">Email or Login</label>
      <input class="block w-full mt-1 p-1 text-gray-800" type="text" id="username" autocomplete="false">
      <label class="block w-full mt-3 text-white" for="email">Password</label>
      <input class="block w-full mt-1 p-1 text-gray-800" type="password" id="password" autocomplete="false">
      <button class="block border block w-3/4 mx-auto mt-5 border-white text-white font-bold px-6 py-2" type="submit">Sign in</button>
    </form>
    {#await promise}
      <Loader />
    {:then v}
    {/await}
  </div>
<!--
<div class="flex flex-col justify-center items-center text-xl m-10">
  <form on:submit|preventDefault="{handleSubmit}" class="bg-indigo-400 p-4" style="width: 300px">
    <label class="block w-full" for="email">Email / Login</label>
    <input class="block w-full mt-1 p-1" type="text" id="username" value="admin">
    <label class="block w-full mt-3" for="email">Password</label>
    <input class="block w-full mt-1 p-1" type="password" id="password" value="1234">
    <button class="block border block w-2/3 mx-auto mt-5 border-black" type="submit">Sign in</button>
  </form>
</div> -->
