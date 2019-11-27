import { writable } from 'svelte/store';
import API from '../utils/api';
import jwtDecode from 'jwt-decode';
import {popupStore} from './popupStore';

let authToken = localStorage.getItem('authToken')
let decodedToken;
if(authToken){
  decodedToken = jwtDecode(authToken)
}

const setupValues =
{
  token: authToken,
  loggedIn: authToken ? true : false,
  email: decodedToken ? decodedToken.email : null,
  username: decodedToken ? decodedToken.username : null,
  register_error: [],
  response: null,
}

function createUsersStore() {
    const { subscribe, set, update } = writable(setupValues);

    return {
      subscribe,
      signup: async (formValues) => {
        update(v => {
          v.authToken = null
          return v;
        })
        const res = await API.post('register/', {
          mail: formValues.email.value,
          login: formValues.login.value,
          password: formValues.password.value,
          password_confirm: formValues.password_confirm.value,
        })

        if(res.data.errors){
          popupStore.msg(res.data.errors[0][0], 'error')
        }
        if(res.data.response){
          popupStore.msg("You have signed up successfuly", 'info')
          setTimeout(() => {
            window.location.href = "/signin"
          }, 1500)
        }
      },
      signin: async (formValues) => {
        const res = await API.post('api/token/', {
          username: formValues.username.value,
          password: formValues.password.value,
        })
        decodedToken = jwtDecode(res.data.access)
        update(v => {
          v.email = decodedToken.email
          v.username = decodedToken.username
          v.token = res.data.access
          v.loggedIn = true
          return v
        })

        localStorage.removeItem('authToken')
        localStorage.setItem('authToken', res.data.access);

        if(res.data.access){
          popupStore.msg("Successful logged in", 'info')
          setTimeout(() => {
            window.location.href = "/"
          }, 1500)
        }
      },
      signout: async () => {
        localStorage.removeItem('authToken')
        update(v => {
          v.email = null
          v.username = null
          v.token = null
          v.loggedIn = false
          return v
        })
          popupStore.msg("You have logged out", 'info')
          setTimeout(() => {
            window.location.href = "/"
          }, 1500)
      },
      reset: () => set({})
    };
}

export const userStore = createUsersStore();
