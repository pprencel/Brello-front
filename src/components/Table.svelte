<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import TableHeader from './TableHeader.svelte';
  import List from './List.svelte';
  import { tableStore } from '../stores/tableStore.js';
	import Loader from "./common/Loader.svelte";
	import CardModal from "./CardModal.svelte";

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

  <div class=" flex flex-row flex-wrap">

    {#await promise}
			<Loader />
    {:then table}
        <TableHeader tableName={table.name} tableUsers={table.users}/>
				<div class="h-screen w-full overflow-x-scroll whitespace-no-wrap">
				  <div class="flex flex-row text-white pt-2 pb-10 ">
						{#each table.lists as list}
							<List list={list}/>
						{/each}
					</div>
				</div>
				<CardModal/>
    {:catch error}
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>

<style>
.list-container {
	height: 500px;
}
</style>
