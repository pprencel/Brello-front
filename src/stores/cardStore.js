import { writable } from 'svelte/store';
import API from '../utils/api';

let init = {
  card: {
      id: 1,
      name: 'This is card name',
      description: 'and this is card description bla bla bla, bla bla',
      listName: 'nie fajna'
  },
  visible: true
}

function createCardStore() {
    const { subscribe, set, update } = writable(init);

    return {
      subscribe,
      openCard: async (id) => {
        update(v => {
          v.visible = true
          v.card = init.card
          return v
        })
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
