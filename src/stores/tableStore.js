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
          res.data.users = ["KP", "AZ"],
          await set(res.data)
          return res.data
        }else {
          console.log('empty');
          // await set(mockTabValues)
        }
      },
      changeTableName: async (tableId, newTableName) => {
        console.log(tableId);
        console.log(newTableName);
        const res = await API.put(`tables/${tableId}/`, {
          tableName: newTableName,
          lists: []
        })
        res.data.users = ["KP", "AZ"],
        await update((table) => res.data)
      },
      reset: () => set({})
    };
}

export const tableStore = createTableStore();
