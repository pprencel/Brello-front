import { writable } from 'svelte/store';
import API from '../utils/api';

let mockTabValues = {
  id: 1,
  name: 'NAZWA_TABLICY__NIE',
  users: [
    "K",
    "A",
  ],
  lists: [
    {
      id: 1,
      name: "Feature",
      tasks: []
    },
    {
      id: 2,
      name: "Done",
      tasks: []
    },
  ]
}
let mockEmptyTabValues = {
  id: null,
  name: null,
  users: [],
  lists: []
}

function createTableStore() {
    const { subscribe, set, update } = writable(mockEmptyTabValues);

    return {
      subscribe,
      loadTable: async () => {
        const res = await API('tables/1/?format=json')

        await set(res.data)
        return res.data
      },
      changeTableName: async (listName) => {
        console.log('changeTableName');
        const res = await API(`tabless/1?name=${listName}`)
        console.log(res.data);
        await update((table) => res.data)
      },
      reset: () => set({})
    };
}

export const tableStore = createTableStore();
