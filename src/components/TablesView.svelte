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
    // console.log(props.detail.name);
    promise = tablesStore.addTable(props.detail.name)
    promise = tablesStore.loadTables()
    // visibleModal = !visibleModal;
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
<div class="flex flex-wrap bg-red-400 w-full p-6">
  <div class="text-2xl font-bold p-4">
    Yours Tables
  </div>

  <div class="w-full flex flex-row flex-wrap justify-between w-full tables-grid">
    {#await promise}
      <p>loading...</p>
    {:then}
      {#each tables as table}
        <a href={`table/${table.id}`} use:link class="bg-red-500 p-8 m-4 w-1/4 border-4 truncate">
          <div>
            {table.tableName}
          </div>
        </a>
      {/each}
      <button on:click={() => visibleModal = true} class="bg-red-600 p-8 m-4 w-1/4 border-4 truncate">
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
