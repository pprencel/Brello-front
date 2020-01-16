<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import { cardStore } from '../stores/cardStore.js';
  import { userStore } from '../stores/userStore.js';
  import checklistIcon from "../../public/images/checklist.png"
  import emptyCheckboxIcon from "../../public/images/emptyCheckboxIcon.png"
  import selectedCheckboxIcon from "../../public/images/selectedCheckboxIcon.png"
	import binIcon from "../../public/images/binIcon.png"

	import Loader from "./common/Loader.svelte";
	import constants from '../constants/constants';
	import Task from './Task.svelte';
  export let taskList
	let promise;
	let newTaskName = "";
	let taskListEditedName = taskList.nameTaskList;
	let taskEditMode = false;
	let taskListEditMode = false;
	let taskNameEditMode = false;

  let store
  onMount(()=> {
    const unsubscribeCard = cardStore.subscribe(async (value) => {
      store = value
    })
  })

  const handleCloaseBox = (e) => {
    e.preventDefault()
		taskEditMode = false;
		taskListEditMode = false;
		newTaskName = ""

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

	const handleChangeTaskList = () => {
		if(taskListEditedName !== "" && taskListEditedName !== taskList.nameTaskList){
			cardStore.changeTaskListName(taskList.idCard, taskList.id, taskListEditedName).then(() => {
				newTaskName = ""
				taskEditMode = false
				cardStore.openCard(store.card.id)
			})
		}
	}

	const getPercentOfCheckedTasks = (taskList) => {
		if (taskList.tasks.length === 0)
			return 0;

		let value = (taskList.tasks.filter(v => v.status).length / taskList.tasks.length) * 100
		// console.log('Percent value: '+value);
		return Math.round(value)
	}
</script>

{#if store && store.visible}
	{#await promise}
		<Loader />
	{:then nothing}
      <div
        class="w-full flex flex-row mb-5"
      >

        <div class="w-1/12 pt-1">
          <img src={checklistIcon}/>
        </div>

        <div
          class="{`absolute w-full h-screen top-0 left-0  z-30 ${(taskNameEditMode) ? 'block' : 'hidden'}`}"
          on:click={() => taskNameEditMode = false}
        />
        <div class="w-11/12 ml-5 z-40">
          {#if !taskNameEditMode}
            <p
  						class="font-bold text-2xl  py-1 inline-block"
  						on:click={() => taskNameEditMode = true}
  					>
  						{taskList.nameTaskList}
  					</p>
            <button
              class="float-right px-4 py-2 bg-indigo-600"
              on:click={() => handleRemoveTaskList(taskList.id)}
            >
              DELETE
            </button>
          {:else}

            <input
  						class="font-bold bg-indigo-300 px-2 py-1 text-2xl inline-block"
  						bind:value={taskListEditedName}
  					/>
            <button
              class="float-right px-4 py-2 bg-indigo-600"
              on:click={() => handleChangeTaskList()}
            >
              CHANGE
            </button>
          {/if}

          <div class="mt-5 w-full flex flex-row justify-center">
						<span class="font-bold mt-1 whitespace-no-wrap mr-2">
							{`${getPercentOfCheckedTasks(taskList)} %`}
						</span>
          	<progress
							value={getPercentOfCheckedTasks(taskList)}
						 	max="100"
							class="w-full my-2 bg-indigo-200 text-indigo-700"
						></progress>
          </div>
            {#each taskList.tasks as task}
              <Task task={task} />
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
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/if}

<style>

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
progress::-moz-progress-bar { background: #5a67d8; }
</style>
