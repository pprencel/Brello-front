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
      loadTable: async (tableId) => {
        if(tableId){
          console.log(`tables/${tableId}/?format=json`);
          const res = await API(`tables/${tableId}/?format=json`)
          res.data.id = res.data.url.match(/(\d+)/g)[1]
          res.data.users = []
          res.data.lists = mockTabValues.lists
          await set(res.data)
          return res.data
        }else {
          console.log('empty');
          await set(mockTabValues)
        }
      },
      changeTableName: async (tableId, newTableName) => {
        const res = await API.put(`tables/${tableId}/`, {
          tableName: newTableName
        })
        res.data.id = res.data.url.match(/(\d+)/g)[1]
        res.data.users = []
        res.data.lists = mockTabValues.lists
        await update((table) => res.data)
      },
      reset: () => set({})
    };
}

export const tableStore = createTableStore();
