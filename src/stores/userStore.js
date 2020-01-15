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
          email: formValues.email.value,
          username: formValues.username.value,
          password: formValues.password.value,
          password_confirm: formValues.password_confirm.value,
        })

        // API sucks
        if(res.data.email){
          popupStore.msg(res.data.email[0], 'error')
        }
        if(res.data.username){
          popupStore.msg(res.data.username[0], 'error')
        }
        if(res.data.password){
          popupStore.msg(res.data.password[0], 'error')
        }

        if(res.data.response){
          popupStore.msg("You have signed up successfuly", 'info')
          setTimeout(() => {
            window.location.href = "/signin"
          }, 1500)
          return true
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
        return true
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
