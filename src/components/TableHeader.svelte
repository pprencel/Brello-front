<script>
  import { onMount } from 'svelte';
  import { tableStore } from '../stores/tableStore.js';
	export let tableName;
	export let tableUsers;
  let editMode = false;
  let editedValue;
  let table;
  const testFunction = async () => {}
  let promise = testFunction()

  onMount(()=> {
    const unsubscribe = tableStore.subscribe(async (value) => {
      table = value
      editedValue = tableName
    })
  })

  const handleNameChange = async () => {
    if(editedValue != tableName){
      promise = tableStore.changeTableName(table.id, editedValue)
      // promise = tableStore.loadTable(table.id)
    }
    editMode = !editMode
  }

  const logError = (error) => {
    console.log(`failed to change the name, e: ${error}`)
    return ''
  }
</script>
<div class="flex flex-column justify-start items-center bg-indigo-400 w-full p-4 text-white">

  <div class="w-1/3">
    {#await promise}
      <p>loading...</p>
    {:then}
      {#if !editMode}
        <div
          on:click={handleNameChange}
          class="text-white text-2xl truncate"
        >
          {table.tableName}
        </div>
      {:else}
        <div>
          <input class="bg-indigo-300 py-1 font-bold" bind:value={editedValue} on:blur={handleNameChange} autofocus/>
        </div>
      {/if}
    {:catch error}
      {logError(error)}
      <div
        on:click={handleNameChange}
      >
        {`${tableName}`}
      </div>
    {/await}
  </div>
  <div class="flex flex-row ml-4">

    {#await promise}
      <p>loading...</p>
    {:then}
      <div class="text-white text-xl">
        Users:
      </div>
      {#each table.users as user}
        <button class="mx-2 p-1  bg-indigo-300 border-indigo-400 border rounded-full">
          <span> {user} </span>
        </button>
      {/each}
    {/await}
  </div>

</div>
