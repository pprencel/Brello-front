<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  export let list;
	let addNewCardMode = false
	const openCardModal = (id) => {
		console.log('handle open id - '+id);
	}

	const handleAddNewCard = (e) => {
		console.log('new card name - '+e.target.value);
		addNewCardMode = false
	}
</script>


  <div class="test w-1/4 m-2 bg-indigo-300 border-indigo-500 border rounded-sm pb-12">
    <div class="flex flex-row flex-no-wrap w-full border-b border-indigo-500">
      <p class="w-4/5 p-2 font-bold truncate"> {list} </p>
      <button class="w-1/5 pl-4 pb-2 float-right">
        ...
      </button>
    </div>
		<div class="flex flex-col w-full items-center">
			<div
			 	class="p-2 my-1 bg-indigo-200 w-11/12 "
				on:click={openCardModal(1)}
			>
				some card name
			</div>
			<div
			 	class="p-2 my-1 bg-indigo-200 w-11/12"
				on:click={openCardModal(1)}
			>
				other card name nana
			</div>


			{#if addNewCardMode}
				<div class="w-full flex flex-col items-center">
					<textarea
						on:blur={handleAddNewCard}
						type="text"
						class="w-11/12 p-3 m-2 pb-10 text-gray-800"
						placeholder="Enter new card name"
					/>
				</div>
			{:else}
				<div
					class=""
					on:click={() => addNewCardMode = true}
				>
					+ Add a card
				</div>
			{/if}
		</div>

  </div>

<style>
.test {
	-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
	-moz-box-sizing: border-box;    /* Firefox, other Gecko */
	box-sizing: border-box;         /* Opera/IE 8+ */
}
</style>
