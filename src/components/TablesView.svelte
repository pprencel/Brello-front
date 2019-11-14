<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import { tablesStore } from '../stores/tablesStore.js';
  import TableCreationModal from "./TableCreationModal.svelte";
  import { link } from "svelte-routing";
  let tables;
  const testFunction = async () => {}
  let promise = tablesStore.loadTables()
  let visibleModal = false;
  onMount(()=> {
    const unsubscribe = tablesStore.subscribe(async (value) => {
      tables = value
    })
  })

  const handleAddTable = async (props) => {
    promise = tablesStore.addTable(props.detail.name)
    promise = tablesStore.loadTables()
  }

  beforeUpdate(() => {
    // promise = tablesStore.loadTables();
  });

  const handleModalClose = (e) => {
    visibleModal = false;
  }

  const logError = (error) => {
    console.log(`failed to change the name, e: ${error}`)
    return ''
  }
</script>
<div class="flex flex-wrap bg-indigo-100 w-full py-6 text-white">
  <div class="w-full bg-indigo-400 text-2xl font-bold p-4">
    Yours Tables
  </div>

  <div class="w-full flex flex-row flex-wrap justify-between w-full tables-grid">
    {#await promise}
      <p>loading...</p>
    {:then}
      {#each tables as table}
        <a href={`table/${table.id}`} use:link class="bg-indigo-300 p-8 m-4 w-1/4 border-4 border-indigo-200 truncate">
          <div>
            {table.tableName}
          </div>
        </a>
      {/each}
      <button on:click={() => visibleModal = true} class="bg-indigo-400 p-8 m-4 w-1/4 border-4 border-indigo-100 truncate">
          +
      </button>

    {:catch error}
      <p> error </p>
    {/await}
  </div>
  <TableCreationModal visible={visibleModal} on:hideModal={() => visibleModal = false} on:newTable={handleAddTable}/>
</div>

<style>
.tables-grid::after {
  content: '';
  width: 25%;
  padding: 2rem;
  margin-left: 2rem;
}
</style>
