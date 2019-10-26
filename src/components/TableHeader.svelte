<script>
  import { TableStore } from '../stores/store.js';
	export let tableName;
	export let tableUsers;
  let editMode = false;
  let table;
  let promise = handleNameChange();

  const unsubscribe = TableStore.subscribe(value => {
    table = value
  })
  let editedValue = table.name;

  const handleNameChange = async () => {
    if(editedValue != tableName){
      await TableStore.changeTableName(editedValue)
    }
    editMode = !editMode
  }
</script>
<div class="flex flex-column bg-gray-400 w-full p-6">
  <div class="w-1/3">
    {#if !editMode}
      <div on:click={handleNameChange}>
        {tableName}
      </div>
    {:else}
      <div>
        <input class="bg-gray-300" bind:value={editedValue} on:blur={handleNameChange}/>
      </div>
    {/if}
  </div>
  <div>
    USERS
  </div>
  <div class="pl-4 w-1/12">
    A
  </div>
  <div class="w-1/12">
    B
  </div>
</div>
