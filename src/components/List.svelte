<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
	import { cardStore } from '../stores/cardStore';
	import { tableStore } from '../stores/tableStore';
	import Loader from "./common/Loader.svelte";
  export let list;
	let addNewCardMode = false
	let newCardName = null;
	let promise;

	const openCardModal = (e) => {
		addNewCardMode = false
		const cardId = e.target.value
		cardStore.openCard(cardId)
		console.log('handle open id - ' + cardId);
	}

	const handleAddNewCard = (e) => {
		console.log('new card name - ' + newCardName);
		addNewCardMode = false
		promise = cardStore.addCard(newCardName, list.id).then(() => {
			promise = tableStore.loadTable(list.idTable)
			// HACK: remove that
			location.reload();
		});
	}
</script>

{#await promise}
	<Loader />
{:then nth}
  <div class="w-1/4 m-2 bg-indigo-300 border-indigo-500 border rounded-sm">
    <div class="flex flex-row flex-no-wrap w-full border-b border-indigo-500">
      <p class="w-4/5 p-2 font-bold truncate"> {list.listName} </p>
      <button class="w-1/5 pl-4 pb-2 float-right">
        ...
      </button>
    </div>
		<div class="flex flex-col w-full items-center">
			{#each list.cards as card}
				<button
					class="p-2 my-2 bg-indigo-200 text-left w-11/12"
					value={card.id}
					on:click|preventDefault={openCardModal}
				>
					{card.cardName}
				</button>
			{/each}


			{#if addNewCardMode}
				<div class="w-full flex flex-col items-center">
					<textarea
						bind:value={newCardName}
						on:blur={handleAddNewCard}
						type="text"
						class="w-11/12 p-3 m-2 pb-10 text-gray-800"
						placeholder="Enter new card name"
					/>
				</div>
				<button
					class="p-2 my-2 w-8/12 border-indigo-400 border"
					on:click={handleAddNewCard}
				>
					+ Add
				</button>
			{:else}
				<div
					class="py-5"
					on:click={() => addNewCardMode = true}
				>
					+ Add a card
				</div>
			{/if}
		</div>

  </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<style>
</style>
