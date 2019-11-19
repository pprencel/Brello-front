<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import TableHeader from './TableHeader.svelte';
  import List from './List.svelte';
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
    promise = tableStore.loadTable(tableId);
  });
</script>

  <div class="flex flex-row flex-wrap">

    {#await promise}
    	<p>...loading your table</p>
    {:then table}
        <TableHeader tableName={table.name} tableUsers={table.users}/>
			  <div class="flex flex-row pb-64 text-white pt-2 overflow-x-scroll whitespace-no-wrap">
					{#each table.lists as list}
						<List list={list}/>
					{/each}
				</div>
    {:catch error}
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>
<style>

</style>
