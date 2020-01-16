<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import { cardStore } from '../stores/cardStore.js';
  import { userStore } from '../stores/userStore.js';
  import emptyCheckboxIcon from "../../public/images/emptyCheckboxIcon.png"
  import selectedCheckboxIcon from "../../public/images/selectedCheckboxIcon.png"
	import binIcon from "../../public/images/binIcon.png"

	import Loader from "./common/Loader.svelte";
	import constants from '../constants/constants';
  export let task
	let promise;
	let newTaskName = "";
	let taskEditedDescription = task.taskDescription;
	let taskEditMode = false;
	let taskDescriptionEditMode = false;

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

	const handleDeleteTask = (taskId) => {
		cardStore.deleteTask(taskId).then(() => {
			newTaskName = ""
			taskEditMode = false
			cardStore.openCard(store.card.id)
		})
	}

	const handleChangeStatus = (task) => {
		const newTask = task
		newTask.status = !newTask.status
		cardStore.updateTask(newTask).then(() => {
			newTaskName = ""
			taskEditMode = false
			cardStore.openCard(store.card.id)
		})
	}

  const handleChangeTaskDescription = () => {
    if(taskEditedDescription !== "" && taskEditedDescription !== task.taskDescription){
      cardStore.changeTaskDescription(task.id, task.idTaskList, taskEditedDescription).then(() => {
        newTaskName = ""
        taskEditMode = false
        cardStore.openCard(store.card.id)
      })
    }
  }
</script>

{#if store && store.visible}
	{#await promise}
		<Loader />
	{:then nothing}
      <div class="w-full mt-4 mr-4 ">
        <div
          class="{`absolute w-full h-screen top-0 left-0 z-30 ${(taskDescriptionEditMode) ? 'block' : 'hidden'}`}"
          on:click={() => taskDescriptionEditMode = false}
        />
        <div
          class={`flex flex-row px-2 py-2 w-full bg-indigo-400 ${(taskDescriptionEditMode) ? 'relative z-40' : ''}`}
          on:click={() => taskDescriptionEditMode = true}
        >
          <button
						class="w-1/12 h-5 pt-1"
						on:click={() => handleChangeStatus(task)}
					>
						<img class="h-5" src={task.status ? selectedCheckboxIcon : emptyCheckboxIcon}/>
          </button>
          <div class="w-10/12">
            {#if !taskDescriptionEditMode}
              <p
                class="py-1 inline-block"
              >
                {task.descriptionTask}
              </p>
            {:else}
              <input
                class="bg-indigo-300 px-2 py-1 inline-block"
                bind:value={taskEditedDescription}
              />
              <button
                class="float-right px-4 py-1 bg-indigo-600"
                on:click={() => handleChangeTaskDescription()}
              >
                CHANGE
              </button>
            {/if}
          </div>
          {#if !taskDescriptionEditMode}
            <button
  						class="text-xs w-1/12"
  						on:click={() => handleDeleteTask(task.id)}
  					>
              <img class="h-5" src={binIcon}/>
            </button>
          {/if}
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
