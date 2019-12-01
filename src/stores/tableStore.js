import { writable } from 'svelte/store';
import API from '../utils/api';

let cartArr = [{
  id: 1,
  name: 'fajna',
  description: 'some desc'
},
{
  id: 2,
  name: 'Card!!! ',
  description: 'some desc'
}]

let mockTabValues = {
  id: 1,
  tableName: 'nie fajna',
  users: [
    "K",
    "A",
  ],
  lists: [
    {
      id: 1,
      name: "Feature",
      cards: cartArr
    },
    {
      id: 2,
      name: "Done",
      cards: [{
        id: 4,
        name: 'single card name',
        description: 'some desc'
      },]
    },
    {
      id: 3,
      name: "Done 1",
      cards: cartArr
    },
    {
      id: 4,
      name: "Done 2",
      cards: cartArr
    },
    {
      id: 5,
      name: "Done 3",
      cards: cartArr
    },
    {
      id: 6,
      name: "Done 4",
      cards: cartArr
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

          console.log(res.data);

          set(res.data)
          return res.data
          // await set(mockTabValues)
          // return mockTabValues
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
        set(res.data)
      },
      reset: () => set({})
    };
}

export const tableStore = createTableStore();
