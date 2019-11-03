<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import TableHeader from './TableHeader.svelte';
  import { tableStore } from '../stores/tableStore.js';
  export let tableId;
  let table;

  let promise = tableStore.loadTable()

  onMount(()=> {
    const unsubscribe = tableStore.subscribe(async (value) => {
      table = value
    })
  })

  beforeUpdate(() => {
    // console.log('just updated');
    promise = tableStore.loadTable();
  });
</script>

  <div class="flex flex-row flex-wrap bg-orange-100">

    <h1 class="w-full"> \\ Table component \\ </h1>
    <!-- <button on:click={resp.changeTableName} bind:value={text}> iks </button> -->

    {#await promise}
    	<p>...loading your table</p>
    {:then table}
        <TableHeader tableName={table.name} tableUsers={table.users}/>
    {:catch error}
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>
<style>

</style>
