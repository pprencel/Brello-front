<script>
  import { onMount } from 'svelte';
  import { TableStore } from '../stores/store.js';
	export let tableName;
	export let tableUsers;
  let editMode = false;
  let editedValue = tableName;
  let table;
  const testFunction = async () => {}
  let promise = testFunction()

  onMount(()=> {
    const unsubscribe = TableStore.subscribe(async (value) => {
      table = value
    })
    console.log(table.users);
  })

  const handleNameChange = async () => {
    if(editedValue != table.name){
      promise = TableStore.changeTableName(editedValue)
    }
    editMode = !editMode
  }

  const logError = (error) => {
    console.log(`failed to change the name, e: ${error}`)
    return ''
  }
</script>
<div class="flex flex-column bg-gray-400 w-full p-6">


  <div class="w-1/3">
    {#await promise}
      <p>loading...</p>
    {:then}
      {#if !editMode}
        <div on:click={handleNameChange}>
          {`${table.name}`}
        </div>
      {:else}
        <div>
          <input class="bg-gray-300" bind:value={editedValue} on:blur={handleNameChange} autofocus/>
        </div>
      {/if}
    {:catch error}
      {logError(error)}
      <div on:click={handleNameChange}>
        {`${tableName}`}
      </div>
    {/await}
  </div>


  <div>
    USERS
  </div>
  {#await promise}
    <p>loading...</p>
  {:then}
    {#each table.users as user}
      <div class="pl-4 w-1/12">
        {user}
      </div>
    {/each}
  {/await}

</div>
