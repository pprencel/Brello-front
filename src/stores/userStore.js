import { writable } from 'svelte/store';
import API from '../utils/api';

const setupValues =
{
  loggedIn: false,
  errors: []
}
function createUsersStore() {
    const { subscribe, set, update } = writable(setupValues);

    return {
      subscribe,
      signup: async (formValues) => {
        const res = await API.post('users/', {
          email: form
        })
        console.log(res.data);
        // await set(res.data)
      },
      signin: async (newTableName) => {
        console.log(newTableName);
        const res = await API.post('users/', {
          tableName: newTableName,
          lists: []
        })
        // console.log(newTableName);
        // await update(n => n.push(mockTabsValues.tables))

      },
      reset: () => set({})
    };
}

export const userStore = createUsersStore();
