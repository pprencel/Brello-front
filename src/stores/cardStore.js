import { writable } from 'svelte/store';
import API from '../utils/api';

let init = {
  card: {
      id: 1,
      name: 'This is card name',
      description: 'and this is card description bla bla bla, bla bla',
      listName: 'nie fajna',
      attachment: null
      // attachment: 'https://i.redd.it/3yps4sdvzfm21.png'
  },
  visible: false
}

function createCardStore() {
    const { subscribe, set, update } = writable(init);

    return {
      subscribe,
      openCard: async (cardId) => {
        const res = await API(`cards/${cardId}/?format=json`)

        update(v => {
          v.visible = true
          v.card = res.data
          return v
        })
        return true
      },
      addCard: async (newCardName) => {
        console.log('API call', newCardName);
        // update(v => {
        //   v.visible = true
        //   v.card = init.card
        //   return v
        // })
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
      uploadAttachment: async (file, cardId) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await API(`cards/${cardId}/?format=json`)
        // const res = await API.post(`cards//?format=json`, {
        //   file: formData
        // })

        update(v => {
          v.card.attachment = 'https://i.redd.it/3yps4sdvzfm21.png'
          return v
        })
        return true
      },
      removeAttachment: async (cardId) => {
        const res = await API(`cards/${cardId}/?format=json`)

        update(v => {
          v.card.attachment = null
          return v
        })
        return true
      },
      reset: () => set({})
    };
}

export const cardStore = createCardStore();
