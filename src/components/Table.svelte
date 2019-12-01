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

	// Propably solution for fixed height of
	// window.screen.height - document.getElementsByClassName('test')[0].offsetTop
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
			<Loader />
    {:then table}
        <TableHeader tableName={table.name} tableUsers={table.users}/>
				<div class="lock-height flex flex-col flex-wrap overflow-x-auto text-white mt-8 w-full">
					{#each table.lists as list}
							<List list={list}/>
							<div class="break-column"></div>
					{/each}
				</div>
				<CardModal/>
    {:catch error}
    	<p style="color: red">{error.message}</p>
    {/await}
  </div>

<style>

.lock-height {
	height:  80.5vh;
}

.break-column {
  flex-basis: 100%;
  width: 0;
}
</style>
