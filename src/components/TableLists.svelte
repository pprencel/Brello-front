<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  export let lists;
</script>

  <div class="w-full h-screen text-white pt-2 overflow-x-scroll whitespace-no-wrap">

    {#each lists as list}
      <div class="inline-block w-1/4 m-2 bg-indigo-300 border-indigo-500 border rounded-sm pb-12">
        <div class="flex flex-row flex-no-wrap w-full border-b border-indigo-500">
          <p class="w-4/5 p-2 font-bold"> {list} </p>
          <button class="w-1/5 pl-4 pb-2 float-right">
            ...
          </button>
        </div>
      </div>
    {/each}

  </div>

<style>

</style>
