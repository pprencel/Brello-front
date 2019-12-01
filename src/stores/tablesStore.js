import { writable } from 'svelte/store';
import API from '../utils/api';

let mockTabsValues = {
  tables: [
    {
      id: 1,
      tableName: 'NAZWA TABLICY_1'
    },
    {
      id: 2,
      tableName: 'NAZWA TABLICY _2'
    },
    {
      id: 3,
      tableName: 'NAZWA TABLICY_3'
    },
  ]
}

function createTablesStore() {
    const { subscribe, set, update } = writable(mockTabsValues.tables);

    return {
      subscribe,
      loadTables: async () => {
        const res = await API('tables/?format=json')
        await set(res.data)
        return res.data;
        // set(mockTabsValues.tables)
      },
      addTable: async (newTableName) => {
        console.log(newTableName);
        await API.post('tables/', {
          tableName: newTableName,
          lists: []
        })
      },
      reset: () => set({})
    };
}

export const tablesStore = createTablesStore();
