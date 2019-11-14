<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import TableHeader from './TableHeader.svelte';
  import TableLists from './TableLists.svelte';
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
				<TableLists lists={table.lists}/>
    {:catch error}
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>
<style>

</style>
