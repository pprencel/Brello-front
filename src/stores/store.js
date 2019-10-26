import { writable } from 'svelte/store';

let mockTabValues = {
  id: 1,
  name: 'NAZWA_TABLICY',
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

// export const resp = writable(mockTabValues);

function createTableStore() {
	const { subscribe, set, update } = writable(mockTabValues);

	return {
		subscribe,
    changeTableName: async (listName) => {
      update(table => {
        table.name = listName
        return table
      })
    },
    increment: () => update(n => n + 1),
    jan: () => {
      console.log('jan');
    },
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const TableStore = createTableStore();
