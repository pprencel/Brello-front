<script>
  import { userStore } from '../stores/userStore.js';
  // let promise =
  let url = "asda"
  let res = null

  const handleSubmit = async (e) => {
   await userStore.signup(e.target);
  }
</script>
<div class="flex flex-col justify-center items-center text-xl m-10">
  <form on:submit|preventDefault="{handleSubmit}" class="bg-indigo-400 p-4" style="width: 300px">
    <label class="block w-full" for="email">Email</label>
    <input class="block w-full mt-1 p-1" type="text" id="email">
    <label class="block w-full" for="login">Login</label>
    <input class="block w-full mt-1 p-1" type="text" id="login">
    <label class="block w-full mt-3" for="email">Password</label>
    <input class="block w-full mt-1 p-1" type="password" id="password">
    <label class="block w-full mt-3" for="email">Password confirmation</label>
    <input class="block w-full mt-1 p-1" type="password" id="password_confirmation">
    <button class="block border block w-2/3 mx-auto mt-5 border-black" type="submit">Create account</button>
  </form>
</div>

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
