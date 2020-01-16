<script>
	import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import { cardStore } from '../stores/cardStore.js';
  import { userStore } from '../stores/userStore.js';
  import checklistIcon from "../../public/images/checklist.png"
  import emptyCheckboxIcon from "../../public/images/emptyCheckboxIcon.png"
  import selectedCheckboxIcon from "../../public/images/selectedCheckboxIcon.png"
	import binIcon from "../../public/images/binIcon.png"

	import Loader from "./common/Loader.svelte";
	import TaskList from "./TaskList.svelte";
	import constants from '../constants/constants';
	let promise;
	let newTaskName = "";
	let taskListEditedName = "";
	let taskEditMode = false;
	let taskListEditMode = false;
	let trackNameEditMode = false;

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

	const handleChangeStatus = (task) => {
		const newTask = task
		newTask.status = !newTask.status
		cardStore.updateTask(newTask).then(() => {
			newTaskName = ""
			taskEditMode = false
			cardStore.openCard(store.card.id)
		})
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
      class={`w-full flex-col mt-10`}
    >
      <div
				class="{`absolute w-full h-screen top-0 left-0 bg-gray-500 opacity-50 z-30 ${(taskEditMode || taskListEditMode) ? 'block' : 'hidden'}`}"
				on:click={handleCloaseBox}
			/>
      {#each store.card.tasklists as taskList}
				<TaskList taskList={taskList} />
      {/each}
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
