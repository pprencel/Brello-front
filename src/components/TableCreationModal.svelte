<script>
  import { createEventDispatcher } from 'svelte';
  export let visible;
  let newTableName;
  let newTableType;
  const dispatch = createEventDispatcher();


  const hideModal = (e) => {
    if(e.target.id === "bgClose" || e.target.id === "btnClose"){
      dispatch('hideModal');
    }
  }

  const handleSubmit = (e) => {
    console.log('submited'+newTableName);
    // console.log(newTableName);
    // console.log(newTableType);
    dispatch('newTable', {
      name: newTableName,
      type: newTableType
    });
  }
</script>

{#if visible}
  <div id="bgClose" class="shadowed-bg min-h-full flex flex-col items-center z-10 absolute left-0 top-0 w-full" on:click={hideModal}>
      <div class="w-1/3 bg-gray-400 m-24 p-4 relative ">
        <button class="w-100 float-right font-bold" id="btnClose">x</button>
        <form class="top-auto w-100" on:submit|preventDefault={handleSubmit}>
          <label class="text-xl font-bold">
            New table name:
          </label>
          <input bind:value={newTableName} class="p-2 my-2" type="text" placeholder="name..." required minlength="3"/>
          <div class="my-2">
            <input class="mt-2 pt-1 mr-1" type="radio" bind:group={newTableType} value="public" checked> Public<br>
            <input class="mt-2 pt-1 mr-1" type="radio" bind:group={newTableType} value="private"> Private<br>
          </div>
          <button class="float-right p-2 mt-2 border border-gray-500" type="submit">Create Table </button>
        </form>
      </div>
  </div>
{/if}

<style>
  .shadowed-bg {
    background-color:rgba(0, 0, 0, 0.70)
  }
</style>
