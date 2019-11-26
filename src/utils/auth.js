import { userStore } from '../stores/userStore.js';
const authenticate = () => {
  let token;
  const unsubscribe = userStore.subscribe(async (value) => {
    token = value.token
  })

  const path = window.location.pathname;
  if(!token && path !== '/unauthorized'){
    console.log('redirect');
    window.location.href = '/unauthorized'
    return null;
  }
}

export default authenticate;
