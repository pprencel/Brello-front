import { writable } from 'svelte/store';
import API from '../utils/api';
import constants from '../constants/constants.json'
import userStore from './userStore'

let init = {
  card: {
      id: 1,
      name: 'This is card name',
      description: 'and this is card description bla bla bla, bla bla',
      listName: 'nie fajna',
      attachment: null,
      comments: [
        {
          username: "Jan Oblak",
          date: "2019-11-27 22:03:01",
          body: "cze tu przemko"
        },
        {
          username: "Roger Oblak",
          date: "2019-11-25 22:03:01",
          body: "hallo janko"
        },
      ]
  },
  visible: false,
  isLoading: false
}

function createCardStore() {
    const { subscribe, set, update } = writable(init);

    return {
      subscribe,
      openCard: async (cardId) => {
        update(v => {
          v.isLoading = true
          return v
        })
        const res = await API(`cards/${cardId}/?format=json`)
        console.log(res.data);
        update(v => {
          v.card = res.data
          v.visible = true
          v.isLoading = false
          return v
        })

      },
      addCard: async (newCardName, listId) => {
        console.log('API call', newCardName);
        const res = await API.post('cards/', {
        	descriptionCard: "Card description...",
        	cardName: newCardName,
        	idList: listId
        })
        return true;
      },

      editDescription: async (cardId, newCardDescription) => {
        console.log('desc');
        const res = await API.patch(`cards/${cardId}`, {
        	descriptionCard: newCardDescription,
        })
        return true;
      },

      hideModal: async () => {
        // should be - PATCH this card
        const cardId = 1
        const res = await API(`cards/${cardId}/?format=json`)

        update(v => {
          v.visible = false
          return v
        })
      },

      uploadAttachment: async (file, fileName, fileFormat, cardId) => {
        const formData = new FormData();
        formData.append("data", file);
        formData.append("idCard", cardId);
        formData.append("name", fileName);
        formData.append("type", fileFormat);

        const res = await API.post(`attachment-add/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if(res)
          return true
      },

      removeAttachment: async (attachmentId) => {
        const res = await API.delete(`attachment-delete/${attachmentId}/`)
        if(res)
          return true
      },

      createTaskList: async (newTrackListName, cardId) => {
        const res = await API.post(`tasklists/`, {
          nameTaskList: newTrackListName,
          idCard: cardId
        })
        if(res)
          return true
      },

      removeTaskList: async (trackListId) => {
        update(v => {
          v.isLoading = true
          return v
        })

        const res = await API.delete(`tasklists/${trackListId}/`)

        update(v => {
          v.isLoading = false
          return v
        })
        if(res)
          return true
      },

      addTaskToTaskList: async (taskListId, taskName) => {
        const res = await API.post(`tasks/`, {
          	descriptionTask: taskName,
          	idTaskList: taskListId,
          	status: false
        })
        if(res)
          return true
      },

      deleteTask: async (taskId) => {
        update(v => {
          v.isLoading = true
          return v
        })
        const res = await API.delete(`tasks/${taskId}`)


        update(v => {
          v.isLoading = false
          return v
        })
        if(res)
          return true
      },

      updateTask: async (task) => {
        update(v => {
          v.isLoading = true
          return v
        })
        const res = await API.put(`tasks/${task.id}/`, {
          descriptionTask: task.descriptionTask,
          idTaskList: task.idTaskList,
          status: task.status
        })
        if(res)
          return true
        update(v => {
          v.isLoading = false
          return v
        })
      },

      saveComment: async (cardId, commentBody) => {
        const res = await API.post(`comments/?format=json`, {
          body: commentBody,
          idCard: cardId,
          idUser: userStore.user
        })

        update(v => {
          v.card.comments.unshift({
            idUser: "J",
            published_date: "2019-12-25 22:03:01",
            body: commentBody
          })
          v.visible = true
          return v
        })
        // return res.data
      },
      saveCommentAttachment: async (file, commentId) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await API.put(`comment_attachment_add/${commentId}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },

      reset: () => set({})
    };
}

export const cardStore = createCardStore();
