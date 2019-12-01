import { writable } from 'svelte/store';
import API from '../utils/api';

let init = {
  card: {
      id: 1,
      name: 'This is card name',
      description: 'and this is card description bla bla bla, bla bla',
      listName: 'nie fajna'
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
        update(v => {
          v.visible = false
          return v
        })
      },
      reset: () => set({})
    };
}

export const cardStore = createCardStore();
