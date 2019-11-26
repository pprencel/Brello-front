import { writable } from 'svelte/store';
import API from '../utils/api';

const setupValues =
{
  loggedIn: false,
  register_error: [],
  response: null,
  token: null
}

function createUsersStore() {
    const { subscribe, set, update } = writable(setupValues);

    return {
      subscribe,
      signup: async (formValues) => {
        const res = await API.post('register/', {
          mail: formValues.email.value,
          login: formValues.login.value,
          password: formValues.password.value,
          password_confirm: formValues.password_confirm.value,
        })
        await set(res.data);
        return res.data
      },
      signin: async (formValues) => {
        const res = await API.post('api/token/', {
          username: formValues.username.value,
          password: formValues.password.value,
        })

        update(v => {
          v.token = res.data.access
          v.loggedIn = true
          console.log(v.token);
          return v
        })
      },
      reset: () => set({})
    };
}

export const userStore = createUsersStore();
