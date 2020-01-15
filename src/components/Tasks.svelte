<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import { cardStore } from '../stores/cardStore.js';
  import { userStore } from '../stores/userStore.js';
  import checklistIcon from "../../public/images/checklist.png"
  import checkedIcon from "../../public/images/tick.png"
	import Loader from "./common/Loader.svelte";
	import constants from '../constants/constants';
	let promise;
	let newTaskName = "";
	let taskEditMode = false;
	let taskListEditMode = false;

  let store
  onMount(()=> {
    const unsubscribeCard = cardStore.subscribe(async (value) => {
      store = value
    })
		console.log(store.card);
  })

  const handleCloaseBox = (e) => {
    e.preventDefault()
		taskEditMode = false;
		taskListEditMode = false;
		newTaskName = ""

  }

	const handleRemoveAttachment = (attachmentId) => {
		promise = cardStore.removeAttachment(attachmentId).then(() => {
			promise = cardStore.openCard(store.card.id)
		})
	}

	const handleRemoveTaskList = (taskListId) => {
		promise = cardStore.removeTaskList(taskListId).then(() => {
			promise = cardStore.openCard(store.card.id)
		})
	}

	const handleAddTask = (taskListId) => {
		if(newTaskName !== ""){
			cardStore.addTaskToTaskList(taskListId, newTaskName).then(() => {
				newTaskName = ""
				taskEditMode = false
				cardStore.openCard(store.card.id)
			})
		}
	}

	const handleDeleteTask = (taskId) => {
		cardStore.deleteTask(taskId).then(() => {
			newTaskName = ""
			taskEditMode = false
			cardStore.openCard(store.card.id)
		})
	}

</script>

{#if store && store.visible}
	{#await promise}
		<Loader />
	{:then nothing}
    <div
      class={`w-full flex-col mt-10`}
    >
      <div
				class="{`absolute w-full h-screen top-0 left-0 bg-gray-500 opacity-50 z-30 ${(taskEditMode || taskListEditMode) ? 'block' : 'hidden'}`}"
				on:click={handleCloaseBox}
			/>
      {#each store.card.tasklists as taskList}
        <div
          class="w-full flex flex-row mb-5 relative z-40"
        >

          <div class="w-1/12 pt-1">
            <img src={checklistIcon}/>
          </div>

          <div class="w-11/12 ml-5">
            <p class="font-bold text-2xl inline-block"> {taskList.nameTaskList} </p>
            <button
              class="float-right px-4 py-2 bg-indigo-600"
              on:click={() => handleRemoveTaskList(taskList.id)}
            >
              DELETE
            </button>
            <div class="mt-5 bg-red-400 w-full">
              PROGRESS...
            </div>
              {#each taskList.tasks as task}
                <div class="w-full mt-4 mr-4 ">
                  <div class="flex flex-row px-2 py-2 w-full bg-indigo-400">
                    <div class="w-1/12">
                      {task.status ? "X" : "O"}
                    </div>
                    <div class="w-10/12">
                      {task.descriptionTask}
                    </div>
                    <div
											class="text-xs w-1/12"
											on:click={() => handleDeleteTask(task.id)}
										>
                      DELETE
                    </div>
                  </div>
                </div>
              {/each}
              <div class="w-full mt-4 mr-4" id="taskAddingBox">
                <div class="flex flex-row px-3 py-2 mt-2 w-full">
                  {#if !taskEditMode}
                    <button
                      class="px-4 py-2 bg-indigo-600"
                      on:click|stopPropagation={() => taskEditMode = true}
                    >
                      Add an item
                    </button>
                  {:else}
                    <div class="w-full">
                      <textarea
                        class="w-full p-2 mr-4 bg-indigo-400"
                        rows="1"
                        col="1"
                        placeholder="Add an item..."
                        bind:value={newTaskName}
                      ></textarea>
                      <button
                        class="mt-1 ml-1 px-4 py-2 bg-indigo-600"
                        on:click={() => handleAddTask(taskList.id)}
                      >
                        Add
                      </button>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
      {/each}
    </div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}

<style>

button:focus, input:focus {
	outline: 0
}

.hide-scrollbar {
	height: 80vh;
	overflow: -moz-scrollbars-none;
	scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
textarea::placeholder {
	color: #edf2f7;
}
</style>
