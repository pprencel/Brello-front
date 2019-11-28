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
          // const res = await API(`tables/${tableId}/?format=json`)
          // res.data.users = ["KP", "AZ"],
          // res.data.lists = JSON.parse(res.data.lists)
          // for await(const list of res.data.lists){
          //
          // }
          // res.data.
          // console.log(res.data);
          //
          // await set(res.data)
          // return res.data
          await set(mockTabValues)
          return mockTabValues
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
