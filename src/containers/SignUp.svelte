<script>
  import { userStore } from '../stores/userStore.js';
  import Loader from "../components/common/Loader.svelte";
  let promise
  let url = "asda"
  let res = null

  const handleSubmit = async (e) => {
   promise = userStore.signup(e.target);
  }
</script>

{#await promise}
  <Loader />
{:then v}
  <div class="flex flex-col justify-center items-center text-xl m-10">
    <form on:submit|preventDefault="{handleSubmit}" class="bg-indigo-500 p-4" style="width: 300px" autocomplete="off">
      <label class="block w-full mt-2 text-white" for="email">Email</label>
      <input class="block w-full mt-1 p-2 text-gray-800 bg-indigo-100" type="text" id="email" autocomplete="false">
      <label class="block w-full mt-3 text-white" for="username">Login</label>
      <input class="block w-full mt-1 p-2 text-gray-800 bg-indigo-100" type="text" id="username" autocomplete="false">
      <label class="block w-full mt-3 text-white" for="email">Password</label>
      <input class="block w-full mt-1 p-2 text-gray-800 bg-indigo-100" type="password" id="password" autocomplete="false">
      <label class="block w-full mt-3 text-white" for="email">Password confirmation</label>
      <input class="block w-full mt-1 p-2 text-gray-800 bg-indigo-100" type="password" id="password_confirm" autocomplete="false">
      <button class="block border block w-3/4 mx-auto mt-5 border-white text-white font-bold px-6 py-2" type="submit">Create account</button>
    </form>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}


<!-- <div class="flex flex-col justify-center items-center text-xl m-10">
  <form on:submit|preventDefault="{handleSubmit}" class="bg-indigo-400 p-4" style="width: 300px">
    <label class="block w-full" for="email">Email</label>
    <input class="block w-full mt-1 p-1" type="text" id="email" value="John">
    <label class="block w-full" for="login">Login</label>
    <input class="block w-full mt-1 p-1" type="text" id="login" value="John">
    <label class="block w-full mt-3" for="email">Password</label>
    <input class="block w-full mt-1 p-1" type="password" id="password" value="John">
    <label class="block w-full mt-3" for="email">Password confirmation</label>
    <input class="block w-full mt-1 p-1" type="password" id="password_confirm" value="John">
    <button class="block border block w-2/3 mx-auto mt-5 border-black" type="submit">Create account</button>
  </form>
</div> -->
